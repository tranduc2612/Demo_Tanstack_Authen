interface Filter {
    limit: number
    skip: number
    page: number
}


interface ResFilter<T> {
    limit: number,
    posts: T[]
    skip: number
    total: number
}


interface Blog {
    body: string,
    id: number,
    reactions: {likes: number, dislikes: number}
    tags: string[]
    title: string,
    userId: number,
    views: number
}

interface BlogPayload {
    title: string,
    userId: number
}