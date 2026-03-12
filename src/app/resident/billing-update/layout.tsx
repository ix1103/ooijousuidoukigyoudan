import { Metadata } from "next";

export const metadata: Metadata = {
    title: "水道料金改定のお知らせ",
    description: "令和7年度からの水道料金改定に関する詳細、改定の背景、新料金表などについてご案内します。",
};

export default function BillingUpdateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
