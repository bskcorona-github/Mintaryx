import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mintaryx Tools - 無料便利ツール",
  description:
    "日常業務を効率化する無料の便利ツール集。計算機、変換ツール、生成ツールなど多数搭載。",
  keywords: "無料ツール,便利ツール,計算機,変換,生成,効率化",
  authors: [{ name: "Mintaryx" }],
  metadataBase: new URL("https://tools.mintaryx.com"),
  openGraph: {
    title: "Mintaryx Tools - 無料便利ツール",
    description: "日常業務を効率化する無料の便利ツール集",
    url: "https://tools.mintaryx.com",
    siteName: "Mintaryx Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mintaryx Tools - 無料便利ツール",
    description: "日常業務を効率化する無料の便利ツール集",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />

        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
