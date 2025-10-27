# 単語帳管理アプリ

Next.jsのAppRouterの勉強のために作ったコンテンツ管理サービスです。
micro-cmsのAPIを叩いてCRUDをしています。

## 使用技術

### メイン

- Next.js App Router
- nuqs
- conform

### UI周り

- shadcn/ui
  - (tailwind,radix-ui)

### 補助ツール
- t3-oss/env-nextjs
- zod

### 開発補助
- babel-plugin-react-compiler
- biome

## ポイント

### ディレクトリ構成

一つの画面でしか使わないコンポーネントやロジックは、そのページのそばに置きます。

例：/create/page.tsxでしか使わないformコンポーネントは/create/components/form.tsxにおいています。
componentsの他に、hooks,utilsを置くことが可能です。

複数画面で使うコンポーネントはsrc/componentsに置きます。1ファイルで完結するようなものはsrc/components/hover-prefetch-link.tsxのように置きます。
1ファイルで完結しないようなものや、複数のファイルを纏めたほうが良い場合はディレクトリを作ります。例：src/components/pagination


shadcnからコピーしたコンポーネントはsrc/components/shadcnに入れます。原則として、shadcnからコピーしたコンポーネントは、スタイル以外変更してはいけません。
拡張したい場合は新しくコンポーネントを作ってください。

src/hooksには複数画面で使うhooksをおいてください
src/utilsには複数画面で使う関数または定数をおいてください。
src/typesには複数画面で使う型をおいてください。ただし、src/hooksやsrc/utilsにもそれに関連する型を置くことは可能です。
