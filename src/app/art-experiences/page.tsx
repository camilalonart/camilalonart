'use client';

import React from 'react';
import ArtExpNav from '../../components/artExperiences/ArtExpNav';
import HeroSection from '../../components/artExperiences/HeroSection';
import ThreeCardsSection from '../../components/artExperiences/ThreeCardsSection';
import UpcomingEventsSection from '../../components/artExperiences/UpcomingEventsSection';
import EventTypesSection from '../../components/artExperiences/EventTypesSection';
import ArtExpFooter from '../../components/artExperiences/ArtExpFooter';

export default function ArtExperiencesPage() {
  return (
    <>
      <ArtExpNav />
      <HeroSection />
      <ThreeCardsSection />
      <UpcomingEventsSection />
      <EventTypesSection />
      <ArtExpFooter />
    </>
  );
}
