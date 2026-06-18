"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setQuery, setActiveCategory, clearSearch } from "@/store/slices/searchSlice";

const ALL_POSTS = [
    { tag: "Guia", tagStyle: "bg-amber-50 text-amber-800 dark:bg-amber-900 dark:text-amber-200", title: "Como dominar as runas de fogo em Baldur's Gate 3", date: "10 jun 2026", href: "/blog/baldurs-gate-runas-fogo", category: "guides" },
    { tag: "Lista", tagStyle: "bg-pink-50 text-pink-800 dark:bg-pink-900 dark:text-pink-200", title: "Os 10 chefes mais épicos dos últimos 5 anos", date: "8 jun 2026", href: "/blog/top-10-chefes-epicos", category: "reviews" },
    { tag: "Notícia", tagStyle: "bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200", title: "Dragon Age: The Veilguard ganha nova atualização gratuita", date: "7 jun 2026", href: "/blog/dragon-age-veilguard-update", category: "news" },
    { tag: "RPG", tagStyle: "bg-indigo-50 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200", title: "Por que Disco Elysium ainda é único no gênero", date: "5 jun 2026", href: "/blog/disco-elysium-analise", category: "rpg" },
    { tag: "Review", tagStyle: "bg-teal-50 text-teal-800 dark:bg-teal-900 dark:text-teal-200", title: "Elden Ring: Nightreign — a nova expansão que está dominando o reino", date: "12 jun 2026", href: "/blog/elden-ring-nightreign-review", category: "reviews" },
    { tag: "Guia", tagStyle: "bg-amber-50 text-amber-800 dark:bg-amber-900 dark:text-amber-200", title: "Os melhores builds de mago em Baldur's Gate 3", date: "3 jun 2026", href: "/blog/builds-mago-bg3", category: "guides" },
    { tag: "Notícia", tagStyle: "bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200", title: "Novo RPG da FromSoftware é anunciado para 2027", date: "1 jun 2026", href: "/blog/fromsoftware-novo-rpg-2027", category: "news" },
    { tag: "RPG", tagStyle: "bg-indigo-50 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200", title: "Pathfinder vs D&D: qual sistema escolher?", date: "28 mai 2026", href: "/blog/pathfinder-vs-dnd", category: "rpg" },
];

const FILTERS = [
    { label: "Todos", key: null },
    { label: "RPG & Fantasia", key: "rpg" },
    { label: "Reviews", key: "reviews" },
    { label: "Guias & Dicas", key: "guides" },
    { label: "Notícias", key: "news" },
];

export default function BlogPage() {
    const dispatch = useDispatch();
    const query = useSelector((state: RootState) => state.search.query);
    const activeCategory = useSelector((state: RootState) => state.search.activeCategory);

    const filtered = ALL_POSTS.filter((post) => {
        const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = activeCategory ? post.category === activeCategory : true;
        return matchesQuery && matchesCategory;
    });

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">

            <div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">Blog</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Crônicas, guias e análises do universo RPG.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => dispatch(setQuery(e.target.value))}
                    placeholder="Buscar posts..."
                    className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors"
                />
                {(query || activeCategory) && (
                    <button
                        onClick={() => dispatch(clearSearch())}
                        className="text-xs px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-indigo-400 transition-colors"
                    >
                        Limpar filtros
                    </button>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => {
                    const isActive = activeCategory === f.key;
                    return (
                        <button
                            key={String(f.key)}
                            onClick={() => dispatch(setActiveCategory(f.key))}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-colors
                ${isActive
                                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
                                    : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-indigo-300"
                                }`}
                        >
                            {f.label}
                        </button>
                    );
                })}
            </div>

            {filtered.length === 0 ? (
                <p className="text-sm text-slate-400 dark:text-slate-500 py-10 text-center">
                    Nenhum post encontrado para essa busca.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((post) => (
                        <Link
                            key={post.href}
                            href={post.href}
                            className="flex flex-col gap-3 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 hover:border-indigo-300 dark:hover:border-indigo-700 p-5 transition-colors duration-150"
                        >
                            <span className={`self-start text-xs font-medium px-2.5 py-1 rounded-full ${post.tagStyle}`}>
                                {post.tag}
                            </span>
                            <p className="text-sm font-medium text-slate-900 dark:text-white leading-snug flex-1">
                                {post.title}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">📅 {post.date}</p>
                        </Link>
                    ))}
                </div>
            )}

            <p className="text-xs text-slate-400 dark:text-slate-500">
                {filtered.length} post{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
            </p>

        </div>
    );
}