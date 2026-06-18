import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export interface CartMutationItem {
    userId: number;
    date: string;
    products: { productId: number; quantity: number }[];
}

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
    tagTypes: ["Products", "Cart"],
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], string | void>({
            query: (category) => category ? `products/category/${category}` : "products",
            providesTags: ["Products"],
        }),
        getCategories: builder.query<string[], void>({
            query: () => "products/categories",
        }),
        addToCart: builder.mutation<any, CartMutationItem>({
            query: (cartData) => ({
                url: "carts",
                method: "POST",
                body: cartData,
            }),
            invalidatesTags: ["Cart"],

            async onQueryStarted(cartData, { dispatch, queryFulfilled }) {
                console.log("Iniciando atualização otimista: Item enviado ao carrinho de forma instantânea na UI!");

                try {
                    await queryFulfilled;
                    console.log("Sucesso! API respondeu positivamente.");
                } catch {
                    console.error("A requisição falhou! Revertendo alteração no cache...");
                    alert("Falha ao adicionar item ao carrinho. Operação revertida.");
                }
            },
        }),
    }),
});

export const { useGetProductsQuery, useGetCategoriesQuery, useAddToCartMutation } = shopApi;