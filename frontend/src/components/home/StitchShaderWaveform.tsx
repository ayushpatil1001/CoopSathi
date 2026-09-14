import React from 'react';

interface StitchShaderWaveformProps {
  isActive?: boolean;
}

export const StitchShaderWaveform: React.FC<StitchShaderWaveformProps> = ({ isActive = true }) => {
  // 24 hardware-accelerated waveform bars with tricolor gradient styling
  const bars = [
    { height: '35%', color: '#FF9933', delay: '0.0s', duration: '1.4s' },
    { height: '55%', color: '#FF9933', delay: '0.2s', duration: '1.6s' },
    { height: '80%', color: '#FFB066', delay: '0.4s', duration: '1.3s' },
    { height: '45%', color: '#FF9933', delay: '0.1s', duration: '1.5s' },
    { height: '65%', color: '#FFA64D', delay: '0.3s', duration: '1.7s' },
    { height: '90%', color: '#FF9933', delay: '0.5s', duration: '1.4s' },
    { height: '40%', color: '#FFFFFF', delay: '0.2s', duration: '1.6s' },
    { height: '70%', color: '#FFFFFF', delay: '0.4s', duration: '1.3s' },
    { height: '100%', color: '#FFFFFF', delay: '0.1s', duration: '1.5s' },
    { height: '60%', color: '#FFFFFF', delay: '0.3s', duration: '1.4s' },
    { height: '85%', color: '#E2E8F0', delay: '0.5s', duration: '1.7s' },
    { height: '50%', color: '#FFFFFF', delay: '0.0s', duration: '1.3s' },
    { height: '75%', color: '#138808', delay: '0.2s', duration: '1.5s' },
    { height: '95%', color: '#22C55E', delay: '0.4s', duration: '1.4s' },
    { height: '40%', color: '#138808', delay: '0.1s', duration: '1.6s' },
    { height: '80%', color: '#16A34A', delay: '0.3s', duration: '1.3s' },
    { height: '60%', color: '#138808', delay: '0.5s', duration: '1.7s' },
    { height: '40%', color: '#22C55E', delay: '0.2s', duration: '1.5s' }
  ];

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl opacity-35 flex items-center justify-center gap-1.5 sm:gap-2 px-6"
      style={{ transform: 'translateZ(0)' }}
      aria-hidden="true"
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          className="w-1 sm:w-1.5 rounded-full"
          style={{
            height: bar.height,
            backgroundColor: bar.color,
            boxShadow: `0 0 8px ${bar.color}66`,
            animation: isActive ? `smoothWave ${bar.duration} ease-in-out infinite alternate` : 'none',
            animationDelay: bar.delay,
            transformOrigin: 'center',
            willChange: 'transform'
          }}
        />
      ))}
      <style>{`
        @keyframes smoothWave {
          0% {
            transform: scaleY(0.35);
            opacity: 0.4;
          }
          50% {
            transform: scaleY(1);
            opacity: 0.9;
          }
          100% {
            transform: scaleY(0.45);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};
