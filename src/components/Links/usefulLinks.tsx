import { BookOpen, Globe, Code, Atom, Users } from 'lucide-react';

export type UsefulLink = {
  title: string;
  url: string;
  icon: React.ComponentType<{ size?: number | string }>;
  category: 'docs' | 'practice' | 'courses' | 'community';
};

export const usefulLinks: UsefulLink[] = [
  // 📚 Документация
  {
    title: 'MDN Docs',
    url: 'https://developer.mozilla.org',
    icon: Globe,
    category: 'docs',
  },
  {
    title: 'TypeScript Docs',
    url: 'https://www.typescriptlang.org/docs/',
    icon: Code,
    category: 'docs',
  },
  {
    title: 'React Docs',
    url: 'https://react.dev',
    icon: Atom,
    category: 'docs',
  },
  {
    title: 'Redux Toolkit',
    url: 'https://redux-toolkit.js.org/',
    icon: Code,
    category: 'docs',
  },

  // 🛠 Практика
  {
    title: 'Frontend Mentor',
    url: 'https://www.frontendmentor.io/',
    icon: Code,
    category: 'practice',
  },
  {
    title: 'Codewars',
    url: 'https://www.codewars.com/',
    icon: Code,
    category: 'practice',
  },
  {
    title: 'Exercism',
    url: 'https://exercism.org/tracks/javascript',
    icon: Code,
    category: 'practice',
  },

  // 🎓 Курсы
  {
    title: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/',
    icon: BookOpen,
    category: 'courses',
  },
  {
    title: 'JavaScript.info',
    url: 'https://javascript.info/',
    icon: BookOpen,
    category: 'courses',
  },
  {
    title: 'FullStackOpen',
    url: 'https://fullstackopen.com/en/',
    icon: BookOpen,
    category: 'courses',
  },

  // 📰 Сообщества
  {
    title: 'Dev.to',
    url: 'https://dev.to/',
    icon: Users,
    category: 'community',
  },
  {
    title: 'Hashnode',
    url: 'https://hashnode.com/',
    icon: Users,
    category: 'community',
  },
  {
    title: 'Proglib',
    url: 'https://proglib.io/',
    icon: Users,
    category: 'community',
  },
  {
    title: 'Stack Overflow',
    url: 'https://stackoverflow.com/questions/tagged/javascript',
    icon: Users,
    category: 'community',
  },
];
