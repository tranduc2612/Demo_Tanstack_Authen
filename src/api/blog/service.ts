import client from "../../axios";

export const fetchListBlogs = async (filter: Filter): Promise<ResFilter<Blog>> => {
    const data:ResFilter<Blog> = await client<ResFilter<Blog>>(`/posts?limit=${filter.limit}&skip=${filter.skip}`, {
        method: 'GET',
    })
    console.log(data);
    return data;
}

export const getBlog = async (id: string): Promise<Blog> => {
    const data:Blog = await client<Blog>(`/posts/${id}`, {
        method: 'GET',
    })
    console.log(data);
    return data;
}
export const createBlog = async (data: BlogPayload): Promise<ResFilter<Blog>> => {
    return await client<ResFilter<Blog>>('/post/add', {
        method: 'POST',
        data
    })
    
}