export type Bucket = "energy" | "network" | "tax";

export type BillLine = {
  id: string;
  label: string;
  bani: number;
  bucket: Bucket;
};

export type BillTotals = {
  energy: number;
  network: number;
  tax: number;
  total: number;
  energyShare: number;
};

export function totals(lines: BillLine[]): BillTotals {
  const energy = lines
    .filter((line) => line.bucket === "energy")
    .reduce((sum, line) => sum + line.bani, 0);
  const network = lines
    .filter((line) => line.bucket === "network")
    .reduce((sum, line) => sum + line.bani, 0);
  const tax = lines
    .filter((line) => line.bucket === "tax")
    .reduce((sum, line) => sum + line.bani, 0);
  const total = energy + network + tax;
  return { energy, network, tax, total, energyShare: total === 0 ? 0 : energy / total };
}

export function formatLei(bani: number): string {
  return `${(bani / 100).toFixed(2)} lei`;
}

/** A Cluj two-room month: 180 kWh, network, certificates, 21% VAT. */
export const SAMPLE: BillLine[] = [
  { id: "active", label: "Active energy 180 kWh", bani: 12_600, bucket: "energy" },
  { id: "network", label: "Network + distribution", bani: 4_800, bucket: "network" },
  { id: "certs", label: "Green certificates", bani: 720, bucket: "network" },
  { id: "excise", label: "Excise", bani: 180, bucket: "tax" },
  { id: "vat", label: "VAT 21%", bani: 3_843, bucket: "tax" },
];
