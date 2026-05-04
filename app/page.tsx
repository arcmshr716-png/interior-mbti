"use client";

import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import DiagnosisResult from "@/components/DiagnosisResult";
import { DiagnosisResult as DiagnosisResultType, AnalysisState } from "@/lib/types";

export default function Home() {
  const [state, setState] = useState<AnalysisState>("idle");
  const [result, setResult] = useState<DiagnosisResultType | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAnalyze = async (imageData: string, mediaType: string) => {
    setState("analyzing");
    setError("");
    setImagePreview(`data:${mediaType};base64,${imageData}`);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageData, mediaType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "診断に失敗しました");
      setResult(data);
      setState("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "エラーが発生しました");
      setState("error");
    }
  };

  const handleReset = () => { setState("idle"); setResult(null); setImagePreview(""); setError(""); };

  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      <header className="bg-white border-b border-[#F0E4CC] sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏠</span>
            <div>
              <h1 className="text-base font-black text-[#1A1A1A] leading-none">インテリア診断</h1>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Interior MBTI</p>
            </div>
          </div>
          {state === "done" && (
            <button onClick={handleReset} className="text-sm text-[#C8965A] font-semibold hover:underline">最初に戻る</button>
          )}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {(state === "idle" || state === "analyzing" || state === "error") && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-[#F5EDD8] text-[#8B6535] text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">✦ AI インテリア診断</div>
              <h2 className="text-4xl font-black text-[#1A1A1A] leading-tight mb-3">
                あなたの部屋が、<br />
                <span className="text-[#C8965A]">あなたを語る。</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto">
                部屋の写真1枚で、インテリアスタイル・住む人の性格・こだわりを AI が徹底分析。あなただけの「インテリアMBTI」を診断します。
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { emoji: "🎯", label: "4軸で診断", sub: "WMNO形式" },
                { emoji: "🧠", label: "性格分析", sub: "16タイプ" },
                { emoji: "💡", label: "改善提案", sub: "AIアドバイス" },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-2xl p-4 text-center border border-[#F0E4CC] shadow-sm">
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div className="text-xs font-bold text-[#1A1A1A]">{item.label}</div>
                  <div className="text-[10px] text-gray-400">{item.sub}</div>
                </div>
              ))}
            </div>

            <ImageUpload onAnalyze={handleAnalyze} isAnalyzing={state === "analyzing"} />

            {state === "error" && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-center">
                <p className="text-red-600 text-sm font-medium">⚠️ {error}</p>
                <p className="text-red-400 text-xs mt-1">もう一度試してみてください</p>
              </div>
            )}

            {state === "analyzing" && (
              <div className="mt-6 space-y-3">
                {["画像を解析中...", "色調・密度・素材・秩序を測定中...", "インテリアMBTIタイプを判定中...", "性格プロファイルを生成中..."].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#F0E4CC]">
                    <div className="w-4 h-4 border-2 border-[#C8965A]/30 border-t-[#C8965A] rounded-full animate-spin flex-shrink-0" />
                    <span className="text-sm text-gray-500">{step}</span>
                  </div>
                ))}
              </div>
            )}

            {state === "idle" && (
              <div className="mt-12">
                <h3 className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest mb-5">16 Interior Types</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    ["WMNO", "静寂の職人", "🪵"], ["WMNF", "温もりの詩人", "🕯️"],
                    ["WMUO", "モダニスト", "⬜"], ["WMUF", "アーバンノマド", "🌆"],
                    ["WRNO", "森の守人", "🌿"], ["WRNF", "ボヘミアン", "🦋"],
                    ["WRUO", "レトロ派", "📻"], ["WRUF", "夢想家", "🎨"],
                    ["CMNO", "北欧哲学者", "❄️"], ["CMNF", "ミステリアス", "🌙"],
                    ["CMUO", "インダストリアル", "⚙️"], ["CMUF", "テックノマド", "💻"],
                    ["CRNO", "学者", "🔬"], ["CRNF", "前衛芸術家", "🚀"],
                    ["CRUO", "建築家", "📐"], ["CRUF", "コレクター", "✨"],
                  ].map(([code, name, emoji]) => (
                    <div key={code} className="bg-white rounded-xl p-2 text-center border border-[#F0E4CC] hover:border-[#C8965A] transition-colors">
                      <div className="text-lg">{emoji}</div>
                      <div className="type-badge text-[10px] font-black text-[#C8965A]">{code}</div>
                      <div className="text-[9px] text-gray-400 leading-tight mt-0.5">{name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {state === "done" && result && (
          <DiagnosisResult result={result} imagePreview={imagePreview} onReset={handleReset} />
        )}
      </div>
    </main>
  );
}
