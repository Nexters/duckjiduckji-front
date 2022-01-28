import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 250px;
  left: 0px;
  bottom: 0px;

  border-top-left-radius: 25px;
  border-top-right-radius: 25px;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: space-between;

  h3 {
    font-family: SpoqaHanSans;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    /* identical to box height, or 133% */

    letter-spacing: 0.015em;

    color: #616161;
  }
`;

const ColorUnorderedList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  width: 300px;
`;

const ColorList = styled.li<{ color: string }>`
  margin: 15px 20px;
  width: 34px;
  height: 34px;
  border-radius: 17px;

  background: ${(props) => props.color || `#d1d1d1`};
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 16px 36px;

  width: 151px;
  height: 48px;

  background: #424242;
  color: #ffffff;
  border-radius: 8px;

  font-family: SpoqaHanSans;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;

  text-align: center;
  letter-spacing: 0.015em;

  transition-duration: 0.4s;
  &:hover {
    background: #5f5f5f;
  }
`;

type Props = {
  close: () => void;
};

export const Options = ({ close }: Props) => {
  const colors = [
    "Blue ",
    "Green",
    "Red",
    "Orange",
    "Violet",
    "Indigo",
    "Yellow ",
    "Black",
  ];

  const createHandler = () => {
    close();
  };

  return (
    <Wrapper>
      <Section>
        <h3>Color</h3>
        <ColorUnorderedList>
          {colors.map((color) => {
            return <ColorList key={color} color={color} />;
          })}
        </ColorUnorderedList>
      </Section>
      <Button onClick={createHandler}>완료</Button>
    </Wrapper>
  );
};

export default Options;
