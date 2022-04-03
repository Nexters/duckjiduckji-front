import { useRouter } from 'next/router';
import { MouseEventHandler } from 'react';
import styled from 'styled-components';

export function Landing() {
  const router = useRouter();

  const moveRoomsPage: MouseEventHandler<HTMLButtonElement> = () => {
    router.push('/board');
  };

  return (
    <Wrapper>
      <BackgroundUpper />
      <BackgroundDown />
      <Inner>
        <MainText>
          <ImpactText backgroundImage="assets/image/green_panel.png">덕지덕지</ImpactText> 붙여봐요!
          <br />
          우리만의 추억을 담는 <ImpactText backgroundImage="assets/image/yellow_panel.png">콜렉트북</ImpactText>
          <Arrow />
        </MainText>
        <SubText>
          스쳐 지나가는 우리의 일상들, 친구들과 함께 추억하고 싶지 않으셨나요?
          <br />
          타임캡슐 공간을 만들어 사진과 글을 실시간으로 꾸미고 공유해보세요!
        </SubText>
        <LinkButton onClick={moveRoomsPage}>
          덕지덕지 시작하기 <ButtonArrow />
        </LinkButton>
        <button
          onClick={moveRoomsPage}
          className="flex justify-center items-center py-4 px-9 w-64 h-16 text-lg font-bold text-white bg-[#6038ff] border-0 rounded-[32px]"
        >
          덕지덕지 시작하기
          <ButtonArrow />
        </button>
      </Inner>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  z-index: -1;
  width: 100vw;
  height: 100vh;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainText = styled.span`
  position: relative;
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

  width: 252px;
  height: 64px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background: #6038ff;
  border-radius: 32px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;

  text-align: center;
  letter-spacing: 0.015em;
  cursor: pointer;
  color: #ffffff;
`;

const ImpactText = styled.span<{ backgroundImage: string }>`
  background-image: url(${props => props.backgroundImage});
  background-repeat: no-repeat;
  background-size: contain;
  padding: 15px;
`;

const BackgroundUpper = styled.div`
  background: #0f0b1b;
  z-index: -1;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;

  background-image: url('assets/image/background_up.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-attachment: fixed;
  background-position: center top;
`;

const BackgroundDown = styled.div`
  z-index: -1;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;

  background-image: url('assets/image/background_down.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-attachment: fixed;
  background-position: center bottom;
`;

const Arrow = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 40px;
  bottom: -10px;

  background-image: url('assets/image/background_arrow.png');
  background-repeat: no-repeat;
  background-size: contain;
`;

const ButtonArrow = styled.p`
  width: 24px;
  height: 24px;
  margin-left: 10px;
  background-image: url('assets/image/button_arrow.png');
  background-repeat: no-repeat;
  background-size: contain;
`;

export default Landing;
