import React from 'react';

interface SustCrestSvgProps {
  size?: number;
  variant?: 'classic' | 'ornamental';
  withWhiteBadge?: boolean;
}

const SUST_LOGO_SRC = '/assets/sust-logo-official.png';

export const SustCrestSvg: React.FC<SustCrestSvgProps> = ({
  size = 98,
  variant = 'classic',
  withWhiteBadge = false,
}) => {
  if (withWhiteBadge) {
    const pad = Math.max(6, Math.round(size * 0.09));
    const ringColor = variant === 'ornamental' ? '#C5A059' : '#CBD5E1';
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '9999px',
          backgroundColor: '#FFFFFF',
          border: `2px solid ${ringColor}`,
          boxShadow: '0 6px 16px rgba(15, 23, 42, 0.16)',
          padding: `${pad}px`,
          boxSizing: 'border-box',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0,
        }}
        aria-label="Shahjalal University of Science and Technology Logo"
      >
        <img
          src={SUST_LOGO_SRC}
          alt="Shahjalal University of Science and Technology Logo"
          loading="eager"
          decoding="sync"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${Math.round(size * 1.06)}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
      aria-label="Shahjalal University of Science and Technology Logo"
    >
      <img
        src={SUST_LOGO_SRC}
        alt="Shahjalal University of Science and Technology Logo"
        loading="eager"
        decoding="sync"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
};
