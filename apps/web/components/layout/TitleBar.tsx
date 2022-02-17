import styled from 'styled-components';

const Wrapper = styled.div`
  z-index: 100;

  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  position: absolute;

  height: 90px;
  width: 100%;

  background: #0f0b1b;

  section {
    margin: 10px 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const SmallLogo = styled.div`
  width: 93px;
  height: 22px;

  background-image: url('/assets/image/logo_small.svg');
`;

const NickName = styled.div`
  height: 24px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  /* identical to box height, or 133% */

  text-align: right;
  letter-spacing: 0.015em;

  color: #ffffff;
`;

const IconWrapper = styled.div<{ profileImage: string }>`
  width: 45px;
  height: 45px;

  border-radius: 48px;
  border: 1.5px solid #ffffff;

  margin: 0 20px;

  background-image: url(${props => props.profileImage});
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: bottom;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;

  width: 25px;
  height: 20px;

  background-image: url('/assets/image/arrow_down.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

type Props = {
  isLogin: boolean;
};

export const TitleBar = ({ isLogin }: Props) => {
  const onClick = () => {
    console.log('hello');
  };

  return (
    <Wrapper>
      <section>
        <SmallLogo />
      </section>
      {isLogin && (
        <section>
          <NickName>Jane Kim</NickName>
          <IconWrapper profileImage={'/assets/char/01.png'} />
          <Button onClick={onClick} />
        </section>
      )}
    </Wrapper>
  );
};

export default TitleBar;
