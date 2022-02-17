import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 64px;

  width: 532px;
  height: 572px;

  background: #fdfdfd;
  box-shadow: 0px 0px 10px rgba(218, 218, 218, 0.04);
  border-radius: 24px;
`;

const Title = styled.p`
  width: 532px;
  height: 60px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  font-size: 44px;
  line-height: 60px;

  letter-spacing: 0.015em;

  color: #0f0b1b;
`;

const InfoText = styled.span`
  width: 532px;
  height: 72px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;

  letter-spacing: 0.015em;

  color: #413e4d;
`;

const KakaoLoginButton = styled.button`
  border: none;
  padding: 16px 36px;

  width: 532px;
  height: 64px;

  background: #fee500;
  border-radius: 32px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;

  letter-spacing: 0.015em;

  color: #191919;
`;

const CharacterImage = styled.div`
  height: 166px;
  width: 300px;

  background-color: aquamarine;
`;

export function LoginCard() {
  return (
    <Wrapper>
      <Title>로그인</Title>
      <InfoText>
        간편하게 로그인하고
        <br />
        덕지덕지 서비스를 이용해보세요!
      </InfoText>
      <CharacterImage />
      <KakaoLoginButton>카카오로 시작하기</KakaoLoginButton>
    </Wrapper>
  );
}

export default LoginCard;
