import React from 'react';
import { AbsoluteFill } from 'remotion';

import '../app/styles.css';
import { tw } from '../src/theme';
import { Check } from 'lucide-react';

export const AppIcon: React.FC<{}> = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: tw.color('bg-base-100'),
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AbsoluteFill>
        <svg width={1024} height={1024} viewBox="0 0 64 64">
          <circle cx={32} cy={32} r={16} fill={tw.color('bg-primary-base')} />
          <circle cx={20} cy={20} r={4} fill={tw.color('bg-primary-base')} />
          <circle cx={44} cy={20} r={4} fill={tw.color('bg-primary-base')} />
          <rect
            x={20}
            y={16}
            width={24}
            height={4}
            fill={tw.color('bg-primary-base')}
          />
          <rect
            x={16}
            y={20}
            width={4}
            height={12}
            fill={tw.color('bg-primary-base')}
          />
          <rect
            x={44}
            y={20}
            width={4}
            height={12}
            fill={tw.color('bg-primary-base')}
          />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Check color={tw.color('bg-base-100')} size={320} strokeWidth={3} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
