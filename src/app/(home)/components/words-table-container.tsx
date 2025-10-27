import { listWord } from "@/api/words";
import { WordsTable } from "@/app/(home)/components/words-table";
import { PaginationController } from "@/components/pagination/pagination-controller";
import { PaginationRange } from "@/components/pagination/pagination-range";
import { nullToUndefined } from "@/utils/nullToUndefined";
import { queryParamsCache } from "@/utils/nuqs";
import { buildPaginationPages, getVisibleRange } from "@/utils/pagination";

export const WordsTableContainer = async () => {
  // Point: queryParamsCacheからクエリパラメータを取得
  const cachedQueryParams = queryParamsCache.all();
  const queryParams = nullToUndefined(cachedQueryParams);

  const { q, orders, offset } = queryParams;
  // データフェッチ
  const { contents, totalCount } = await listWord({
    q,
    offset,
    orders,
  });

  // ページネーションのためのデータの計算
  const { firstItemIndex, lastItemIndex } = getVisibleRange({
    totalCount,
    offset,
    length: contents.length,
  });
  const pages = buildPaginationPages(queryParams, totalCount);

  if (totalCount === 0) {
    return <p className="text-center pt-4">データが見つかりませんでした。</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <PaginationRange
          firstItemIndex={firstItemIndex}
          lastItemIndex={lastItemIndex}
          totalCount={totalCount}
        />
        <PaginationController paginationPages={pages} />
        <div className="w-60" />
      </div>
      <WordsTable data={contents} />

      <div className="flex items-center justify-between">
        <PaginationRange
          firstItemIndex={firstItemIndex}
          lastItemIndex={lastItemIndex}
          totalCount={totalCount}
        />
        <PaginationController paginationPages={pages} />
        <div className="w-60" />
      </div>
    </>
  );
};
