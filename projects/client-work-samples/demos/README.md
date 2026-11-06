# Demonstration engine

Three original, deterministic examples created for this portfolio on 6 November 2026. The committed fixture is fictional and contains no client or employer records. These examples are new demonstration work, not evidence of prior client delivery. They make no network requests and use no model, credentials, proprietary AES code, or external packages.

Run from the repository root with Node.js:

```sh
node --test tests/engine.test.cjs
```

Load in a browser:

```html
<script src="src/engine.js"></script>
```

The public API is `window.PortfolioEngine` in a browser and `require('./src/engine.js')` in CommonJS. Its three functions are `staffingPlan(input)`, `propertyScreen(input)` and `auditRooms(rows)`. All return new objects and preserve the input. There is no implicit conversion: an empty string, a numeric string, a missing number, `NaN`, or `Infinity` is rejected. Invalid numeric types raise `TypeError`; unsupported ranges and states raise `RangeError`. Display-friendly numeric outputs are rounded to six decimal places; staff counts use the unrounded workload.

## Staffing workload

`staffingPlan` requires six numeric fields:

| Field | Accepted input |
| --- | --- |
| `occupiedRooms` | Integer, 0–1,000,000 |
| `departures` | Integer, 0–occupiedRooms |
| `checkoutMinutes` | 0–1,440 minutes |
| `stayoverMinutes` | 0–1,440 minutes |
| `productiveHours` | Greater than 0, at most 24 hours per person |
| `bufferPct` | 0–100 percent |

The calculation subtracts departures to find stayovers, multiplies each task count by its minutes, applies the percentage buffer, and divides by productive minutes per person. `staffRequired` rounds up to a whole person. It is a workload estimate, not a demand forecast, scheduling optimizer, staffing guarantee, or employment recommendation. Productive time should already account for breaks and non-cleaning work; task times and service standards must be checked for the actual property.

The supplied fixture produces 50 stayovers, 1,650 base minutes, 1,815 buffered minutes, 30.25 labor-hours and 6 people at 6 productive hours each.

## Fictional property operating screen

`propertyScreen` requires `annualRevenue`, `operatingExpenses`, `annualDebtService`, `renovationBudget`, and `reserveCash`. Each must be a finite number from 0 to 1,000,000,000,000, expressed in the same currency. Revenue, operating expenses and debt service cover the same annual period; the renovation budget and reserve cash are point-in-time amounts.

- `noi` = annualRevenue − operatingExpenses.
- `dscr` = noi ÷ annualDebtService; it is `null`, not infinity, when debt service is zero.
- `reserveGap` = the positive shortfall between renovation budget and reserve cash, or zero.
- `flags` are ordered machine-readable observations: `negative_noi`, then `no_debt_service` or `debt_service_exceeds_noi`, then `renovation_reserve_gap` when applicable.

This is an educational arithmetic screen, not an investment recommendation, valuation, appraisal, financing decision, or complete underwriting model. It does not separately model income taxes, transaction costs, depreciation, replacement capital expenditure, working capital, renovation overruns, or future occupancy changes. Property taxes and insurance appear only if already included in operating expenses. Reserve cash is assumed to be available; a real review must establish that and check all other commitments.

The fictional fixture produces NOI of 360,000, DSCR of 1.5 and a renovation reserve gap of 50,000. No pass/fail investment verdict is generated.

## Room readiness audit

`auditRooms` accepts an array of at most 100,000 records. Each record requires a unique, nonempty, trimmed string `roomId` of at most 100 characters; `pms` must be `vacant` or `occupied`; `housekeeping` must be `clean`, `dirty`, or `out_of_service`. Unknown or duplicate identifiers and unknown states are rejected rather than guessed.

| Rule, in priority order | Output status |
| --- | --- |
| Housekeeping reports out of service | `out_of_service` exception |
| PMS reports occupied | `occupied` |
| Vacant and dirty | `not_ready` exception |
| Vacant and clean | `available` |

The result contains `total`, `available`, `occupied`, `exceptionCount`, `availableRooms`, `exceptions`, and enriched `rooms`. Room lists preserve input order. `occupied` counts PMS occupancy independently; an occupied out-of-service room counts as both occupied and an exception, so these counts are not universally additive. The example checks readiness from a supplied snapshot only: it does not authenticate to a PMS, update hotel systems, or confirm live inventory.

In the six-room fixture, rooms 101 and 106 are available, rooms 103 and 104 are occupied, room 102 is not ready, and room 105 is out of service.

## Reproducible evidence

`examples/fixture.json` is the input and provenance record. `examples/results.json` is the exact expected output. The test suite asserts all three results against those committed values and covers validation, boundary cases, non-mutation and browser/CommonJS loading. Changes to calculations or fixtures should include corresponding test and result changes.
