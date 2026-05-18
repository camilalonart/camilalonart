'use client';

import React from 'react';
import ArtExpNav from '../../components/artExperiences/ArtExpNav';
import HeroSection from '../../components/artExperiences/HeroSection';
import MyExperiencesSection from '../../components/artExperiences/MyExperiencesSection';
import CreativeCornerSection from '../../components/artExperiences/CreativeCornerSection';
import YouAndIPaintSection from '../../components/artExperiences/YouAndIPaintSection';
import UpcomingEventsSection from '../../components/artExperiences/UpcomingEventsSection';
import GalleryMemoriesSection from '../../components/artExperiences/GalleryMemoriesSection';
import ArtExpFooter from '../../components/artExperiences/ArtExpFooter';

export default function ArtExperiencesPage() {
  return (
    <>
      <ArtExpNav />
      <HeroSection />
      <MyExperiencesSection />
      <CreativeCornerSection />
      <YouAndIPaintSection />
      <UpcomingEventsSection />
      <GalleryMemoriesSection />
      <ArtExpFooter />
    </>
  );
}
