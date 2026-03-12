import { Metadata } from "next";

export const metadata: Metadata = {
    title: "組織概要・アクセス",
    description: "大井上水道企業団の概要、組織図、庁舎へのアクセス方法をご案内します。",
};

export default function OutlineLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
