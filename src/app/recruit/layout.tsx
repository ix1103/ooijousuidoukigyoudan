import { Metadata } from "next";

export const metadata: Metadata = {
    title: "職員採用",
    description: "大井上水道企業団の職員採用に関する情報、募集要項、勤務条件などをご案内します。",
};

export default function RecruitLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
