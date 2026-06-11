import Link from "next/link";

const NAV_LINKS = [
  { href: "/", texto: "Home" },
  { href: "/about", texto: "Sobre" },
  { href: "/blog", texto: "Blog" },
  { href: "/gallery", texto: "Galeria de Jogos" },
  { href: "/contact", texto: "Contato" },
];

const RESOURCE_LINKS = [
  { href: "/blog", texto: "Blog" },
  { href: "/faq", texto: "FAQ" },
  { href: "/partners", texto: "Parceiros" },
  { href: "/news", texto: "Novidades" },
];

const LEGAL_LINKS = [
  { href: "/privacy", texto: "Privacidade" },
  { href: "/terms-of-use", texto: "Termos de Uso" },
  { href: "/cookies", texto: "Cookies" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; texto: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-900 dark:text-slate-100">
        {title}
      </h4>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
            >
              {link.texto}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-6">

        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 mb-10">

          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2 font-bold text-slate-950 dark:text-white text-lg tracking-tight">
              <span className="bg-indigo-600 text-white p-1.5 rounded-lg text-sm font-black shadow-sm">
                ⚔️
              </span>
              <span>Grimório</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[220px]">
              Crônicas, guias e análises do universo dos jogos de RPG e fantasia.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-150 text-base"
              >
                📷
              </a>
              <a
                href="#"
                aria-label="Twitter / X"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-150 text-base"
              >
                🐦
              </a>
              <a
                href="#"
                aria-label="Discord"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-150 text-base"
              >
                🎮
              </a>
            </div>
          </div>

          <FooterColumn title="Navegação" links={NAV_LINKS} />
          <FooterColumn title="Recursos" links={RESOURCE_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200/80 dark:border-slate-800/80 pt-5">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} Grimório. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
              >
                {link.texto}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;