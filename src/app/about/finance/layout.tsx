import { Metadata } from "next";

export const metadata: Metadata = {
    title: "決算・財政の状況",
    description: "大井上水道企業団の予算・決算、財務諸表、および財政健全化判断比率などの情報を公開しています。",
};

export default function FinanceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
