"use server";

import { parseSubmission, report } from "@conform-to/react/future";
import { revalidatePath } from "next/cache";

import {
  createWordSchema,
  deleteWordSchema,
  updateWordSchema,
  type Word,
} from "@/api/word-schema";
import { microcmsClient } from "@/utils/microcms";
import { PAGE_SIZE } from "@/utils/pagination";
import { sleep } from "@/utils/sleep";
import type { FormActionResult } from "@/utils/withCallbacks";

export async function getWord(id: string) {
  try {
    const word = await microcmsClient.get<Word>({
      endpoint: "words",
      contentId: id,
    });

    return word;
  } catch (error) {
    console.error(`Failed to fetch word ${id}`, error);
    return null;
  }
}

export async function listWord(queries: {
  q?: string;
  offset?: number;
  orders?: string;
}) {
  console.log("listWord queries:", queries);
  return microcmsClient.getList<Word>({
    endpoint: "words",
    queries: {
      limit: PAGE_SIZE,
      ...queries,
    },
  });
}

export async function createWord(
  _: unknown,
  formData: FormData,
): Promise<FormActionResult> {
  const submission = parseSubmission(formData);
  const result = createWordSchema.safeParse(submission.payload);
  if (!result.success) {
    return report(submission, {
      error: {
        issues: result.error.issues,
      },
    });
  }
  try {
    await microcmsClient.create({
      endpoint: "words",
      content: result.data,
    });
  } catch (error) {
    // Point: エラーをthrowせずに、エラー内容をreturnする。
    // サーバーアクション内でthrowされると、ErrorBoundaryが表示されてしまう。
    // フォームを表示したままエラーメッセージを表示するためには、エラー内容を戻り値として返す必要がある。
    if (
      error instanceof Error &&
      error.message.includes("Please input unique value on 'title' field.")
    ) {
      return report(submission, {
        error: {
          // Point: "title"のバリデーションエラーとしてフロントに返すことができる。
          fieldErrors: { title: ["すでに同じ英語が登録されています。"] },
        },
      });
    }
    return report(submission, {
      error: {
        formErrors: [
          "予期せぬ理由で作成に失敗しました。もう一度お試しください。",
        ],
      },
    });
  }

  // Point: 一覧ページのキャッシュを削除する。
  revalidatePath("/");

  return report(submission);
}

export async function updateWord(
  _: unknown,
  formData: FormData,
): Promise<FormActionResult> {
  const submission = parseSubmission(formData);

  const result = updateWordSchema.safeParse(submission.payload);
  if (!result.success) {
    return report(submission, {
      error: {
        issues: result.error.issues,
      },
    });
  }

  try {
    await sleep(2000);
    await microcmsClient.update({
      endpoint: "words",
      contentId: result.data.id,
      content: result.data,
    });
  } catch (error) {
    console.error(error);
    return report(submission, {
      error: {
        formErrors: ["予期せぬ理由で更新に失敗しました。"],
      },
    });
  }

  revalidatePath("/");
  revalidatePath(`/${result.data.id}`);
  return report(submission);
}

export const deleteWord = async (
  _: unknown,
  formData: FormData,
): Promise<FormActionResult> => {
  const submission = parseSubmission(formData);
  const result = deleteWordSchema.safeParse(submission.payload);

  if (!result.success) {
    return report(submission, {
      error: {
        issues: result.error.issues,
      },
    });
  }
  try {
    await microcmsClient.delete({
      endpoint: "words",
      contentId: result.data.id,
    });
  } catch (error) {
    console.error(error);
    return report(submission, {
      error: {
        formErrors: [
          "microCMSとの通信に失敗しました。詳細はコンソールを確認してください。",
        ],
      },
    });
  }
  revalidatePath("/");
  revalidatePath(`/${result.data.id}`);

  return report(submission);
};
