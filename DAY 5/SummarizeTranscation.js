// You’re given an array of transaction objects:

// [
//   { id: "t1", userId: 101, category: "food",   amount: 120.5,  currency: "INR", ts: "2025-08-01T09:10:00Z" },
//   { id: "t2", userId: 101, category: "travel", amount:  80.00, currency: "INR", ts: "2025-08-02T14:33:00Z" },
//   { id: "t3", userId: 102, category: "food",   amount:  60.00, currency: "INR", ts: "2025-08-02T07:05:00Z" },
//   { id: "t4", userId: 101, category: "food",   amount: -20.00, currency: "INR", ts: "2025-08-03T10:00:00Z" } // refund
// ]
// Return a summary grouped by by (default "userId"), with:
// totalAmount (sum of amounts across all categories),
// byCategory (object of category → sum),
// count (number of transactions),
// lastTransactionAt (ISO string of latest ts),
// Sorted by totalAmount descending, then by ascending.
// Sample output (shortened)

// [
//   {
//     key: 101,
//     totalAmount: 180.5,
//     byCategory: { food: 100.5, travel: 80 },
//     count: 3,
//     lastTransactionAt: "2025-08-03T10:00:00.000Z",
//     currency: "INR"
//   },
//   {
//     key: 102,
//     totalAmount: 60,
//     byCategory: { food: 60 },
//     count: 1,
//     lastTransactionAt: "2025-08-02T07:05:00.000Z",
//     currency: "INR"
//   }
// ]

function summarizeTransactions(transactions, groupByKey) {
  if (groupByKey === undefined) {
    groupByKey = "userId";
  }

  var groups = {};
  var groupKeys = [];

  for (var i = 0; i < transactions.length; i++) {
    var tx = transactions[i];
    var key = tx[groupByKey];

    // Check if group exists
    var found = false;
    for (var j = 0; j < groupKeys.length; j++) {
      if (groupKeys[j] === key) {
        found = true;
        break;
      }
    }

    // Create group if not found
    if (!found) {
      groups[key] = {
        key: key,
        totalAmount: 0,
        byCategory: {},
        count: 0,
        lastTransactionAt: tx.ts,
        currency: tx.currency
      };
      groupKeys[groupKeys.length] = key;
    }

    var group = groups[key];

    // Update totals
    group.totalAmount = group.totalAmount + tx.amount;
    group.count = group.count + 1;

    // Update byCategory
    var cat = tx.category;
    if (!(cat in group.byCategory)) {
      group.byCategory[cat] = 0;
    }
    group.byCategory[cat] = group.byCategory[cat] + tx.amount;

    // Update lastTransactionAt
    if (tx.ts > group.lastTransactionAt) {
      group.lastTransactionAt = tx.ts;
    }
  }

  // Convert to array
  var result = [];
  for (var i = 0; i < groupKeys.length; i++) {
    var k = groupKeys[i];
    var g = groups[k];

    // Manual timestamp normalization
    var ts = g.lastTransactionAt;
    if (ts.length === 20) {
      var newTs = "";
      // Copy first 19 characters manually
      for (var c = 0; c < 19; c++) {
        newTs += ts[c];
      }
      // Append milliseconds and Z
      newTs += ".000Z";
      ts = newTs;
    }
    g.lastTransactionAt = ts;

    result[result.length] = g;
  }

  // Manual sort
  for (var i = 0; i < result.length - 1; i++) {
    for (var j = i + 1; j < result.length; j++) {
      var a = result[i];
      var b = result[j];
      var swap = false;

      if (b.totalAmount > a.totalAmount) {
        swap = true;
      } else if (b.totalAmount === a.totalAmount && b.key < a.key) {
        swap = true;
      }

      if (swap) {
        var temp = result[i];
        result[i] = result[j];
        result[j] = temp;
      }
    }
  }

  return result;
}
var transactions = [
  { id: "t1", userId: 101, category: "food",   amount: 120.5,  currency: "INR", ts: "2025-08-01T09:10:00Z" },
  { id: "t2", userId: 101, category: "travel", amount:  80.00, currency: "INR", ts: "2025-08-02T14:33:00Z" },
  { id: "t3", userId: 102, category: "food",   amount:  60.00, currency: "INR", ts: "2025-08-02T07:05:00Z" },
  { id: "t4", userId: 101, category: "food",   amount: -20.00, currency: "INR", ts: "2025-08-03T10:00:00Z" }
];

console.log(summarizeTransactions(transactions));