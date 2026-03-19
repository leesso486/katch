import type { Metadata } from "next";
import "./globals.css";
import "./style.css";
import "./sub.css";

export const metadata: Metadata = {
  title: "KATCH - 대치동 최상위권 수능 예측 솔루션",
  description: "대치동 최상위권 4,500명의 리얼 데이터! 초중등부터 시작하는 올인원 수능 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
