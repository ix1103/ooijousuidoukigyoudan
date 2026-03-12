import { Metadata } from "next";

export const metadata: Metadata = {
    title: "住民の皆様へ",
    description: "大井上水道企業団から住民の皆様へ、水道料金、各種手続き、断水、トラブルなどの情報をご案内します。",
};

export default function ResidentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
