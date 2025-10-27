"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { createSerializer, parseAsString, useQueryStates } from "nuqs";
import { cn } from "@/utils/cn";
import { nullToUndefined } from "@/utils/nullToUndefined";
import { nextSortDirection } from "@/utils/pagination";

const queryStateSchema = {
  q: parseAsString,
  offset: parseAsString,
  orders: parseAsString,
};

export function SortableHeader({
  field,
  label,
}: {
  field: string;
  label: string;
}) {
  const [queryParams] = useQueryStates(queryStateSchema);
  const { q, offset, orders } = nullToUndefined(queryParams);

  const nextDirection = nextSortDirection(orders, field);
  const nextOrder = nextDirection === "asc" ? field : `-${field}`;

  const descendingValue = `-${field}`;
  const isActive = orders === field || orders === descendingValue;

  const serializer = createSerializer(queryStateSchema);

  const nextParams = serializer({
    q,
    offset,
    orders: nextOrder,
  });

  return (
    <Link
      href={`/${nextParams}`}
      className={cn(
        "group inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
      )}
      aria-pressed={isActive}
      prefetch
    >
      <span>{label}</span>
      <span
        className={cn(
          "flex size-6 items-center justify-center rounded-full border bg-background transition-colors group-hover:border-primary/70",
          isActive
            ? "border-primary bg-primary/10 text-primary"
            : "border-border/60 text-muted-foreground",
        )}
      >
        <ChevronDown
          className={cn(
            "size-3 transform-gpu transition-transform duration-300 ease-out",
            isActive && orders === descendingValue ? "rotate-180" : "rotate-0",
          )}
          aria-hidden
        />
      </span>
    </Link>
  );
}
