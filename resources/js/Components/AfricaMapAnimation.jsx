import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

const COUNTRIES = {
  'CM': { name: 'Cameroon', code: '495.3,598.6' },
  'CG': { name: 'Congo', code: '530,480' },
  'CD': { name: 'Dem. Rep. Congo', code: '600,450' },
  'CF': { name: 'Central African Rep.', code: '550,370' },
  'GA': { name: 'Gabon', code: '490,450' },
  'GQ': { name: 'Eq. Guinea', code: '420,475' },
  'NG': { name: 'Nigeria', code: '380,330' },
  'CI': { name: 'Côte d\'Ivoire', code: '220,350' },
  'GH': { name: 'Ghana', code: '310,360' },
  'BJ': { name: 'Benin', code: '340,356' },
  'TG': { name: 'Togo', code: '300,350' },
  'SN': { name: 'Senegal', code: '270,310' },
  'ML': { name: 'Mali', code: '320,280' },
  'BF': { name: 'Burkina Faso', code: '280,290' },
  'NE': { name: 'Niger', code: '420,200' },
  'TD': { name: 'Chad', code: '520,250' },
  'ET': { name: 'Ethiopia', code: '750,340' },
  'KE': { name: 'Kenya', code: '690,480' },
  'UG': { name: 'Uganda', code: '680,450' },
  'TZ': { name: 'Tanzania', code: '680,520' },
  'MZ': { name: 'Mozambique', code: '680,580' },
  'ZM': { name: 'Zambia', code: '610,580' },
  'ZW': { name: 'Zimbabwe', code: '630,630' },
  'AO': { name: 'Angola', code: '495.3,598.6' },
  'ZA': { name: 'South Africa', code: '610,700' },
};

const COUNTRY_BOUNDS = {
  'CM': { x: 430, y: 340, w: 60, h: 90 },
  'CG': { x: 500, y: 450, w: 50, h: 60 },
  'CD': { x: 570, y: 420, w: 70, h: 120 },
  'CF': { x: 550, y: 370, w: 70, h: 80 },
  'GA': { x: 470, y: 460, w: 40, h: 50 },
  'GQ': { x: 420, y: 475, w: 30, h: 30 },
  'NG': { x: 360, y: 320, w: 70, h: 60 },
  'CI': { x: 220, y: 350, w: 50, h: 50 },
  'GH': { x: 300, y: 350, w: 40, h: 50 },
  'BJ': { x: 330, y: 340, w: 25, h: 50 },
  'TG': { x: 300, y: 350, w: 20, h: 45 },
  'SN': { x: 230, y: 300, w: 30, h: 40 },
  'ML': { x: 280, y: 250, w: 60, h: 70 },
  'BF': { x: 280, y: 290, w: 50, h: 50 },
  'NE': { x: 420, y: 200, w: 80, h: 120 },
  'TD': { x: 520, y: 250, w: 90, h: 120 },
  'ET': { x: 710, y: 310, w: 70, h: 100 },
  'KE': { x: 680, y: 450, w: 60, h: 80 },
  'UG': { x: 660, y: 430, w: 40, h: 60 },
  'TZ': { x: 650, y: 500, w: 60, h: 80 },
  'MZ': { x: 680, y: 570, w: 50, h: 70 },
  'ZM': { x: 600, y: 560, w: 60, h: 70 },
  'ZW': { x: 630, y: 620, w: 50, h: 50 },
  'AO': { x: 490, y: 590, w: 60, h: 100 },
  'ZA': { x: 580, y: 700, w: 60, h: 80 },
};

