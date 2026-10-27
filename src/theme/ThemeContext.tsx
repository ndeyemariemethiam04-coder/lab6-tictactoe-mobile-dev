
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

const lightColors = {
  background: '#F7F7FA',
  surface: '#FFFFFF',
  text: '#20212A',
  secondaryText: '#626574',
  border: '#D7D9E0',
  primary: '#6558D3',
  selected: '#E8E5FF',
  header: '#FFFFFF',
  headerText: '#20212A',
  drawer: '#FFFFFF',
  square: '#FFFFFF',
  x: '#6558D3',
  o: '#D64D75',
};

const darkColors = {
  background: '#15161C',
  surface: '#22242D',
  text: '#F4F4F8',
  secondaryText: '#B9BBC8',
  border: '#515362',
  primary: '#B4A8FF',
  selected: '#38334F',
  header: '#20212A',
  headerText: '#F4F4F8',
  drawer: '#20212A',
  square: '#292B36',
  x: '#B4A8FF',
  o: '#FF8BA7',
};

type ThemeColors = typeof lightColors;

type ThemeContextValue = {
  isDark: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(false);

  function toggleTheme() {
    setIsDark((current) => !current);
  }

  const colors: ThemeColors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      'useTheme must be used inside a ThemeProvider.'
    );
  }

  return context;
}
