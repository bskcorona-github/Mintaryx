# Mintaryx - ゼロコストWebアプリ量産フレームワーク

無料で使える便利ツール集を簡単に作成・デプロイできるモノレポフレームワークです。

## 🚀 特徴

- **Next.js 14** + App Router
- **Tailwind CSS** による美しいUI
- **TypeScript** による型安全性
- **Vercel** への簡単デプロイ
- **localStorage** ベースのデータ永続化
- **Google Analytics** + **AdSense** 統合済み
- **レスポンシブ対応** + **ダークモード**

## 📁 プロジェクト構造

```
Mintaryx/
├── apps/
│   └── template/          # テンプレートアプリ（BMI計算機）
├── shared/
│   ├── components/        # 共通UIコンポーネント
│   └── utils/            # 共通ユーティリティ
├── scripts/              # アプリ生成スクリプト
└── package.json          # ワークスペース設定
```

## 🛠️ セットアップ

### 1. 依存関係のインストール

```bash
# ルートディレクトリで
npm install

# テンプレートアプリの依存関係
cd apps/template
npm install
```

### 2. 開発サーバー起動

```bash
cd apps/template
npm run dev
```

ブラウザで `http://localhost:3000` を開いてBMI計算機をテストできます。

## 📱 新しいアプリの作成

```bash
# スクリプトで新しいアプリを生成
node scripts/generate-app.js my-new-tool

# 生成されたアプリで開発開始
cd apps/my-new-tool
npm run dev
```

## 🎨 UI/UXデザイン

### 共通コンポーネント

- `Layout` - ページ全体のレイアウト（ヘッダー・フッター・ダークモード）
- `Card` - 情報表示カード
- `Input` - フォーム入力フィールド
- `Button` - アクションボタン
- `ResultDisplay` - 結果表示（コピー機能付き）

### デザイン原則

- **一貫性**: 統一されたカラーパレットとタイポグラフィ
- **即時性**: リアルタイム計算とフィードバック
- **単一責任**: 1つのツールは1つの機能に特化
- **アクセシビリティ**: ARIA対応とキーボードナビゲーション

## 🚀 デプロイ

### Vercelへのデプロイ

1. GitHubリポジトリにプッシュ
2. Vercelでリポジトリを連携
3. Build設定:
   - Framework Preset: **Next.js**
   - Root Directory: **apps/template**
   - Build Command: **npm run build**

### 環境変数設定

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID

# AdSense
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

## 📊 収益化

### AdSense統合

- `apps/template/app/layout.tsx` でAdSenseスクリプトを読み込み
- 広告表示エリアは各ページに配置済み
- `shared/utils/analytics.ts` で広告クリック追跡

### Analytics

- Google Analytics 4 による詳細な使用状況追跡
- ツール使用回数・成功率の測定
- ユーザー行動の分析

## 🔧 カスタマイズ

### 新しいツールの追加手順

1. `scripts/generate-app.js` で新しいアプリを生成
2. `apps/[app-name]/app/page.tsx` でメインロジックを実装
3. 必要に応じて共通コンポーネントを拡張
4. Vercelで新しいプロジェクトとしてデプロイ

### カラーテーマ変更

`apps/template/tailwind.config.js` の `colors` セクションを編集:

```js
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',  // メインカラー
    600: '#2563eb',
  }
}
```

## 📝 ライセンス

MIT License - 商用利用可能

## 🤝 貢献

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-tool`)
3. 変更をコミット (`git commit -m 'Add amazing tool'`)
4. ブランチにプッシュ (`git push origin feature/amazing-tool`)
5. Pull Requestを作成

## 📚 参考資料

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Google AdSense](https://www.google.com/adsense/)

---

**🎯 目標**: 30日で100個の無料ツールをリリースし、月間収益$1,000を達成
