import { useRef, useState, useEffect, useMemo, memo, useCallback } from "react";
import type { MouseEvent } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string; url?: string; clickable?: boolean };
    end: { lat: number; lng: number; label?: string; url?: string; clickable?: boolean };
  }>;
  lineColor?: string;
  onDotClick?: (dotData?: { lat: number; lng: number; label?: string }) => void;
}

function WorldMap({
  dots = [],
  lineColor = "#69CFF6",
  onDotClick,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  // Memoize DottedMap instance and SVG generation
  const svgMap = useMemo(() => {
    const mapInstance = new DottedMap({ height: 100, grid: "diagonal" });
    return mapInstance.getSVG({
      radius: 0.22,
      color: theme === "dark" ? "#1a1a1a80" : "#1a1a1a40",
      shape: "circle",
      backgroundColor: theme === "dark" ? "#FFFFFF" : "#FFFFFF",
    });
  }, [theme]);

  useEffect(() => {
    // Reduced delay for faster animation start
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Memoize projection function
  const projectPoint = useCallback((lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  }, []);

  // Memoize path creation
  const createCurvedPath = useCallback((
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  }, []);

  const handleDotClick = useCallback((e: MouseEvent<SVGCircleElement>, dotData?: { lat: number; lng: number; label?: string; url?: string }, clickable?: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if (clickable) {
      if (onDotClick) {
        onDotClick(dotData);
      } else if (dotData?.url && dotData.url.trim() !== '' && dotData.url !== '#') {
        try {
          // Validate URL
          new URL(dotData.url);
          window.open(dotData.url, '_blank', 'noopener,noreferrer');
        } catch (error) {
          console.error('Invalid URL:', dotData.url);
        }
      }
    }
  }, [onDotClick]);

  return (
    <div className="w-full aspect-[2/1] rounded-lg relative font-sans" style={{ backgroundColor: '#FFFFFF', minHeight: '600px' }}>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 select-none"
        style={{ pointerEvents: 'auto' }}
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="2.5"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={isMounted ? {
                  pathLength: 1,
                  opacity: 1,
                } : {
                  pathLength: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 * i,
                  ease: "easeInOut",
                }}
                style={{ willChange: 'pathLength, opacity' }}
                key={`start-upper-${i}`}
              ></motion.path>
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const startKey = `start-${i}`;
          const endKey = `end-${i}`;
          const isStartHovered = hoveredDot === startKey;
          const isEndHovered = hoveredDot === endKey;
          
          return (
            <g key={`points-group-${i}`}>
              <g key={startKey}>
                <motion.circle
                  cx={startPoint.x}
                  cy={startPoint.y}
                  r={isStartHovered ? 8 : 4}
                  fill={lineColor}
                  stroke="white"
                  strokeWidth={isStartHovered ? 2 : 1}
                  style={{ 
                    cursor: dot.start.clickable ? 'pointer' : 'default',
                    willChange: 'transform, opacity'
                  }}
                  onMouseEnter={() => setHoveredDot(startKey)}
                  onMouseLeave={() => setHoveredDot(null)}
                  onClick={(e) => handleDotClick(e, { lat: dot.start.lat, lng: dot.start.lng, label: dot.start.label, url: dot.start.url }, dot.start.clickable)}
                  initial={{
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={isMounted ? {
                    scale: 1,
                    opacity: 1,
                    r: isStartHovered ? 8 : 4,
                    strokeWidth: isStartHovered ? 2 : 1,
                  } : {
                    scale: 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.15 * i + 0.3,
                    ease: "easeOut",
                    r: { duration: 0.15, ease: "easeOut" },
                    strokeWidth: { duration: 0.15, ease: "easeOut" },
                  }}
                />
                <motion.circle
                  cx={startPoint.x}
                  cy={startPoint.y}
                  r={isStartHovered ? 8 : 4}
                  fill={lineColor}
                  style={{ 
                    pointerEvents: 'none',
                    willChange: 'transform, opacity'
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={isMounted ? {
                    opacity: 0.6,
                    scale: 1,
                    r: isStartHovered ? 8 : 4,
                  } : {
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.15 * i + 0.3,
                    ease: "easeOut",
                    r: { duration: 0.15, ease: "easeOut" },
                  }}
                >
                  <animate
                    attributeName="r"
                    from={isStartHovered ? 8 : 4}
                    to={isStartHovered ? 16 : 12}
                    dur="1.5s"
                    begin={`${(0.15 * i + 0.3 + 0.3).toFixed(1)}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.6"
                    to="0"
                    dur="1.5s"
                    begin={`${(0.15 * i + 0.3 + 0.3).toFixed(1)}s`}
                    repeatCount="indefinite"
                  />
                </motion.circle>
              </g>
              <g key={endKey}>
                <motion.circle
                  cx={endPoint.x}
                  cy={endPoint.y}
                  r={isEndHovered ? 8 : 4}
                  fill={lineColor}
                  stroke="white"
                  strokeWidth={isEndHovered ? 2 : 1}
                  style={{ 
                    cursor: dot.end.clickable ? 'pointer' : 'default',
                    willChange: 'transform, opacity'
                  }}
                  onMouseEnter={() => setHoveredDot(endKey)}
                  onMouseLeave={() => setHoveredDot(null)}
                  onClick={(e) => handleDotClick(e, { lat: dot.end.lat, lng: dot.end.lng, label: dot.end.label, url: dot.end.url }, dot.end.clickable)}
                  initial={{
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={isMounted ? {
                    scale: 1,
                    opacity: 1,
                    r: isEndHovered ? 8 : 4,
                    strokeWidth: isEndHovered ? 2 : 1,
                  } : {
                    scale: 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.15 * i + 0.8,
                    ease: "easeOut",
                    r: { duration: 0.15, ease: "easeOut" },
                    strokeWidth: { duration: 0.15, ease: "easeOut" },
                  }}
                />
                <motion.circle
                  cx={endPoint.x}
                  cy={endPoint.y}
                  r={isEndHovered ? 8 : 4}
                  fill={lineColor}
                  style={{ 
                    pointerEvents: 'none',
                    willChange: 'transform, opacity'
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={isMounted ? {
                    opacity: 0.6,
                    scale: 1,
                    r: isEndHovered ? 8 : 4,
                  } : {
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.15 * i + 0.8,
                    ease: "easeOut",
                    r: { duration: 0.15, ease: "easeOut" },
                  }}
                >
                  <animate
                    attributeName="r"
                    from={isEndHovered ? 8 : 4}
                    to={isEndHovered ? 16 : 12}
                    dur="1.5s"
                    begin={`${(0.15 * i + 0.8 + 0.3).toFixed(1)}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.6"
                    to="0"
                    dur="1.5s"
                    begin={`${(0.15 * i + 0.8 + 0.3).toFixed(1)}s`}
                    repeatCount="indefinite"
                  />
                </motion.circle>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default memo(WorldMap);
