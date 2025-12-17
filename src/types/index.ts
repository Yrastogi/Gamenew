export interface Level {
  id: number;
  name: string;
  description: string;
  rule: (index: number) => boolean;
}

export type GameState = 'intro' | 'watching' | 'selecting' | 'feedback' | 'complete';

export interface Feedback {
  correct: number[];
  wrong: number[];
  missed: number[];
}