import type { CandidateSummary } from "@/lib/simulator-store";

function money(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

export function CandidateOutcomes({
  candidates,
  buyIn,
  recommended,
}: {
  candidates: CandidateSummary[];
  buyIn: number;
  recommended: number;
}) {
  const cell = "border border-line px-3 py-2 text-right tabular-nums";
  const head = "border border-line bg-surface px-3 py-2 text-right font-semibold";

  return (
    <figure className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className={`${head} text-left`}>Stake f</th>
            <th className={head}>5th pct</th>
            <th className={head}>25th pct</th>
            <th className={head}>Median</th>
            <th className={head}>75th pct</th>
            <th className={head}>95th pct</th>
            <th className={head}>P(loss)</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => {
            const isBest = Math.abs(c.fraction - recommended) < 1e-9;
            return (
              <tr
                key={c.fraction}
                className={isBest ? "bg-surface font-semibold text-accent" : undefined}
              >
                <td className={`${cell} text-left`}>
                  {(c.fraction * 100).toFixed(0)}%{isBest ? " · recommended" : ""}
                </td>
                <td className={cell}>${money(c.p5)}</td>
                <td className={cell}>${money(c.p25)}</td>
                <td className={cell}>${money(c.median)}</td>
                <td className={cell}>${money(c.p75)}</td>
                <td className={cell}>${money(c.p95)}</td>
                <td className={cell}>{c.probLoss.toFixed(3)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <figcaption className="mt-2 text-sm text-muted">
        Each row is one candidate stake, played by thousands of simulated investors starting from $
        {buyIn.toLocaleString("en-US")}. The highlighted row is the one whose typical (median)
        investor finished with the most — not necessarily the biggest stake.
      </figcaption>
    </figure>
  );
}
