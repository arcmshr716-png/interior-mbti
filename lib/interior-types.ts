export interface InteriorType {
  name: string;
  nameEn: string;
  description: string;
  emoji: string;
}

export const INTERIOR_TYPES: Record<string, InteriorType> = {
  WMNO: { name: "静寂の職人", nameEn: "Silent Craftsman", emoji: "🪵", description: "温もりと静けさが調和した空間。自然素材への深いこだわりと、整然とした美意識を持つ。物の配置に強い意図を持ち、余白を大切にする。" },
  WMNF: { name: "温もりの吟遊詩人", nameEn: "Warm Bard", emoji: "🕯️", description: "暖色と自然素材で包まれた、詩的な空間。感性のままに物を置き、その場の雰囲気を直感で作り出す自由な魂の持ち主。" },
  WMUO: { name: "モダンミニマリスト", nameEn: "Modern Minimalist", emoji: "⬜", description: "洗練された都市的美学と暖かみが融合。少ないアイテムを厳選し、ワントーンで統一されたクリーンな空間を愛する。" },
  WMUF: { name: "アーバンノマド", nameEn: "Urban Nomad", emoji: "🌆", description: "都市的でありながら温かみのある自由な空間。旅の思い出やカルチャーのエッセンスを取り込み、独自のスタイルを作り出す。" },
  WRNO: { name: "森の守人", nameEn: "Forest Guardian", emoji: "🌿", description: "豊かな自然素材と植物で満たされた温かな空間。収集した自然物を丁寧に飾り、生命の美しさを大切にする。" },
  WRNF: { name: "ボヘミアンスピリット", nameEn: "Bohemian Spirit", emoji: "🦋", description: "色とりどりのテキスタイルと植物があふれる自由な空間。世界中から集めた雑貨と個性的なアートで、独自の宇宙を作り上げる。" },
  WRUO: { name: "レトロキュレーター", nameEn: "Retro Curator", emoji: "📻", description: "ヴィンテージアイテムを厳選し、整然と配置した博物館のような空間。時代を超えた美しさを愛し、コレクションを誇りにする。" },
  WRUF: { name: "エクレクティックドリーマー", nameEn: "Eclectic Dreamer", emoji: "🎨", description: "様々なスタイルを混ぜ合わせた、夢のような折衷空間。ルールに縛られず、美しいと思うものを自由に組み合わせる創造力の持ち主。" },
  CMNO: { name: "北欧の哲学者", nameEn: "Nordic Philosopher", emoji: "❄️", description: "スカンジナビア的な清潔感と自然素材の調和。余計なものをそぎ落とし、機能美と静寂を追求する知性派。" },
  CMNF: { name: "ミステリアスアーティスト", nameEn: "Mysterious Artist", emoji: "🌙", description: "クールなトーンと自然素材が織りなすミステリアスな空間。直感的なセンスで配置されたアートや小物が独特の雰囲気を醸し出す。" },
  CMUO: { name: "インダストリアルシンカー", nameEn: "Industrial Thinker", emoji: "⚙️", description: "コンクリートやメタルを活かしたクールな都市型空間。機能性を最優先しながらも、洗練されたアイテムで知的な雰囲気を演出する。" },
  CMUF: { name: "テックノマド", nameEn: "Tech Nomad", emoji: "💻", description: "先進的なガジェットとミニマルデザインが融合した未来的な空間。デジタルとリアルの境界をなくし、効率と美学を両立する。" },
  CRNO: { name: "ナチュラリスト学者", nameEn: "Naturalist Scholar", emoji: "🔬", description: "本と植物と自然素材で埋め尽くされたクールな知的空間。体系的に整理された蔵書とコレクションが知識への情熱を物語る。" },
  CRNF: { name: "アバンギャルド探求者", nameEn: "Avant-garde Explorer", emoji: "🚀", description: "従来の美的概念を打ち破る前衛的な空間。自然素材と実験的なアートが混在し、訪れる人を驚かせる発見に満ちている。" },
  CRUO: { name: "建築家の魂", nameEn: "Architect Soul", emoji: "📐", description: "幾何学的な美しさと構造美が際立つクールな空間。すべての要素が計算され、ラインとプロポーションの完璧な調和を目指す。" },
  CRUF: { name: "コズミックコレクター", nameEn: "Cosmic Collector", emoji: "✨", description: "宇宙的なスケールで美しいものを集め、クールに融合させた独自の空間。アートとオブジェのコレクションが宇宙のように広がる。" },
};
