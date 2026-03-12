import { Metadata } from "next";

export const metadata: Metadata = {
    title: "企業団議会",
    description: "大井上水道企業団議会の概要、議員名簿、会議録、および議決結果についてご案内します。",
};

export default function AssemblyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
