import React from 'react';
// @ts-ignore — react-helmet-async v2 is compatible with React 19 at runtime
import { Helmet } from 'react-helmet-async';
import type { SEOConfig } from '../utils/seo';
import { BASE_OG_IMAGE, BASE_SITE_NAME } from '../utils/seo';

interface SEOHeadProps extends SEOConfig {}

export default function SEOHead({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  schemaType = 'WebPage',
  faqItems = [],
}: SEOHeadProps) {
  const resolvedOgTitle = ogTitle || title;
  const resolvedOgDesc = ogDescription || description;

  // Build JSON-LD schema
  const buildSchema = () => {
    if (schemaType === 'FAQPage' && faqItems.length > 0) {
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        name: title,
        url: canonical,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      };
    }

    if (schemaType === 'GovernmentService') {
      return {
        '@context': 'https://schema.org',
        '@type': 'GovernmentService',
        name: title,
        description: description,
        url: canonical,
        provider: {
          '@type': 'GovernmentOrganization',
          name: 'Ministry of Cooperation, Government of India',
        },
        areaServed: { '@type': 'Country', name: 'India' },
      };
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description: description,
      url: canonical,
      isPartOf: {
        '@type': 'WebSite',
        name: BASE_SITE_NAME,
        url: 'https://coopsathi.gov.in',
      },
      publisher: {
        '@type': 'GovernmentOrganization',
        name: 'Ministry of Cooperation, Government of India',
        url: 'https://cooperation.gov.in',
      },
    };
  };

  const schema = buildSchema();

  return (
    // @ts-ignore
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDesc} />
      <meta property="og:image" content={BASE_OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content={BASE_SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDesc} />
      <meta name="twitter:image" content={BASE_OG_IMAGE} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    {/* @ts-ignore */}
    </Helmet>
  );
}
