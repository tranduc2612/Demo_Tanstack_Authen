import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCreateBlog, useFetchListBlogs } from "../../api/blog/hooks";

function Index() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate()
  const { isPending, isError, data, error } = useFetchListBlogs({
    limit: 10,
    skip: page * 10,
    page: page,
  });
  const created = useCreateBlog();
  const [value, setValue] = useState({
    id: 1,
    title: "",
    userId: 1,
  });
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleCreate = () => {
    created.mutate({
      title: value.title,
      userId: value.id,
    });
  };

  // We can assume by this point that `isSuccess === true`
  return (
    <>
      <form>
        <label htmlFor="">id</label>
        <input
          type="number"
          value={value.id}
          onChange={(event) =>
            setValue({
              ...value,
              id: Number(event.target.value),
            })
          }
        />
        <br />
        <label htmlFor="">tilte</label>
        <input
          type="text"
          value={value.title}
          onChange={(event) =>
            setValue({
              ...value,
              title: event.target.value,
            })
          }
        />

        <button type="button" onClick={handleCreate}>
          Create
        </button>
      </form>
      <ul>
        {data && data.posts.map((todo) => <li key={todo.id} onClick={()=>{navigate({ to: '/blog/$postId', params: { postId: todo.id } })}}>{todo.title}</li>)}
        <button
          onClick={() => {
            if (page === 0) {
              return;
            }
            setPage(page - 1);
          }}
        >
          prev
        </button>

        <button
          onClick={() => {
            setPage(page + 1);
          }}
        >
          next
        </button>
      </ul>
    </>
  );
}

export const Route = createFileRoute("/blog/")({
  component: Index,
  loader: () => {
    return <>hihihihihi...........</>;
  },
});

export default Route;
