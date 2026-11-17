import type { CausalitySummary } from "@/lib/causality-store";

export function StratifiedComparison({
  summary,
  x0,
  x1,
  yLabel,
}: {
  summary: CausalitySummary;
  x0: string;
  x1: string;
  yLabel: string;
}) {
  const cell = "border border-line px-3 py-2 text-right tabular-nums";
  const head = "border border-line bg-surface px-3 py-2 text-right font-semibold";

  return (
    <figure className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className={`${head} text-left`}>Slice</th>
            <th className={head}>
              n ({x0})
            </th>
            <th className={head}>
              mean {yLabel} ({x0})
            </th>
            <th className={head}>
              n ({x1})
            </th>
            <th className={head}>
              mean {yLabel} ({x1})
            </th>
            <th className={head}>Gap ({x1} − {x0})</th>
          </tr>
        </thead>
        <tbody>
          {summary.groups.map((g, i) => (
            <tr key={g.label} className={i === 0 ? "bg-surface font-semibold" : undefined}>
              <td className={`${cell} text-left`}>{g.label}</td>
              <td className={cell}>{g.n0}</td>
              <td className={cell}>{g.mean0.toFixed(2)}</td>
              <td className={cell}>{g.n1}</td>
              <td className={cell}>{g.mean1.toFixed(2)}</td>
              <td className={cell}>{(g.mean1 - g.mean0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="mt-2 text-sm text-muted">
        The highlighted row is the overall comparison. The rows below it are the same comparison
        inside each level of the third variable. Naive effect {summary.naive.toFixed(2)};
        stratified effect {summary.stratified.toFixed(2)}.
      </figcaption>
    </figure>
  );
}
