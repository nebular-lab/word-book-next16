import { Suspense } from "react";
import { SearchForm } from "@/app/(home)/components/search-form";
import { PageCenterSpinner } from "@/components/page-center-spinner";
import { H1 } from "@/components/typography";
//app/page.tsx
import { queryParamsCache } from "@/utils/nuqs";
import { ToCreateLinkButton } from "./components/to-create-link-button";
import { WordsTableContainer } from "./components/words-table-container";

export default async function Page({ searchParams }: PageProps<"/">) {
  // Point: nuqsの機能であるqueryParamsCacheにクエリパラメータを保存。
  // サーバーコンポーネントから参照できるようになる。
  const { q, orders, offset } = await queryParamsCache.parse(searchParams);

  // Point: ここではデータフェッチをせず、Suspenseで囲ったコンポーネント内でデータフェッチを行う。
  // データフェッチ中にSuspenseの外側のコンポーネントを先に描画できる。

  return (
    <main className="flex h-full w-full flex-col gap-6">
      <div className="flex justify-between">
        <H1>英単語帳一覧</H1>
        <div className="flex gap-4">
          <SearchForm />
          <ToCreateLinkButton />
        </div>
      </div>
      {/* Point: クエリパラメータが変わったときにfallbackを表示するためには、keyを指定する必要がある。*/}
      <Suspense key={`${q}${orders}${offset}`} fallback={<PageCenterSpinner />}>
        <WordsTableContainer />
      </Suspense>
    </main>
  );
}
