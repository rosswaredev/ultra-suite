import React from 'react';
import { Still } from 'remotion';
import { AppIcon } from './AppIcon';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still id="app-icon" component={AppIcon} width={1024} height={1024} />
    </>
  );
};
