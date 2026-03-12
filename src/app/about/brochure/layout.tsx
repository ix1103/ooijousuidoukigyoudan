import { Metadata } from "next";

export const metadata: Metadata = {
    title: "広報資料・パンフレット",
    description: "大井上水道企業団の広報誌、事業概要パンフレット、および各種資料を公開しています。",
};

export default function BrochureLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
