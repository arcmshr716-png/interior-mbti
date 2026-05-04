"use client";

import type { DiagnosisResult } from "@/lib/types";
import { INTERIOR_TYPES } from "@/lib/interior-types";
import RadarChart from "./RadarChart";

interface Props { result: DiagnosisResult; imagePreview: string; onReset: () => void; }

function ScoreCircle({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="144" height="144">
        <circle cx="72" cy="72" r={radius} fill="none" stroke="#F0E4CC" strokeWidth="8" />
        <circle cx="72" cy="72" r={radius} fill="none" stroke="#C8965A" strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 1.2s ease-out" }} />
      </svg>
      <div className="text-center">
        <div className="text-4xl font-bold text-[#C8965A]">{score}</div>
        <div className="text-xs text-gray-500 font-medium">/ 100</div>
      </div>
    </div>
  );
}

export default function DiagnosisResult({ result, imagePreview, onReset }: Props) {
  const typeInfo = INTERIOR_TYPES[result.type_code];
  return (
    <div className="animate-fade-in space-y-6 max-w-2xl mx-auto">
      <div className="relative bg-gradient-to-br from-[#2D4A3E] to-[#1A2E28] rounded-3xl overflow-hidden text-white p-8">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="type-badge text-2xl font-black text-[#E8B97A] bg-white/10 px-3 py-1 rounded-lg tracking-widest">{result.type_code}</span>
                <span className="text-3xl">{typeInfo?.emoji ?? "🏠"}</span>
              </div>
              <h2 className="text-3xl font-black leading-tight">{result.type_name}</h2>
              <p className="text-[#E8B97A] text-sm font-medium mt-1">{result.type_name_en}</p>
            </div>
            <ScoreCircle score={result.overall_score} />
          </div>
          <p className="mt-4 text-white/80 text-sm leading-relaxed">{typeInfo?.description ?? result.personality_description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#F0E4CC]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imagePreview} alt="診断した部屋" className="w-full h-52 object-cover" />
          <div className="p-3 text-center"><span className="text-xs text-gray-400">診断した部屋</span></div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#F0E4CC] flex flex-col items-center justify-center">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">4軸スコア</h3>
          <RadarChart scores={result.scores} />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0E4CC]">
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">🎨</span><h3 className="font-bold text-gray-700">インテリアスタイル</h3></div>
        <div className="text-2xl font-black text-[#2D4A3E] mb-2">{result.style_name}</div>
        <p className="text-gray-600 text-sm leading-relaxed">{result.style_description}</p>
        {result.color_palette?.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">カラーパレット</p>
            <div className="flex gap-2">
              {result.color_palette.map((color, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-lg shadow-sm border border-black/5" style={{ backgroundColor: color }} />
                  <span className="text-[10px] text-gray-400 font-mono">{color}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-[#FBF5EC] to-[#F5EDD8] rounded-2xl p-6 border border-[#E8D5B7]">
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">🧠</span><h3 className="font-bold text-gray-700">住む人の性格分析</h3></div>
        <p className="text-xl font-black text-[#2D4A3E] mb-3">{result.personality_title}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{result.personality_description}</p>
        <div className="flex flex-wrap gap-2">
          {result.personality_traits.map((trait, i) => (
            <span key={i} className="px-3 py-1.5 bg-white rounded-full text-sm font-semibold text-[#8B6535] border border-[#E8D5B7] shadow-sm">{trait}</span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0E4CC]">
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">🏷️</span><h3 className="font-bold text-gray-700">あなたのライフスタイル</h3></div>
        <div className="flex flex-wrap gap-2">
          {result.lifestyle_tags.map((tag, i) => (
            <span key={i} className="px-4 py-2 bg-[#2D4A3E] text-white rounded-full text-sm font-medium"># {tag}</span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0E4CC]">
        <div className="flex items-center gap-2 mb-4"><span className="text-xl">✨</span><h3 className="font-bold text-gray-700">空間のこだわりポイント</h3></div>
        <ul className="space-y-3">
          {result.key_features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#F5EDD8] text-[#C8965A] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
              <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0E4CC]">
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">📝</span><h3 className="font-bold text-gray-700">詳細分析レポート</h3></div>
        <p className="text-gray-600 text-sm leading-relaxed">{result.detailed_analysis}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0E4CC]">
        <div className="flex items-center gap-2 mb-4"><span className="text-xl">💡</span><h3 className="font-bold text-gray-700">さらに良くするためのヒント</h3></div>
        <ul className="space-y-3">
          {result.improvement_tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3 p-3 bg-[#FAFAF7] rounded-xl border border-[#F0E4CC]">
              <span className="text-[#C8965A] text-lg">→</span>
              <span className="text-gray-600 text-sm leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {result.compatible_types?.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0E4CC]">
          <div className="flex items-center gap-2 mb-4"><span className="text-xl">💞</span><h3 className="font-bold text-gray-700">相性のいいインテリアタイプ</h3></div>
          <div className="flex gap-3 flex-wrap">
            {result.compatible_types.map((code) => {
              const info = INTERIOR_TYPES[code];
              return (
                <div key={code} className="flex items-center gap-2 px-4 py-2 bg-[#F5EDD8] rounded-xl border border-[#E8D5B7]">
                  <span>{info?.emoji ?? "🏠"}</span>
                  <div>
                    <span className="type-badge text-xs font-black text-[#C8965A]">{code}</span>
                    <span className="ml-2 text-xs text-gray-600">{info?.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="text-center pb-8">
        <button onClick={onReset} className="px-8 py-3 bg-[#2D4A3E] text-white rounded-full font-bold hover:bg-[#1A2E28] transition-colors duration-200 shadow-md">別の部屋を診断する</button>
      </div>
    </div>
  );
}
