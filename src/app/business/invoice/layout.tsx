import { Metadata } from "next";

export const metadata: Metadata = {
    title: "インボイス制度について",
    description: "適格請求書等保存方式（インボイス制度）への対応、および当企業団の登録番号についてご案内します。",
};

export default function InvoiceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
