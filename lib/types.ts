export interface DiagnosisScores {
  warmth: number;
  density: number;
  naturalness: number;
  order: number;
}

export interface DiagnosisResult {
  type_code: string;
  type_name: string;
  type_name_en: string;
  overall_score: number;
  scores: DiagnosisScores;
  style_name: string;
  style_description: string;
  personality_title: string;
  personality_description: string;
  personality_traits: string[];
  key_features: string[];
  color_palette: string[];
  improvement_tips: string[];
  compatible_types: string[];
  lifestyle_tags: string[];
  detailed_analysis: string;
}

export type AnalysisState = "idle" | "analyzing" | "done" | "error";
