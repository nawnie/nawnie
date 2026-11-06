"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const engine = require("../src/engine.js");
const fixture = require("../examples/fixture.json");
const expected = require("../examples/results.json");

test("staffing defaults match committed fixture results", () => {
  assert.deepEqual(engine.staffingPlan(fixture.staffing), expected.staffing);
});
test("property defaults match committed fixture results", () => {
  assert.deepEqual(engine.propertyScreen(fixture.property), expected.property);
});
test("room audit defaults match committed fixture results", () => {
  assert.deepEqual(engine.auditRooms(fixture.rooms), expected.rooms);
});
test("fixture and result provenance explicitly identify synthetic data", () => {
  for (const record of [fixture, expected]) {
    assert.equal(record.provenance.kind, "synthetic");
    assert.equal(record.provenance.observedClientData, false);
  }
});
test("staffing rejects nonobject inputs", () => {
  for (const value of [null, [], "", undefined, 4]) assert.throws(() => engine.staffingPlan(value), TypeError);
});
test("staffing requires numbers without coercion", () => {
  for (const key of Object.keys(fixture.staffing)) {
    for (const value of [undefined, "", "80", null, true]) {
      assert.throws(() => engine.staffingPlan({ ...fixture.staffing, [key]: value }), TypeError);
    }
  }
});
test("staffing rejects NaN and infinite fields", () => {
  for (const key of Object.keys(fixture.staffing)) {
    for (const value of [NaN, Infinity, -Infinity]) {
      assert.throws(() => engine.staffingPlan({ ...fixture.staffing, [key]: value }), TypeError);
    }
  }
});
test("staffing rejects negative inputs", () => {
  for (const key of Object.keys(fixture.staffing)) {
    assert.throws(() => engine.staffingPlan({ ...fixture.staffing, [key]: -1 }), RangeError);
  }
});
test("room counts must be integers", () => {
  for (const key of ["occupiedRooms", "departures"]) {
    assert.throws(() => engine.staffingPlan({ ...fixture.staffing, [key]: 30.5 }), RangeError);
  }
});
test("departures cannot exceed occupied rooms", () => {
  assert.throws(() => engine.staffingPlan({ ...fixture.staffing, departures: 81 }), RangeError);
});
test("staffing enforces finite workload bounds", () => {
  for (const [key, value] of [["occupiedRooms", 1000001], ["departures", 1000001],
    ["checkoutMinutes", 1441], ["stayoverMinutes", 1441], ["productiveHours", 0],
    ["productiveHours", 24.01], ["bufferPct", 101]]) {
    assert.throws(() => engine.staffingPlan({ ...fixture.staffing, [key]: value }), RangeError);
  }
});
test("empty workload needs zero staff", () => {
  assert.deepEqual(engine.staffingPlan({ ...fixture.staffing, occupiedRooms: 0, departures: 0 }), {
    occupiedRooms: 0, departures: 0, stayovers: 0, baseMinutes: 0,
    adjustedMinutes: 0, laborHours: 0, staffRequired: 0
  });
});
test("exact productive-capacity boundary is not rounded up unnecessarily", () => {
  const result = engine.staffingPlan({ ...fixture.staffing, occupiedRooms: 6, departures: 6,
    checkoutMinutes: 60, bufferPct: 0 });
  assert.equal(result.staffRequired, 1);
});
test("partial productive-capacity requirement rounds up", () => {
  const result = engine.staffingPlan({ ...fixture.staffing, occupiedRooms: 7, departures: 7,
    checkoutMinutes: 60, bufferPct: 0 });
  assert.equal(result.staffRequired, 2);
});
test("fractional task minutes and buffers are supported", () => {
  const result = engine.staffingPlan({ ...fixture.staffing, occupiedRooms: 1, departures: 1,
    checkoutMinutes: 30.5, bufferPct: 12.5 });
  assert.equal(result.adjustedMinutes, 34.3125);
  assert.equal(result.laborHours, 0.571875);
  assert.equal(result.staffRequired, 1);
});
test("tiny productive hours that overflow a usable staff count are rejected", () => {
  assert.throws(() => engine.staffingPlan({ ...fixture.staffing, productiveHours: Number.MIN_VALUE }), RangeError);
});
test("property requires an object and all fields", () => {
  for (const value of [null, [], "", undefined, 4, {}]) assert.throws(() => engine.propertyScreen(value), TypeError);
});
test("property rejects numeric strings, missing values, NaN and Infinity", () => {
  for (const key of Object.keys(fixture.property)) {
    for (const value of [undefined, "", "100", null, true, NaN, Infinity, -Infinity]) {
      assert.throws(() => engine.propertyScreen({ ...fixture.property, [key]: value }), TypeError);
    }
  }
});
test("property rejects negative and out-of-bound financial inputs", () => {
  for (const key of Object.keys(fixture.property)) {
    for (const value of [-1, 1000000000001]) {
      assert.throws(() => engine.propertyScreen({ ...fixture.property, [key]: value }), RangeError);
    }
  }
});
test("zero debt service produces null DSCR and an explicit flag", () => {
  assert.deepEqual(engine.propertyScreen({ ...fixture.property, annualDebtService: 0 }), {
    noi: 360000, dscr: null, reserveGap: 50000,
    flags: ["no_debt_service", "renovation_reserve_gap"]
  });
});
test("negative NOI is possible and flagged without an investment verdict", () => {
  assert.deepEqual(engine.propertyScreen({ ...fixture.property, annualRevenue: 600000 }), {
    noi: -240000, dscr: -1, reserveGap: 50000,
    flags: ["negative_noi", "debt_service_exceeds_noi", "renovation_reserve_gap"]
  });
});
test("cash above renovation budget produces zero gap", () => {
  assert.deepEqual(engine.propertyScreen({ ...fixture.property, reserveCash: 200000 }), {
    noi: 360000, dscr: 1.5, reserveGap: 0, flags: []
  });
});
test("overflowing DSCR is rejected instead of emitted as Infinity", () => {
  assert.throws(() => engine.propertyScreen({ ...fixture.property, annualDebtService: Number.MIN_VALUE }), RangeError);
});
test("room audit rejects nonarray inputs and malformed rows", () => {
  for (const value of [undefined, null, {}, ""]) assert.throws(() => engine.auditRooms(value), TypeError);
  for (const row of [null, [], "", 101]) assert.throws(() => engine.auditRooms([row]), TypeError);
});
test("room identifiers must be explicit trimmed strings", () => {
  for (const roomId of [undefined, "", " ", " 101", "101 ", 101, "x".repeat(101)]) {
    assert.throws(() => engine.auditRooms([{ ...fixture.rooms[0], roomId }]), TypeError);
  }
});
test("duplicate room identifiers are rejected", () => {
  assert.throws(() => engine.auditRooms([fixture.rooms[0], fixture.rooms[0]]), RangeError);
});
test("unknown PMS and housekeeping states are rejected", () => {
  for (const pms of [undefined, "Vacant", "unknown", "clean", "", 0]) {
    assert.throws(() => engine.auditRooms([{ ...fixture.rooms[0], pms }]), RangeError);
  }
  for (const housekeeping of [undefined, "Clean", "ready", "", 0]) {
    assert.throws(() => engine.auditRooms([{ ...fixture.rooms[0], housekeeping }]), RangeError);
  }
});
test("empty room snapshot returns zero counts", () => {
  assert.deepEqual(engine.auditRooms([]), { total: 0, available: 0, occupied: 0,
    exceptionCount: 0, availableRooms: [], exceptions: [], rooms: [] });
});
test("occupied dirty room is not incorrectly marked ready or an exception", () => {
  const result = engine.auditRooms([{ roomId: "201", pms: "occupied", housekeeping: "dirty" }]);
  assert.equal(result.occupied, 1);
  assert.equal(result.available, 0);
  assert.equal(result.exceptionCount, 0);
  assert.equal(result.rooms[0].status, "occupied");
});
test("out-of-service exception takes precedence while PMS occupancy remains visible", () => {
  const result = engine.auditRooms([{ roomId: "201", pms: "occupied", housekeeping: "out_of_service" }]);
  assert.equal(result.occupied, 1);
  assert.equal(result.available, 0);
  assert.equal(result.exceptionCount, 1);
  assert.equal(result.rooms[0].status, "out_of_service");
});
test("functions accept frozen inputs, do not mutate them and repeat deterministically", () => {
  const staffing = Object.freeze({ ...fixture.staffing });
  const property = Object.freeze({ ...fixture.property });
  const rooms = Object.freeze(fixture.rooms.map(row => Object.freeze({ ...row })));
  assert.deepEqual(engine.staffingPlan(staffing), engine.staffingPlan(staffing));
  assert.deepEqual(engine.propertyScreen(property), engine.propertyScreen(property));
  assert.deepEqual(engine.auditRooms(rooms), engine.auditRooms(rooms));
  assert.deepEqual(staffing, fixture.staffing);
  assert.deepEqual(property, fixture.property);
  assert.deepEqual(rooms, fixture.rooms);
});
test("UMD loads in a browser-like context without CommonJS or dependencies", () => {
  const context = {};
  context.window = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../src/engine.js"), "utf8"), context);
  assert.equal(typeof context.window.PortfolioEngine.staffingPlan, "function");
  assert.equal(context.window.PortfolioEngine.staffingPlan(fixture.staffing).staffRequired, 6);
  assert.equal(Object.isFrozen(context.window.PortfolioEngine), true);
  assert.equal(Object.isFrozen(engine), true);
});
