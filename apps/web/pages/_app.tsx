import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    overflow: hidden;
  }
`;

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <GlobalStyle />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default App;
