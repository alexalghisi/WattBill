import { SAMPLE, formatLei, totals } from "./bill";

test("energy is less than half of this sample bill", () => {
  const bill = totals(SAMPLE);
  expect(bill.total).toBe(22_143);
  expect(bill.energy).toBe(12_600);
  expect(bill.energyShare).toBeCloseTo(12_600 / 22_143);
  expect(formatLei(bill.total)).toBe("221.43 lei");
});
