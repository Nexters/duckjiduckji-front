import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { changeColor } from '../../atoms/create';

const Wrapper = styled.div`
  width: 888px;
  height: 160px;
  left: 0px;

  border-top-left-radius: 25px;
  border-top-right-radius: 25px;

  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

const ColorUnorderedList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  width: 300px;
`;

const ColorList = styled.li<{ color: string }>`
  margin: 4px;
  width: 50px;
  height: 50px;

  border: 1px solid #f3f3f4;
  box-sizing: border-box;
  border-radius: 2px;

  background: ${props => props.color || `#d1d1d1`};
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 16px 36px;

  width: 100px;
  height: 48px;

  background: #424242;
  color: #ffffff;
  border-radius: 8px;

  font-family: SpoqaHanSans;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;

  text-align: center;
  letter-spacing: 0.015em;

  transition-duration: 0.4s;
  &:hover {
    background: #5f5f5f;
  }
`;

const DesignUnorderedList = styled.div`
  display: flex;
  flex-direction: row;
`;

const PolaroidButton = styled.div<{ color: string }>`
  width: 65px;
  height: 112px;
  margin: 8px;

  background-color: ${props => props.color};
`;

const DivideLine = styled.div`
  height: 112px;
  width: 0;
  border-right: 1px solid #e7e7e9;
`;

const colors: string[] = [
  '#FFFFFF',
  '#000000',
  '#6A67FF',
  '#5BB0FF',
  '#00DE74',
  '#FFF61C',
  '#FFBB55 ',
  '#FF8E6A',
  '#FF627E',
  '#CD34E2',
];

type Props = {
  close: () => void;
};

export const Options = ({ close }: Props) => {
  const [color, setColor] = useRecoilState(changeColor);

  const changeColorHandler = (color: string) => {
    setColor(color);
  };

  const createHandler = () => {
    close();
  };

  return (
    <Wrapper>
      <Section>
        <DesignUnorderedList>
          <PolaroidButton color={'#6A67FF'} />
          <PolaroidButton color={'#6A67FF'} />
          <PolaroidButton color={'#6A67FF'} />
          <PolaroidButton color={'#6A67FF'} />
        </DesignUnorderedList>
      </Section>
      <DivideLine />
      <Section>
        <ColorUnorderedList>
          {colors.map(color => {
            return (
              <ColorList
                onClick={() => {
                  changeColorHandler(color);
                }}
                key={color}
                color={color}
              />
            );
          })}
        </ColorUnorderedList>
      </Section>
      <Button onClick={createHandler}>완료</Button>
    </Wrapper>
  );
};

export default Options;
