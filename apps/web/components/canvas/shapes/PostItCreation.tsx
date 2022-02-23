import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import { KonvaEventObject } from 'konva/lib/Node';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Rect, Group, Text, Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';
import { IPostIt } from 'web/shared/types';
import { POSTIT_HEIHT, POSTIT_WIDTH, POSTIT_PADDING } from 'web/shared/consts';

import { CreateData } from 'web/atoms/create';

import { changePostIt } from 'web/atoms/create';

interface Props {
  y: number;
  x: number;
  color?: string;
  setPostItCreation: SetterOrUpdater<CreateData>;
}

export function PostItCreation({ y, x, color, setPostItCreation }: Props) {
  const textAreaRef = useRef(null);
  const [text, setText] = useState<string>();

  const setPostItText = () => {
    setPostItCreation(before => {
      return {
        ...before,
        text: textAreaRef.current.value,
      };
    });
  };

  return (
    <Group x={x} y={y} width={POSTIT_WIDTH} height={POSTIT_HEIHT} draggable={false}>
      <Rect
        width={POSTIT_WIDTH}
        height={POSTIT_HEIHT}
        fill={color || '#feff9c'}
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.6}
        shadowOffsetX={10}
        shadowOffsetY={10}
      />
      <Html groupProps={{ x: POSTIT_PADDING, y: POSTIT_PADDING }} divProps={{ style: { opacity: 1 } }}>
        <textarea ref={textAreaRef} style={textAreaStyle} onBlur={setPostItText} />
      </Html>
    </Group>
  );
}

const textAreaStyle: CSSProperties = {
  background: 'transparent',
  resize: 'none',
  border: 'none',
  padding: '0',
  width: `${POSTIT_WIDTH - 2 * POSTIT_PADDING}px`,
  fontSize: '16px',
  outline: 'none',
  height: `${POSTIT_HEIHT - 2 * POSTIT_PADDING}px`,
  position: 'absolute',
  fontFamily: 'Pretendard',
  lineHeight: 1.2,
};
