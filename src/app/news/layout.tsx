import { Metadata } from "next";

export const metadata: Metadata = {
    title: "お知らせ",
    description: "大井上水道企業団からのお知らせ、ニュース一覧です。",
};

export default function NewsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
