import { QueryKey, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query"
import { createBlog, fetchListBlogs, getBlog } from "./service"
import { BLOG_KEY } from "../../queryKeys"

export const useFetchListBlogs = (
    filter: Filter,
    options?: UseQueryOptions<
    ResFilter<Blog>,
    Error,
    ResFilter<Blog>,
    QueryKey
    >,
) => {
    const queryOptions: UseQueryOptions<
        ResFilter<Blog>,
        Error,
        ResFilter<Blog>,
        QueryKey
    > = {
        queryKey: [BLOG_KEY, filter.page],
        queryFn: async () => {
            const response = await fetchListBlogs(filter)
            return response
            // .map(item => {
            //     const credit: Blog = {
            //         id: item.id,
            //         title: item.title,
            //     }
            //     return credit
            // })
        },
        ...options,
    }
    return useQuery<ResFilter<Blog>,Error>(queryOptions)
}

export const useFetchBlog = (
    id: string,
    options?: UseQueryOptions<
    Blog,
    Error,
    Blog,
    QueryKey
    >,
) => {
    const queryOptions: UseQueryOptions<
        Blog,
        Error,
        Blog,
        QueryKey
    > = {
        queryKey: [BLOG_KEY, id],
        queryFn: async () => {
            const response = await getBlog(id)
            return response
            // .map(item => {
            //     const credit: Blog = {
            //         id: item.id,
            //         title: item.title,
            //     }
            //     return credit
            // })
        },
        ...options,
    }
    return useQuery<Blog,Error>(queryOptions)
}


export const useCreateBlog = (
    options?: UseMutationOptions<
        Blog,
        Error,
        BlogPayload
    >,
) => {
    return useMutation<Blog, Error, BlogPayload>({
        mutationFn: async (input: BlogPayload) => {
            return await createBlog(input)
        },
        ...options,
    } as UseMutationOptions<
        Blog,
        Error,
        BlogPayload
    >)
}