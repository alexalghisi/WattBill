import { SAMPLE, formatLei, totals } from "@/lib/bill";

export function BillPane() {
  const bill = totals(SAMPLE);

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[1fr_260px]">
      <ul className="min-h-0 overflow-auto p-4">
        {SAMPLE.map((line) => (
          <li
            key={line.id}
            data-testid={`line-${line.id}`}
            className="flex items-center justify-between border-b border-border/70 py-3 text-[14px]"
          >
            <span>
              {line.label}
              <span className="ml-2 text-[12px] text-muted-foreground">{line.bucket}</span>
            </span>
            <span className="tabular-nums">{formatLei(line.bani)}</span>
          </li>
        ))}
      </ul>
      <aside className="space-y-4 border-t border-border bg-sidebar p-5 md:border-t-0 md:border-l">
        <p className="text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
          Where the lei went
        </p>
        <Bar
          label="Energy"
          share={bill.energy / bill.total}
          value={formatLei(bill.energy)}
          testId="energy"
        />
        <Bar
          label="Network"
          share={bill.network / bill.total}
          value={formatLei(bill.network)}
          testId="network"
        />
        <Bar label="Tax" share={bill.tax / bill.total} value={formatLei(bill.tax)} testId="tax" />
        <p className="pt-2 text-[13px] text-muted-foreground" data-testid="energy-share">
          You used {Math.round(bill.energyShare * 100)}% of the bill as actual energy.
        </p>
      </aside>
    </div>
  );
}

function Bar({
  label,
  share,
  value,
  testId,
}: {
  label: string;
  share: number;
  value: string;
  testId: string;
}) {
  return (
    <div data-testid={testId}>
      <div className="mb-1 flex justify-between text-[13px]">
        <span>{label}</span>
        <span className="tabular-nums">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-muted">
        <div
          className="h-2 rounded-full bg-primary"
          style={{ width: `${String(Math.round(share * 100))}%` }}
        />
      </div>
    </div>
  );
}
