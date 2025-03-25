export type Card = {
  id: string;
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
