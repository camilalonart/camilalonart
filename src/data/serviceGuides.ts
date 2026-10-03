import type { Locale } from '@/i18n/routing';

export type ServiceGuideId = 'pets' | 'family' | 'headshots' | 'wedding' | 'ux' | 'experiences' | 'collector' | 'wildlife';

interface GuidePoint {
  title: string;
  text: string;
}

interface GuideCopy {
  eyebrow: string;
  title: string;
  intro: string;
  steps: [GuidePoint, GuidePoint, GuidePoint];
  questions: [GuidePoint, GuidePoint];
  action: string;
  subject: string;
  prompts: string[];
  links: { label: string; href: string }[];
}

export const serviceGuideLabels: Record<Locale, { questions: string; emailNote: string }> = {
  en: {
    questions: 'A little more guidance',
    emailNote: 'Opens an editable draft in your email app. Nothing is sent or booked here.',
  },
  es: {
    questions: 'Un poco más de orientación',
    emailNote: 'Abre un borrador editable en tu aplicación de correo. Aquí no se envía ni se reserva nada.',
  },
};

export const serviceGuides: Record<ServiceGuideId, Record<Locale, GuideCopy>> = {
  pets: {
    en: {
      eyebrow: 'Their personality, their pace',
      title: 'Plan around the pet you know best.',
      intro: 'A familiar space or a favourite outdoor spot? Start with where your companion feels most at ease.',
      steps: [
        { title: 'Choose a setting', text: 'Consider home for familiar surroundings, or outdoors if your pet enjoys exploring.' },
        { title: 'Keep it familiar', text: 'Have a favourite toy, suitable treats and their usual leash ready. Share any sensitivities before planning.' },
        { title: 'Tell me about them', text: 'Include the number of pets, their personalities, your area and whether you would like to appear together.' },
      ],
      questions: [
        { title: 'What if my pet is shy or energetic?', text: 'Describe what helps them settle and what they prefer to avoid, so we can discuss a suitable setting without forcing a particular pose.' },
        { title: 'Interested in a photobook?', text: 'Mention whether you have existing photographs or want a book from a new session. Ask about the options before choosing.' },
      ],
      action: 'Talk about your pet',
      subject: 'Pet photography — planning a session',
      prompts: ['Pets and personalities:', 'At home or outdoors / preferred area:', 'People joining the photos:', 'Preferred dates or flexibility:', 'Comfort needs / photobook questions:'],
      links: [{ label: 'Explore the pet gallery', href: '/photography/pets/gallery' }],
    },
    es: {
      eyebrow: 'Su personalidad, su ritmo',
      title: 'Pensemos en lo que hace sentir bien a tu mascota.',
      intro: '¿En casa o en su lugar favorito al aire libre? Empecemos por donde tu compañero se sienta más cómodo.',
      steps: [
        { title: 'Elige un entorno', text: 'Piensa en casa si prefiere lo conocido, o al aire libre si disfruta explorar.' },
        { title: 'Ten a mano lo familiar', text: 'Prepara su juguete favorito, premios adecuados y su correa habitual. Cuéntame qué le incomoda antes de planear.' },
        { title: 'Cuéntame sobre tu mascota', text: 'Incluye cuántas mascotas son, sus personalidades, tu zona y si quieres aparecer en las fotos.' },
      ],
      questions: [
        { title: '¿Y si es tímida o tiene mucha energía?', text: 'Cuéntame qué le ayuda a relajarse y qué prefiere evitar. Así podemos hablar de un entorno adecuado sin forzar una pose.' },
        { title: '¿Te interesa un fotolibro?', text: 'Indica si tienes fotografías o si quieres un libro de una nueva sesión. Pregunta por las opciones antes de elegir.' },
      ],
      action: 'Hablemos de tu mascota',
      subject: 'Fotografía de mascotas — planear una sesión',
      prompts: ['Mascotas y personalidades:', 'En casa o al aire libre / zona preferida:', 'Personas que saldrían en las fotos:', 'Fechas preferidas o flexibilidad:', 'Necesidades de comodidad / preguntas sobre fotolibros:'],
      links: [{ label: 'Explora la galería de mascotas', href: '/photography/pets/gallery' }],
    },
  },
  family: {
    en: {
      eyebrow: 'Room to be yourselves',
      title: 'Begin with the moment you want to remember.',
      intro: 'Maternity, a new baby or time together: the starting point is your family, not a perfect pose.',
      steps: [
        { title: 'Name the chapter', text: 'Tell me whether this is maternity, newborn or family photography, and who will join.' },
        { title: 'Plan for comfort', text: 'Think about comfortable clothing, feeding or rest breaks, and a space that feels familiar.' },
        { title: 'Share your rhythm', text: 'Include your area, preferred dates and children’s ages. Mention any practical needs you want us to plan around.' },
      ],
      questions: [
        { title: 'Unsure when to plan a maternity or newborn session?', text: 'Share your preferred window and ask about timing before making a booking. You do not need to include medical information.' },
        { title: 'What if children need a break?', text: 'Tell me about their usual routine and what helps them feel comfortable. Include siblings or other family members in the planning conversation.' },
      ],
      action: 'Plan your family session',
      subject: 'Family / maternity photography inquiry',
      prompts: ['Maternity, newborn or family:', 'Who would join / children’s ages:', 'Preferred date window:', 'Area and preferred setting:', 'Comfort needs and questions:'],
      links: [{ label: 'See family photographs', href: '/photography/family-maternity/gallery' }],
    },
    es: {
      eyebrow: 'Espacio para ser ustedes',
      title: 'Empieza por el momento que quieres recordar.',
      intro: 'El embarazo, un nuevo bebé o tiempo juntos: el punto de partida es tu familia, no una pose perfecta.',
      steps: [
        { title: 'Cuéntame la etapa', text: 'Indica si buscas fotografías de maternidad, recién nacido o familia, y quiénes participarían.' },
        { title: 'Prioriza la comodidad', text: 'Piensa en ropa cómoda, pausas para comer o descansar y un espacio que les resulte familiar.' },
        { title: 'Comparte su ritmo', text: 'Incluye tu zona, fechas preferidas y edades de los niños. Menciona las necesidades prácticas que quieras tener en cuenta.' },
      ],
      questions: [
        { title: '¿No sabes cuándo planear la sesión?', text: 'Comparte el período que prefieres y pregunta por el momento adecuado antes de reservar. No necesitas incluir información médica.' },
        { title: '¿Y si los niños necesitan una pausa?', text: 'Cuéntame su rutina y qué les ayuda a sentirse cómodos. Incluye a los hermanos y otros familiares en la conversación.' },
      ],
      action: 'Planeemos tu sesión familiar',
      subject: 'Consulta de fotografía familiar / maternidad',
      prompts: ['Maternidad, recién nacido o familia:', 'Quiénes participarían / edades de los niños:', 'Período de fechas preferido:', 'Zona y entorno preferido:', 'Necesidades de comodidad y preguntas:'],
      links: [{ label: 'Mira las fotografías familiares', href: '/photography/family-maternity/gallery' }],
    },
  },
  headshots: {
    en: {
      eyebrow: 'A portrait with a purpose',
      title: 'Decide where your portrait needs to work.',
      intro: 'A profile, a company website or a creative portfolio each calls for a different first impression.',
      steps: [
        { title: 'Choose the direction', text: 'Compare a plain background with a more creative portrait. Bring a reference for the feeling, not a pose to copy.' },
        { title: 'Prepare for the crop', text: 'Check where the image will appear. Note square, vertical or horizontal formats, and choose clothing that fits your work.' },
        { title: 'Send a useful brief', text: 'Include the intended use, number of people, preferred dates and any brand or background requirements.' },
      ],
      questions: [
        { title: 'Not sure which option fits?', text: 'Share the page or profile where the portrait will appear and the impression you want to make. We can discuss the background before you choose.' },
        { title: 'Have a team or a specific usage requirement?', text: 'Mention the headcount, location, image formats and intended publication. Ask which arrangements and usage terms fit your project.' },
      ],
      action: 'Discuss your headshot',
      subject: 'Headshot inquiry — purpose and direction',
      prompts: ['Portrait use / audience:', 'Plain background or creative direction:', 'Number of people / location:', 'Preferred dates:', 'Brand, crop and usage requirements:'],
      links: [],
    },
    es: {
      eyebrow: 'Un retrato con propósito',
      title: 'Piensa dónde va a vivir tu retrato.',
      intro: 'Un perfil, la web de una empresa o un portafolio creativo necesitan una primera impresión diferente.',
      steps: [
        { title: 'Elige una dirección', text: 'Compara un fondo sencillo con un retrato más creativo. Trae una referencia de la sensación que buscas, no una pose que copiar.' },
        { title: 'Piensa en el encuadre', text: 'Revisa dónde aparecerá la imagen. Anota si necesitas formato cuadrado, vertical u horizontal y elige ropa acorde con tu trabajo.' },
        { title: 'Envía un contexto útil', text: 'Incluye el uso previsto, número de personas, fechas preferidas y requisitos de marca o fondo.' },
      ],
      questions: [
        { title: '¿No sabes qué opción elegir?', text: 'Comparte la página o perfil donde usarás el retrato y la impresión que quieres dar. Podemos hablar del fondo antes de elegir.' },
        { title: '¿Es para un equipo o un uso específico?', text: 'Menciona cuántas personas son, el lugar, los formatos y dónde se publicará. Pregunta por las condiciones de uso y los detalles de tu proyecto.' },
      ],
      action: 'Hablemos de tu retrato',
      subject: 'Consulta de retrato profesional — propósito y dirección',
      prompts: ['Uso del retrato / público:', 'Fondo sencillo o dirección creativa:', 'Número de personas / lugar:', 'Fechas preferidas:', 'Requisitos de marca, encuadre y uso:'],
      links: [],
    },
  },
  wedding: {
    en: {
      eyebrow: 'Your story, thoughtfully planned',
      title: 'Make space for what matters to you.',
      intro: 'A couple’s session and a wedding day tell different stories. Start with the moments you want to hold onto.',
      steps: [
        { title: 'Choose your story', text: 'Say whether you are planning a couple’s session, an engagement or wedding coverage.' },
        { title: 'Gather the essentials', text: 'Note your date or date range, location and a rough timeline. Mark the people and moments you do not want to miss.' },
        { title: 'Start the conversation', text: 'Share what is confirmed and what is still open, plus the coverage or photobook options you are considering.' },
      ],
      questions: [
        { title: 'Still working out the timeline?', text: 'Send what you know and flag the open questions. For a wedding, mention ceremony and reception locations so the conversation includes travel between them.' },
        { title: 'Does an inquiry reserve our date?', text: 'No. Use the inquiry to ask about availability and the next steps for confirming a booking.' },
      ],
      action: 'Tell me about your plans',
      subject: 'Wedding / couples photography — our plans',
      prompts: ['Couples, engagement or wedding:', 'Date or date range:', 'Location(s) / venue:', 'Rough timeline and coverage interests:', 'People and moments that matter:', 'Questions / photobook interest:'],
      links: [{ label: 'Explore wedding & couples photographs', href: '/photography/wedding-couples/gallery' }],
    },
    es: {
      eyebrow: 'Su historia, con intención',
      title: 'Den espacio a lo que de verdad importa.',
      intro: 'Una sesión de pareja y una boda cuentan historias distintas. Empiecen por los momentos que quieren conservar.',
      steps: [
        { title: 'Elijan su historia', text: 'Cuéntenme si planean una sesión de pareja, de compromiso o la cobertura de una boda.' },
        { title: 'Reúnan lo esencial', text: 'Anoten la fecha o período, el lugar y un horario aproximado. Señalen las personas y momentos que no quieren dejar por fuera.' },
        { title: 'Abramos la conversación', text: 'Compartan qué está confirmado y qué falta decidir, y las opciones de cobertura o fotolibro que les interesan.' },
      ],
      questions: [
        { title: '¿Todavía están organizando el horario?', text: 'Envíen lo que sepan e indiquen las dudas pendientes. Para una boda, mencionen los lugares de la ceremonia y la recepción para tener en cuenta los traslados.' },
        { title: '¿La consulta reserva nuestra fecha?', text: 'No. La consulta sirve para preguntar por disponibilidad y los siguientes pasos para confirmar una reserva.' },
      ],
      action: 'Cuéntenme sus planes',
      subject: 'Fotografía de bodas / parejas — nuestros planes',
      prompts: ['Pareja, compromiso o boda:', 'Fecha o período:', 'Lugar(es):', 'Horario aproximado y cobertura de interés:', 'Personas y momentos importantes:', 'Preguntas / interés en fotolibro:'],
      links: [{ label: 'Exploren fotografías de bodas y parejas', href: '/photography/wedding-couples/gallery' }],
    },
  },
  ux: {
    en: {
      eyebrow: 'From context to a clearer brief',
      title: 'Start with the product problem, not a screen count.',
      intro: 'The work shown here is a starting point for discussing your own audience, product and design needs.',
      steps: [
        { title: 'Define the audience', text: 'Who uses the product, and what should they be able to do? Pick the journey that needs the most attention.' },
        { title: 'Show the current stage', text: 'Describe whether you have an idea, wireframes or a live product. Share links you are comfortable sharing.' },
        { title: 'Outline the scope', text: 'Mention the platform, desired deliverables, collaborators and any timeline or technical constraints.' },
      ],
      questions: [
        { title: 'Do I need a finished brief?', text: 'No. A short description of the problem, the audience and the current stage is enough to begin discussing scope.' },
        { title: 'What should we agree on before starting?', text: 'We can discuss the deliverables, review rounds and handoff materials for your project, so the scope is clear before work begins.' },
      ],
      action: 'Introduce your product',
      subject: 'UX/UI project inquiry — scope and audience',
      prompts: ['Product and audience:', 'Problem / key user journey:', 'Current stage and optional links:', 'Platform and desired deliverables:', 'Team / technical constraints:', 'Target timing and questions:'],
      links: [],
    },
    es: {
      eyebrow: 'Del contexto a un brief más claro',
      title: 'Empecemos por el problema, no por contar pantallas.',
      intro: 'Los proyectos de esta página son un punto de partida para hablar de tu público, producto y necesidades de diseño.',
      steps: [
        { title: 'Define el público', text: '¿Quién usa el producto y qué necesita hacer? Elige el recorrido que requiere más atención.' },
        { title: 'Comparte la etapa actual', text: 'Cuenta si tienes una idea, wireframes o un producto activo. Comparte solo los enlaces que quieras compartir.' },
        { title: 'Delimita el alcance', text: 'Menciona la plataforma, entregables deseados, colaboradores y restricciones técnicas o de tiempo.' },
      ],
      questions: [
        { title: '¿Necesito un brief terminado?', text: 'No. Una breve descripción del problema, el público y la etapa actual basta para empezar a conversar sobre el alcance.' },
        { title: '¿Qué acordamos antes de empezar?', text: 'Podemos conversar sobre los entregables, las rondas de revisión y los materiales de entrega para que el alcance de tu proyecto quede claro antes de comenzar.' },
      ],
      action: 'Preséntame tu producto',
      subject: 'Consulta de proyecto UX/UI — alcance y público',
      prompts: ['Producto y público:', 'Problema / recorrido principal:', 'Etapa actual y enlaces opcionales:', 'Plataforma y entregables deseados:', 'Equipo / restricciones técnicas:', 'Plazos deseados y preguntas:'],
      links: [],
    },
  },
  experiences: {
    en: {
      eyebrow: 'Make something together',
      title: 'Imagine your own creative gathering.',
      intro: 'Looking for a private gathering rather than a public event? Tell me about the people and the occasion.',
      steps: [
        { title: 'Picture the group', text: 'Share the occasion, approximate group size and any experience levels or access needs to consider.' },
        { title: 'Think about the setting', text: 'Suggest a date or a few options and a place. Say whether you already have a venue or are still exploring.' },
        { title: 'Ask about the details', text: 'Describe the kind of painting gathering you imagine and ask about format, materials and arrangements.' },
      ],
      questions: [
        { title: 'Where can I find public events?', text: 'Check the upcoming section for current listings, or visit the events page for upcoming and past gatherings. Past events are an archive, not open bookings.' },
        { title: 'Is a private date confirmed when I email?', text: 'No. A private gathering starts with an inquiry; the date, place, format and availability need to be discussed.' },
      ],
      action: 'Ask about a private gathering',
      subject: 'Private art gathering inquiry',
      prompts: ['Occasion and kind of gathering:', 'Approximate group size:', 'Preferred date(s):', 'Place / venue status:', 'Experience levels and access needs:', 'Questions about format and materials:'],
      links: [
        { label: 'Check upcoming events', href: '/art-experiences/#upcoming' },
        { label: 'Upcoming & past event archive', href: '/art-experiences/events' },
      ],
    },
    es: {
      eyebrow: 'Crear en compañía',
      title: 'Imagina tu propio encuentro creativo.',
      intro: '¿Buscas un encuentro privado en lugar de un evento público? Cuéntame quiénes participarían y qué quieren celebrar.',
      steps: [
        { title: 'Imagina el grupo', text: 'Comparte la ocasión, el número aproximado de personas y su experiencia o necesidades de accesibilidad.' },
        { title: 'Piensa en el lugar', text: 'Propón una fecha o varias opciones y un lugar. Indica si ya tienes un espacio o si todavía estás buscando.' },
        { title: 'Pregunta por los detalles', text: 'Describe el encuentro de pintura que imaginas y pregunta por el formato, materiales y organización.' },
      ],
      questions: [
        { title: '¿Dónde encuentro eventos públicos?', text: 'Revisa la sección de próximos eventos o la página de eventos próximos y pasados. Los eventos pasados son un archivo, no reservas abiertas.' },
        { title: '¿Mi correo confirma una fecha privada?', text: 'No. Un encuentro privado comienza con una consulta; hay que conversar sobre fecha, lugar, formato y disponibilidad.' },
      ],
      action: 'Consulta por un encuentro privado',
      subject: 'Consulta de encuentro artístico privado',
      prompts: ['Ocasión y tipo de encuentro:', 'Número aproximado de personas:', 'Fecha(s) preferida(s):', 'Lugar / estado de la reserva del espacio:', 'Experiencia y necesidades de accesibilidad:', 'Preguntas sobre formato y materiales:'],
      links: [
        { label: 'Consulta próximos eventos', href: '/art-experiences/#upcoming' },
        { label: 'Archivo de eventos próximos y pasados', href: '/art-experiences/events' },
      ],
    },
  },
  collector: {
    en: {
      eyebrow: 'A conversation about an artwork',
      title: 'Found a work you keep coming back to?',
      intro: 'The portfolio is a record of artistic work. An artwork appearing here does not mean it is currently available.',
      steps: [
        { title: 'Identify the work', text: 'Include its title or page link. If you are comparing pieces, name each one.' },
        { title: 'Read the details', text: 'Note the listed dimensions and materials. Think about the space where you would like to live with the work.' },
        { title: 'Ask before deciding', text: 'Enquire about availability, current condition and any presentation or delivery questions relevant to your location.' },
      ],
      questions: [
        { title: 'Can I assume a displayed work is for sale?', text: 'No. Ask about the specific title. Availability and any purchase arrangements must be confirmed directly.' },
        { title: 'Can I write about a commission or exhibition?', text: 'Yes. State the purpose, your location and any proposed dimensions or dates so the conversation starts with the right context.' },
      ],
      action: 'Ask about an artwork',
      subject: 'Artwork inquiry — title and availability',
      prompts: ['Artwork title / link:', 'Listed dimensions and materials:', 'Availability or other question:', 'Location / presentation or delivery questions:', 'Commission or exhibition context, if relevant:'],
      links: [{ label: 'Return to the art portfolio', href: '/art' }],
    },
    es: {
      eyebrow: 'Una conversación sobre una obra',
      title: '¿Hay una obra a la que siempre vuelves?',
      intro: 'El portafolio es un registro del trabajo artístico. Que una obra aparezca aquí no significa que esté disponible.',
      steps: [
        { title: 'Identifica la obra', text: 'Incluye su título o enlace. Si estás comparando varias piezas, menciona cada una.' },
        { title: 'Revisa sus detalles', text: 'Anota las dimensiones y materiales publicados. Piensa en el espacio donde te gustaría convivir con la obra.' },
        { title: 'Pregunta antes de decidir', text: 'Consulta su disponibilidad, estado actual y cualquier duda sobre presentación o entrega según tu ubicación.' },
      ],
      questions: [
        { title: '¿Toda obra del portafolio está a la venta?', text: 'No. Pregunta por el título específico. La disponibilidad y las condiciones de compra deben confirmarse directamente.' },
        { title: '¿Puedo escribir sobre un encargo o exposición?', text: 'Sí. Indica el propósito, tu ubicación y las dimensiones o fechas propuestas para empezar con el contexto adecuado.' },
      ],
      action: 'Consulta por una obra',
      subject: 'Consulta de obra — título y disponibilidad',
      prompts: ['Título de la obra / enlace:', 'Dimensiones y materiales publicados:', 'Disponibilidad u otra pregunta:', 'Ubicación / dudas de presentación o entrega:', 'Contexto de encargo o exposición, si aplica:'],
      links: [{ label: 'Volver al portafolio de arte', href: '/art' }],
    },
  },
  wildlife: {
    en: {
      eyebrow: 'A personal field of observation',
      title: 'A quieter way of looking.',
      intro: 'This is a personal photographic exploration of wildlife, not a wildlife photography service.',
      steps: [
        { title: 'Explore the gallery', text: 'Follow the images at your own pace and notice the gestures, textures and encounters that draw you in.' },
        { title: 'Make a connection', text: 'Visit the painting portfolio to explore another part of my artistic practice.' },
        { title: 'Continue the conversation', text: 'If an image stays with you, describe it or share its gallery link when you write.' },
      ],
      questions: [
        { title: 'Is this a commercial photography offering?', text: 'No. This collection belongs to my personal artistic work. Client portrait sessions live in the photography section.' },
        { title: 'How do I ask about a particular image?', text: 'Describe the animal or scene and include the gallery link. That gives us a clear starting point without assuming an image is available for purchase.' },
      ],
      action: 'Write about an image',
      subject: 'A question about your wildlife photography',
      prompts: ['Image description / gallery link:', 'What caught my attention:', 'My question:'],
      links: [
        { label: 'Explore the wildlife gallery', href: '/my-art/wildlife-photography/gallery' },
        { label: 'Discover the painting portfolio', href: '/art' },
      ],
    },
    es: {
      eyebrow: 'Un espacio personal de observación',
      title: 'Otra manera de mirar, más despacio.',
      intro: 'Esta es una exploración fotográfica personal de la vida silvestre, no un servicio de fotografía de fauna.',
      steps: [
        { title: 'Recorre la galería', text: 'Mira las imágenes a tu ritmo y descubre los gestos, texturas y encuentros que te llaman la atención.' },
        { title: 'Conecta con otras obras', text: 'Visita el portafolio de pintura para conocer otra parte de mi práctica artística.' },
        { title: 'Sigamos conversando', text: 'Si una imagen se queda contigo, descríbela o comparte el enlace de la galería al escribir.' },
      ],
      questions: [
        { title: '¿Es una oferta de fotografía comercial?', text: 'No. Esta colección forma parte de mi obra personal. Las sesiones de retrato para clientes están en la sección de fotografía.' },
        { title: '¿Cómo pregunto por una imagen específica?', text: 'Describe el animal o la escena e incluye el enlace de la galería. Así tenemos un punto de partida sin asumir que la imagen esté a la venta.' },
      ],
      action: 'Escribe sobre una imagen',
      subject: 'Una pregunta sobre tu fotografía de vida silvestre',
      prompts: ['Descripción de la imagen / enlace a la galería:', 'Lo que me llamó la atención:', 'Mi pregunta:'],
      links: [
        { label: 'Explora la galería de vida silvestre', href: '/my-art/wildlife-photography/gallery' },
        { label: 'Descubre el portafolio de pintura', href: '/art' },
      ],
    },
  },
};
