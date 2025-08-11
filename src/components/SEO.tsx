// components/SEO.tsx
import Head from "next/head";
import { buildSEO, SEOProps } from "@/lib/seo";

export default function SEO(props: SEOProps) {
  const { title, description, image, url } = buildSEO(props);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Jogeu-market" />
    </Head>
  );
}