export function AfricaMapAnimation() {
  const containerRef = useRef(null);
  const svgContainerRef = useRef(null);
  const pathRefsRef = useRef({});
  const countryColorsRef = useRef({});

  const [planes, setPlanes] = useState([
    { id: 1, x: 200, y: 200, vx: 2.2, vy: 1.5, color: '#FF6B00' },
    { id: 2, x: 600, y: 350, vx: -1.8, vy: 1.3, color: '#4DB8E8' },
  ]);
  const [highlightedCountry, setHighlightedCountry] = useState(null);
  const [highlightedCountries, setHighlightedCountries] = useState({});

  // Store original colors on mount
  useEffect(() => {
    const svgContainer = svgContainerRef.current;
    if (!svgContainer) return;

    const paths = svgContainer.querySelectorAll('path[data-name]');
    paths.forEach((path) => {
      const countryId = path.id;
      pathRefsRef.current[countryId] = path;
      countryColorsRef.current[countryId] = path.getAttribute('fill') || '#d4d4d8';
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const svgContainer = svgContainerRef.current;
    if (!container || !svgContainer) return;

    const { width, height } = container.getBoundingClientRect();
    const svgElement = svgContainer.querySelector('svg');
    const svgRect = svgElement.getBoundingClientRect();
    const scaleX = svgRect.width / 1000;
    const scaleY = svgRect.height / 1001;

    let animationId;
    let frameCount = 0;

    const updateCountryColor = (countryCode, color) => {
      const path = pathRefsRef.current[countryCode];
      if (path) {
        path.setAttribute('fill', color);
        path.setAttribute('filter', `drop-shadow(0 0 8px ${color})`);
      }
    };

    const resetCountryColor = (countryCode) => {
      const path = pathRefsRef.current[countryCode];
      if (path) {
        const originalColor = countryColorsRef.current[countryCode] || '#d4d4d8';
        path.setAttribute('fill', originalColor);
        path.setAttribute('filter', 'none');
      }
    };

    const checkCountryCollision = (planeX, planeY, planeColor) => {
      const highlighted = {};

      for (const [code, bounds] of Object.entries(COUNTRY_BOUNDS)) {
        const scaledX = bounds.x * scaleX;
        const scaledY = bounds.y * scaleY;
        const scaledW = bounds.w * scaleX;
        const scaledH = bounds.h * scaleY;

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

          // Check collision every 2 frames
          if (frameCount % 2 === 0) {
            const relativeX = (newX / width) * svgRect.width;
            const relativeY = (newY / height) * svgRect.height;

            const countryCollision = checkCountryCollision(relativeX, relativeY, plane.color);
            setHighlightedCountries((prev) => {
              // Reset previous countries not in collision anymore
              for (const code in prev) {
                if (!countryCollision[code]) {
                  resetCountryColor(code);
                  delete prev[code];
                }
              }

              // Update new collisions
              for (const [code, color] of Object.entries(countryCollision)) {
                if (prev[code] !== color) {
                  updateCountryColor(code, color);
                  prev[code] = color;
                }
              }

              return { ...prev };
            });

            // Show first highlighted country
            const firstCountry = Object.keys(countryCollision)[0];
            if (firstCountry) {
              setHighlightedCountry(COUNTRIES[firstCountry]?.name);
            } else {
              setHighlightedCountry(null);
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
      {/* SVG Map */}
      <div
        ref={svgContainerRef}
        className="w-full h-full absolute inset-0"
        dangerouslySetInnerHTML={{
          __html: `
            <svg viewBox="0 0 1000 1001" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <style>path { fill-rule: evenodd; }</style>
              </defs>
              <path id="AO" data-name="Angola" d="m 495.3,598.6 -36,-0.2 -4.3,1.7 -3.5,-0.3 -5.1,1.9 -1.1,2.7 6,8.7 2.4,9.3 3.6,13.4 -3.8,5.5 -0.6,2.8 2.9,8.3 3.1,8.4 3.6,5 0.6,7.8 -1.4,10.3 -4,6.1 -7.1,9.1 -2.9,5.6 -4.1,12.5 -0.8,5.9 -4.3,12.7 -1.9,12.2 1,8.7 5.9,-2.7 7.2,-2.3 7.8,0.4 7.1,6.3 1.9,-1 48.8,-0.6 8.2,6.6 29.1,2 22.4,-5.7 -7.6,-8.6 -7.8,-11.3 1.6,-44 25.3,0.1 -1,-4.7 2,-5.2 -2,-6.5 1.5,-6.7 -1.2,-4.3 -5.5,-0.8 -7.6,2 -5.3,-0.3 -3,1.3 0.9,-16.5 -3.9,-5.1 -0.8,-8.5 1.9,-8.4 -2.4,-5.3 -0.1,-8.7 -14.8,0.1 1.1,-5 -6.2,0.1 -0.7,2.4 -7.6,0.5 -3.1,8.1 -1.9,3.4 -6.7,-1.9 -4,1.9 -8.1,1.1 -4.6,-7.2 -2.7,-4.5 -3.5,-8.3 -2.9,-10.3 z m -47.4,-2.7 0.4,-6 2,-3.5 4.5,-2.9 -4.6,-4.8 -3.7,2.3 -5,6 3.3,10.4 3.1,-1.5 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="BJ" data-name="Benin" d="m 340,356 -9.3,-8 -4.3,0.1 -4.1,4 -2.6,4.2 -6,1.2 -2.5,6.1 -4.1,1.6 -1.6,7.2 3.7,4.1 4.3,4.9 0.4,6.8 2.5,2.8 -0.5,31.8 3,9.5 10.1,-1.6 0.6,-22.3 -0.3,-8.8 2.3,-8.7 3.7,-4.3 5.9,-8.5 -1.3,-3.7 2.4,-5.6 -2.8,-8.2 0.5,-4.6 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="BW" data-name="Botswana" d="m 590,651.8 -7.1,-0.5 -9.2,1.9 -9.2,0.8 -12.7,-0.5 -4.6,2.5 -3.5,4.5 -1.7,5.9 0.6,6.6 3.9,5.6 5.2,5.9 5.8,1.3 9.6,-1.5 10.3,-2.3 10.3,-3.8 7.1,-4.5 4.1,-4.7 1.9,-5.8 -0.3,-5.9 -4,-5.4 -5.6,-0.1 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="CM" data-name="Cameroon" d="m 435,345 -2,-4.3 -4.2,0.1 -4,2.3 -3.5,4.2 -2,6 0.8,7.2 3,6 4.5,3.5 5.2,1.8 5.5,-1 4.8,-3.2 3,-5.1 1,-6.5 -2,-4.2 -4.3,-1.3 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="CG" data-name="Congo" d="m 530,480 -4,-2 -6,1 -6,3 -4,4.5 -1.5,5.5 1,6 4,4 6,2 6,-1 4,-3 2,-4.5 0.5,-6 -2,-4.5 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="CD" data-name="Dem. Rep. Congo" d="m 600,450 -6,-3 -12,2 -10,4 -6,6 -2,8 2,8 6,6 10,4 12,-2 6,-4 4,-6 2,-8 -1,-7 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="CF" data-name="Central African Rep." d="m 550,370 -5,-3 -8,2 -6,4.5 -3,6.5 -0.5,7.5 2,7 5,5 8,-2 6,-4 2,-6 0.5,-7 -2,-8 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="ET" data-name="Ethiopia" d="m 750,340 -4,-2 -8,1 -8,4 -5,6.5 -1.5,8 2,8 5,6 8,3 8,-2 6,-4 3,-6 1,-8 -1,-8 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="GA" data-name="Gabon" d="m 490,450 -3,-1.5 -4,0.5 -3.5,2 -2,3.5 -0.5,4 1,4 2.5,2.5 4,-0.5 3,-2 1.5,-3 0.5,-3.5 -1,-1.5 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="GH" data-name="Ghana" d="m 310,360 -2,-1.5 -3.5,0.3 -3,1.5 -1.8,2.5 -0.5,3.5 0.8,3.5 2.2,2.5 3.5,-0.3 3,-1.5 1.5,-2.5 0.5,-3.5 -0.2,-2 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="KE" data-name="Kenya" d="m 690,480 -4,-2 -6,1.5 -6,4 -3,6.5 -0.5,7.5 2,7 5,5 6,-1.5 5,-3.5 2.5,-5.5 0.5,-6.5 -1,-6 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="ML" data-name="Mali" d="m 320,280 -5,-1.5 -12,1 -10,3 -6,5 -2,6.5 1,7 5,5.5 10,3.5 12,-1.5 8,-3 3,-5 0.5,-6.5 -1,-7 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="MZ" data-name="Mozambique" d="m 680,580 -3,-1.5 -4,1 -4,3.5 -2,5.5 -0.5,6.5 1.5,6 3.5,3 4,-1 3.5,-3 1.5,-5 0.5,-6 -0.5,-4 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="NG" data-name="Nigeria" d="m 380,330 -4,-2 -6,0.5 -6,2.5 -3.5,4 -1,5.5 1.5,6 4,4.5 6,-0.5 5.5,-2.5 3,-4 0.8,-5.5 -0.8,-4.5 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="TZ" data-name="Tanzania" d="m 680,520 -4,-2 -8,1.5 -8,4.5 -4,6.5 -1,8 1.5,8 4.5,6 8,-1.5 7,-4 3,-6 0.8,-7.5 -0.8,-6 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="UG" data-name="Uganda" d="m 680,450 -2.5,-1.5 -3.5,0.8 -3,2 -1.5,3 -0.5,3.5 0.8,3.2 2.5,1.8 3.5,-0.8 2.8,-1.8 1.2,-2.8 0.3,-3.2 -0.5,-2 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="ZA" data-name="South Africa" d="m 610,700 -5,-1 -8,1.5 -8,4 -5,6 -2,7.5 0.5,8 4,7 8,3 8,-1.5 6,-4 2.5,-6 0.5,-8 -1,-7 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="ZM" data-name="Zambia" d="m 610,580 -4,-1.5 -7,1 -8,3.5 -4.5,5.5 -1.5,6.5 1,6.5 4,5 7,-1 7,-3 3.5,-5 1,-6.5 -0.5,-5 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="ZW" data-name="Zimbabwe" d="m 630,630 -3,-1.5 -5,1 -5,2.5 -2.5,4 -0.5,4.5 0.8,4.2 2.5,2.5 4,-0.8 4,-2.5 1.8,-3.5 0.5,-4 -1,-2.2 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="BF" data-name="Burkina Faso" d="m 280,290 -3,-1 -4,0.5 -3.5,1.5 -2,2.5 -0.8,3.5 0.5,3.5 2,2.5 3.5,-0.5 3,-1.5 1.8,-2.5 0.8,-3.2 -0.3,-2.8 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="TG" data-name="Togo" d="m 300,350 -1.5,-1 -2.5,0.3 -2,1 -1,1.5 -0.3,2 0.4,2 1.2,1.5 2,-0.2 1.8,-1 0.8,-1.5 0.3,-2 -0.1,-1.2 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="CI" data-name="Côte d'Ivoire" d="m 220,350 -2,-1 -3,0.5 -2.5,1.5 -1.2,2.5 -0.3,3 0.6,3 1.8,2 3,-0.3 2.5,-1.2 1.2,-2 0.3,-3 -0.1,-2.5 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="GQ" data-name="Eq. Guinea" d="m 420,475 -1,-0.8 -1.5,0.2 -1,0.8 -0.5,1.2 0,1.2 0.5,0.8 1.2,-0.2 1,-0.6 0.3,-1 0,-1 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="SN" data-name="Senegal" d="m 270,310 -1.5,-0.8 -2,0.3 -1.5,0.8 -1,1.5 -0.4,1.8 0.3,1.8 1,1.2 1.8,-0.2 1.5,-0.8 0.8,-1.2 0.4,-1.6 -0.2,-1.4 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="NE" data-name="Niger" d="m 420,200 -4,-1.5 -8,2 -6,4 -3,6.5 -0.5,7.5 2,7 5,5 8,-2 6,-4 2,-6 0.5,-7 -2,-8 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
              <path id="TD" data-name="Chad" d="m 520,250 -5,-1.5 -8,1.5 -6,3.5 -3,5.5 -0.5,6.5 1.5,6.5 4,4.5 7,-1.2 6,-3.5 2.5,-5 0.5,-6.5 -1,-5 z" fill="#d4d4d8" stroke="#64748b" stroke-width="0.8" />
            </svg>
          `,
        }}
      />

      {/* Planes */}
      {planes.map((plane) => (
        <motion.div
          key={plane.id}
          className="absolute pointer-events-none z-10 flex items-center justify-center"
          style={{
            left: plane.x - 12,
            top: plane.y - 12,
            width: 24,
            height: 24,
          }}
        >
          <Plane
            size={24}
            color={plane.color}
            fill={plane.color}
            style={{
              filter: `drop-shadow(0 0 8px ${plane.color})`,
              transform: 'rotate(45deg)',
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
        Avions en mouvement...
      </div>
    </div>
  );
}
