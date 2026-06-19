"use client";

import { useParams } from "next/navigation";
import Comments from "@/components/Comments";

export default function ArticlePage() {
    const params = useParams();
    const slug = params.slug as string;

    const title = slug
        ? slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "Artigo do Grimório";

    return (
        <main className="max-w-4xl mx-auto px-4 py-12 text-slate-950 dark:text-white transition-colors">
            <article className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold tracking-wider uppercase">
                    <span>🎮 Análise Especial</span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="text-slate-500">Junho de 2026</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                    {title} — Desbravando os mistérios e segredos profundos
                </h1>

                <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-900 pb-6">
                    <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        GZ
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Goblin Zex</p>
                        <p className="text-xs text-slate-500">Editor e Inventor no Grimório</p>
                    </div>
                </div>

                <div className="text-base text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed">
                    <p className="font-bold text-2xl text-slate-900 dark:text-slate-100">
                        Elden Ring: Uma Jornada Épica em um Mundo de Fantasia.
                    </p>
                    <p>
                        Lançado em 2022 pela FromSoftware, o aclamado jogo Elden Ring conquistou milhões de jogadores ao redor do mundo. Misturando exploração em mundo aberto, combates desafiadores e uma narrativa envolvente, o título rapidamente se tornou uma referência entre os jogos de RPG de ação
                    </p>
                    <p className="font-bold text-lg text-slate-900 dark:text-slate-100">
                        Um mundo vasto para explorar
                    </p>
                    <p>
                        A aventura acontece nas Terras Intermédias, um reino repleto de castelos, masmorras, florestas e criaturas misteriosas. Diferente de muitos jogos que conduzem o jogador por caminhos definidos, Elden Ring oferece liberdade para explorar praticamente qualquer região desde o início da jornada.
                    </p>
                    <p>
                        Cada área apresenta novos desafios, inimigos poderosos e segredos escondidos que recompensam a curiosidade dos jogadores. Essa sensação constante de descoberta é um dos principais atrativos do jogo.
                    </p>
                    <p className="font-bold text-lg text-slate-900 dark:text-slate-100">
                        Combate desafiador e recompensador
                    </p>
                    <p>
                        Assim como outros títulos da FromSoftware, Elden Ring é conhecido por sua dificuldade. Os combates exigem atenção, estratégia e paciência. Cada inimigo pode representar uma ameaça real, especialmente os chefes espalhados pelo mapa.
                    </p>
                    <p>
                        Apesar do desafio, a sensação de superar um obstáculo difícil é extremamente gratificante. O jogador pode adaptar seu estilo de jogo utilizando diferentes armas, magias, armaduras e habilidades especiais.
                    </p>
                    <p className="font-bold text-lg text-slate-900 dark:text-slate-100">
                        Uma história cheia de mistérios
                    </p>
                    <p>
                        A narrativa de Elden Ring não é apresentada de forma tradicional. Em vez de longas sequências cinematográficas, a história é descoberta aos poucos por meio de diálogos, descrições de itens e acontecimentos espalhados pelo mundo.
                    </p>
                    <p>
                        Essa abordagem incentiva a exploração e a interpretação dos eventos, permitindo que cada jogador monte sua própria compreensão dos acontecimentos das Terras Intermédias.
                    </p>
                    <p className="font-bold text-lg text-slate-900 dark:text-slate-100">
                        Conclusão
                    </p>
                    <p>
                        Elden Ring é uma experiência que combina exploração, combate e narrativa de maneira única. Seu vasto mundo aberto, aliado à liberdade de escolha e aos desafios marcantes, faz dele uma das obras mais importantes dos últimos anos. Para os fãs de fantasia e aventura, trata-se de uma jornada memorável que vale a pena conhecer.
                    </p>
                </div>
            </article>

            <Comments postId={slug} />
        </main>
    );
}