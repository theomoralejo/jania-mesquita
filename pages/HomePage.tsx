import React from 'react';

import { HeroHome } from '../components/HeroHome';
import { SocialProofHome } from '../components/SocialProofHome';
import { CompaniesLogos } from '../components/CompaniesLogos';
import { ServicesPreview } from '../components/ServicesPreview';
import { DiagnosticoForm } from '../components/DiagnosticoForm';
import { EventPhotos } from '../components/EventPhotos';
import { BlogSection } from '../components/BlogSection';

export default function HomePage() {
  return (
    <>
      <HeroHome />
      <SocialProofHome />
      <CompaniesLogos />
      <ServicesPreview />
      <EventPhotos />
      <BlogSection />
      <DiagnosticoForm />
    </>
  );
}