import { useEffect, useState } from 'react';

function ThemeToggle() {
  const [isLight, setIsLight] = useState(() => {
    return localStorage.getItem('theme') === 'light';
  });

  useEffect(() => {
    document.body.classList.toggle('light', isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }, [isLight]);

  return (
    <button className="theme-toggle" onClick={() => setIsLight(prev => !prev)}>
      {isLight ? '🌙 Dark Mode' : '🌞 Light Mode'}
    </button>
  );
}

export default ThemeToggle;
