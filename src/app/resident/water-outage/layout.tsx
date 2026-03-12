import { Metadata } from "next";

export const metadata: Metadata = {
    title: "断水情報",
    description: "大井上水道企業団管内での計画断水、突発断水、および災害等による断水情報をお知らせします。",
};

export default function WaterOutageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
