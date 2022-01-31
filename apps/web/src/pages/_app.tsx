import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { RecoilRoot } from 'recoil';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    overflow: hidden;
  }
  * { -webkit-tab-highlight-color : rgba(0,0,0,0); }
  *:focus { -webkit-tab-highlight-color : rgba(0,0,0,0); }
`;

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default App;
