export type SiteSection = {
  id: string;
  order: number;
  title: string;
  description: string;
};

export const siteSections: SiteSection[] = [
  {
    id: 'program',
    order: 1,
    title: 'Program overview',
    description: 'Placeholder area for the camp promise, dates, target students, and outcomes.',
  },
  {
    id: 'curriculum',
    order: 2,
    title: 'Curriculum',
    description: 'Prepared for tracks, weekly schedules, learning goals, and downloadable details.',
  },
  {
    id: 'gallery',
    order: 3,
    title: 'Gallery',
    description: 'Ready for future images, campus atmosphere, class moments, or student projects.',
  },
  {
    id: 'faq',
    order: 4,
    title: 'FAQ',
    description: 'Structured space for tuition, housing, visa, preparation, and application questions.',
  },
  {
    id: 'contact',
    order: 5,
    title: 'Contact',
    description: 'Can connect to email, Google Forms, announcements, or a future application flow.',
  },
  {
    id: 'apply',
    order: 6,
    title: 'Application',
    description: 'Reserved for a simple email-based form or embedded Google Form integration.',
  },
];
