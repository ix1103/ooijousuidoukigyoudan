import { Metadata } from "next";

export const metadata: Metadata = {
    title: "水道料金・お手続き",
    description: "水道料金のお支払い方法、検針、各種お手続き（開始・中止・名義変更）に関する情報をご案内します。",
};

export default function PriceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
