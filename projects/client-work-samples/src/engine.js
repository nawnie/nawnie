/* Original portfolio examples. All sample inputs are synthetic. */
(function (root, factory) {
  "use strict";
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.PortfolioEngine = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function requireObject(value, name) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      throw new TypeError(name + " must be an object.");
    }
  }

  function requireNumber(value, name, min, max, integer) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new TypeError(name + " must be a finite number; strings are not converted.");
    }
    if (value < min || value > max || (integer && !Number.isInteger(value))) {
      throw new RangeError(name + " must be " + (integer ? "an integer " : "") +
        "between " + min + " and " + max + ".");
    }
  }

  function round(value) {
    return Number(value.toFixed(6));
  }

  /** A workload estimate, not a forecast or optimized employee roster. */
  function staffingPlan(input) {
    requireObject(input, "Staffing input");
    requireNumber(input.occupiedRooms, "occupiedRooms", 0, 1000000, true);
    requireNumber(input.departures, "departures", 0, 1000000, true);
    requireNumber(input.checkoutMinutes, "checkoutMinutes", 0, 1440, false);
    requireNumber(input.stayoverMinutes, "stayoverMinutes", 0, 1440, false);
    requireNumber(input.productiveHours, "productiveHours", 0, 24, false);
    requireNumber(input.bufferPct, "bufferPct", 0, 100, false);
    if (input.departures > input.occupiedRooms) {
      throw new RangeError("departures cannot exceed occupiedRooms.");
    }
    if (input.productiveHours === 0) {
      throw new RangeError("productiveHours must be greater than zero.");
    }

    var stayovers = input.occupiedRooms - input.departures;
    var baseMinutes = input.departures * input.checkoutMinutes + stayovers * input.stayoverMinutes;
    var adjustedMinutes = baseMinutes * (100 + input.bufferPct) / 100;
    var staffingRatio = adjustedMinutes / (input.productiveHours * 60);
    if (!Number.isFinite(staffingRatio) || staffingRatio > Number.MAX_SAFE_INTEGER) {
      throw new RangeError("The workload and productiveHours produce an unsupported staff count.");
    }
    // Do not round the ratio before ceiling: even a partial workload needs capacity.
    var staffRequired = Math.ceil(staffingRatio);
    return {
      occupiedRooms: input.occupiedRooms,
      departures: input.departures,
      stayovers: stayovers,
      baseMinutes: round(baseMinutes),
      adjustedMinutes: round(adjustedMinutes),
      laborHours: round(adjustedMinutes / 60),
      staffRequired: staffRequired
    };
  }

  /** Educational operating screen only; not a valuation or investment recommendation. */
  function propertyScreen(input) {
    requireObject(input, "Property input");
    ["annualRevenue", "operatingExpenses", "annualDebtService", "renovationBudget", "reserveCash"]
      .forEach(function (name) { requireNumber(input[name], name, 0, 1000000000000, false); });

    var noi = input.annualRevenue - input.operatingExpenses;
    var dscr = input.annualDebtService === 0 ? null : noi / input.annualDebtService;
    if (dscr !== null && !Number.isFinite(dscr)) {
      throw new RangeError("annualDebtService is too small to produce a finite coverage ratio.");
    }
    var reserveGap = Math.max(0, input.renovationBudget - input.reserveCash);
    var flags = [];
    if (noi < 0) flags.push("negative_noi");
    if (dscr === null) flags.push("no_debt_service");
    else if (noi < input.annualDebtService) flags.push("debt_service_exceeds_noi");
    if (reserveGap > 0) flags.push("renovation_reserve_gap");
    return { noi: round(noi), dscr: dscr === null ? null : round(dscr), reserveGap: round(reserveGap), flags: flags };
  }

  /** Compare a fictional PMS snapshot against housekeeping readiness. */
  function auditRooms(rows) {
    if (!Array.isArray(rows)) throw new TypeError("rows must be an array.");
    if (rows.length > 100000) throw new RangeError("rows may contain at most 100000 rooms.");
    var seen = new Set();
    var availableRooms = [];
    var exceptions = [];
    var occupied = 0;
    var rooms = rows.map(function (row, index) {
      requireObject(row, "Room row " + index);
      if (typeof row.roomId !== "string" || row.roomId.length === 0 ||
          row.roomId.length > 100 || row.roomId.trim() !== row.roomId) {
        throw new TypeError("roomId must be a nonempty, trimmed string of at most 100 characters.");
      }
      if (seen.has(row.roomId)) throw new RangeError("Duplicate roomId: " + row.roomId + ".");
      seen.add(row.roomId);
      if (row.pms !== "vacant" && row.pms !== "occupied") {
        throw new RangeError("pms must be vacant or occupied for room " + row.roomId + ".");
      }
      if (row.housekeeping !== "clean" && row.housekeeping !== "dirty" && row.housekeeping !== "out_of_service") {
        throw new RangeError("housekeeping must be clean, dirty, or out_of_service for room " + row.roomId + ".");
      }
      if (row.pms === "occupied") occupied += 1;
      var status = row.housekeeping === "out_of_service" ? "out_of_service" :
        row.pms === "occupied" ? "occupied" :
        row.housekeeping === "dirty" ? "not_ready" : "available";
      if (status === "available") availableRooms.push(row.roomId);
      if (status === "not_ready" || status === "out_of_service") {
        exceptions.push({ roomId: row.roomId, status: status });
      }
      return { roomId: row.roomId, pms: row.pms, housekeeping: row.housekeeping, status: status };
    });
    return {
      total: rooms.length,
      available: availableRooms.length,
      occupied: occupied,
      exceptionCount: exceptions.length,
      availableRooms: availableRooms,
      exceptions: exceptions,
      rooms: rooms
    };
  }

  return Object.freeze({ staffingPlan: staffingPlan, propertyScreen: propertyScreen, auditRooms: auditRooms });
});
