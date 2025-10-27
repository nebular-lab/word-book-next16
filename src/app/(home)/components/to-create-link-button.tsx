import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shadcn/button";

export const ToCreateLinkButton = () => (
  <Button asChild>
    <Link href="/create">
      <Plus />
      追加
    </Link>
  </Button>
);
