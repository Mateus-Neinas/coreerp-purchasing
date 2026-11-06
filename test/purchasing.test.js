import test from "node:test";
import assert from "node:assert/strict";
import { calculatePurchaseTotal, canTransitionPurchaseStatus } from "../src/purchasing.js";

test("calculates fractional quantities in integer cents", () => {
  const result = calculatePurchaseTotal([
    { productId: "p-1", quantityMilli: 1500, unitCostCents: 1250 },
    { productId: "p-2", quantityMilli: 1000, unitCostCents: 999 }
  ]);
  assert.equal(result.lines[0].lineTotalCents, 1875);
  assert.equal(result.totalCents, 2874);
});
test("rejects invalid purchase quantities", () => {
  assert.throws(() => calculatePurchaseTotal([{ quantityMilli: 0, unitCostCents: 1 }]), /positive/);
});
test("permits expected purchase order transitions only", () => {
  assert.equal(canTransitionPurchaseStatus("draft", "submitted"), true);
  assert.equal(canTransitionPurchaseStatus("submitted", "partially_received"), true);
  assert.equal(canTransitionPurchaseStatus("received", "submitted"), false);
  assert.equal(canTransitionPurchaseStatus("cancelled", "received"), false);
});
