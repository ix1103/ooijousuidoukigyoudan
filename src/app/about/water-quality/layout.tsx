import { Metadata } from "next";

export const metadata: Metadata = {
    title: "水質情報",
    description: "大井上水道企業団が各地区で実施している水質検査の計画と結果を公開しています。",
};

export default function WaterQualityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
