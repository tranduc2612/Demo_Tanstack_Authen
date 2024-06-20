import { Link, Outlet, createRootRoute, redirect, useRouter } from "@tanstack/react-router";
import { AuthContext, useAuth } from "../auth";
interface MyRouterContext {
  auth: AuthContext
}
const root = ()=>{
  const auth = useAuth()
  const router = useRouter()
  const navigate = Route.useNavigate()

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      auth.logout()
      await router.invalidate() // cập nhật lại trạng thái hiện tại của router
      await navigate({ to: '/login' })
    }
  }

  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/login" className="[&.active]:font-bold" style={{margin: "0 10px"}}>
          Login
        </Link>{' '}
        <Link to="/" className="[&.active]:font-bold" style={{margin: "0 10px"}}>
          Blogs
        </Link>
        {
          auth.isAuthenticated &&
          <button className="[&.active]:font-bold" style={{margin: "0 10px"}} onClick={handleLogout}>
            Logout
          </button>
        }
      </div>
      <hr />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  )
}

export const Route = createRootRoute<MyRouterContext>({
  beforeLoad: ({ context, location }: any) => {
    console.log(context.auth.isAuthenticated)
      if (!context.auth.isAuthenticated) {
        if(location.pathname !== '/login'){
          throw redirect({
            to: '/login',
            search: {
              redirect: location.href,
            },
          })
        }
      }
    },
    component: root,
    
  })





