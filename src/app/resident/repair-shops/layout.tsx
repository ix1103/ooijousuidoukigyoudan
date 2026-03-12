import { Metadata } from "next";

export const metadata: Metadata = {
    title: "宅内漏水修理当番店",
    description: "ご家庭内での漏水修理に対応する、年度別の修理当番店一覧、および指定工事店情報をご案内します。",
};

export default function RepairShopsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
