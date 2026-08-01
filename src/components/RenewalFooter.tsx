import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { WaterLogoIcon } from "./WaterLogoIcon";

const footerLinks = [
  {
    title: "くらしの情報",
    links: [
      ["使用開始・中止の手続き", "/resident/procedure"],
      ["水道料金", "/resident/price"],
      ["水質情報", "/resident/quality"],
      ["よくある質問", "/resident/faq"],
    ],
  },
  {
    title: "事業者の方へ",
    links: [
      ["入札・契約情報", "/business/bidding"],
      ["指定給水装置工事事業者", "/business/designated-shops"],
      ["インボイス制度", "/business/invoice"],
    ],
  },
  {
    title: "企業団について",
    links: [
      ["企業団の概要", "/about/outline"],
      ["議会について", "/about/assembly"],
      ["財政情報", "/about/finance"],
      ["情報公開", "/about/disclosure"],
    ],
  },
];

export function RenewalFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#010d18] text-white">
      <div className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full border border-cyan-200/10" />
      <div className="absolute -right-20 -top-20 h-[320px] w-[320px] rounded-full border border-cyan-200/10" />

      <div className="mx-auto max-w-[1380px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-4">
              <span className="grid h-13 w-13 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
                <WaterLogoIcon className="h-7 w-7" />
              </span>
              <span>
                <span className="block text-xl font-bold tracking-[0.06em]">大井上水道企業団</span>
                <span className="mt-1 block text-[9px] tracking-[0.2em] text-white/40">
                  OOI WATER SUPPLY AUTHORITY
                </span>
              </span>
            </Link>
            <p className="mt-8 max-w-md text-sm leading-8 text-white/58">
              島田市（金谷地区）、牧之原市、菊川市の一部へ、
              安全で良質な水を安定してお届けします。
            </p>

            <div className="mt-8 space-y-3 text-sm text-white/62">
              <p className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                〒428-0013 静岡県島田市金谷東一丁目1255番地の2
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-cyan-200" />
                <a href="tel:0547-46-4130" className="hover:text-white">0547-46-4130</a>
              </p>
              <p className="flex items-center gap-3">
                <Clock3 className="h-4 w-4 text-cyan-200" />
                平日 8:30〜17:15
              </p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-bold tracking-[0.16em] text-cyan-200">{group.title}</h2>
                <ul className="mt-5 space-y-3.5">
                  {group.links.map(([label, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="group inline-flex items-center gap-1.5 text-sm text-white/58 transition-colors hover:text-white"
                      >
                        {label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-8 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} OOI WATER SUPPLY AUTHORITY</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="hover:text-white">個人情報保護方針</Link>
            <Link href="/terms" className="hover:text-white">利用規約</Link>
            <Link href="/sitemap" className="hover:text-white">サイトマップ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
