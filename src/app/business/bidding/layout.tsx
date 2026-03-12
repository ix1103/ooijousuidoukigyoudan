import { Metadata } from "next";

export const metadata: Metadata = {
    title: "入札参加資格申請",
    description: "建設工事、測量・建設コンサルタント等、および物品・役務提供の入札参加資格登録申請についてご案内します。",
};

export default function BiddingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
