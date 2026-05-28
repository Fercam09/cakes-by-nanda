import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { AjustarStockBody, CalendarioDia, Compra, Configuracion, Costeo, CreateCompraBody, CreateCosteoBody, CreateFechaBloqueadaBody, CreateGastoBody, CreateIngredienteBody, CreatePedidoBody, CreatePedidoPublico201, CreatePedidoPublicoBody, CreateProduccionBody, CreateProductoBody, CreateRecetaBody, DashboardResumen, ErrorEnvelope, FechaBloqueada, Gasto, GastosResumen, GetGastosResumenParams, HealthStatus, Ingrediente, ListGastosParams, ListPedidosParams, MenuPublico, Pedido, PedidoPublico, Produccion, Producto, Receta, SetComprobantePublicoBody, UpdateEstadoBody, UpdatePasosCompletados200, UpdatePasosCompletadosBody, UploadUrlRequest, UploadUrlResponse } from "./api.schemas";
import { customFetch } from "../custom-fetch";
import type { ErrorType, BodyType } from "../custom-fetch";
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
/**
 * @summary Health check
 */
export declare const getHealthCheckUrl: () => string;
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List all orders
 */
export declare const getListPedidosUrl: (params?: ListPedidosParams) => string;
export declare const listPedidos: (params?: ListPedidosParams, options?: RequestInit) => Promise<Pedido[]>;
export declare const getListPedidosQueryKey: (params?: ListPedidosParams) => readonly ["/api/pedidos", ...ListPedidosParams[]];
export declare const getListPedidosQueryOptions: <TData = Awaited<ReturnType<typeof listPedidos>>, TError = ErrorType<unknown>>(params?: ListPedidosParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listPedidos>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listPedidos>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListPedidosQueryResult = NonNullable<Awaited<ReturnType<typeof listPedidos>>>;
export type ListPedidosQueryError = ErrorType<unknown>;
/**
 * @summary List all orders
 */
export declare function useListPedidos<TData = Awaited<ReturnType<typeof listPedidos>>, TError = ErrorType<unknown>>(params?: ListPedidosParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listPedidos>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a new order
 */
export declare const getCreatePedidoUrl: () => string;
export declare const createPedido: (createPedidoBody: CreatePedidoBody, options?: RequestInit) => Promise<Pedido>;
export declare const getCreatePedidoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createPedido>>, TError, {
        data: BodyType<CreatePedidoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createPedido>>, TError, {
    data: BodyType<CreatePedidoBody>;
}, TContext>;
export type CreatePedidoMutationResult = NonNullable<Awaited<ReturnType<typeof createPedido>>>;
export type CreatePedidoMutationBody = BodyType<CreatePedidoBody>;
export type CreatePedidoMutationError = ErrorType<unknown>;
/**
 * @summary Create a new order
 */
export declare const useCreatePedido: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createPedido>>, TError, {
        data: BodyType<CreatePedidoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createPedido>>, TError, {
    data: BodyType<CreatePedidoBody>;
}, TContext>;
/**
 * @summary Get order by ID
 */
export declare const getGetPedidoUrl: (id: number) => string;
export declare const getPedido: (id: number, options?: RequestInit) => Promise<Pedido>;
export declare const getGetPedidoQueryKey: (id: number) => readonly [`/api/pedidos/${number}`];
export declare const getGetPedidoQueryOptions: <TData = Awaited<ReturnType<typeof getPedido>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPedido>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getPedido>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetPedidoQueryResult = NonNullable<Awaited<ReturnType<typeof getPedido>>>;
export type GetPedidoQueryError = ErrorType<void>;
/**
 * @summary Get order by ID
 */
export declare function useGetPedido<TData = Awaited<ReturnType<typeof getPedido>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPedido>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update an order
 */
export declare const getUpdatePedidoUrl: (id: number) => string;
export declare const updatePedido: (id: number, createPedidoBody: CreatePedidoBody, options?: RequestInit) => Promise<Pedido>;
export declare const getUpdatePedidoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updatePedido>>, TError, {
        id: number;
        data: BodyType<CreatePedidoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updatePedido>>, TError, {
    id: number;
    data: BodyType<CreatePedidoBody>;
}, TContext>;
export type UpdatePedidoMutationResult = NonNullable<Awaited<ReturnType<typeof updatePedido>>>;
export type UpdatePedidoMutationBody = BodyType<CreatePedidoBody>;
export type UpdatePedidoMutationError = ErrorType<unknown>;
/**
 * @summary Update an order
 */
export declare const useUpdatePedido: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updatePedido>>, TError, {
        id: number;
        data: BodyType<CreatePedidoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updatePedido>>, TError, {
    id: number;
    data: BodyType<CreatePedidoBody>;
}, TContext>;
/**
 * @summary Delete an order
 */
export declare const getDeletePedidoUrl: (id: number) => string;
export declare const deletePedido: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeletePedidoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deletePedido>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deletePedido>>, TError, {
    id: number;
}, TContext>;
export type DeletePedidoMutationResult = NonNullable<Awaited<ReturnType<typeof deletePedido>>>;
export type DeletePedidoMutationError = ErrorType<unknown>;
/**
 * @summary Delete an order
 */
export declare const useDeletePedido: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deletePedido>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deletePedido>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary Update order status
 */
export declare const getUpdatePedidoEstadoUrl: (id: number) => string;
export declare const updatePedidoEstado: (id: number, updateEstadoBody: UpdateEstadoBody, options?: RequestInit) => Promise<Pedido>;
export declare const getUpdatePedidoEstadoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updatePedidoEstado>>, TError, {
        id: number;
        data: BodyType<UpdateEstadoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updatePedidoEstado>>, TError, {
    id: number;
    data: BodyType<UpdateEstadoBody>;
}, TContext>;
export type UpdatePedidoEstadoMutationResult = NonNullable<Awaited<ReturnType<typeof updatePedidoEstado>>>;
export type UpdatePedidoEstadoMutationBody = BodyType<UpdateEstadoBody>;
export type UpdatePedidoEstadoMutationError = ErrorType<unknown>;
/**
 * @summary Update order status
 */
export declare const useUpdatePedidoEstado: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updatePedidoEstado>>, TError, {
        id: number;
        data: BodyType<UpdateEstadoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updatePedidoEstado>>, TError, {
    id: number;
    data: BodyType<UpdateEstadoBody>;
}, TContext>;
/**
 * @summary List all products
 */
export declare const getListProductosUrl: () => string;
export declare const listProductos: (options?: RequestInit) => Promise<Producto[]>;
export declare const getListProductosQueryKey: () => readonly ["/api/productos"];
export declare const getListProductosQueryOptions: <TData = Awaited<ReturnType<typeof listProductos>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProductos>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listProductos>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListProductosQueryResult = NonNullable<Awaited<ReturnType<typeof listProductos>>>;
export type ListProductosQueryError = ErrorType<unknown>;
/**
 * @summary List all products
 */
export declare function useListProductos<TData = Awaited<ReturnType<typeof listProductos>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProductos>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a new product
 */
export declare const getCreateProductoUrl: () => string;
export declare const createProducto: (createProductoBody: CreateProductoBody, options?: RequestInit) => Promise<Producto>;
export declare const getCreateProductoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProducto>>, TError, {
        data: BodyType<CreateProductoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createProducto>>, TError, {
    data: BodyType<CreateProductoBody>;
}, TContext>;
export type CreateProductoMutationResult = NonNullable<Awaited<ReturnType<typeof createProducto>>>;
export type CreateProductoMutationBody = BodyType<CreateProductoBody>;
export type CreateProductoMutationError = ErrorType<unknown>;
/**
 * @summary Create a new product
 */
export declare const useCreateProducto: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProducto>>, TError, {
        data: BodyType<CreateProductoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createProducto>>, TError, {
    data: BodyType<CreateProductoBody>;
}, TContext>;
/**
 * @summary Get product by ID
 */
export declare const getGetProductoUrl: (id: number) => string;
export declare const getProducto: (id: number, options?: RequestInit) => Promise<Producto>;
export declare const getGetProductoQueryKey: (id: number) => readonly [`/api/productos/${number}`];
export declare const getGetProductoQueryOptions: <TData = Awaited<ReturnType<typeof getProducto>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProducto>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProducto>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProductoQueryResult = NonNullable<Awaited<ReturnType<typeof getProducto>>>;
export type GetProductoQueryError = ErrorType<unknown>;
/**
 * @summary Get product by ID
 */
export declare function useGetProducto<TData = Awaited<ReturnType<typeof getProducto>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProducto>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update a product
 */
export declare const getUpdateProductoUrl: (id: number) => string;
export declare const updateProducto: (id: number, createProductoBody: CreateProductoBody, options?: RequestInit) => Promise<Producto>;
export declare const getUpdateProductoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProducto>>, TError, {
        id: number;
        data: BodyType<CreateProductoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateProducto>>, TError, {
    id: number;
    data: BodyType<CreateProductoBody>;
}, TContext>;
export type UpdateProductoMutationResult = NonNullable<Awaited<ReturnType<typeof updateProducto>>>;
export type UpdateProductoMutationBody = BodyType<CreateProductoBody>;
export type UpdateProductoMutationError = ErrorType<unknown>;
/**
 * @summary Update a product
 */
export declare const useUpdateProducto: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProducto>>, TError, {
        id: number;
        data: BodyType<CreateProductoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateProducto>>, TError, {
    id: number;
    data: BodyType<CreateProductoBody>;
}, TContext>;
/**
 * @summary Delete a product
 */
export declare const getDeleteProductoUrl: (id: number) => string;
export declare const deleteProducto: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteProductoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteProducto>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteProducto>>, TError, {
    id: number;
}, TContext>;
export type DeleteProductoMutationResult = NonNullable<Awaited<ReturnType<typeof deleteProducto>>>;
export type DeleteProductoMutationError = ErrorType<unknown>;
/**
 * @summary Delete a product
 */
export declare const useDeleteProducto: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteProducto>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteProducto>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary List all recipes
 */
export declare const getListRecetasUrl: () => string;
export declare const listRecetas: (options?: RequestInit) => Promise<Receta[]>;
export declare const getListRecetasQueryKey: () => readonly ["/api/recetas"];
export declare const getListRecetasQueryOptions: <TData = Awaited<ReturnType<typeof listRecetas>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listRecetas>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listRecetas>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListRecetasQueryResult = NonNullable<Awaited<ReturnType<typeof listRecetas>>>;
export type ListRecetasQueryError = ErrorType<unknown>;
/**
 * @summary List all recipes
 */
export declare function useListRecetas<TData = Awaited<ReturnType<typeof listRecetas>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listRecetas>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a new recipe
 */
export declare const getCreateRecetaUrl: () => string;
export declare const createReceta: (createRecetaBody: CreateRecetaBody, options?: RequestInit) => Promise<Receta>;
export declare const getCreateRecetaMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createReceta>>, TError, {
        data: BodyType<CreateRecetaBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createReceta>>, TError, {
    data: BodyType<CreateRecetaBody>;
}, TContext>;
export type CreateRecetaMutationResult = NonNullable<Awaited<ReturnType<typeof createReceta>>>;
export type CreateRecetaMutationBody = BodyType<CreateRecetaBody>;
export type CreateRecetaMutationError = ErrorType<unknown>;
/**
 * @summary Create a new recipe
 */
export declare const useCreateReceta: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createReceta>>, TError, {
        data: BodyType<CreateRecetaBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createReceta>>, TError, {
    data: BodyType<CreateRecetaBody>;
}, TContext>;
/**
 * @summary Get recipe by ID
 */
export declare const getGetRecetaUrl: (id: number) => string;
export declare const getReceta: (id: number, options?: RequestInit) => Promise<Receta>;
export declare const getGetRecetaQueryKey: (id: number) => readonly [`/api/recetas/${number}`];
export declare const getGetRecetaQueryOptions: <TData = Awaited<ReturnType<typeof getReceta>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getReceta>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getReceta>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetRecetaQueryResult = NonNullable<Awaited<ReturnType<typeof getReceta>>>;
export type GetRecetaQueryError = ErrorType<unknown>;
/**
 * @summary Get recipe by ID
 */
export declare function useGetReceta<TData = Awaited<ReturnType<typeof getReceta>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getReceta>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update a recipe
 */
export declare const getUpdateRecetaUrl: (id: number) => string;
export declare const updateReceta: (id: number, createRecetaBody: CreateRecetaBody, options?: RequestInit) => Promise<Receta>;
export declare const getUpdateRecetaMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateReceta>>, TError, {
        id: number;
        data: BodyType<CreateRecetaBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateReceta>>, TError, {
    id: number;
    data: BodyType<CreateRecetaBody>;
}, TContext>;
export type UpdateRecetaMutationResult = NonNullable<Awaited<ReturnType<typeof updateReceta>>>;
export type UpdateRecetaMutationBody = BodyType<CreateRecetaBody>;
export type UpdateRecetaMutationError = ErrorType<unknown>;
/**
 * @summary Update a recipe
 */
export declare const useUpdateReceta: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateReceta>>, TError, {
        id: number;
        data: BodyType<CreateRecetaBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateReceta>>, TError, {
    id: number;
    data: BodyType<CreateRecetaBody>;
}, TContext>;
/**
 * @summary Delete a recipe
 */
export declare const getDeleteRecetaUrl: (id: number) => string;
export declare const deleteReceta: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteRecetaMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteReceta>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteReceta>>, TError, {
    id: number;
}, TContext>;
export type DeleteRecetaMutationResult = NonNullable<Awaited<ReturnType<typeof deleteReceta>>>;
export type DeleteRecetaMutationError = ErrorType<unknown>;
/**
 * @summary Delete a recipe
 */
export declare const useDeleteReceta: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteReceta>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteReceta>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary List production checklists
 */
export declare const getListProduccionUrl: () => string;
export declare const listProduccion: (options?: RequestInit) => Promise<Produccion[]>;
export declare const getListProduccionQueryKey: () => readonly ["/api/produccion"];
export declare const getListProduccionQueryOptions: <TData = Awaited<ReturnType<typeof listProduccion>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProduccion>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listProduccion>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListProduccionQueryResult = NonNullable<Awaited<ReturnType<typeof listProduccion>>>;
export type ListProduccionQueryError = ErrorType<unknown>;
/**
 * @summary List production checklists
 */
export declare function useListProduccion<TData = Awaited<ReturnType<typeof listProduccion>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProduccion>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create production checklist for an order
 */
export declare const getCreateProduccionUrl: () => string;
export declare const createProduccion: (createProduccionBody: CreateProduccionBody, options?: RequestInit) => Promise<Produccion>;
export declare const getCreateProduccionMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProduccion>>, TError, {
        data: BodyType<CreateProduccionBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createProduccion>>, TError, {
    data: BodyType<CreateProduccionBody>;
}, TContext>;
export type CreateProduccionMutationResult = NonNullable<Awaited<ReturnType<typeof createProduccion>>>;
export type CreateProduccionMutationBody = BodyType<CreateProduccionBody>;
export type CreateProduccionMutationError = ErrorType<unknown>;
/**
 * @summary Create production checklist for an order
 */
export declare const useCreateProduccion: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProduccion>>, TError, {
        data: BodyType<CreateProduccionBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createProduccion>>, TError, {
    data: BodyType<CreateProduccionBody>;
}, TContext>;
/**
 * @summary Update production checklist
 */
export declare const getUpdateProduccionUrl: (id: number) => string;
export declare const updateProduccion: (id: number, createProduccionBody: CreateProduccionBody, options?: RequestInit) => Promise<Produccion>;
export declare const getUpdateProduccionMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProduccion>>, TError, {
        id: number;
        data: BodyType<CreateProduccionBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateProduccion>>, TError, {
    id: number;
    data: BodyType<CreateProduccionBody>;
}, TContext>;
export type UpdateProduccionMutationResult = NonNullable<Awaited<ReturnType<typeof updateProduccion>>>;
export type UpdateProduccionMutationBody = BodyType<CreateProduccionBody>;
export type UpdateProduccionMutationError = ErrorType<unknown>;
/**
 * @summary Update production checklist
 */
export declare const useUpdateProduccion: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProduccion>>, TError, {
        id: number;
        data: BodyType<CreateProduccionBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateProduccion>>, TError, {
    id: number;
    data: BodyType<CreateProduccionBody>;
}, TContext>;
/**
 * @summary List shopping list items
 */
export declare const getListComprasUrl: () => string;
export declare const listCompras: (options?: RequestInit) => Promise<Compra[]>;
export declare const getListComprasQueryKey: () => readonly ["/api/compras"];
export declare const getListComprasQueryOptions: <TData = Awaited<ReturnType<typeof listCompras>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCompras>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listCompras>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListComprasQueryResult = NonNullable<Awaited<ReturnType<typeof listCompras>>>;
export type ListComprasQueryError = ErrorType<unknown>;
/**
 * @summary List shopping list items
 */
export declare function useListCompras<TData = Awaited<ReturnType<typeof listCompras>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCompras>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Add an item to the shopping list
 */
export declare const getCreateCompraUrl: () => string;
export declare const createCompra: (createCompraBody: CreateCompraBody, options?: RequestInit) => Promise<Compra>;
export declare const getCreateCompraMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCompra>>, TError, {
        data: BodyType<CreateCompraBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createCompra>>, TError, {
    data: BodyType<CreateCompraBody>;
}, TContext>;
export type CreateCompraMutationResult = NonNullable<Awaited<ReturnType<typeof createCompra>>>;
export type CreateCompraMutationBody = BodyType<CreateCompraBody>;
export type CreateCompraMutationError = ErrorType<unknown>;
/**
 * @summary Add an item to the shopping list
 */
export declare const useCreateCompra: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCompra>>, TError, {
        data: BodyType<CreateCompraBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createCompra>>, TError, {
    data: BodyType<CreateCompraBody>;
}, TContext>;
/**
 * @summary Update a shopping list item
 */
export declare const getUpdateCompraUrl: (id: number) => string;
export declare const updateCompra: (id: number, createCompraBody: CreateCompraBody, options?: RequestInit) => Promise<Compra>;
export declare const getUpdateCompraMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateCompra>>, TError, {
        id: number;
        data: BodyType<CreateCompraBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateCompra>>, TError, {
    id: number;
    data: BodyType<CreateCompraBody>;
}, TContext>;
export type UpdateCompraMutationResult = NonNullable<Awaited<ReturnType<typeof updateCompra>>>;
export type UpdateCompraMutationBody = BodyType<CreateCompraBody>;
export type UpdateCompraMutationError = ErrorType<unknown>;
/**
 * @summary Update a shopping list item
 */
export declare const useUpdateCompra: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateCompra>>, TError, {
        id: number;
        data: BodyType<CreateCompraBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateCompra>>, TError, {
    id: number;
    data: BodyType<CreateCompraBody>;
}, TContext>;
/**
 * @summary Delete a shopping list item
 */
export declare const getDeleteCompraUrl: (id: number) => string;
export declare const deleteCompra: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteCompraMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteCompra>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteCompra>>, TError, {
    id: number;
}, TContext>;
export type DeleteCompraMutationResult = NonNullable<Awaited<ReturnType<typeof deleteCompra>>>;
export type DeleteCompraMutationError = ErrorType<unknown>;
/**
 * @summary Delete a shopping list item
 */
export declare const useDeleteCompra: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteCompra>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteCompra>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary List expenses, optionally filtered by month
 */
export declare const getListGastosUrl: (params?: ListGastosParams) => string;
export declare const listGastos: (params?: ListGastosParams, options?: RequestInit) => Promise<Gasto[]>;
export declare const getListGastosQueryKey: (params?: ListGastosParams) => readonly ["/api/gastos", ...ListGastosParams[]];
export declare const getListGastosQueryOptions: <TData = Awaited<ReturnType<typeof listGastos>>, TError = ErrorType<unknown>>(params?: ListGastosParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listGastos>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listGastos>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListGastosQueryResult = NonNullable<Awaited<ReturnType<typeof listGastos>>>;
export type ListGastosQueryError = ErrorType<unknown>;
/**
 * @summary List expenses, optionally filtered by month
 */
export declare function useListGastos<TData = Awaited<ReturnType<typeof listGastos>>, TError = ErrorType<unknown>>(params?: ListGastosParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listGastos>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Add an expense
 */
export declare const getCreateGastoUrl: () => string;
export declare const createGasto: (createGastoBody: CreateGastoBody, options?: RequestInit) => Promise<Gasto>;
export declare const getCreateGastoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createGasto>>, TError, {
        data: BodyType<CreateGastoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createGasto>>, TError, {
    data: BodyType<CreateGastoBody>;
}, TContext>;
export type CreateGastoMutationResult = NonNullable<Awaited<ReturnType<typeof createGasto>>>;
export type CreateGastoMutationBody = BodyType<CreateGastoBody>;
export type CreateGastoMutationError = ErrorType<unknown>;
/**
 * @summary Add an expense
 */
export declare const useCreateGasto: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createGasto>>, TError, {
        data: BodyType<CreateGastoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createGasto>>, TError, {
    data: BodyType<CreateGastoBody>;
}, TContext>;
/**
 * @summary Delete an expense
 */
export declare const getDeleteGastoUrl: (id: number) => string;
export declare const deleteGasto: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteGastoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteGasto>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteGasto>>, TError, {
    id: number;
}, TContext>;
export type DeleteGastoMutationResult = NonNullable<Awaited<ReturnType<typeof deleteGasto>>>;
export type DeleteGastoMutationError = ErrorType<unknown>;
/**
 * @summary Delete an expense
 */
export declare const useDeleteGasto: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteGasto>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteGasto>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary Get monthly profit/loss summary (sales - expenses)
 */
export declare const getGetGastosResumenUrl: (params?: GetGastosResumenParams) => string;
export declare const getGastosResumen: (params?: GetGastosResumenParams, options?: RequestInit) => Promise<GastosResumen>;
export declare const getGetGastosResumenQueryKey: (params?: GetGastosResumenParams) => readonly ["/api/gastos/resumen", ...GetGastosResumenParams[]];
export declare const getGetGastosResumenQueryOptions: <TData = Awaited<ReturnType<typeof getGastosResumen>>, TError = ErrorType<unknown>>(params?: GetGastosResumenParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getGastosResumen>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getGastosResumen>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetGastosResumenQueryResult = NonNullable<Awaited<ReturnType<typeof getGastosResumen>>>;
export type GetGastosResumenQueryError = ErrorType<unknown>;
/**
 * @summary Get monthly profit/loss summary (sales - expenses)
 */
export declare function useGetGastosResumen<TData = Awaited<ReturnType<typeof getGastosResumen>>, TError = ErrorType<unknown>>(params?: GetGastosResumenParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getGastosResumen>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get app configuration (sinpe info, etc.)
 */
export declare const getGetConfiguracionUrl: () => string;
export declare const getConfiguracion: (options?: RequestInit) => Promise<Configuracion>;
export declare const getGetConfiguracionQueryKey: () => readonly ["/api/configuracion"];
export declare const getGetConfiguracionQueryOptions: <TData = Awaited<ReturnType<typeof getConfiguracion>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getConfiguracion>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getConfiguracion>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetConfiguracionQueryResult = NonNullable<Awaited<ReturnType<typeof getConfiguracion>>>;
export type GetConfiguracionQueryError = ErrorType<unknown>;
/**
 * @summary Get app configuration (sinpe info, etc.)
 */
export declare function useGetConfiguracion<TData = Awaited<ReturnType<typeof getConfiguracion>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getConfiguracion>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update app configuration
 */
export declare const getUpdateConfiguracionUrl: () => string;
export declare const updateConfiguracion: (configuracion: Configuracion, options?: RequestInit) => Promise<Configuracion>;
export declare const getUpdateConfiguracionMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateConfiguracion>>, TError, {
        data: BodyType<Configuracion>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateConfiguracion>>, TError, {
    data: BodyType<Configuracion>;
}, TContext>;
export type UpdateConfiguracionMutationResult = NonNullable<Awaited<ReturnType<typeof updateConfiguracion>>>;
export type UpdateConfiguracionMutationBody = BodyType<Configuracion>;
export type UpdateConfiguracionMutationError = ErrorType<unknown>;
/**
 * @summary Update app configuration
 */
export declare const useUpdateConfiguracion: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateConfiguracion>>, TError, {
        data: BodyType<Configuracion>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateConfiguracion>>, TError, {
    data: BodyType<Configuracion>;
}, TContext>;
/**
 * @summary Update launch checklist completion state
 */
export declare const getUpdatePasosCompletadosUrl: () => string;
export declare const updatePasosCompletados: (updatePasosCompletadosBody: UpdatePasosCompletadosBody, options?: RequestInit) => Promise<UpdatePasosCompletados200>;
export declare const getUpdatePasosCompletadosMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updatePasosCompletados>>, TError, {
        data: BodyType<UpdatePasosCompletadosBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updatePasosCompletados>>, TError, {
    data: BodyType<UpdatePasosCompletadosBody>;
}, TContext>;
export type UpdatePasosCompletadosMutationResult = NonNullable<Awaited<ReturnType<typeof updatePasosCompletados>>>;
export type UpdatePasosCompletadosMutationBody = BodyType<UpdatePasosCompletadosBody>;
export type UpdatePasosCompletadosMutationError = ErrorType<unknown>;
/**
 * @summary Update launch checklist completion state
 */
export declare const useUpdatePasosCompletados: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updatePasosCompletados>>, TError, {
        data: BodyType<UpdatePasosCompletadosBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updatePasosCompletados>>, TError, {
    data: BodyType<UpdatePasosCompletadosBody>;
}, TContext>;
/**
 * @summary Adjust stock by a delta amount
 */
export declare const getAjustarStockIngredienteUrl: (id: number) => string;
export declare const ajustarStockIngrediente: (id: number, ajustarStockBody: AjustarStockBody, options?: RequestInit) => Promise<Ingrediente>;
export declare const getAjustarStockIngredienteMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof ajustarStockIngrediente>>, TError, {
        id: number;
        data: BodyType<AjustarStockBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof ajustarStockIngrediente>>, TError, {
    id: number;
    data: BodyType<AjustarStockBody>;
}, TContext>;
export type AjustarStockIngredienteMutationResult = NonNullable<Awaited<ReturnType<typeof ajustarStockIngrediente>>>;
export type AjustarStockIngredienteMutationBody = BodyType<AjustarStockBody>;
export type AjustarStockIngredienteMutationError = ErrorType<unknown>;
/**
 * @summary Adjust stock by a delta amount
 */
export declare const useAjustarStockIngrediente: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof ajustarStockIngrediente>>, TError, {
        id: number;
        data: BodyType<AjustarStockBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof ajustarStockIngrediente>>, TError, {
    id: number;
    data: BodyType<AjustarStockBody>;
}, TContext>;
/**
 * @summary List blocked delivery dates
 */
export declare const getListFechasBloqueadasUrl: () => string;
export declare const listFechasBloqueadas: (options?: RequestInit) => Promise<FechaBloqueada[]>;
export declare const getListFechasBloqueadasQueryKey: () => readonly ["/api/fechas-bloqueadas"];
export declare const getListFechasBloqueadasQueryOptions: <TData = Awaited<ReturnType<typeof listFechasBloqueadas>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listFechasBloqueadas>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listFechasBloqueadas>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListFechasBloqueadasQueryResult = NonNullable<Awaited<ReturnType<typeof listFechasBloqueadas>>>;
export type ListFechasBloqueadasQueryError = ErrorType<unknown>;
/**
 * @summary List blocked delivery dates
 */
export declare function useListFechasBloqueadas<TData = Awaited<ReturnType<typeof listFechasBloqueadas>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listFechasBloqueadas>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Block a delivery date
 */
export declare const getCreateFechaBloqueadaUrl: () => string;
export declare const createFechaBloqueada: (createFechaBloqueadaBody: CreateFechaBloqueadaBody, options?: RequestInit) => Promise<FechaBloqueada>;
export declare const getCreateFechaBloqueadaMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createFechaBloqueada>>, TError, {
        data: BodyType<CreateFechaBloqueadaBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createFechaBloqueada>>, TError, {
    data: BodyType<CreateFechaBloqueadaBody>;
}, TContext>;
export type CreateFechaBloqueadaMutationResult = NonNullable<Awaited<ReturnType<typeof createFechaBloqueada>>>;
export type CreateFechaBloqueadaMutationBody = BodyType<CreateFechaBloqueadaBody>;
export type CreateFechaBloqueadaMutationError = ErrorType<unknown>;
/**
 * @summary Block a delivery date
 */
export declare const useCreateFechaBloqueada: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createFechaBloqueada>>, TError, {
        data: BodyType<CreateFechaBloqueadaBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createFechaBloqueada>>, TError, {
    data: BodyType<CreateFechaBloqueadaBody>;
}, TContext>;
/**
 * @summary Unblock a delivery date
 */
export declare const getDeleteFechaBloqueadaUrl: (fecha: string) => string;
export declare const deleteFechaBloqueada: (fecha: string, options?: RequestInit) => Promise<void>;
export declare const getDeleteFechaBloqueadaMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteFechaBloqueada>>, TError, {
        fecha: string;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteFechaBloqueada>>, TError, {
    fecha: string;
}, TContext>;
export type DeleteFechaBloqueadaMutationResult = NonNullable<Awaited<ReturnType<typeof deleteFechaBloqueada>>>;
export type DeleteFechaBloqueadaMutationError = ErrorType<unknown>;
/**
 * @summary Unblock a delivery date
 */
export declare const useDeleteFechaBloqueada: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteFechaBloqueada>>, TError, {
        fecha: string;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteFechaBloqueada>>, TError, {
    fecha: string;
}, TContext>;
/**
 * @summary Request a presigned URL for file upload
 */
export declare const getRequestUploadUrlUrl: () => string;
export declare const requestUploadUrl: (uploadUrlRequest: UploadUrlRequest, options?: RequestInit) => Promise<UploadUrlResponse>;
export declare const getRequestUploadUrlMutationOptions: <TError = ErrorType<ErrorEnvelope>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof requestUploadUrl>>, TError, {
        data: BodyType<UploadUrlRequest>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof requestUploadUrl>>, TError, {
    data: BodyType<UploadUrlRequest>;
}, TContext>;
export type RequestUploadUrlMutationResult = NonNullable<Awaited<ReturnType<typeof requestUploadUrl>>>;
export type RequestUploadUrlMutationBody = BodyType<UploadUrlRequest>;
export type RequestUploadUrlMutationError = ErrorType<ErrorEnvelope>;
/**
 * @summary Request a presigned URL for file upload
 */
export declare const useRequestUploadUrl: <TError = ErrorType<ErrorEnvelope>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof requestUploadUrl>>, TError, {
        data: BodyType<UploadUrlRequest>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof requestUploadUrl>>, TError, {
    data: BodyType<UploadUrlRequest>;
}, TContext>;
/**
 * @summary Public menu — only active products + sinpe info
 */
export declare const getGetMenuPublicoUrl: () => string;
export declare const getMenuPublico: (options?: RequestInit) => Promise<MenuPublico>;
export declare const getGetMenuPublicoQueryKey: () => readonly ["/api/publico/menu"];
export declare const getGetMenuPublicoQueryOptions: <TData = Awaited<ReturnType<typeof getMenuPublico>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMenuPublico>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMenuPublico>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMenuPublicoQueryResult = NonNullable<Awaited<ReturnType<typeof getMenuPublico>>>;
export type GetMenuPublicoQueryError = ErrorType<unknown>;
/**
 * @summary Public menu — only active products + sinpe info
 */
export declare function useGetMenuPublico<TData = Awaited<ReturnType<typeof getMenuPublico>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMenuPublico>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create an order from the public site (enters as pendiente_aprobacion)
 */
export declare const getCreatePedidoPublicoUrl: () => string;
export declare const createPedidoPublico: (createPedidoPublicoBody: CreatePedidoPublicoBody, options?: RequestInit) => Promise<CreatePedidoPublico201>;
export declare const getCreatePedidoPublicoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createPedidoPublico>>, TError, {
        data: BodyType<CreatePedidoPublicoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createPedidoPublico>>, TError, {
    data: BodyType<CreatePedidoPublicoBody>;
}, TContext>;
export type CreatePedidoPublicoMutationResult = NonNullable<Awaited<ReturnType<typeof createPedidoPublico>>>;
export type CreatePedidoPublicoMutationBody = BodyType<CreatePedidoPublicoBody>;
export type CreatePedidoPublicoMutationError = ErrorType<unknown>;
/**
 * @summary Create an order from the public site (enters as pendiente_aprobacion)
 */
export declare const useCreatePedidoPublico: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createPedidoPublico>>, TError, {
        data: BodyType<CreatePedidoPublicoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createPedidoPublico>>, TError, {
    data: BodyType<CreatePedidoPublicoBody>;
}, TContext>;
/**
 * @summary Get an order's status by slug (sanitized)
 */
export declare const getGetPedidoPublicoUrl: (slug: string) => string;
export declare const getPedidoPublico: (slug: string, options?: RequestInit) => Promise<PedidoPublico>;
export declare const getGetPedidoPublicoQueryKey: (slug: string) => readonly [`/api/publico/pedidos/${string}`];
export declare const getGetPedidoPublicoQueryOptions: <TData = Awaited<ReturnType<typeof getPedidoPublico>>, TError = ErrorType<unknown>>(slug: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPedidoPublico>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getPedidoPublico>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetPedidoPublicoQueryResult = NonNullable<Awaited<ReturnType<typeof getPedidoPublico>>>;
export type GetPedidoPublicoQueryError = ErrorType<unknown>;
/**
 * @summary Get an order's status by slug (sanitized)
 */
export declare function useGetPedidoPublico<TData = Awaited<ReturnType<typeof getPedidoPublico>>, TError = ErrorType<unknown>>(slug: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPedidoPublico>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Customer marks Sinpe sent and provides reference
 */
export declare const getSetComprobantePublicoUrl: (slug: string) => string;
export declare const setComprobantePublico: (slug: string, setComprobantePublicoBody: SetComprobantePublicoBody, options?: RequestInit) => Promise<PedidoPublico>;
export declare const getSetComprobantePublicoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof setComprobantePublico>>, TError, {
        slug: string;
        data: BodyType<SetComprobantePublicoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof setComprobantePublico>>, TError, {
    slug: string;
    data: BodyType<SetComprobantePublicoBody>;
}, TContext>;
export type SetComprobantePublicoMutationResult = NonNullable<Awaited<ReturnType<typeof setComprobantePublico>>>;
export type SetComprobantePublicoMutationBody = BodyType<SetComprobantePublicoBody>;
export type SetComprobantePublicoMutationError = ErrorType<unknown>;
/**
 * @summary Customer marks Sinpe sent and provides reference
 */
export declare const useSetComprobantePublico: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof setComprobantePublico>>, TError, {
        slug: string;
        data: BodyType<SetComprobantePublicoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof setComprobantePublico>>, TError, {
    slug: string;
    data: BodyType<SetComprobantePublicoBody>;
}, TContext>;
/**
 * @summary Approve a customer-submitted pedido
 */
export declare const getAprobarPedidoUrl: (id: number) => string;
export declare const aprobarPedido: (id: number, options?: RequestInit) => Promise<Pedido>;
export declare const getAprobarPedidoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof aprobarPedido>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof aprobarPedido>>, TError, {
    id: number;
}, TContext>;
export type AprobarPedidoMutationResult = NonNullable<Awaited<ReturnType<typeof aprobarPedido>>>;
export type AprobarPedidoMutationError = ErrorType<unknown>;
/**
 * @summary Approve a customer-submitted pedido
 */
export declare const useAprobarPedido: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof aprobarPedido>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof aprobarPedido>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary Reject a customer-submitted pedido
 */
export declare const getRechazarPedidoUrl: (id: number) => string;
export declare const rechazarPedido: (id: number, options?: RequestInit) => Promise<Pedido>;
export declare const getRechazarPedidoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof rechazarPedido>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof rechazarPedido>>, TError, {
    id: number;
}, TContext>;
export type RechazarPedidoMutationResult = NonNullable<Awaited<ReturnType<typeof rechazarPedido>>>;
export type RechazarPedidoMutationError = ErrorType<unknown>;
/**
 * @summary Reject a customer-submitted pedido
 */
export declare const useRechazarPedido: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof rechazarPedido>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof rechazarPedido>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary List all saved costings
 */
export declare const getListCosteosUrl: () => string;
export declare const listCosteos: (options?: RequestInit) => Promise<Costeo[]>;
export declare const getListCosteosQueryKey: () => readonly ["/api/costeos"];
export declare const getListCosteosQueryOptions: <TData = Awaited<ReturnType<typeof listCosteos>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCosteos>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listCosteos>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListCosteosQueryResult = NonNullable<Awaited<ReturnType<typeof listCosteos>>>;
export type ListCosteosQueryError = ErrorType<unknown>;
/**
 * @summary List all saved costings
 */
export declare function useListCosteos<TData = Awaited<ReturnType<typeof listCosteos>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCosteos>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Save a new costing
 */
export declare const getCreateCosteoUrl: () => string;
export declare const createCosteo: (createCosteoBody: CreateCosteoBody, options?: RequestInit) => Promise<Costeo>;
export declare const getCreateCosteoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCosteo>>, TError, {
        data: BodyType<CreateCosteoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createCosteo>>, TError, {
    data: BodyType<CreateCosteoBody>;
}, TContext>;
export type CreateCosteoMutationResult = NonNullable<Awaited<ReturnType<typeof createCosteo>>>;
export type CreateCosteoMutationBody = BodyType<CreateCosteoBody>;
export type CreateCosteoMutationError = ErrorType<unknown>;
/**
 * @summary Save a new costing
 */
export declare const useCreateCosteo: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCosteo>>, TError, {
        data: BodyType<CreateCosteoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createCosteo>>, TError, {
    data: BodyType<CreateCosteoBody>;
}, TContext>;
/**
 * @summary Update a costing
 */
export declare const getUpdateCosteoUrl: (id: number) => string;
export declare const updateCosteo: (id: number, createCosteoBody: CreateCosteoBody, options?: RequestInit) => Promise<Costeo>;
export declare const getUpdateCosteoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateCosteo>>, TError, {
        id: number;
        data: BodyType<CreateCosteoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateCosteo>>, TError, {
    id: number;
    data: BodyType<CreateCosteoBody>;
}, TContext>;
export type UpdateCosteoMutationResult = NonNullable<Awaited<ReturnType<typeof updateCosteo>>>;
export type UpdateCosteoMutationBody = BodyType<CreateCosteoBody>;
export type UpdateCosteoMutationError = ErrorType<unknown>;
/**
 * @summary Update a costing
 */
export declare const useUpdateCosteo: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateCosteo>>, TError, {
        id: number;
        data: BodyType<CreateCosteoBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateCosteo>>, TError, {
    id: number;
    data: BodyType<CreateCosteoBody>;
}, TContext>;
/**
 * @summary Delete a costing
 */
export declare const getDeleteCosteoUrl: (id: number) => string;
export declare const deleteCosteo: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteCosteoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteCosteo>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteCosteo>>, TError, {
    id: number;
}, TContext>;
export type DeleteCosteoMutationResult = NonNullable<Awaited<ReturnType<typeof deleteCosteo>>>;
export type DeleteCosteoMutationError = ErrorType<unknown>;
/**
 * @summary Delete a costing
 */
export declare const useDeleteCosteo: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteCosteo>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteCosteo>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary List all ingredients in the catalog
 */
export declare const getListIngredientesUrl: () => string;
export declare const listIngredientes: (options?: RequestInit) => Promise<Ingrediente[]>;
export declare const getListIngredientesQueryKey: () => readonly ["/api/ingredientes"];
export declare const getListIngredientesQueryOptions: <TData = Awaited<ReturnType<typeof listIngredientes>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listIngredientes>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listIngredientes>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListIngredientesQueryResult = NonNullable<Awaited<ReturnType<typeof listIngredientes>>>;
export type ListIngredientesQueryError = ErrorType<unknown>;
/**
 * @summary List all ingredients in the catalog
 */
export declare function useListIngredientes<TData = Awaited<ReturnType<typeof listIngredientes>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listIngredientes>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Add a new ingredient to the catalog
 */
export declare const getCreateIngredienteUrl: () => string;
export declare const createIngrediente: (createIngredienteBody: CreateIngredienteBody, options?: RequestInit) => Promise<Ingrediente>;
export declare const getCreateIngredienteMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createIngrediente>>, TError, {
        data: BodyType<CreateIngredienteBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createIngrediente>>, TError, {
    data: BodyType<CreateIngredienteBody>;
}, TContext>;
export type CreateIngredienteMutationResult = NonNullable<Awaited<ReturnType<typeof createIngrediente>>>;
export type CreateIngredienteMutationBody = BodyType<CreateIngredienteBody>;
export type CreateIngredienteMutationError = ErrorType<unknown>;
/**
 * @summary Add a new ingredient to the catalog
 */
export declare const useCreateIngrediente: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createIngrediente>>, TError, {
        data: BodyType<CreateIngredienteBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createIngrediente>>, TError, {
    data: BodyType<CreateIngredienteBody>;
}, TContext>;
/**
 * @summary Update an ingredient
 */
export declare const getUpdateIngredienteUrl: (id: number) => string;
export declare const updateIngrediente: (id: number, createIngredienteBody: CreateIngredienteBody, options?: RequestInit) => Promise<Ingrediente>;
export declare const getUpdateIngredienteMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateIngrediente>>, TError, {
        id: number;
        data: BodyType<CreateIngredienteBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateIngrediente>>, TError, {
    id: number;
    data: BodyType<CreateIngredienteBody>;
}, TContext>;
export type UpdateIngredienteMutationResult = NonNullable<Awaited<ReturnType<typeof updateIngrediente>>>;
export type UpdateIngredienteMutationBody = BodyType<CreateIngredienteBody>;
export type UpdateIngredienteMutationError = ErrorType<unknown>;
/**
 * @summary Update an ingredient
 */
export declare const useUpdateIngrediente: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateIngrediente>>, TError, {
        id: number;
        data: BodyType<CreateIngredienteBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateIngrediente>>, TError, {
    id: number;
    data: BodyType<CreateIngredienteBody>;
}, TContext>;
/**
 * @summary Delete an ingredient
 */
export declare const getDeleteIngredienteUrl: (id: number) => string;
export declare const deleteIngrediente: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteIngredienteMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteIngrediente>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteIngrediente>>, TError, {
    id: number;
}, TContext>;
export type DeleteIngredienteMutationResult = NonNullable<Awaited<ReturnType<typeof deleteIngrediente>>>;
export type DeleteIngredienteMutationError = ErrorType<void>;
/**
 * @summary Delete an ingredient
 */
export declare const useDeleteIngrediente: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteIngrediente>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteIngrediente>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary Get dashboard summary statistics
 */
export declare const getGetDashboardResumenUrl: () => string;
export declare const getDashboardResumen: (options?: RequestInit) => Promise<DashboardResumen>;
export declare const getGetDashboardResumenQueryKey: () => readonly ["/api/dashboard/resumen"];
export declare const getGetDashboardResumenQueryOptions: <TData = Awaited<ReturnType<typeof getDashboardResumen>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardResumen>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDashboardResumen>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDashboardResumenQueryResult = NonNullable<Awaited<ReturnType<typeof getDashboardResumen>>>;
export type GetDashboardResumenQueryError = ErrorType<unknown>;
/**
 * @summary Get dashboard summary statistics
 */
export declare function useGetDashboardResumen<TData = Awaited<ReturnType<typeof getDashboardResumen>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardResumen>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get today's orders and urgent deliveries
 */
export declare const getGetPedidosHoyUrl: () => string;
export declare const getPedidosHoy: (options?: RequestInit) => Promise<Pedido[]>;
export declare const getGetPedidosHoyQueryKey: () => readonly ["/api/dashboard/pedidos-hoy"];
export declare const getGetPedidosHoyQueryOptions: <TData = Awaited<ReturnType<typeof getPedidosHoy>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPedidosHoy>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getPedidosHoy>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetPedidosHoyQueryResult = NonNullable<Awaited<ReturnType<typeof getPedidosHoy>>>;
export type GetPedidosHoyQueryError = ErrorType<unknown>;
/**
 * @summary Get today's orders and urgent deliveries
 */
export declare function useGetPedidosHoy<TData = Awaited<ReturnType<typeof getPedidosHoy>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPedidosHoy>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get orders grouped by delivery date for calendar view
 */
export declare const getGetCalendarioUrl: () => string;
export declare const getCalendario: (options?: RequestInit) => Promise<CalendarioDia[]>;
export declare const getGetCalendarioQueryKey: () => readonly ["/api/dashboard/calendario"];
export declare const getGetCalendarioQueryOptions: <TData = Awaited<ReturnType<typeof getCalendario>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCalendario>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getCalendario>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetCalendarioQueryResult = NonNullable<Awaited<ReturnType<typeof getCalendario>>>;
export type GetCalendarioQueryError = ErrorType<unknown>;
/**
 * @summary Get orders grouped by delivery date for calendar view
 */
export declare function useGetCalendario<TData = Awaited<ReturnType<typeof getCalendario>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCalendario>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map