type Props = {
  totalCount: number;
  firstItemIndex: number;
  lastItemIndex: number;
};

export const PaginationRange = ({
  totalCount,
  firstItemIndex,
  lastItemIndex,
}: Props) => {
  return (
    <p className="text-sm text-muted-foreground">
      全{totalCount}件中 {firstItemIndex}〜{lastItemIndex}件を表示
    </p>
  );
};
