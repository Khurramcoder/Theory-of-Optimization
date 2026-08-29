import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch (err) {
      console.warn('KaTeX rendering error:', err);
      return `<span class="text-rose-400 font-mono text-xs">${math}</span>`;
    }
  }, [math, block]);

  if (block) {
    return (
      <div 
        className={`my-3 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-center overflow-x-auto text-slate-100 shadow-inner ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span 
      className={`inline-block mx-0.5 text-cyan-300 font-medium ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
