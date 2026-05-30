import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const COUNTRIES = {
  'CM': { name: 'Cameroon', bounds: { x: 430, y: 340, w: 60, h: 90 } },
  'CG': { name: 'Congo', bounds: { x: 500, y: 450, w: 50, h: 60 } },
  'CD': { name: 'Dem. Rep. Congo', bounds: { x: 570, y: 420, w: 70, h: 120 } },
  'CF': { name: 'Central African Rep.', bounds: { x: 550, y: 370, w: 70, h: 80 } },
  'GA': { name: 'Gabon', bounds: { x: 470, y: 460, w: 40, h: 50 } },
  'GQ': { name: 'Eq. Guinea', bounds: { x: 420, y: 475, w: 30, h: 30 } },
  'NG': { name: 'Nigeria', bounds: { x: 360, y: 320, w: 70, h: 60 } },
  'CI': { name: 'Côte d\'Ivoire', bounds: { x: 220, y: 350, w: 50, h: 50 } },
  'GH': { name: 'Ghana', bounds: { x: 300, y: 350, w: 40, h: 50 } },
  'BJ': { name: 'Benin', bounds: { x: 330, y: 340, w: 25, h: 50 } },
  'TG': { name: 'Togo', bounds: { x: 300, y: 350, w: 20, h: 45 } },
  'SN': { name: 'Senegal', bounds: { x: 230, y: 300, w: 30, h: 40 } },
  'ML': { name: 'Mali', bounds: { x: 280, y: 250, w: 60, h: 70 } },
  'BF': { name: 'Burkina Faso', bounds: { x: 280, y: 290, w: 50, h: 50 } },
  'NE': { name: 'Niger', bounds: { x: 420, y: 200, w: 80, h: 120 } },
  'TD': { name: 'Chad', bounds: { x: 520, y: 250, w: 90, h: 120 } },
  'ET': { name: 'Ethiopia', bounds: { x: 710, y: 310, w: 70, h: 100 } },
  'KE': { name: 'Kenya', bounds: { x: 680, y: 450, w: 60, h: 80 } },
  'UG': { name: 'Uganda', bounds: { x: 660, y: 430, w: 40, h: 60 } },
  'TZ': { name: 'Tanzania', bounds: { x: 650, y: 500, w: 60, h: 80 } },
  'MZ': { name: 'Mozambique', bounds: { x: 680, y: 570, w: 50, h: 70 } },
  'ZM': { name: 'Zambia', bounds: { x: 600, y: 560, w: 60, h: 70 } },
  'ZW': { name: 'Zimbabwe', bounds: { x: 630, y: 620, w: 50, h: 50 } },
  'AO': { name: 'Angola', bounds: { x: 490, y: 590, w: 60, h: 100 } },
  'ZA': { name: 'South Africa', bounds: { x: 580, y: 700, w: 60, h: 80 } },
};

export function AfricaMapAnimation() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [planes, setPlanes] = useState([
    { id: 1, x: 200, y: 200, vx: 2, vy: 1.2, color: '#FF6B00' },
    { id: 2, x: 600, y: 350, vx: -1.5, vy: 1.8, color: '#4DB8E8' },
    { id: 3, x: 400, y: 500, vx: 1.3, vy: -1.5, color: '#003DA5' },
  ]);
  const [highlightedCountry, setHighlightedCountry] = useState(null);
  const [highlightedCountries, setHighlightedCountries] = useState({});

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const { width, height } = container.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    const scaleX = svgRect.width / 1000;
    const scaleY = svgRect.height / 1001;

    let animationId;
    let frameCount = 0;

    const checkCountryCollision = (planeX, planeY, planeColor) => {
      const highlighted = {};

      for (const [code, country] of Object.entries(COUNTRIES)) {
        const bounds = country.bounds;
        const scaledX = bounds.x * scaleX;
        const scaledY = bounds.y * scaleY;
        const scaledW = bounds.w * scaleX;
        const scaledH = bounds.h * scaleY;

        // Simple bounding box collision
        if (
          planeX >= scaledX &&
          planeX <= scaledX + scaledW &&
          planeY >= scaledY &&
          planeY <= scaledY + scaledH
        ) {
          highlighted[code] = planeColor;
        }
      }

      return highlighted;
    };

    const animate = () => {
      frameCount++;

      setPlanes((prevPlanes) => {
        const newPlanes = prevPlanes.map((plane) => {
          let newX = plane.x + plane.vx;
          let newY = plane.y + plane.vy;
          let newVx = plane.vx;
          let newVy = plane.vy;

          // Bounce off edges
          if (newX < 0 || newX > width) {
            newVx = -newVx;
            newX = Math.max(0, Math.min(width, newX));
          }
          if (newY < 0 || newY > height) {
            newVy = -newVy;
            newY = Math.max(0, Math.min(height, newY));
          }

          // Check collision every 3 frames
          if (frameCount % 3 === 0) {
            const relativeX = (newX / width) * svgRect.width;
            const relativeY = (newY / height) * svgRect.height;

            const countryCollision = checkCountryCollision(relativeX, relativeY, plane.color);
            setHighlightedCountries((prev) => ({ ...prev, ...countryCollision }));

            // Show first highlighted country
            const firstCountry = Object.keys(countryCollision)[0];
            if (firstCountry) {
              setHighlightedCountry(COUNTRIES[firstCountry].name);
            }
          }

          return {
            ...plane,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          };
        });

        return newPlanes;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden rounded-lg"
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      }}
    >
      {/* SVG Map Background */}
      <div
        ref={svgRef}
        className="w-full h-full absolute inset-0"
        style={{
          backgroundImage: 'url(/images/africa.svg)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Planes */}
      {planes.map((plane) => (
        <motion.div
          key={plane.id}
          className="absolute w-3 h-3 rounded-full pointer-events-none z-10"
          style={{
            left: plane.x,
            top: plane.y,
            backgroundColor: plane.color,
            boxShadow: `0 0 20px ${plane.color}, inset 0 0 10px rgba(255,255,255,0.4)`,
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle, ${plane.color}cc 0%, ${plane.color}66 70%, transparent 100%)`,
            }}
          />
        </motion.div>
      ))}

      {/* Country Info */}
      {highlightedCountry && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-semibold border border-white/20 z-20"
        >
          ✈️ {highlightedCountry}
        </motion.div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 text-white/60 text-xs z-20 pointer-events-none">
        Les avions se déplacent librement...
      </div>
    </div>
  );
}
