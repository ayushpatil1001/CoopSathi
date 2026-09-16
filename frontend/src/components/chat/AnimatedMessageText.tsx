import React, { useState, useEffect, useRef } from 'react';

interface AnimatedMessageTextProps {
  fullText: string;
  isGenerating?: boolean;
  onComplete?: () => void;
  speedMs?: number;
  textColorClass?: string;
  onTextUpdate?: () => void;
}

export const AnimatedMessageText: React.FC<AnimatedMessageTextProps> = ({
  fullText,
  isGenerating = false,
  onComplete,
  speedMs = 18,
  textColorClass = 'text-ink-800',
  onTextUpdate
}) => {
  const [displayedText, setDisplayedText] = useState<string>(isGenerating ? '' : fullText);
  const [animating, setAnimating] = useState<boolean>(isGenerating);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (!isGenerating) {
      setDisplayedText(fullText);
      setAnimating(false);
      return;
    }

    // Split text into tokens (words and whitespace preserved)
    const tokens = fullText.split(/(\s+)/);
    let currentIndex = 0;
    setAnimating(true);
    setDisplayedText('');

    intervalRef.current = setInterval(() => {
      currentIndex += 2; // Grab word + following space
      if (currentIndex >= tokens.length) {
        setDisplayedText(fullText);
        setAnimating(false);
        clearInterval(intervalRef.current);
        onComplete?.();
      } else {
        setDisplayedText(tokens.slice(0, currentIndex).join(''));
        onTextUpdate?.();
      }
    }, speedMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fullText, isGenerating, speedMs]);

  // Click to instantly complete generation
  const handleSkipAnimation = () => {
    if (animating) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayedText(fullText);
      setAnimating(false);
      onComplete?.();
    }
  };

  // Render markdown formatting with step highlighting
  const renderFormattedMarkdown = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      const trimmed = line.trim();
      const isStep = /^((\*\*)?(Step\s+\d+|पायरी\s+[०-९\d]+|चरण\s+[०-९\d]+|પગલું\s+[૦-૯\d]+):?)/i.test(trimmed);
      const isBullet = trimmed.startsWith('• ') || trimmed.startsWith('- ');
      const parts = line.split(/(\*\*.*?\*\*)/g);

      const inner = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={j} className="font-bold text-ink-950">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (isStep) {
        return (
          <div key={i} className="my-2 p-2 bg-emerald-50/90 border-l-3 border-emerald-600 rounded-r-md text-emerald-950 font-semibold text-xs sm:text-sm">
            {inner}
          </div>
        );
      }

      if (isBullet) {
        return (
          <div key={i} className="ml-4 my-1 flex items-start gap-1.5 text-xs sm:text-sm">
            <span className="text-emerald-600 mt-1 text-[8px]">●</span>
            <div className="flex-1">{inner}</div>
          </div>
        );
      }

      if (trimmed === '') {
        return <div key={i} className="h-1.5" />;
      }

      return (
        <p key={i} className="mb-1 last:mb-0 leading-relaxed text-xs sm:text-sm">
          {inner}
        </p>
      );
    });
  };

  return (
    <div 
      className={`relative ${textColorClass}`}
      onClick={animating ? handleSkipAnimation : undefined}
      title={animating ? "Click to show full response instantly" : undefined}
    >
      <div className="whitespace-pre-wrap leading-relaxed">
        {renderFormattedMarkdown(displayedText)}
        {animating && (
          <span 
            className="inline-block w-2 h-4 bg-emerald-600 ml-1 rounded-2xs align-middle animate-blink shadow-sm"
            aria-label="Generating..."
          />
        )}
      </div>

      {animating && (
        <div className="mt-1 flex items-center justify-between text-[10px] text-emerald-700/80 select-none">
          <span className="flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            Generating live response...
          </span>
          <button 
            type="button" 
            onClick={(e) => { e.stopPropagation(); handleSkipAnimation(); }}
            className="text-[10px] text-emerald-700 hover:text-emerald-900 underline opacity-70 hover:opacity-100 transition"
          >
            Show instantly ⚡
          </button>
        </div>
      )}
    </div>
  );
};
