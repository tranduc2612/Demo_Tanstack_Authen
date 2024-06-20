import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query"
import { BLOG_KEY } from "../../queryKeys"
import { fetchLogin } from "./service"

export const useLogin = (
    input: LoginPayload,
    options?: UseQueryOptions<
    Account,
    Error,
    Account,
    QueryKey
    >,
) => {
    const queryOptions: UseQueryOptions<
        Account,
        Error,
        Account,
        QueryKey
    > = {
        queryKey: [BLOG_KEY,input],
        queryFn: async () => {
            // Ensure fetchLogin returns an Account object
            const account: Account = await fetchLogin(input) 
            return account
        },
       ...options,
    }
    return useQuery<Account,Error>(queryOptions)
}