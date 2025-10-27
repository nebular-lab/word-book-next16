import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWord } from "@/api/words";
import { Button } from "@/components/shadcn/button";
import { EditWordForm } from "./components/form";

export async function generateMetadata({
  params,
}: PageProps<"/[id]">): Promise<Metadata> {
  const id = (await params).id;
  const word = await getWord(id);

  if (!word) {
    return {
      title: "Word not found",
    };
  }

  return {
    title: `Edit ${word.title}`,
  };
}

export default async function EditWordPage({ params }: PageProps<"/[id]">) {
  const id = (await params).id;
  const word = await getWord(id);

  if (!word) {
    notFound();
  }

  return (
    <main className="space-y-4">
      <Button type="button" variant="ghost" asChild>
        <Link href="/" prefetch>
          <ArrowLeft className="size-4" />
          一覧に戻る
        </Link>
      </Button>
      <EditWordForm wordId={word.id} defaultValue={word} />
    </main>
  );
}
