'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Link from '@/i18n/LocalizedLink';
import { useTranslation } from '@/i18n/TranslationContext';
import { SITE_CONFIG } from '@/lib/seo';

const copy = {
  en: {
    title: 'A little idea can become something beautiful.',
    intro: 'Choose what brings you here. I will help you figure out the next step, whether you have a detailed brief or just a starting point.',
    label: 'What do you have in mind?',
    prepare: 'Helpful things to include',
    email: 'Start a conversation',
    explore: 'Explore this experience',
    note: 'Opens a draft in your email app. Nothing is sent or booked automatically.',
    fallback: 'Or write directly to',
    options: [
      { id: 'wedding', label: 'A wedding or couples session', path: '/photography/wedding-couples/', prompts: ['Your preferred date and location', 'The occasion and the moments that matter most', 'The photography service you are interested in'] },
      { id: 'pets', label: 'Photos of my pet', path: '/photography/pets/', prompts: ['A little about your pet and their personality', 'Who will be in the photos', 'Preferred dates and an indoor or outdoor setting'] },
      { id: 'family', label: 'Family, maternity or baby photos', path: '/photography/family-maternity/', prompts: ['The session you have in mind and who is joining', 'Your preferred timing and location', 'Any needs or questions that would help you feel comfortable'] },
      { id: 'headshots', label: 'Professional headshots', path: '/photography/headshots/', prompts: ['Where you will use your portraits', 'An individual session or the number of team members', 'Your preferred style, dates and location'] },
      { id: 'art', label: 'An artwork or creative collaboration', path: '/art/', prompts: ['The title or link of the artwork, or your project idea', 'Your questions about the piece or collaboration', 'Your location and any timing considerations'] },
      { id: 'experiences', label: 'A painting experience or private gathering', path: '/art-experiences/', prompts: ['The kind of gathering you are imagining', 'Approximate group size, dates and location', 'Any questions about the creative activity'] },
      { id: 'design', label: 'A digital design project', path: '/creative-services/ux-ui-design/', prompts: ['Your product, audience and the problem to solve', 'Your current stage and the help you need', 'Your preferred timeline and any existing examples'] },
    ],
  },
  es: {
    title: 'Una pequeña idea puede convertirse en algo hermoso.',
    intro: 'Elige qué te trae por aquí. Te ayudaré a definir el siguiente paso, tanto si tienes un proyecto detallado como si apenas estás empezando a imaginarlo.',
    label: '¿Qué tienes en mente?',
    prepare: 'Información útil para tu mensaje',
    email: 'Empezar una conversación',
    explore: 'Explorar esta experiencia',
    note: 'Abre un borrador en tu aplicación de correo. No se envía ni se reserva nada automáticamente.',
    fallback: 'También puedes escribir directamente a',
    options: [
      { id: 'wedding', label: 'Una boda o sesión de pareja', path: '/photography/wedding-couples/', prompts: ['La fecha y ubicación que prefieres', 'La ocasión y los momentos más importantes para ti', 'El servicio de fotografía que te interesa'] },
      { id: 'pets', label: 'Fotos de mi mascota', path: '/photography/pets/', prompts: ['Un poco sobre tu mascota y su personalidad', 'Quiénes aparecerán en las fotos', 'Fechas preferidas y si buscas una sesión interior o exterior'] },
      { id: 'family', label: 'Fotos familiares, de maternidad o de bebé', path: '/photography/family-maternity/', prompts: ['La sesión que imaginas y quiénes participarán', 'Las fechas y ubicación que prefieres', 'Necesidades o preguntas para que te sientas a gusto'] },
      { id: 'headshots', label: 'Retratos profesionales', path: '/photography/headshots/', prompts: ['Dónde usarás tus retratos', 'Una sesión individual o cuántas personas tiene tu equipo', 'El estilo, las fechas y la ubicación que prefieres'] },
      { id: 'art', label: 'Una obra o colaboración creativa', path: '/art/', prompts: ['El título o enlace de la obra, o tu idea de proyecto', 'Tus preguntas sobre la obra o colaboración', 'Tu ubicación y cualquier fecha importante'] },
      { id: 'experiences', label: 'Una experiencia de pintura o encuentro privado', path: '/art-experiences/', prompts: ['El tipo de encuentro que imaginas', 'Tamaño aproximado del grupo, fechas y ubicación', 'Tus preguntas sobre la actividad creativa'] },
      { id: 'design', label: 'Un proyecto de diseño digital', path: '/creative-services/ux-ui-design/', prompts: ['Tu producto, tu público y el problema que quieres resolver', 'La etapa actual del proyecto y la ayuda que necesitas', 'El plazo que tienes en mente y ejemplos existentes'] },
    ],
  },
};

