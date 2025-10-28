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

このプロジェクトでは、**コロケーション（Co-location）**の原則に従ってファイルを配置しています。

#### 📁 ページ固有のファイル（単一画面専用）
**配置場所**: そのページディレクトリ内
**例**: `/create/page.tsx`でのみ使用するものは`/create/components/form.tsx`

```
src/app/create/
├── page.tsx
└── components/
    └── form.tsx        # createページ専用のフォーム
```

**page.tsxと並べて置くことができるサブディレクトリ**:
- `components/` - ページ固有のコンポーネント
- `hooks/` - ページ固有のカスタムフック
- `utils/` - ページ固有のユーティリティ関数

#### 📁 共通ファイル（複数画面で使用）
**配置場所**: `src/`直下の各ディレクトリ

**`src/components/`**:
- **単一ファイル**: 例：`hover-prefetch-link.tsx`（1つのコンポーネントのみ）
- **ディレクトリ**: 例：`pagination/`（複数ファイルで構成される場合）

**`src/components/shadcn/`**:
- shadcn/uiからコピーしたコンポーネント
- スタイル以外の変更は禁止
- 機能拡張が必要な場合は新しいコンポーネントを作成

**その他の共通ディレクトリ**:
- `src/hooks/` - 複数画面で使用するカスタムフック
- `src/utils/` - 複数画面で使用する関数・定数
- `src/types/` - 複数画面で使用する型定義
  - 注意: 関連する型は`hooks/`や`utils/`内に配置することも可能

#### apiとの通信部分

**配置場所**: `src/api`直下の各ディレクトリ

例えば、wordに関するCRUDを行う関数はsrc/api/word.tsに記述してください。
zodのスキーマはsrc/api/word-schema.tsに記述してください。