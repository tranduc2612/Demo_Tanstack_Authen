// @flow
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import * as React from "react";
import { fetchLogin } from "../api/auth/service";
import { useAuth } from "../auth";
type Props = {};
const Index = (props: Props) => {
  const [value, setValues] = React.useState<LoginPayload>({
    username: "emilys",
    password: "emilyspass",
  });
  const auth = useAuth()
  const router = useRouter()
  const search = Route.useSearch()
  const navigate = Route.useNavigate()

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nameField = event.target.getAttribute("name");

    if (typeof nameField !== "string") {
      return;
    }
    setValues({
      ...value,
      [nameField]: event.target.value,
    });
  };

  const handleLogin =  async () => {
    auth.login(value.username,value.password)
    .finally(()=>{
      router.invalidate()
      navigate({ to: "/blog" })
    })
    console.log("run")
  };

  return (
    <form>
      <label htmlFor="">Tài khoản</label>
      <input name="account" value={value.username} onChange={handleOnChange} />
      <label htmlFor="">Mật khẩu</label>
      <input name="password" value={value.password} onChange={handleOnChange} />
      <button type="button" onClick={handleLogin}>
        Đăng nhập
      </button>
    </form>
  );
};

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context, search }:any) => {
      console.log(context.auth.isAuthenticated)
      if (context.auth.isAuthenticated) {
        throw redirect({ to: search.redirect || "/blog" })
      }
    },
  component: Index,
  
});

export default Route;
