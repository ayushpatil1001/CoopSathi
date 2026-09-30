import React from 'react';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import SEOHead from '../components/SEOHead';
import { SEO_PAGES } from '../utils/seo';

export default function AuthorityConsole() {
  return (
    <>
      <SEOHead {...SEO_PAGES.home} title="Authority Console | CoopSathi AI" />
      <AdminDashboard />
    </>
  );
}
