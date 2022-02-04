import { TitleBar } from "../components/layout/TitleBar";
import { Landing } from "../components/landing/Landing";

function Home() {
  return (
    <>
      <TitleBar isLogin={false} />
      <Landing />
    </>
  );
}

export default Home;
