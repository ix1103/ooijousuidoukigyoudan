import { Metadata } from "next";

export const metadata: Metadata = {
    title: "事業者の皆様へ",
    description: "大井上水道企業団から事業者の皆様へ、入札参加、指定工事店登録、インボイス制度などの情報をご案内します。",
};

export default function BusinessLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
