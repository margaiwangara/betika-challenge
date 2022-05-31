import HeadBoy from '@components/HeadBoy';
import { Main } from './default-layout.styles';

type Props = {
  children: React.ReactNode;
  title?: string;
};

function DefaultLayout({ children, title }: Props) {
  return (
    <Main>
      <HeadBoy title={title} />
      {children}
    </Main>
  );
}

export default DefaultLayout;
