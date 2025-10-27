import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import { CreateWordForm } from "./components/form";

export default function CreatePage() {
  return (
    <main className="space-y-4">
      <Button type="button" variant="ghost" asChild>
        <Link href="/">
          <ArrowLeft className="size-4" />
          一覧に戻る
        </Link>
      </Button>
      <CreateWordForm />
    </main>
  );
}
