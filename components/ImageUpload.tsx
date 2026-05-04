"use client";

import { useCallback, useState } from "react";

interface Props {
  onAnalyze: (imageData: string, mediaType: string) => void;
  isAnalyzing: boolean;
}

export default function ImageUpload({ onAnalyze, isAnalyzing }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      const base64 = dataUrl.split(",")[1];
      const mediaType = file.type as "image/jpeg" | "image/png" | "image/webp" | "image/gif";
      onAnalyze(base64, mediaType);
    };
    reader.readAsDataURL(file);
  }, [onAnalyze]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <label
        className={`relative flex flex-col items-center justify-center w-full rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 overflow-hidden
          ${isDragging ? "border-[#C8965A] bg-[#FBF5EC] scale-[1.02]" : "border-[#D4C4A8] bg-white hover:border-[#C8965A] hover:bg-[#FBF5EC]"}
          ${preview ? "border-solid border-[#C8965A]" : ""}
        `}
        style={{ minHeight: preview ? "auto" : "280px" }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }}
          disabled={isAnalyzing}
        />
        {preview ? (
          <div className="w-full relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="アップロードされた画像" className="w-full object-cover rounded-2xl" style={{ maxHeight: "400px" }} />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/50 rounded-2xl flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                <p className="text-white font-semibold text-sm">AIが診断中...</p>
              </div>
            )}
            {!isAnalyzing && (
              <div className="absolute inset-0 bg-black/0 hover:bg-black/30 rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                <p className="text-white font-semibold text-sm bg-black/50 px-4 py-2 rounded-full">別の画像を選択</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-[#F5EDD8] flex items-center justify-center text-4xl">🏠</div>
            <div>
              <p className="text-lg font-semibold text-[#1A1A1A]">部屋の写真をアップロード</p>
              <p className="text-sm text-gray-500 mt-1">ドラッグ＆ドロップ または クリックして選択</p>
              <p className="text-xs text-gray-400 mt-2">JPEG / PNG / WebP 対応</p>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {["リビング", "寝室", "書斎", "ダイニング"].map((room) => (
                <span key={room} className="text-xs px-3 py-1 rounded-full bg-[#F5EDD8] text-[#8B6535]">{room}</span>
              ))}
            </div>
          </div>
        )}
      </label>
      {!preview && <p className="text-center text-xs text-gray-400 mt-3">※ アップロードした画像はAI診断にのみ使用されます</p>}
    </div>
  );
}
