import { Metadata } from "next";

export const metadata: Metadata = {
    title: "よくある質問",
    description: "水道料金、各種手続き、水質、トラブルなどに関するよくあるご質問にお答えします。",
};

export default function FaqLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
