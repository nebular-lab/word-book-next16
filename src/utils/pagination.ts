import type { QueryParams } from "@/types/query-params";

export const PAGE_SIZE = 25;
export type PaginationPage =
  | {
      kind: "page";
      page: number;
      label: string;
      offset: number;
      isCurrent: boolean;
      params: Record<string, string>;
    }
  | {
      kind: "ellipsis";
      key: string;
    };

export function buildPaginationPages(
  parsedQueryParams: QueryParams,
  totalCount: number,
) {
  const { offset: currentOffset, q, orders } = parsedQueryParams;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  // オフセットから現在のページ番号を計算（1ベース、有効範囲内に制限）
  const currentPage = Math.min(
    totalPages,
    Math.max(1, Math.floor((currentOffset ?? 0) / PAGE_SIZE) + 1),
  );

  const candidates = [
    1,
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    totalPages,
  ].filter((page) => page >= 1 && page <= totalPages);

  // 重複を除去してソート（例: [1, 3, 4, 5, 6, 7, 10]）
  const uniquePages = Array.from(new Set(candidates)).sort((a, b) => a - b);

  const pages: PaginationPage[] = [];
  let previousPage: number | undefined;

  // 検索条件とソート条件を保持するパラメータ
  const preservedParams: Record<string, string> = {};
  if (q) {
    preservedParams.q = q;
  }
  if (orders) {
    preservedParams.orders = orders;
  }

  // 各ページオブジェクトを作成し、必要に応じて省略記号を挿入
  uniquePages.forEach((page) => {
    // ページ番号に飛びがある場合（例: 1, 5）は省略記号「...」を挿入
    if (previousPage !== undefined && page - previousPage > 1) {
      pages.push({
        kind: "ellipsis",
        key: `ellipsis-${previousPage}-${page}`,
      });
    }

    // ページ番号からオフセットを計算
    const offset = (page - 1) * PAGE_SIZE;

    // URLパラメータを構築（検索・ソート条件を保持）
    const params = { ...preservedParams };
    if (offset > 0) {
      params.offset = String(offset);
    }

    pages.push({
      kind: "page",
      page,
      label: String(page),
      offset,
      isCurrent: page === currentPage,
      params,
    });

    previousPage = page;
  });

  return pages;
}

export function nextSortDirection(
  currentOrders: string | undefined,
  field: string,
) {
  if (!currentOrders) {
    return "asc";
  }

  if (currentOrders === field) {
    return "desc";
  }

  if (currentOrders === `-${field}`) {
    return "asc";
  }

  return "asc";
}

export function getVisibleRange({
  totalCount,
  offset = 0,
  length,
}: {
  totalCount: number;
  offset?: number;
  length: number;
}) {
  const firstItemIndex = totalCount === 0 ? 0 : offset + 1;
  const lastItemIndex = Math.min(offset + length, totalCount);

  return { firstItemIndex, lastItemIndex };
}
