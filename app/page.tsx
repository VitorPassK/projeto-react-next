"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addFavorite, removeFavorite } from "@/store/slices/favoritesSlice";
import { setActiveCategory } from "@/store/slices/searchSlice";
import { useTheme } from "@/contexts/themeContext";

const FEATURED_POST = {
  tag: "Review",
  tagStyle: "bg-teal-50 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  title: "Elden Ring: Nightreign — a nova expansão que está dominando o reino",
  description:
    "Exploramos cada canto do novo mapa, enfrentamos os chefes mais brutais e voltamos para contar. Confira nossa análise completa sem spoilers.",
  author: "Goblin Zex",
  authorInitials: "GZ",
  date: "12 jun 2026",
  readTime: "8 min de leitura",
  href: "/blog/elden-ring-nightreign-review",
};

const CATEGORIES = [
  { icon: "⚔️", name: "RPG & Fantasia", count: 34, href: "/blog/category/rpg", key: "rpg" },
  { icon: "⭐", name: "Reviews", count: 28, href: "/blog/category/reviews", key: "reviews" },
  { icon: "🗺️", name: "Guias & Dicas", count: 19, href: "/blog/category/guides", key: "guides" },
  { icon: "📜", name: "Notícias", count: 41, href: "/blog/category/news", key: "news" },
];

const RECENT_POSTS = [
  { tag: "Guia", tagStyle: "bg-amber-50 text-amber-800 dark:bg-amber-900 dark:text-amber-200", title: "Como dominar as runas de fogo em Baldur's Gate 3", date: "10 jun 2026", href: "/blog/baldurs-gate-runas-fogo" },
  { tag: "Lista", tagStyle: "bg-pink-50 text-pink-800 dark:bg-pink-900 dark:text-pink-200", title: "Os 10 chefes mais épicos dos últimos 5 anos", date: "8 jun 2026", href: "/blog/top-10-chefes-epicos" },
  { tag: "Notícia", tagStyle: "bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200", title: "Dragon Age: The Veilguard ganha nova atualização gratuita", date: "7 jun 2026", href: "/blog/dragon-age-veilguard-update" },
  { tag: "RPG", tagStyle: "bg-indigo-50 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200", title: "Por que Disco Elysium ainda é único no gênero", date: "5 jun 2026", href: "/blog/disco-elysium-analise" },
];

export default function Home() {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const favorites = useSelector((state: RootState) => state.favorites.posts);
  const activeCategory = useSelector((state: RootState) => state.search.activeCategory);

  const isFavorited = (href: string) => favorites.some((p) => p.href === href);

  const handleCategoryClick = (key: string) => {
    dispatch(setActiveCategory(activeCategory === key ? null : key));
  };

  const handleFavorite = (post: typeof RECENT_POSTS[0]) => {
    if (isFavorited(post.href)) {
      dispatch(removeFavorite(post.href));
    } else {
      dispatch(addFavorite({ ...post }));
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      <div className="flex justify-end">
        <button
          onClick={toggleTheme}
          className="text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-indigo-400 transition-colors"
        >
          {theme === "dark" ? "☀️ Modo claro" : "🌙 Modo escuro"}
        </button>
      </div>

      <section>
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 p-8 sm:p-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-full px-3 py-1 mb-5">
            🔥 destaque da semana
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white leading-snug max-w-2xl mb-4">
            {FEATURED_POST.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mb-6">
            {FEATURED_POST.description}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${FEATURED_POST.tagStyle}`}>
              {FEATURED_POST.tag}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                {FEATURED_POST.authorInitials}
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {FEATURED_POST.author} · {FEATURED_POST.date}
              </span>
            </div>
            <span className="text-sm text-slate-400 dark:text-slate-500">🕐 {FEATURED_POST.readTime}</span>
            <Link href={FEATURED_POST.href} className="ml-auto text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors">
              Ler artigo →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
          Categorias
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.key)}
                className={`group flex flex-col gap-2 rounded-xl border p-4 transition-colors duration-150 text-left
                  ${isActive
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                    : "border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 hover:border-indigo-300 dark:hover:border-indigo-700"
                  }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <p className={`text-sm font-medium ${isActive ? "text-indigo-700 dark:text-indigo-300" : "text-slate-900 dark:text-white"}`}>
                  {cat.name}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{cat.count} posts</p>
              </button>
            );
          })}
        </div>
        {activeCategory && (
          <p className="mt-3 text-xs text-indigo-500 dark:text-indigo-400">
            Filtrando por: <strong>{CATEGORIES.find(c => c.key === activeCategory)?.name}</strong>
            {" · "}
            <button onClick={() => dispatch(setActiveCategory(null))} className="underline">
              limpar
            </button>
          </p>
        )}
      </section>

      {/* Posts recentes — favoritar via Redux */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
          Posts recentes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {RECENT_POSTS.map((post) => (
            <div
              key={post.href}
              className="group flex flex-col gap-3 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 hover:border-indigo-300 dark:hover:border-indigo-700 p-4 transition-colors duration-150"
            >
              <div className="flex items-start justify-between gap-2">
                <span className={`self-start text-xs font-medium px-2.5 py-1 rounded-full ${post.tagStyle}`}>
                  {post.tag}
                </span>
                <button
                  onClick={() => handleFavorite(post)}
                  title={isFavorited(post.href) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  className="text-base leading-none transition-transform hover:scale-110"
                >
                  {isFavorited(post.href) ? "🔖" : "🤍"}
                </button>
              </div>
              <Link href={post.href} className="text-sm font-medium text-slate-900 dark:text-white leading-snug flex-1 hover:text-indigo-500 transition-colors">
                {post.title}
              </Link>
              <p className="text-xs text-slate-400 dark:text-slate-500">📅 {post.date}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}