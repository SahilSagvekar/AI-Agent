"use client";

interface AudioLoaderProps {
  text?: string;
  barCount?: number;
  barWidth?: number;
  barHeight?: number;
  className?: string;
}

export function AudioLoader({
  text = "Loading...",
  barCount = 5,
  barWidth = 6,
  barHeight = 24,
  className = "",
}: AudioLoaderProps) {
  const bars = Array.from({ length: barCount });

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white ${className}`}
    >
      <div className="flex items-end space-x-1">
        {bars.map((_, i) => (
          <div
            key={i}
            className="bg-black rounded-sm animate-bounce-bar"
            style={{
              width: `${barWidth}px`,
              height: `${barHeight}px`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
      <span className="text-black text-sm mt-4">{text}</span>

      <style jsx>{`
        @keyframes bounce-bar {
          0%, 100% {
            transform: scaleY(0.4);
          }
          50% {
            transform: scaleY(1);
          }
        }

        .animate-bounce-bar {
          animation: bounce-bar 0.6s infinite ease-in-out;
          transform-origin: bottom;
        }
      `}</style>
    </div>
  );
}
