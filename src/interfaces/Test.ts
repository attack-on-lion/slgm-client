export const testKeys = [
  "id",
  "title",
  "content",
  "createdAt",
  "updatedAt",
] as const;

export interface Test {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TestAutoSetKeys = "id" | "createdAt" | "updatedAt";

export interface TestCreate extends Omit<Test, TestAutoSetKeys> {}
export interface TestUpdate extends Partial<Omit<Test, TestAutoSetKeys>> {}
