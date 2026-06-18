"use client";

import { useState } from "react";
import { useGetProductsQuery, useGetCategoriesQuery, useAddToCartMutation } from "@/store/slices/apiSlice";

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

    const { data: products, isLoading, isFetching, error } = useGetProductsQuery(selectedCategory);
    const { data: categories } = useGetCategoriesQuery();

    const handleAddToCart = async (productId: number) => {
        try {
            await addToCart({
                userId: 1,
                date: new Date().toISOString().split('T')[0],
                products: [{ productId, quantity: 1 }]
            }).unwrap();

            alert("Item adicionado com sucesso!");
        } catch (err) {
            console.error("Erro ao adicionar:", err);
        }
    };

    if (isLoading) return <div className="text-center p-10 text-white">Carregando itens do Grimório...</div>;
    if (error) return <div className="text-center p-10 text-red-500">Erro ao carregar a loja.</div>;

    return (
        <main className="max-w-7xl mx-auto p-6 text-white">
            <h1 className="text-3xl font-bold mb-6">Loja do Grimório</h1>

            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                <button
                    onClick={() => setSelectedCategory("")}
                    className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${!selectedCategory
                        ? "bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                        : "border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-indigo-400"
                        }`}
                >
                    Todos
                </button>
                {categories?.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${selectedCategory === cat 
                        ? "bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                        : "border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-indigo-400"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {isFetching && <p className="text-sm text-white-400 mb-2">Carregando lista...</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products?.map((product) => (
                    <div key={product.id} className="bg-white dark:bg-[#0c0b24] border border-slate-100 dark:border-slate-900 p-4 rounded-xl flex flex-col justify-between shadow-sm transition-all hover:border-indigo-400/50">
                        <div>
                            <div className="w-full h-48 bg-white rounded-lg p-4 flex items-center justify-center mb-4 mix-blend-multiply dark:mix-blend-normal">
                                <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
                            </div>
                            <h2 className="font-semibold text-base line-clamp-2 text-slate-900 dark:text-slate-100">{product.title}</h2>
                            <p className="text-indigo-500 dark:text-indigo-400 font-bold mt-2">${product.price.toFixed(2)}</p>
                        </div>

                        <button
                            onClick={() => handleAddToCart(product.id)}
                            disabled={isAdding}
                            className="mt-4 w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors disabled:opacity-50 font-medium"
                        >
                            {isAdding ? "Enviando ao Carrinho..." : "Adicionar ao Carrinho"}
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}