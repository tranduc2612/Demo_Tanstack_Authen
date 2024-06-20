import { redirect } from "@tanstack/react-router";

type User = {

}

const MiddleWare = ({ context, search,...props } :any) => {
    console.log(props);
    if (context.auth.isAuthenticated) {
      throw redirect({ to: props.path.pathname})
    }
  };

export default MiddleWare;