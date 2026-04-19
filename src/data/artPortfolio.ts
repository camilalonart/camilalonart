export interface Painting {
  id: string;
  title: string;
  materials: string;
  size: string;
  year: number;
  images: string[];
  thoughts?: string;
}

export interface Collection {
  id: string;
  name: string;
  period: string;
  description: string;
  paintings: Painting[];
}

export interface ArtPortfolioData {
  collections: Collection[];
  otherProjects: Painting[];
  about: {
    bio: string[];
    instagram1Url: string;
    instagram1Handle: string;
    instagram2Url: string;
    instagram2Handle: string;
    photoSrc?: string;
  };
}

// ─── FILL IN YOUR DATA BELOW ────────────────────────────────────────────────
// images: paths relative to /public — e.g. "/images/traditional-art/painting.jpg"
// For multiple images of the same painting, add more paths to the images array.
// thoughts: optional artist statement shown in the modal (can be multi-sentence).

const data: ArtPortfolioData = {
  about: {
    bio: [
      "Camila Londoño is a Colombian painter and multidisciplinary artist whose work explores the intersection of memory, nature, and the human experience.",
      "Working across oil, watercolor, and mixed media, each piece is a meditation — a search for stillness within the visible world. Her collections emerge from specific seasons of life, travel, and observation.",
      "Based between Colombia and the United States, Camila divides her practice between the studio and the field, finding subjects in landscapes, people, and the overlooked textures of daily life.",
    ],
    instagram1Url: "https://www.instagram.com/camilalonart",
    instagram1Handle: "@camilalonart",
    instagram2Url: "https://www.instagram.com/camilonart",
    instagram2Handle: "@camilonart",
    photoSrc: "/images/traditional-art/artist-portrait.jpg",  // ← optional: your photo
  },

  collections: [
    {
      id: "silencio",
      name: "Silencio",
      period: "2023–2024",
      description:
        "A series born from a month of solitude in the mountains. These paintings are about what remains when noise stops — the quality of light at dusk, the weight of still water, the sound of nothing.",
      paintings: [
        {
          id: "silencio-01",
          title: "Autumn Reflections",
          materials: "Oil on linen",
          size: '60 × 80 cm',
          year: 2023,
          images: ["/images/traditional-art/autumn.jpg"],
          thoughts:
            "I painted this over three evenings. Each time the light changed and I had to decide whether to chase it or let it go. I let it go. What stayed is what you see.",
        },
        {
          id: "silencio-02",
          title: "Still Water I",
          materials: "Oil on canvas",
          size: '40 × 60 cm',
          year: 2023,
          images: ["/images/traditional-art/mixed-media.jpg"],
          thoughts:
            "There is a kind of looking that does not consume. I wanted this painting to hold that quality.",
        },
        {
          id: "silencio-03",
          title: "The Hour Before",
          materials: "Watercolor on Arches paper",
          size: '50 × 70 cm',
          year: 2024,
          images: ["/images/traditional-art/urban-watercolor.jpg"],
        },
      ],
    },
    {
      id: "urban-series",
      name: "Urban Series",
      period: "2022–2023",
      description:
        "City life rendered in loose, immediate mark-making. These works were made quickly — the city doesn't wait. The urgency is part of the work.",
      paintings: [
        {
          id: "urban-01",
          title: "Urban Watercolor I",
          materials: "Watercolor on cold-press paper",
          size: '30 × 40 cm',
          year: 2022,
          images: ["/images/traditional-art/urban-watercolor.jpg"],
          thoughts:
            "I carried this sketchbook everywhere for six months. This particular street corner appeared three times in different cities. I only realized that later.",
        },
        {
          id: "urban-02",
          title: "Study in Motion",
          materials: "Ink and wash",
          size: '20 × 30 cm',
          year: 2023,
          images: ["/images/traditional-art/mixed-media.jpg"],
        },
      ],
    },
  ],

  otherProjects: [
    {
      id: "other-01",
      title: "Mixed Media Exploration",
      materials: "Acrylics, charcoal, oil pastel",
      size: '76 × 102 cm',
      year: 2023,
      images: ["/images/traditional-art/mixed-media.jpg"],
      thoughts:
        "An experiment I kept returning to. I don't know if it's finished — maybe that's the point.",
    },
    {
      id: "other-02",
      title: "Sketchbook Study",
      materials: "Graphite on paper",
      size: '21 × 29 cm',
      year: 2022,
      images: ["/images/traditional-art/autumn.jpg"],
    },
  ],
};

export default data;
