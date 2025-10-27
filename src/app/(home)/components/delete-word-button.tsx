"use client";

import { Trash } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { deleteWord } from "@/api/words";
import { Button } from "@/components/shadcn/button";
import { Spinner } from "@/components/shadcn/spinner";
import { withCallbacks } from "@/utils/withCallbacks";

type Props = {
  wordId: string;
};

export const DeleteWordButton = ({ wordId }: Props) => {
  const [_, action, pending] = useActionState(
    withCallbacks(deleteWord, {
      onSuccess: () => {
        toast.success("単語を削除しました");
      },
      onError: () => {
        toast.error("単語の削除に失敗しました");
      },
    }),
    null,
  );

  return (
    <form action={action} onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={wordId} />
      <Button variant="outline" size="icon" disabled={pending}>
        {pending ? <Spinner /> : <Trash className="text-destructive" />}
      </Button>
    </form>
  );
};

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  const shouldDelete = confirm("本当に削除しますか？");
  if (!shouldDelete) {
    event.preventDefault();
  }
};
