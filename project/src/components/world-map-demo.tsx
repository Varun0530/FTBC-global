import { useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import WorldMap from "@/components/ui/world-map";
import { motion } from "motion/react";
import NavbarDemo from "./navbar-demo";

function WorldMapDemo() {
  const navigate = useNavigate();

  // Memoize the text characters to prevent re-splitting on every render
  const titleChars = useMemo(() => "TetraPak Champions".split(""), []);

  return (
    <div className="w-full" style={{ backgroundColor: '#000000' }}>
      <NavbarDemo showAuthButtons={true} />
      <div className="max-w-7xl mx-auto text-center pt-20 pb-12">
        <p className="font-bold text-3xl md:text-6xl lg:text-7xl" style={{ color: '#00ffff' }}>
          {titleChars.map((char, idx) => (
            <motion.span
              key={idx}
              className={char === " " ? "inline-block w-3" : "inline-block"}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.02, ease: "easeOut" }}
              style={{ willChange: 'transform, opacity' }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </p>
        <p className="text-base md:text-xl lg:text-2xl max-w-3xl mx-auto pt-6 pb-16" style={{ color: '#00ffff' }}>
          connecting change across the globe
        </p>
      </div>
      <div className="max-w-7xl mx-auto pb-20">
        <WorldMap
        onDotClick={(dotData) => {
          // Check which region the dot belongs to
          if (dotData) {
            const lat = dotData.lat;
            const lng = dotData.lng;
            
            // America region dots
            // Los Angeles, California (North America): lat: 34.0522, lng: -118.2437
            // Brasília, Brazil (South America): lat: -15.7942, lng: -47.8822
            const isAmerica = (
              (Math.abs(lat - 34.0522) < 1 && Math.abs(lng - (-118.2437)) < 1) || // Los Angeles
              (Math.abs(lat - (-15.7942)) < 1 && Math.abs(lng - (-47.8822)) < 1) // Brasília
            );
            
            // EMEA region dots
            // Nairobi, Kenya (Africa): lat: -1.2921, lng: 36.8219
            // Central Europe (Germany area): lat: 51.1657, lng: 10.4515
            const isEMEA = (
              (Math.abs(lat - (-1.2921)) < 1 && Math.abs(lng - 36.8219) < 1) || // Nairobi, Africa
              (Math.abs(lat - 51.1657) < 2 && Math.abs(lng - 10.4515) < 2) // Central Europe (Germany area)
            );
            
            // Greater China region dot (easternmost)
            // Vladivostok, Russia: lat: 43.1332, lng: 131.9113
            const isGreaterChina = (
              Math.abs(lat - 43.1332) < 1 && Math.abs(lng - 131.9113) < 1 // Vladivostok, Russia (easternmost)
            );
            
            if (isAmerica) {
              navigate('/america-leaderboard');
            } else if (isEMEA) {
              navigate('/emea-leaderboard');
            } else if (isGreaterChina) {
              navigate('/greater-china-leaderboard');
            } else {
              navigate('/leaderboard');
            }
          } else {
            navigate('/leaderboard');
          }
        }}
        dots={[
          {
            start: {
              lat: 61.2181,
              lng: -149.9003,
              label: "Anchorage, Alaska",
              url: "#",
              clickable: false,
            },
            end: {
              lat: 34.0522,
              lng: -118.2437,
              label: "Los Angeles, California",
              url: "#",
              clickable: true,
            },
          },
          {
            start: { lat: 61.2181, lng: -149.9003, label: "Anchorage, Alaska", url: "#", clickable: false },
            end: { lat: -15.7942, lng: -47.8822, label: "Brasília, Brazil", url: "#", clickable: true },
          },
          {
            start: { lat: -15.7942, lng: -47.8822, label: "Brasília, Brazil", url: "#", clickable: true },
            end: { lat: 38.7223, lng: -9.1393, label: "Lisbon, Portugal", url: "#", clickable: false },
          },
          {
            start: { lat: 51.1657, lng: 10.4515, label: "Central Europe", url: "#", clickable: true },
            end: { lat: 28.6139, lng: 77.2090, label: "New Delhi, India", url: "#", clickable: true },
          },
          {
            start: { lat: 28.6139, lng: 77.2090, label: "New Delhi, India", url: "#", clickable: true },
            end: { lat: 43.1332, lng: 131.9113, label: "Vladivostok, Russia", url: "#", clickable: true },
          },
          {
            start: { lat: 28.6139, lng: 77.2090, label: "New Delhi, India", url: "#", clickable: true },
            end: { lat: -1.2921, lng: 36.8219, label: "Nairobi, Kenya", url: "#", clickable: true },
          },
        ]}
        />
      </div>
    </div>
  );
}

export default memo(WorldMapDemo);
