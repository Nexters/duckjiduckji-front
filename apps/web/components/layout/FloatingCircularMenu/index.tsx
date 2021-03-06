import { useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { AnimatePresence } from 'framer-motion';
import { Arrow, useLayer } from 'react-laag';

import { Image } from '@styled-icons/boxicons-regular/Image';
import { PlayCircle as Video } from '@styled-icons/boxicons-regular/PlayCircle';
import { Music } from '@styled-icons/boxicons-solid/Music';
import { File } from '@styled-icons/boxicons-regular/File';
import { LocationOn as Location } from '@styled-icons/material/LocationOn';
import { Code } from '@styled-icons/boxicons-regular/Code';

import Button from './Button';
import Menu from './Menu';
import { useWindowSize } from 'react-use';
import { BUTTON_SIZE } from './consts';

interface Props {}

export function FloatingCircularMenu({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize();

  const { triggerProps, layerProps, renderLayer } = useLayer({
    isOpen,
    ResizeObserver,
    placement: 'center',
  });

  return (
    <div style={{ position: 'fixed', bottom: 60, left: width / 2 - BUTTON_SIZE / 2 }}>
      <Button {...triggerProps} onClick={e => setIsOpen(!isOpen)} isOpen={isOpen} />
      {renderLayer(
        <AnimatePresence>
          {isOpen && (
            <Menu
              {...layerProps}
              onClick={() => setIsOpen(false)}
              items={[
                { Icon: Image, value: 'image', label: 'Image' },
                { Icon: Video, value: 'video', label: 'Video' },
                { Icon: Music, value: 'music', label: 'Music' },
                { Icon: File, value: 'file', label: 'File' },
                { Icon: Location, value: 'location', label: 'Location' },
                { Icon: Code, value: 'code', label: 'Code' },
              ]}
            />
          )}
        </AnimatePresence>,
      )}
    </div>
  );
}
