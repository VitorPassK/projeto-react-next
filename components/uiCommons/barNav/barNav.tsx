import BtnText from "./btnText";

function BarNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navegação Principal"
      >
        <div className="flex items-center gap-2 font-bold text-slate-950 dark:text-white text-lg tracking-tight">
          <span className="bg-indigo-600 text-white p-1.5 rounded-lg text-sm font-black shadow-sm">
            ⚔️
          </span>
          <span>Grimório</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <BtnText href="/" texto="Home" />
          <BtnText href="/about" texto="Sobre" />
          <BtnText href="/blog" texto="Blog" />
          <BtnText href="/gallery" texto="Galeria de Jogos" />
          <BtnText href="/contact" texto="Contato" />
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
          >
            Redes
          </a>
        </div>
      </nav>
    </header>
  );
}

export default BarNav;