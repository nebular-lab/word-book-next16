import { z } from "zod";

export const wordSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "入力してください")
    .regex(
      /^[\w-\s]+$/,
      "英数字、ハイフン、アンダースコア、スペースのみ使用可能です",
    ),
  description: z.string().min(1, "入力してください"),
  author: z.string().min(1, "入力してください"),
  imageUrl: z
    .object({
      url: z.string().url("有効なURLを入力してください"),
      height: z.number().optional(),
      width: z.number().optional(),
    })
    .optional(),
  referenceUrl: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().optional(),
  revisedAt: z.string().optional(),
});

export type Word = z.infer<typeof wordSchema>;

export const createWordSchema = wordSchema.pick({
  title: true,
  description: true,
  author: true,
});

export const updateWordSchema = wordSchema.pick({
  id: true,
  title: true,
  description: true,
  author: true,
});

export const deleteWordSchema = wordSchema.pick({
  id: true,
});
