export const themeNames = [
  'default',
  'sunny',
  'grayscale',
  'strawberry',
] as const;

type ThemeName = typeof themeNames[number];

interface ThemeProps {
  primary: string;
  accent: string;
  background: string;
  roundness: string;
}

export const themes: Record<ThemeName, ThemeProps> = {
  default: {
    primary: '#323135',
    accent: '#7c7ef5',
    background: '#feffff',
    roundness: '0.5rem',
  },
  sunny: {
    primary: '#7c3e0b',
    accent: '#af641d',
    background: '#ffcfa1',
    roundness: '1rem',
  },
  grayscale: {
    primary: '#3a3a3a',
    accent: '#696e6c',
    background: '#a7a7a7',
    roundness: '0',
  },
  strawberry: {
    primary: '#850e35',
    accent: '#ee6983',
    background: '#ffC4C4',
    roundness: '1.5rem',
  },
} as const;
