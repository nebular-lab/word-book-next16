// "use client";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Word } from "@/api/word-schema";
import { HoverPrefetchLink } from "@/components/hover-prefetch-link";
import { Button } from "@/components/shadcn/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { DeleteWordButton } from "./delete-word-button";
import { SortableHeader } from "./sortable-header";

type WordsTableProps = {
  data: Word[];
};

export function WordsTable({ data }: WordsTableProps) {
  const columnCount = 5;

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <SortableHeader field="title" label="英語" />
              </TableHead>
              <TableHead>
                <SortableHeader field="description" label="日本語" />
              </TableHead>
              <TableHead>
                <SortableHeader field="author" label="作成者" />
              </TableHead>
              <TableHead>画像</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((word) => {
                const { id, author, description, imageUrl, title } = word;
                return (
                  <TableRow key={id}>
                    <TableCell>{title}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell>{author}</TableCell>
                    <TableCell>
                      {imageUrl ? (
                        <Image
                          src={imageUrl.url}
                          alt={title}
                          width={56}
                          height={56}
                          className="size-14 rounded-md object-cover"
                        />
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button asChild size="icon" variant="outline">
                          <HoverPrefetchLink href={`/${id}`} prefetch={false}>
                            <SquarePen />
                          </HoverPrefetchLink>
                        </Button>
                        <DeleteWordButton wordId={id} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnCount}
                  className="py-10 text-center text-sm"
                >
                  単語が見つかりませんでした。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
