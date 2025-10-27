"use client";

import Link from "next/link";

import { Button } from "@/components/shadcn/button";
import type { PaginationPage } from "@/utils/pagination";

type PaginationControllerProps = {
  paginationPages: PaginationPage[];
};

export function PaginationController({
  paginationPages,
}: PaginationControllerProps) {
  // NOTE: lengthが0になることはないが、念のためガードを入れておく
  if (paginationPages.length === 0 || paginationPages.length === 1) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {paginationPages.map((entry) => {
        if (entry.kind === "ellipsis") {
          return (
            <span
              key={entry.key}
              className="select-none px-2 text-sm text-muted-foreground"
            >
              …
            </span>
          );
        }

        return (
          <Button
            key={`page-${entry.page}`}
            asChild
            variant={entry.isCurrent ? "default" : "outline"}
            aria-current={entry.isCurrent ? "page" : undefined}
          >
            <Link
              href={{
                pathname: "/",
                query: entry.params,
              }}
              prefetch
            >
              {entry.label}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
