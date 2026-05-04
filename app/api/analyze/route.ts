import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

const SYSTEM_PROMPT = `あなたは世界最高峰のインテリアデザイン診断AIです。
部屋の画像を分析し、独自の「インテリアMBTI」システムで診断を行います。

## インテリアMBTI 4軸システム

**軸1: W/C（色調）**
- W (Warm): 暖色系・茶色・木の温もり・暖かみのある照明
- C (Cool): 寒色系・白・グレー・黒・クールな色味

**軸2: M/R（密度）**
- M (Minimal): アイテムが少ない・余白重視・すっきり
- R (Rich): アイテムが多い・装飾的・賑やか

**軸3: N/U（素材）**
- N (Natural): 木材・植物・石・籐・布など自然素材が多い
- U (Urban): 金属・コンクリート・ガラス・プラスチックなど人工素材が多い

**軸4: O/F（秩序）**
- O (Ordered): 整理整頓・対称性・几帳面・計画的な配置
- F (Free): 自由な配置・非対称・ランダム・個性的

## 出力形式

必ず以下のJSON形式のみで返答してください。他のテキストは一切含めないこと。

{
  "type_code": "WMNO",
  "type_name": "静寂の職人",
  "type_name_en": "Silent Craftsman",
  "overall_score": 85,
  "scores": { "warmth": 72, "density": 25, "naturalness": 78, "order": 85 },
  "style_name": "ジャパンディ",
  "style_description": "...",
  "personality_title": "内なる美を追求する職人気質",
  "personality_description": "...",
  "personality_traits": ["完璧主義", "審美眼が高い", "内向的"],
  "key_features": ["ナチュラルウッドの家具が主役"],
  "color_palette": ["#8B7355", "#F5F0E8", "#2D5016", "#C9B8A1", "#4A3728"],
  "improvement_tips": ["観葉植物を1〜2個追加すると空間に生命感が生まれます"],
  "compatible_types": ["WMNF", "CMNO"],
  "lifestyle_tags": ["ミニマリスト", "自然派", "読書家"],
  "detailed_analysis": "..."
}

## 重要なルール
- overall_score は空間の美的完成度・統一感・居住性を総合した0-100の点数
- warmth: 0=最もクール、100=最も暖かい
- density: 0=最もミニマル、100=最も豊か
- naturalness: 0=最も都市的、100=最も自然的
- order: 0=最も自由、100=最も整然
- type_codeはスコアから判定: warmth>=50→W, density>=50→R, naturalness>=50→N, order>=50→O
- color_paletteは画像から実際に見える色を16進数で5色
- lifestyle_tagsは5〜7個
- 日本語で、親しみやすく・でも専門的なトーンで記述`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageData, mediaType } = body;

    if (!imageData || !mediaType) {
      return NextResponse.json({ error: "画像データが見つかりません" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data: imageData } },
          { type: "text", text: "この部屋の画像を分析して、インテリアMBTI診断を行ってください。必ずJSON形式のみで返答してください。" },
        ],
      }],
    });

    const content = response.content[0];
    if (content.type !== "text") throw new Error("予期しないレスポンス形式です");

    const jsonMatch = content.text.trim().match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("JSONの解析に失敗しました");

    return NextResponse.json(JSON.parse(jsonMatch[0]));
  } catch (error) {
    console.error("Analysis error:", error);
    const message = error instanceof Error ? error.message : "分析中にエラーが発生しました";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
