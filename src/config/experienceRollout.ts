type ExperienceFeature = 'editorialDiscovery' | 'photographyDiscovery' | 'serviceGuidance' | 'inclusiveForms' | 'monochromeOverlayTiles';

// Static exports require a rebuild and deployment after changing these controls.
// The owner approved enabling these experiences when the PR is merged.
export const experienceRollout: Record<ExperienceFeature, { flight: boolean; killSwitch: boolean }> = {
  editorialDiscovery: { flight: true, killSwitch: false },
  photographyDiscovery: { flight: true, killSwitch: false },
  serviceGuidance: { flight: true, killSwitch: false },
  inclusiveForms: { flight: true, killSwitch: false },
  // Homepage tiles: black-and-white photographs with overlaid titles; the kill switch restores the editorial color cards.
  monochromeOverlayTiles: { flight: true, killSwitch: false },
};

export function isExperienceEnabled(feature: ExperienceFeature): boolean {
  const control = experienceRollout[feature];
  return control.flight && !control.killSwitch;
}
