import { TitleBar } from '../components/layout/TitleBar';
import { List } from './board/List';

function BoardPage() {
  return (
    <>
      <TitleBar isLogin={false} />
      <List />
    </>
  );
}

export default BoardPage;
