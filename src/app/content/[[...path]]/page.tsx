import { AquariumContentPage } from "@/components/AquariumContentPage";

export default async function ContentPage({ params }: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await params;
  return <AquariumContentPage pathname={`/${path.join("/")}`} />;
}
