import { Metadata } from "next";

export const metadata: Metadata = {
    title: "水道トラブル",
    description: "漏水、断水、凍結など、水道に関するトラブルの対処法をご案内します。",
};

export default function TroubleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
