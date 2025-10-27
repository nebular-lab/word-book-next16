import { Spinner } from "@/components/shadcn/spinner";
import { cn } from "@/utils/cn";

type FullPageSpinnerProps = {
  className?: string;
};

export function PageCenterSpinner({ className }: FullPageSpinnerProps) {
  return (
    <div
      className={cn(
        "flex w-full h-full items-center justify-center",
        className,
      )}
    >
      <Spinner className="size-10" />
    </div>
  );
}
