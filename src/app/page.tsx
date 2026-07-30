import { RenewalHome } from "@/components/RenewalHome";
import { getMergedAnnouncements } from "@/lib/microcms";

export const revalidate = 300;

export default async function Home() {
  const announcements = await getMergedAnnouncements(3);

  return <RenewalHome initialAnnouncements={announcements} />;
}
