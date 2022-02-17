import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #0f0b1b;
`;

const MainText = styled.span`
  width: 888px;
  height: 160px;
  margin: 32px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  line-height: 80px;

  text-align: center;
  letter-spacing: 0.015em;

  color: #f3f3f4;
`;

const SubText = styled.span`
  width: 888px;
  height: 72px;

  margin-bottom: 56px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;

  text-align: center;
  letter-spacing: 0.015em;

  color: #a09fa6;
`;

const LinkButton = styled.button`
  border: none;
  align-items: center;
  padding: 16px 36px;

  width: 202px;
  height: 64px;

  background: #6038ff;
  border-radius: 32px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;

  text-align: center;
  letter-spacing: 0.015em;

  color: #ffffff;
`;

export function Landing() {
  return (
    <Wrapper>
      <MainText>
        덕지덕지 붙여봐요!
        <br />
        우리만의 추억을 담는 콜렉트북
      </MainText>
      <SubText>
        스쳐 지나가는 우리의 일상들, 친구들과 함께 추억하고 싶지 않으셨나요?
        <br />
        타임캡슐 공간을 만들어 사진과 글을 실시간으로 꾸미고 공유해보세요!
      </SubText>
      <LinkButton>덕지덕지 시작하기</LinkButton>
    </Wrapper>
  );
}

export default Landing;
