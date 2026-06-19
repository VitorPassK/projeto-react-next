"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp
} from "firebase/firestore";

interface Comment {
    id: string;
    username: string;
    text: string;
    createdAt: any;
}

interface CommentsProps {
    postId: string;
}

export default function Comments({ postId }: CommentsProps) {
    const [username, setUsername] = useState("");
    const [text, setText] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        if (!postId) return;

        const q = query(
            collection(db, "comments"),
            where("postId", "==", postId),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const commentsArray: Comment[] = [];
            querySnapshot.forEach((doc) => {
                commentsArray.push({ id: doc.id, ...doc.data() } as Comment);
            });
            setComments(commentsArray);
        });

        return () => unsubscribe();
    }, [postId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !text.trim()) return;

        setIsSending(true);
        try {
            await addDoc(collection(db, "comments"), {
                postId,
                username: username.trim(),
                text: text.trim(),
                createdAt: serverTimestamp(),
            });
            setText("");
        } catch (error) {
            console.error("Erro ao adicionar comentário:", error);
            alert("Não foi possível enviar o comentário.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8 max-w-3xl mx-auto px-4">
            <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-6 flex items-center gap-2">
                <span>💬</span> Comentários ({comments.length})
            </h3>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Seu nome ou nick"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="sm:col-span-1 px-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-950 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        required
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <textarea
                        placeholder="Escreva sua opinião ou crônica sobre o jogo..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-950 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isSending}
                        className="w-full sm:w-auto text-xs px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition-colors duration-150 disabled:opacity-50 whitespace-nowrap cursor-pointer"
                    >
                        {isSending ? "Enviando..." : "Comentar"}
                    </button>
                </div>
            </form>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {comments.length === 0 ? (
                    <p className="text-sm text-slate-500 dark:text-slate-400 italic">Nenhum comentário ainda. Seja o primeiro a deixar sua marca no Grimório!</p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="p-4 rounded-xl border border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/20 transition-all"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-sm text-indigo-600 dark:text-indigo-400">
                                    {comment.username}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                    {comment.createdAt?.toDate() ? new Date(comment.createdAt.toDate()).toLocaleDateString() : "Agora mesmo"}
                                </span>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300 break-words leading-relaxed">
                                {comment.text}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}