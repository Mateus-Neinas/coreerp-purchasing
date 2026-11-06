const transitions = {
  draft: new Set(["submitted", "cancelled"]),
  submitted: new Set(["partially_received", "received", "cancelled"]),
  partially_received: new Set(["received", "cancelled"]),
  received: new Set(),
  cancelled: new Set()
};
export function calculatePurchaseTotal(items) {
  if (!Array.isArray(items) || items.length === 0) throw new TypeError("items must not be empty");
  let totalCents = 0;
  const lines = items.map((item, index) => {
    if (!Number.isSafeInteger(item.quantityMilli) || item.quantityMilli <= 0) throw new TypeError(`items[${index}].quantityMilli must be positive`);
    if (!Number.isSafeInteger(item.unitCostCents) || item.unitCostCents < 0) throw new TypeError(`items[${index}].unitCostCents must be nonnegative`);
    const lineTotalCents = Number((BigInt(item.quantityMilli) * BigInt(item.unitCostCents) + 500n) / 1000n);
    totalCents += lineTotalCents;
    if (!Number.isSafeInteger(totalCents)) throw new RangeError("purchase total exceeds safe integer range");
    return { ...item, lineTotalCents };
  });
  return { lines, totalCents };
}
export function canTransitionPurchaseStatus(from, to) {
  return Boolean(transitions[from]?.has(to));
}
