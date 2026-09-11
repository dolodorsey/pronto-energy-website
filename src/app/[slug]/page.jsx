import { notFound } from 'next/navigation';
import { EditorialPage } from '@/components/EditorialPage';
import { sitePages } from '@/lib/site-pages';

export function generateStaticParams() {
  return Object.keys(sitePages).map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = sitePages[slug];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    keywords: ['Pronto Energy', page.eyebrow, page.title],
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: `${page.title} — Pronto Energy`,
      description: page.description,
      type: 'website',
      url: `/${slug}`,
      images: [{ url: page.hero, alt: `${page.title} — Pronto Energy` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} — Pronto Energy`,
      description: page.description,
      images: [page.hero],
    },
  };
}

export default async function InformationPage({ params }) {
  const { slug } = await params;
  const page = sitePages[slug];
  if (!page) notFound();
  return <EditorialPage page={page} slug={slug} />;
}
