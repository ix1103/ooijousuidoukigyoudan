import { Metadata } from "next";

export const metadata: Metadata = {
    title: "水道工事等業者向け情報",
    description: "給水装置工事の設計・施工基準、各種届出様式、および業者向けの技術基準についてご案内します。",
};

export default function ContractorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
