// src/app/(home)/components/search-form.tsx
// Point: ユーザー操作が必要のため、クライアントコンポーネントにする。
"use client";

import { parseAsString, useQueryStates } from "nuqs";
import { Input } from "@/components/shadcn/input";

export function SearchForm() {
  // Point: nuqsを使うことで、ReactのuseStateのようにクエリパラメータを扱える。
  const [{ q }, setQueryParams] = useQueryStates(
    { q: parseAsString, offset: parseAsString },
    { shallow: false },
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get("q") as string;

    setQueryParams((previous) => ({
      ...previous,
      q: searchValue ? searchValue : null,
      offset: null,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="q"
        placeholder="Search..."
        defaultValue={q ?? ""}
      />
    </form>
  );
}
