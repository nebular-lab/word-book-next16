import { SearchXIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/shadcn/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-muted/30 px-6 py-16 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-background shadow-sm ring-1 ring-border/60">
        <SearchXIcon
          aria-hidden="true"
          className="size-10 text-muted-foreground"
        />
      </div>
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          ページが見つかりません
        </h1>
        <p className="max-w-md text-balance text-muted-foreground">
          URLが正しいか確認するか、ホームに戻って探してみてください。
        </p>
      </div>
      <Button asChild size="lg">
        <Link href="/">ホームに戻る</Link>
      </Button>
    </main>
  );
}
