"use client";

import React from 'react';
import { notFound } from 'next/navigation';
import { getPageBySlug, PageContent } from '@/lib/microcms';
import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default function DynamicCustomPage({ params }: Props) {
  const [page, setPage] = React.useState<PageContent | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [slug, setSlug] = React.useState<string | null>(null);

  React.useEffect(() => {
    params.then(p => setSlug(p.slug));
  }, [params]);

  React.useEffect(() => {
    if (!slug) return;
    
    const fetchPage = async () => {
      try {
        const data = await getPageBySlug(slug);
        setPage(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen bg-slate-50 pt-32 text-center text-slate-400">読み込み中...</div>;
  }

  if (!page) {
    notFound();
  }



  return (
    <div className="min-h-screen pt-20 bg-slate-50/50">
      <PageHeader
        title={page.title}
        subtitle={page.subtitle || "大井上水道企業団からのお知らせ・ご案内"}
        enTitle={page.english_title || "Information"}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-slate-100 rounded-3xl p-6 md:p-12 shadow-premium"
        >

          {/* 本文コンテンツ */}
          <div 
            className="rich-text-content max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />

          {/* 問い合わせ・注意書きフッター（共通） */}
          <div className="mt-16 pt-10 border-t border-slate-100">
            <div className="bg-slate-50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2.5 rounded-xl shadow-sm">
                  <Info className="text-primary-main w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary-deep">このページに関するお問い合わせ</p>
                  <p className="text-xs text-slate-500">ご不明な点がございましたらお電話にてお問い合わせください。</p>
                </div>
              </div>
              <a 
                href="tel:0547-46-4130" 
                className="whitespace-nowrap bg-white border border-slate-200 text-primary-deep font-black px-6 py-3 rounded-xl hover:border-primary-main hover:text-primary-main transition-all shadow-sm"
              >
                0547-46-4130
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