const Planner = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 2rem 4rem;
  padding: clamp(1.25rem, 4vw, 3rem);
  border: 1px solid var(--line);
  background: #eee7dd;
  margin-top: 2rem;
  h3 { font-size: clamp(2rem, 3vw, 2.8rem); line-height: 1.1; }
  p { color: var(--muted); font-size: 0.9375rem; line-height: 1.8; margin-top: 1rem; }
  label { display: block; font-weight: 500; font-size: 0.9375rem; margin-bottom: 0.75rem; }
  select {
    width: 100%;
    min-height: 48px;
    padding: 0.75rem;
    color: var(--ink);
    background: #fffdf8;
    border: 1px solid #827467;
    border-radius: 0;
    font-size: 1rem;
    letter-spacing: normal;
  }
  select:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
  h4 { font: 500 0.9375rem/1.5 var(--font-montserrat), sans-serif; letter-spacing: normal; text-transform: none; margin: 1.25rem 0 0.5rem; }
  ul { padding-left: 1.25rem; font-size: 0.875rem; line-height: 1.8; color: var(--muted); }
  .planner-actions { display: flex; flex-wrap: wrap; gap: 0.5rem 1.25rem; align-items: center; margin-top: 1.25rem; }
  a { display: inline-flex; align-items: center; min-height: 44px; font-size: 0.875rem; text-decoration: underline; text-underline-offset: 4px; }
  .planner-primary { color: #fff; background: var(--accent); padding: 0.75rem 1rem; text-decoration: none; }
  .planner-primary:hover { background: #673829; }
  .planner-note { font-size: 0.8125rem; }
  .planner-email { overflow-wrap: anywhere; }
  @media (max-width: 760px) { grid-template-columns: minmax(0, 1fr); gap: 1.5rem; }
`;

export default function InquiryPlanner() {
  const { locale } = useTranslation();
  const [selected, setSelected] = useState('wedding');
  const text = copy[locale];
  const option = text.options.find(item => item.id === selected);
  if (!option) throw new RangeError(`Unknown inquiry interest: ${selected}`);
  const href = `mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(option.label)}&body=${encodeURIComponent(option.prompts.map(prompt => `${prompt}:\n`).join('\n'))}`;

  return (
    <Planner>
      <div>
        <h3>{text.title}</h3>
        <p>{text.intro}</p>
        <p className="planner-note">{text.fallback}<br /><a className="planner-email" href={`mailto:${SITE_CONFIG.contact.email}`}>{SITE_CONFIG.contact.email}</a></p>
      </div>
      <div>
        <label htmlFor="inquiry-interest">{text.label}</label>
        <select id="inquiry-interest" value={selected} onChange={event => setSelected(event.target.value)} aria-describedby="inquiry-note">
          {text.options.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
        </select>
        <div aria-live="polite" aria-atomic="true">
          <h4>{text.prepare}</h4>
          <ul>{option.prompts.map(prompt => <li key={prompt}>{prompt}</li>)}</ul>
        </div>
        <div className="planner-actions">
          <a className="planner-primary" href={href}>{text.email}</a>
          <Link href={option.path}>{text.explore}</Link>
        </div>
        <p className="planner-note" id="inquiry-note">{text.note}</p>
      </div>
    </Planner>
  );
}
