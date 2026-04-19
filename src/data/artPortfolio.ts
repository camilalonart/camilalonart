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
    photoSrc: "/images/traditional-art/artist-portrait.jpg",
  },

  collections: [
    {
      id: "carrying-home",
      name: "Carrying Home",
      period: "2024",
      description:
        "A meditation on displacement, belonging, and the weight of what we carry with us. These works explore the space between leaving and arriving, between home and journey.",
      paintings: [
        {
          id: "carrying-home-01",
          title: "Carrying Home",
          materials: "Mixed media on paper",
          size: "Variable",
          year: 2024,
          images: [
            "/images/art/traditionalArt/Carrying Home/CarryingHome.webp",
            "/images/art/traditionalArt/Carrying Home/Details/A7T02372.webp",
            "/images/art/traditionalArt/Carrying Home/Details/A7T06893 copy.webp",
            "/images/art/traditionalArt/Carrying Home/Details/A7T06900 copy.webp",
            "/images/art/traditionalArt/Carrying Home/Details/A7T06901 2 copy.webp",
            "/images/art/traditionalArt/Carrying Home/Details/A7T06901 copy 2.webp",
            "/images/art/traditionalArt/Carrying Home/Details/IMG_0986.webp",
            "/images/art/traditionalArt/Carrying Home/Details/IMG_2345 copy.webp",
          ],
          thoughts:
            "The details speak louder than the whole. Each fragment holds memory — the work documents not just the painting but the space it occupies.",
        },
        {
          id: "carrying-home-02",
          title: "In Transit",
          materials: "Oil on canvas",
          size: "100 × 140 cm",
          year: 2024,
          images: ["/images/art/traditionalArt/Carrying Home/InTransit.webp"],
        },
        {
          id: "carrying-home-03",
          title: "Moving",
          materials: "Watercolor on paper",
          size: "76 × 56 cm",
          year: 2024,
          images: ["/images/art/traditionalArt/Carrying Home/Moving.webp"],
        },
        {
          id: "carrying-home-04",
          title: "We",
          materials: "Mixed media",
          size: "80 × 120 cm",
          year: 2024,
          images: ["/images/art/traditionalArt/Carrying Home/We.webp"],
        },
        {
          id: "carrying-home-05",
          title: "Holding Departure",
          materials: "Oil on linen",
          size: "60 × 90 cm",
          year: 2024,
          images: ["/images/art/traditionalArt/Carrying Home/HoldingDeparture.webp"],
        },
      ],
    },
    {
      id: "dear-inner-child",
      name: "Dear Inner Child",
      period: "2023",
      description:
        "A series of conversations with earlier versions of ourselves. Each painting is a letter, a question, a remembrance of the person we were before the world taught us how to be.",
      paintings: [
        {
          id: "dear-inner-child-01",
          title: "Adventurous",
          materials: "Oil and ink on canvas",
          size: "50 × 50 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Dear Inner Child/Adventurous.webp"],
        },
        {
          id: "dear-inner-child-02",
          title: "Curious",
          materials: "Watercolor and graphite",
          size: "45 × 45 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Dear Inner Child/Curious.webp"],
        },
        {
          id: "dear-inner-child-03",
          title: "Creative",
          materials: "Mixed media on paper",
          size: "55 × 55 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Dear Inner Child/Creative.webp"],
        },
        {
          id: "dear-inner-child-04",
          title: "Kind",
          materials: "Oil on canvas",
          size: "50 × 50 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Dear Inner Child/Kind.webp"],
        },
        {
          id: "dear-inner-child-05",
          title: "Loyal",
          materials: "Acrylic and collage",
          size: "50 × 50 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Dear Inner Child/Loyal.webp"],
        },
      ],
    },
    {
      id: "magic",
      name: "Magic",
      period: "2023–2024",
      description:
        "Where realism meets reverie. These works capture moments that feel suspended between the possible and the impossible, finding wonder in ordinary spaces.",
      paintings: [
        {
          id: "magic-01",
          title: "Luthier",
          materials: "Oil on canvas",
          size: "70 × 90 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Magic/Luthier.webp"],
          thoughts:
            "The craft of making something whole from broken pieces. A portrait of creation itself.",
        },
        {
          id: "magic-02",
          title: "Winter Dance",
          materials: "Watercolor on Arches",
          size: "56 × 76 cm",
          year: 2024,
          images: ["/images/art/traditionalArt/Magic/WinterDance.webp"],
        },
        {
          id: "magic-03",
          title: "Drawing in a Tub",
          materials: "Mixed media",
          size: "60 × 80 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Magic/DrawningInATub.webp"],
        },
        {
          id: "magic-04",
          title: "Connection",
          materials: "Oil and graphite",
          size: "65 × 85 cm",
          year: 2024,
          images: ["/images/art/traditionalArt/Magic/Connection.webp"],
        },
        {
          id: "magic-05",
          title: "First Times",
          materials: "Watercolor",
          size: "55 × 75 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Magic/FirstTimes.webp"],
        },
      ],
    },
    {
      id: "the-essential-is-invisible",
      name: "The Essential is Invisible (Red)",
      period: "2022–2023",
      description:
        "A suite of works exploring emotional intensity, complexity, and the hidden depths beneath surface appearances. Red as both passion and sorrow.",
      paintings: [
        {
          id: "essential-01",
          title: "First Love",
          materials: "Oil on canvas",
          size: "70 × 90 cm",
          year: 2022,
          images: ["/images/art/traditionalArt/The essential is invisible (Red)/FirstLove.webp"],
        },
        {
          id: "essential-02",
          title: "Crush",
          materials: "Mixed media",
          size: "60 × 80 cm",
          year: 2022,
          images: ["/images/art/traditionalArt/The essential is invisible (Red)/Crush.webp"],
        },
        {
          id: "essential-03",
          title: "I Want You",
          materials: "Oil and collage",
          size: "65 × 85 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/The essential is invisible (Red)/IWantYou.webp"],
        },
        {
          id: "essential-04",
          title: "The First One I Actually Liked",
          materials: "Watercolor on paper",
          size: "56 × 76 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/The essential is invisible (Red)/TheFirstOneIActuallyLiked.webp"],
        },
        {
          id: "essential-05",
          title: "Enough",
          materials: "Oil on linen",
          size: "70 × 100 cm",
          year: 2022,
          images: ["/images/art/traditionalArt/The essential is invisible (Red)/Enough.webp"],
        },
        {
          id: "essential-06",
          title: "Cautious",
          materials: "Mixed media",
          size: "60 × 80 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/The essential is invisible (Red)/Cautious.webp"],
        },
        {
          id: "essential-07",
          title: "Little Prince",
          materials: "Ink and watercolor",
          size: "50 × 70 cm",
          year: 2022,
          images: ["/images/art/traditionalArt/The essential is invisible (Red)/LittlePrince.webp"],
        },
        {
          id: "essential-08",
          title: "It Didn't Turn Out As Expected",
          materials: "Oil and acrylic",
          size: "65 × 90 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/The essential is invisible (Red)/ItDidntTurnOutAsExpected.webp"],
        },
        {
          id: "essential-09",
          title: "Engineering is Beautiful",
          materials: "Mixed media on paper",
          size: "55 × 75 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/The essential is invisible (Red)/EngineeringIsBeautiful.webp"],
        },
        {
          id: "essential-10",
          title: "Carlos Veracierta",
          materials: "Oil on canvas",
          size: "70 × 100 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/The essential is invisible (Red)/CarlosVeracierta.webp"],
        },
      ],
    },
    {
      id: "siempre-vuelvo",
      name: "Siempre vuelvo a esta versión de mi",
      period: "2023",
      description:
        "An exploration of identity, duality, and the versions of ourselves we return to again and again. A dialogue with persistence and change.",
      paintings: [
        {
          id: "siempre-01",
          title: "Calculus",
          materials: "Oil on canvas",
          size: "70 × 90 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Siempre vuelvo a esta version de mi/Calculus.webp"],
        },
        {
          id: "siempre-02",
          title: "Camouflage",
          materials: "Mixed media",
          size: "65 × 85 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Siempre vuelvo a esta version de mi/Camouflage.webp"],
        },
        {
          id: "siempre-03",
          title: "Domesticated",
          materials: "Watercolor and ink",
          size: "55 × 75 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Siempre vuelvo a esta version de mi/Domesticated.webp"],
        },
        {
          id: "siempre-04",
          title: "Engineering Epistemology",
          materials: "Oil and collage",
          size: "70 × 95 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Siempre vuelvo a esta version de mi/EngineeringEpistemology.webp"],
        },
        {
          id: "siempre-05",
          title: "Take Me Back to 2016",
          materials: "Mixed media on paper",
          size: "60 × 80 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Siempre vuelvo a esta version de mi/TakeMeBackTo2016.webp"],
          thoughts:
            "A nostalgic invocation. What would we tell that version of ourselves? What do we wish we had known?",
        },
        {
          id: "siempre-06",
          title: "Tragic Politics",
          materials: "Oil on linen",
          size: "75 × 100 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Siempre vuelvo a esta version de mi/TragicPolitics.webp"],
        },
      ],
    },
    {
      id: "in-your-eyes",
      name: "In Your Eyes",
      period: "2023",
      description:
        "Portraiture as a meditation on connection. Each face is a map of what we find when we truly look at another person.",
      paintings: [
        {
          id: "in-your-eyes-01",
          title: "My Family",
          materials: "Oil on canvas",
          size: "80 × 100 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/In Your Eyes/MyFamily.webp"],
        },
        {
          id: "in-your-eyes-02",
          title: "Discovering Myself",
          materials: "Mixed media",
          size: "70 × 90 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/In Your Eyes/DiscoveringMyself.webp"],
        },
        {
          id: "in-your-eyes-03",
          title: "Navigate",
          materials: "Oil and watercolor",
          size: "75 × 95 cm",
          year: 2023,
          images: [
            "/images/art/traditionalArt/In Your Eyes/Navigate.webp",
            "/images/art/traditionalArt/In Your Eyes/NavigateCloseup.webp",
          ],
          thoughts:
            "A large-scale figure study with intimate detail. The closeup reveals what the distance conceals.",
        },
        {
          id: "in-your-eyes-04",
          title: "Starry Eye",
          materials: "Watercolor on paper",
          size: "56 × 76 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/In Your Eyes/StarryEye.webp"],
        },
      ],
    },
    {
      id: "yellow",
      name: "Yellow",
      period: "2022–2023",
      description:
        "A celebration of warmth, hope, and the transformative power of light. These works embrace joy as a form of resistance.",
      paintings: [
        {
          id: "yellow-01",
          title: "Contigo",
          materials: "Oil on canvas",
          size: "70 × 90 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Yellow/Contigo.webp"],
        },
        {
          id: "yellow-02",
          title: "Don't Go",
          materials: "Mixed media",
          size: "60 × 80 cm",
          year: 2022,
          images: ["/images/art/traditionalArt/Yellow/DontGo.webp"],
        },
        {
          id: "yellow-03",
          title: "Escultura",
          materials: "Acrylic and collage",
          size: "65 × 85 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Yellow/Escultura.webp"],
        },
        {
          id: "yellow-04",
          title: "Fractal",
          materials: "Oil and ink",
          size: "70 × 100 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Yellow/Fractal.webp"],
        },
        {
          id: "yellow-05",
          title: "Sweet Dreams",
          materials: "Watercolor on Arches",
          size: "55 × 75 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Yellow/SweetDreams.webp"],
        },
      ],
    },
    {
      id: "start-over",
      name: "Start Over",
      period: "2022–2023",
      description:
        "A narrative series documenting a journey through landscape and memory. Drawings and paintings that ask what it means to begin again.",
      paintings: [
        {
          id: "start-over-01",
          title: "Viaje a Canada - Part 1",
          materials: "Watercolor and graphite",
          size: "56 × 76 cm",
          year: 2022,
          images: ["/images/art/traditionalArt/StartOver/Viaje a Canada Part 1.webp"],
        },
        {
          id: "start-over-02",
          title: "Viaje a Canada - Part 2",
          materials: "Mixed media on paper",
          size: "56 × 76 cm",
          year: 2022,
          images: ["/images/art/traditionalArt/StartOver/Viaje a Canada Part 2.webp"],
        },
        {
          id: "start-over-03",
          title: "Viaje a Canada - Part 6",
          materials: "Watercolor",
          size: "56 × 76 cm",
          year: 2022,
          images: ["/images/art/traditionalArt/StartOver/Viaje a Canada Part 6.webp"],
        },
        {
          id: "start-over-04",
          title: "Viaje a Canada - Drawing",
          materials: "Graphite on paper",
          size: "50 × 70 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/StartOver/Viaje a Canada Dibujo.webp"],
        },
        {
          id: "start-over-05",
          title: "Viaje a Canada - Drawing Detail",
          materials: "Graphite and ink",
          size: "A4",
          year: 2023,
          images: ["/images/art/traditionalArt/StartOver/Viaje a Canada Dibujo Detalle.webp"],
        },
      ],
    },
    {
      id: "perspective",
      name: "Perspective",
      period: "2022–2023",
      description:
        "Small studies on the nature of point of view. Each painting asks: whose perspective am I seeing? What changes when we shift our vantage point?",
      paintings: [
        {
          id: "perspective-01",
          title: "Why Not",
          materials: "Oil on canvas",
          size: "40 × 50 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Perspective/WhyNot.webp"],
        },
        {
          id: "perspective-02",
          title: "Not as Naive",
          materials: "Watercolor on paper",
          size: "35 × 45 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Perspective/NotAsNaive.webp"],
        },
        {
          id: "perspective-03",
          title: "First Attempt",
          materials: "Mixed media",
          size: "45 × 55 cm",
          year: 2022,
          images: ["/images/art/traditionalArt/Perspective/FirstAttempt.webp"],
        },
        {
          id: "perspective-04",
          title: "Don't Take it Too Seriously",
          materials: "Oil and ink",
          size: "50 × 60 cm",
          year: 2023,
          images: ["/images/art/traditionalArt/Perspective/DontTakeItTooSeriously.webp"],
        },
      ],
    },
    {
      id: "pandemic-lockdown",
      name: "Pandemic Lockdown",
      period: "2020",
      description:
        "Works created during isolation. A documentation of interior life, and the way confinement can sharpen perception.",
      paintings: [
        {
          id: "pandemic-01",
          title: "Cuarentena",
          materials: "Oil on canvas",
          size: "60 × 80 cm",
          year: 2020,
          images: ["/images/art/traditionalArt/Pandemic Lockdown/Cuarentena.webp"],
        },
        {
          id: "pandemic-02",
          title: "A través de mi Ventana",
          materials: "Mixed media",
          size: "56 × 76 cm",
          year: 2020,
          images: ["/images/art/traditionalArt/Pandemic Lockdown/AtravesDeMiVentana.webp"],
        },
        {
          id: "pandemic-03",
          title: "En un Rincón de mi Mente",
          materials: "Watercolor on paper",
          size: "50 × 70 cm",
          year: 2020,
          images: ["/images/art/traditionalArt/Pandemic Lockdown/EnUnRinconDeMiMente.webp"],
        },
        {
          id: "pandemic-04",
          title: "Pandemic",
          materials: "Oil and acrylic",
          size: "65 × 85 cm",
          year: 2020,
          images: ["/images/art/traditionalArt/Pandemic Lockdown/Pandemic.webp"],
        },
      ],
    },
    {
      id: "mis-raices",
      name: "Mis Raíces",
      period: "2021–2022",
      description:
        "A return to origins. Works celebrating family, landscape, and the birds that inhabit the mountains of Colombia.",
      paintings: [
        {
          id: "mis-raices-01",
          title: "Aves del Quindío",
          materials: "Oil on linen",
          size: "70 × 90 cm",
          year: 2022,
          images: ["/images/art/traditionalArt/Mis Raices/AvesDelQuindio.webp"],
        },
        {
          id: "mis-raices-02",
          title: "Aves del Quindío (Framed)",
          materials: "Oil on linen",
          size: "70 × 90 cm",
          year: 2022,
          images: ["/images/art/traditionalArt/Mis Raices/AvesDelQuindio_framed.webp"],
        },
        {
          id: "mis-raices-03",
          title: "Paola",
          materials: "Oil on canvas",
          size: "60 × 80 cm",
          year: 2021,
          images: ["/images/art/traditionalArt/Mis Raices/Paola.webp"],
          thoughts:
            "A portrait of family, of the women who shaped me, of the landscape they carry within.",
        },
      ],
    },
    {
      id: "blanco-y-negro",
      name: "Blanco y Negro",
      period: "2021",
      description:
        "Studies in contrast and simplicity. Black and white as a way to strip down to essence, to find form in its purest state.",
      paintings: [
        {
          id: "blanco-negro-01",
          title: "Volver",
          materials: "Graphite and ink",
          size: "50 × 70 cm",
          year: 2021,
          images: ["/images/art/traditionalArt/Blanco y Negro/Volver.webp"],
        },
        {
          id: "blanco-negro-02",
          title: "Jane G.",
          materials: "Ink on paper",
          size: "45 × 65 cm",
          year: 2021,
          images: ["/images/art/traditionalArt/Blanco y Negro/JaneG.webp"],
        },
        {
          id: "blanco-negro-03",
          title: "Intento de Puntillismo",
          materials: "Graphite and ink",
          size: "55 × 75 cm",
          year: 2021,
          images: ["/images/art/traditionalArt/Blanco y Negro/IntentoDePuntillismo1.webp"],
        },
      ],
    },
    {
      id: "red-doodles",
      name: "Red Doodles",
      period: "2021",
      description:
        "Spontaneous marks and studies. Sketchbook pages that celebrate the joy of line and color without the weight of intention.",
      paintings: [
        {
          id: "red-doodles-01",
          title: "AWS Notes 1",
          materials: "Marker and ink on paper",
          size: "Various",
          year: 2021,
          images: ["/images/art/traditionalArt/Red Doodles/AWSnotes1.webp"],
        },
        {
          id: "red-doodles-02",
          title: "AWS Notes 2",
          materials: "Marker and ink on paper",
          size: "Various",
          year: 2021,
          images: ["/images/art/traditionalArt/Red Doodles/AWSnotes2.webp"],
        },
        {
          id: "red-doodles-03",
          title: "AWS Notes 3",
          materials: "Marker and ink on paper",
          size: "Various",
          year: 2021,
          images: ["/images/art/traditionalArt/Red Doodles/AWSnotes3.webp"],
        },
      ],
    },
  ],

  otherProjects: [],
};

export default data;
