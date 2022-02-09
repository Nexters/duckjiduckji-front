import { TitleBar } from "./layout/TitleBar";
import { Login } from "./login/Login";

export function LoginPage() {
  return (
    <>
      <TitleBar isLogin={false} />
      <Login />
    </>
  );
}

export default LoginPage;
