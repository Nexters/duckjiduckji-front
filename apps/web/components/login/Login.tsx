import styled from "styled-components";

import { LoginCard } from "./LoginCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background: #f3f3f4;
`;

export function Login() {
  return (
    <Wrapper>
      <LoginCard />
    </Wrapper>
  );
}

export default Login;
