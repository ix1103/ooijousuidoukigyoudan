import { Metadata } from "next";

export const metadata: Metadata = {
    title: "企業団について",
    description: "大井上水道企業団の概要、理念、沿革、組織体制についてご案内します。",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
