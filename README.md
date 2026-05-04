# 🏠 インテリア診断 — Interior MBTI

部屋の写真1枚で、あなたのインテリアスタイルと性格を AI が徹底分析。

## 特徴

- **インテリアMBTI**: 4軸16タイプの独自診断システム（W/C・M/R・N/U・O/F）
- **総合スコア**: 美的完成度・統一感・居住性を0〜100点で評価
- **スタイル診断**: ジャパンディ、北欧、インダストリアルなど詳細に分類
- **住む人の性格分析**: 空間から読み取れるパーソナリティをAIが分析
- **カラーパレット抽出**: 部屋の実際の色を5色で表示
- **改善提案**: AIによるインテリアアドバイス
- **相性タイプ**: 相性のいいインテリアタイプを紹介

## 16 Interior Types

| コード | タイプ名 | 英語名 |
|--------|----------|--------|
| WMNO | 静寂の職人 | Silent Craftsman |
| WMNF | 温もりの吟遊詩人 | Warm Bard |
| WMUO | モダンミニマリスト | Modern Minimalist |
| WMUF | アーバンノマド | Urban Nomad |
| WRNO | 森の守人 | Forest Guardian |
| WRNF | ボヘミアンスピリット | Bohemian Spirit |
| WRUO | レトロキュレーター | Retro Curator |
| WRUF | エクレクティックドリーマー | Eclectic Dreamer |
| CMNO | 北欧の哲学者 | Nordic Philosopher |
| CMNF | ミステリアスアーティスト | Mysterious Artist |
| CMUO | インダストリアルシンカー | Industrial Thinker |
| CMUF | テックノマド | Tech Nomad |
| CRNO | ナチュラリスト学者 | Naturalist Scholar |
| CRNF | アバンギャルド探求者 | Avant-garde Explorer |
| CRUO | 建築家の魂 | Architect Soul |
| CRUF | コズミックコレクター | Cosmic Collector |

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **AI**: Claude claude-sonnet-4-6 (Anthropic SDK)

## セットアップ

```bash
# 依存関係インストール
npm install

# 環境変数設定
cp .env.local.example .env.local
# .env.local に ANTHROPIC_API_KEY を設定

# 開発サーバー起動
npm run dev
```

`http://localhost:3000` にアクセスして使用できます。

## 環境変数

| 変数名 | 説明 |
|--------|------|
| `ANTHROPIC_API_KEY` | Anthropic API キー ([取得はこちら](https://console.anthropic.com/)) |
