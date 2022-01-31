import styled, { css } from 'styled-components';
import { PRIMARY, PRIMARY_2, BUTTON_SIZE } from './consts';
import { Add } from '@styled-icons/material/Add';
import { forwardRef } from 'react';

const buttonHover = css`
  &:hover {
    background-color: ${PRIMARY_2};
    transform: scale(1.03);
  }
`;

const ButtonBase = styled.button<{ isOpen: boolean }>`
  width: ${BUTTON_SIZE}px;
  height: ${BUTTON_SIZE}px;
  color: white;
  border: none;
  background-color: ${props => (props.isOpen ? PRIMARY_2 : PRIMARY)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  transform: scale(${props => (props.isOpen ? 1.03 : 1)});

  ${props => !props.isOpen && buttonHover}

  & svg {
    transition: 0.25s ease-in-out;
    transform: rotate(${p => (p.isOpen ? 45 : 0)}deg);
  }
`;

interface Props {
  isOpen: boolean;
  onClick: (e) => void;
}

const Button = forwardRef<HTMLButtonElement, Props>(function Button(props: Props, ref) {
  return (
    <ButtonBase ref={ref} {...props}>
      <Add size={28} />
    </ButtonBase>
  );
});

export default Button;
