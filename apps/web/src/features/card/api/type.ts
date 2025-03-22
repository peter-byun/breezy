export type Card = {
  title: string;
  content: string;
  order: number;
  memorized: boolean;
  /**
   * In MS
   */
  createdAt: number;
  /**
   * In MS
   */
  memorizedAt: number;
};
