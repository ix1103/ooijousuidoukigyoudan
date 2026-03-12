import { Metadata } from "next";

export const metadata: Metadata = {
    title: "各種申請書ダウンロード",
    description: "給水装置工事、誓約書、名義変更等、水道に関する各種申請書の様式をダウンロードいただけます。",
};

export default function DownloadsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
