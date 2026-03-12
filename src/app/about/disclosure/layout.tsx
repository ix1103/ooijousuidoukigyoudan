import { Metadata } from "next";

export const metadata: Metadata = {
    title: "例規集（条例・規程）",
    description: "大井上水道企業団の運営に関する条例、規則、規程などの例規集を公開しています。",
};

export default function DisclosureLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
