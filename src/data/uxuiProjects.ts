// Add new projects here when folders are added to public/images/uxuidesign/
// - id: exact folder name (case-sensitive)
// - imageCount: number of img_x.webp files in the folder
// - descriptionEn / descriptionEs: optional short description (leave undefined to hide)

export interface UXUIProject {
  id: string;
  imageCount: number;
  descriptionEn?: string;
  descriptionEs?: string;
}

export const uxuiProjects: UXUIProject[] = [
  {
    id: 'Alfred',
    imageCount: 7,
    descriptionEn: 'Product screen design for Alfred, a Colombian company.',
    descriptionEs: 'Diseño de pantallas de producto para Alfred, una empresa colombiana.',
  },
  {
    id: 'Cleverlynk',
    imageCount: 2,
    descriptionEn: 'Designed everything for this Colombian startup — logo, branding, UX/UI, and product screens. Cleverlynk was later acquired by Rappi, Latin America\'s unicorn.',
    descriptionEs: 'Diseñé todo para esta startup colombiana: logotipo, identidad de marca, UX/UI y pantallas de producto. Más adelante, Cleverlynk fue adquirida por Rappi, el unicornio de Latinoamérica.',
  },
];
