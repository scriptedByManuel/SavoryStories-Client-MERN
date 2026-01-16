export default function ThemeScript() {
  const script = `
    (function() {
      try {
        var saved = localStorage.getItem('darkMode');
        var isDark = false;
        if (saved !== null) {
          isDark = JSON.parse(saved).state.isDark;
        } else {
          isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}