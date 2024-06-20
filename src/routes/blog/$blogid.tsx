import { MatchRoute, createFileRoute, useParams } from '@tanstack/react-router'
import { useFetchBlog } from '../../api/blog/hooks';

export const Route = createFileRoute('/blog/$blogid')({
  component: () => {
    const { blogid } = useParams({ strict: false })
    const { isPending, isError, data, error } = useFetchBlog(blogid);
    if (isPending) {
      return <span>Loading...</span>;
    }
  
    if (isError) {
      return <span>Error: {error.message}</span>;
    }

    console.log(data)

    return <div>
      {/* <div>param : {blogid}</div>
      <MatchRoute to="/blog/2" pending>
            {(match) => {
              return match ? <div>Khớp router</div> : <div>Không khớp router /2</div>
            }}
        </MatchRoute> */}
      <div>
        id: {data.id}
        <br />
        title: {data.title}
      </div>

    </div>
  }
})