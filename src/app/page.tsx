import { RenewalHome } from "@/components/RenewalHome";
import { staticAnnouncements } from "@/data/static-content";

export default function Home() {
  return <RenewalHome initialAnnouncements={staticAnnouncements} />;
}
