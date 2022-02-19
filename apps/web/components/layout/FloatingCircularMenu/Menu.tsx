import { createElement } from 'react';
import styled from 'styled-components';
import ResizeObserver from 'resize-observer-polyfill';
import { ITEM_SIZE, RADIUS, BORDER, TEXT, PRIMARY, CONTAINER_SIZE } from './consts';
import { useLayer, useHover } from 'react-laag';
import { motion, AnimatePresence } from 'framer-motion';
import { forwardRef } from 'react';

/**
 * Positioning Stuff
 */

function getTransform(progress, radius, index, totalItems) {
  const value = (index / totalItems) * progress;

  const x = radius * Math.cos(Math.PI * 2 * (value - 0.25));
  const y = radius * Math.sin(Math.PI * 2 * (value - 0.25));

  const scale = progress / 2 + 0.5;

  return `translate(${x}px, ${y}px) scale(${scale})`;
}

/**
 * MenuItem
 */

const TooltipBox = styled(motion.div)`
  background-color: #333;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  line-height: 1.15;
  border-radius: 3px;
`;

const Circle = styled(motion.div)`
  position: absolute;
  width: ${ITEM_SIZE}px;
  height: ${ITEM_SIZE}px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${BORDER};
  box-shadow: 1px 1px 6px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.15s ease-in-out, border 0.15s ease-in-out;
  color: ${TEXT};
  pointer-events: all;
  will-change: transform;

  & svg {
    transition: 0.15s ease-in-out;
  }

  &:hover {
    box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.15);
    color: ${PRIMARY};

    & svg {
      transform: scale(1.15);
    }
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

function MenuItem({ Icon, onClick, label, index, totalItems }) {
  const [isOpen, hoverProps, close] = useHover({ delayEnter: 300, delayLeave: 100 });
  const { triggerProps, renderLayer, layerProps } = useLayer({ isOpen, ResizeObserver, onParentClose: close });

  return (
    <>
      <Circle
        {...triggerProps}
        {...hoverProps}
        onClick={onClick}
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 1, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transformTemplate={({ x }) => {
          const value = parseFloat(String(x).replace('px', ''));
          return getTransform(value, RADIUS, index, totalItems);
        }}
        transition={{
          delay: index * 0.025,
          type: 'spring',
          stiffness: 600,
          damping: 50,
          mass: 1,
        }}
      >
        {createElement(Icon, { size: 20 })}
      </Circle>
      {isOpen &&
        renderLayer(
          <AnimatePresence>
            <TooltipBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} {...layerProps}>
              {label}
            </TooltipBox>
          </AnimatePresence>,
        )}
    </>
  );
}

/**
 * Menu
 */

const MenuBase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${CONTAINER_SIZE}px;
  height: ${CONTAINER_SIZE}px;
  pointer-events: none;
  border-radius: 50%;
`;

interface Props {
  onClick: (e) => void;
  items: { Icon: any; value: string; label: string }[];
}

const Menu = forwardRef<HTMLDivElement, Props>(function Menu(props, ref) {
  return (
    <MenuBase ref={ref} {...props}>
      {props.items.map((item, index) => (
        <MenuItem
          key={index}
          Icon={item.Icon}
          label={item.label}
          onClick={() => console.log(item.value)}
          index={index}
          totalItems={props.items.length}
        />
      ))}
    </MenuBase>
  );
});

export default Menu;
