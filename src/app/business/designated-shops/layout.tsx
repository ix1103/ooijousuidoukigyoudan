import { Metadata } from "next";

export const metadata: Metadata = {
    title: "指定工事店一覧",
    description: "大井上水道企業団管内の指定給水装置工事事業者（指定店）の一覧を公開しています。",
};

export default function DesignatedShopsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
