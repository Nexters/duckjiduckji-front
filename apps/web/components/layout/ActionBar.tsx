import styled from 'styled-components';

const Wrapper = styled.div`
  z-index: 100;

  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  position: fixed;

  height: 70px;
  width: 100%;

  background-color: #f8f8f8;
  section {
    margin: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const Title = styled.div`
  height: 50px;
  margin: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-family: SpoqaHanSans;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;

    letter-spacing: 0.015em;

    color: #212121;
  }
`;

const MenuButton = styled.div<{ image: string }>`
  width: 50px;
  height: 50px;
  margin: 10px;
  /* border: 1px solid #000; */

  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: contain;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 50px;
  margin: 0;
  border: none;

  background: #424242;
  color: #fff;
  border-radius: 8px;

  font-family: SpoqaHanSans;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;

  transition-duration: 0.4s;

  &:hover {
    background-color: #7e7e7e;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 50px;
  margin: 0 25px;

  background: #e0e0e0;
`;

interface Props {
  title: string;
}

export const ActionBar: React.FC<Props> = ({ title }) => {
  return (
    <Wrapper>
      <section>
        <MenuButton image={'/assets/image/Home.png'} />
        <Divider />
        <Title>
          <span>{title}</span>
        </Title>
      </section>
      <section>
        <ImageButtons width={170} height={48} image={'/assets/image/zoomicon.png'} />
        <ImageButtons width={170} height={48} image={'/assets/image/profile.png'} />
        <ImageButtons width={151} height={48} image={'/assets/image/Share.png'} />
      </section>
    </Wrapper>
  );
};

export default ActionBar;

const ImageButtons = styled.div<{
  width: number;
  height: number;
  image: string;
}>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  margin: 10px;
  /* border: 1px solid #000; */

  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: contain;
`;
