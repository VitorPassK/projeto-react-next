"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { removeFavorite } from "@/store/slices/favoritesSlice";

export default function GalleryPage() {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.posts);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">

            <div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">
                    Favoritos
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Posts que você salvou para ler depois.
                </p>
            </div>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <span className="text-5xl">🔖</span>
                    <p className="text-sm text-slate-400 dark:text-slate-500 text-center">
                        Você ainda não salvou nenhum post.
                    </p>
                    <Link
                        href="/"
                        className="text-xs px-4 py-2 rounded-full border border-indigo-400 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
                    >
                        Explorar posts →
                    </Link>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {favorites.map((post) => (
                            <div
                                key={post.href}
                                className="flex flex-col gap-3 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <span className={`self-start text-xs font-medium px-2.5 py-1 rounded-full ${post.tagStyle}`}>
                                        {post.tag}
                                    </span>
                                    <button
                                        onClick={() => dispatch(removeFavorite(post.href))}
                                        title="Remover dos favoritos"
                                        className="text-slate-300 dark:text-slate-600 hover:text-red-400 dark:hover:text-red-400 transition-colors text-lg leading-none"
                                    >
                                        ×
                                    </button>
                                </div>
                                <Link
                                    href={post.href}
                                    className="text-sm font-medium text-slate-900 dark:text-white leading-snug flex-1 hover:text-indigo-500 transition-colors"
                                >
                                    {post.title}
                                </Link>
                                <p className="text-xs text-slate-400 dark:text-slate-500">📅 {post.date}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                        {favorites.length} post{favorites.length !== 1 ? "s" : ""} salvo{favorites.length !== 1 ? "s" : ""}
                    </p>
                </>
            )}

        </div>
    );
}