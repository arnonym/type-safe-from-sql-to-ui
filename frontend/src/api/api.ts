/**
 * Todo API
 * 0.0.1
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "@oazapfts/runtime";
import * as QS from "@oazapfts/runtime/query";
export const defaults: Oazapfts.Defaults<Oazapfts.CustomHeaders> = { headers: {}, baseUrl: "http://127.0.0.1:3000/" };
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    server1: "http://127.0.0.1:3000/"
};
export type Todo = {
    id: number;
    description: string;
    isComplete: boolean;
};
/**
 * Get all todos
 */
export function getTodos(opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Todo[];
    } | {
        status: 500;
        data: {
            defined: true;
            code: "INTERNAL_SERVER_ERROR";
            status: 500;
            message: string;
            data?: any;
        } | {
            defined: any;
            code: string;
            status: number;
            message: string;
            data?: any;
        };
    }>("/todos", {
        ...opts
    });
}
/**
 * Add a new todo item
 */
export function createTodo(body: {
    description: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Todo;
    } | {
        status: 500;
        data: {
            defined: true;
            code: "INTERNAL_SERVER_ERROR";
            status: 500;
            message: string;
            data?: any;
        } | {
            defined: any;
            code: string;
            status: number;
            message: string;
            data?: any;
        };
    }>("/todos", oazapfts.json({
        ...opts,
        method: "POST",
        body
    }));
}
/**
 * Update the description of a todo item
 */
export function updateTodo(id: number, body: {
    description: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Todo;
    } | {
        status: 404;
        data: {
            defined: true;
            code: "NOT_FOUND";
            status: 404;
            message: string;
            data?: any;
        } | {
            defined: any;
            code: string;
            status: number;
            message: string;
            data?: any;
        };
    } | {
        status: 500;
        data: {
            defined: true;
            code: "INTERNAL_SERVER_ERROR";
            status: 500;
            message: string;
            data?: any;
        } | {
            defined: any;
            code: string;
            status: number;
            message: string;
            data?: any;
        };
    }>(`/todos/${encodeURIComponent(id)}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body
    }));
}
/**
 * Delete a todo item
 */
export function deleteTodo(id: number, body?: {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: any | any;
    } | {
        status: 500;
        data: {
            defined: true;
            code: "INTERNAL_SERVER_ERROR";
            status: 500;
            message: string;
            data?: any;
        } | {
            defined: any;
            code: string;
            status: number;
            message: string;
            data?: any;
        };
    }>(`/todos/${encodeURIComponent(id)}`, oazapfts.json({
        ...opts,
        method: "DELETE",
        body
    }));
}
/**
 * Mark a todo item as complete or incomplete
 */
export function markTodo(id: number, body: {
    isComplete: boolean;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: Todo;
    } | {
        status: 404;
        data: {
            defined: true;
            code: "NOT_FOUND";
            status: 404;
            message: string;
            data?: any;
        } | {
            defined: any;
            code: string;
            status: number;
            message: string;
            data?: any;
        };
    } | {
        status: 500;
        data: {
            defined: true;
            code: "INTERNAL_SERVER_ERROR";
            status: 500;
            message: string;
            data?: any;
        } | {
            defined: any;
            code: string;
            status: number;
            message: string;
            data?: any;
        };
    }>(`/todos/${encodeURIComponent(id)}/mark`, oazapfts.json({
        ...opts,
        method: "PATCH",
        body
    }));
}
