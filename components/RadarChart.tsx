"use client";

import { DiagnosisScores } from "@/lib/types";

interface Props { scores: DiagnosisScores; }

const AXES = [
  { key: "warmth", label: "暖かさ", low: "COOL", high: "WARM", angle: -90 },
  { key: "density", label: "豊かさ", low: "MINIMAL", high: "RICH", angle: 0 },
  { key: "naturalness", label: "自然度", low: "URBAN", high: "NATURAL", angle: 90 },
  { key: "order", label: "整然度", low: "FREE", high: "ORDERED", angle: 180 },
];

export default function RadarChart({ scores }: Props) {
  const cx = 120, cy = 120, maxR = 80;
  const getPoint = (angle: number, value: number) => {
    const r = (value / 100) * maxR;
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };
  const angles = [-90, 0, 90, 180];
  const scoreValues = [scores.warmth, scores.density, scores.naturalness, scores.order];
  const points = angles.map((angle, i) => getPoint(angle, scoreValues[i]));
  const polygon = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width="240" height="240" viewBox="0 0 240 240">
        {[25, 50, 75, 100].map((level) => (
          <polygon key={level} points={angles.map((angle) => {
            const r = (level / 100) * maxR;
            const rad = ((angle - 90) * Math.PI) / 180;
            return `${cx + r * Math.cos(rad)},${cy + r * Math.sin(rad)}`;
          }).join(" ")} fill="none" stroke="#E8D5B7" strokeWidth="1" />
        ))}
        {angles.map((angle, i) => { const end = getPoint(angle, 100); return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="#E8D5B7" strokeWidth="1" />; })}
        <polygon points={polygon} fill="rgba(200, 150, 90, 0.25)" stroke="#C8965A" strokeWidth="2" strokeLinejoin="round" />
        {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill="#C8965A" />)}
        {AXES.map((axis, i) => {
          const labelR = maxR + 24;
          const rad = ((axis.angle - 90) * Math.PI) / 180;
          return <text key={i} x={cx + labelR * Math.cos(rad)} y={cy + labelR * Math.sin(rad)} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="700" fill="#8B6535" letterSpacing="0.05em">{axis.label}</text>;
        })}
      </svg>
      <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
        {AXES.map((axis) => {
          const value = scores[axis.key as keyof DiagnosisScores];
          return (
            <div key={axis.key} className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">{axis.label}</span>
                <span className="font-bold text-[#C8965A]">{value}</span>
              </div>
              <div className="h-1.5 bg-[#F0E4CC] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#C8965A] to-[#E8B97A] rounded-full score-bar" style={{ width: `${value}%` }} />
              </div>
              <div className="text-right"><span className="text-[10px] font-semibold text-[#8B6535] uppercase tracking-wide">{value >= 50 ? axis.high : axis.low}</span></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
