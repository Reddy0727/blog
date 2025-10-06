import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="bg-white text-gray-700 dark:bg-[rgb(16,23,42)] dark:text-gray-200 min-h-screen transition-colors duration-300">
        {children}
      </div>
    </div>
  );
}
