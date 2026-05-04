import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ValueProposition from '@/components/home/ValueProposition';
import ServicesOverview from '@/components/home/ServicesOverview';
import PortfolioSection from '@/components/home/PortfolioSection';
import PortfolioHighlight from '@/components/home/PortfolioHighlight';
import HomeCTA from '@/components/home/HomeCTA';
import { sanityClient } from '@/lib/sanity';
import { homePageQuery, servicesQuery, portfolioQuery } from '@/lib/queries';
import type { HomePage, SanityService, SanityPortfolio } from '@/types';

export default async function HomePage() {
  let data: HomePage | null = null;
  let services: SanityService[] = [];
  let portfolios: SanityPortfolio[] = [];

  try {
    [data, services, portfolios] = await Promise.all([
      sanityClient.fetch<HomePage>(homePageQuery),
      sanityClient.fetch<SanityService[]>(servicesQuery),
      sanityClient.fetch<SanityPortfolio[]>(portfolioQuery),
    ]);
  } catch (error) {
    console.error('Failed to fetch home page data:', error);
  }

  return (
    <>
      <HeroSection hero={data?.hero} />
      <ValueProposition valueProps={data?.valueProps} />
      <ServicesOverview services={services} />
      <PortfolioSection portfolios={portfolios} />
      <PortfolioHighlight stats={data?.stats} />
      <HomeCTA cta={data?.cta} />
    </>
  );
}
