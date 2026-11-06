"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { branches } from "@/data/site";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Position = [number, number];

type LineStringGeometry = {
  type: "LineString";
  coordinates: Position[];
};

type MultiLineStringGeometry = {
  type: "MultiLineString";
  coordinates: Position[][];
};

type PolygonGeometry = {
  type: "Polygon";
  coordinates: Position[][];
};

type MultiPolygonGeometry = {
  type: "MultiPolygon";
  coordinates: Position[][][];
};

type MapGeometry =
  | LineStringGeometry
  | MultiLineStringGeometry
  | PolygonGeometry
  | MultiPolygonGeometry;

type MapFeatureCollection = {
  features: {
    geometry: MapGeometry | null;
  }[];
};

const cityCoordinates: Record<string, { lat: number; lon: number }> = {
  ranchi: { lat: 23.3441, lon: 85.3096 },
  gaya: { lat: 24.7914, lon: 85.0002 },
  jaipur: { lat: 26.9124, lon: 75.7873 },
  chennai: { lat: 13.0827, lon: 80.2707 },
  ujjain: { lat: 23.1765, lon: 75.7885 },
};

const VIEW_WIDTH = 440;
const VIEW_HEIGHT = 520;
const MAP_PADDING = 34;

function getOuterRings(data: MapFeatureCollection): Position[][] {
  return data.features.flatMap((feature) => {
    const geometry = feature.geometry;

    if (!geometry) return [];

    switch (geometry.type) {
      case "LineString":
        return [geometry.coordinates];

      case "MultiLineString":
        return geometry.coordinates;

      case "Polygon":
        return geometry.coordinates[0]
          ? [geometry.coordinates[0]]
          : [];

      case "MultiPolygon":
        return geometry.coordinates.flatMap((polygon) =>
          polygon[0] ? [polygon[0]] : [],
        );

      default:
        return [];
    }
  });
}

export default function BranchesSectionClient() {
  const sectionRef = useRef<HTMLElement>(null);
  const [rings, setRings] = useState<Position[][]>([]);
  const [mapError, setMapError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadMap() {
      try {
        const response = await fetch("/maps/india.geojson");

        if (!response.ok) {
          throw new Error("India map data could not be loaded.");
        }

        const data = (await response.json()) as MapFeatureCollection;
        const outerRings = getOuterRings(data);

        if (!outerRings.length) {
          throw new Error("India map geometry is empty.");
        }

        if (!cancelled) {
          setRings(outerRings);
        }
      } catch (error) {
        console.error("India map loading error:", error);

        if (!cancelled) {
          setMapError(true);
        }
      }
    }

    loadMap();

    return () => {
      cancelled = true;
    };
  }, []);

  const mapData = useMemo(() => {
    if (!rings.length) return null;

    let minLon = Infinity;
let maxLon = -Infinity;
let minLat = Infinity;
let maxLat = -Infinity;

for (const ring of rings) {
  for (const point of ring) {
    const [lon, lat] = point;

    if (!Number.isFinite(lon) || !Number.isFinite(lat)) {
      continue;
    }

    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  }
}

if (
  !Number.isFinite(minLon) ||
  !Number.isFinite(maxLon) ||
  !Number.isFinite(minLat) ||
  !Number.isFinite(maxLat)
) {
  return null;
}

    const meanLatitude = ((minLat + maxLat) / 2) * (Math.PI / 180);
    const longitudeFactor = Math.cos(meanLatitude);

    const geographicWidth = (maxLon - minLon) * longitudeFactor;
    const geographicHeight = maxLat - minLat;

    const availableWidth = VIEW_WIDTH - MAP_PADDING * 2;
    const availableHeight = VIEW_HEIGHT - MAP_PADDING * 2;

    const scale = Math.min(
      availableWidth / geographicWidth,
      availableHeight / geographicHeight,
    );

    const renderedWidth = geographicWidth * scale;
    const renderedHeight = geographicHeight * scale;

    const offsetX = (VIEW_WIDTH - renderedWidth) / 2;
    const offsetY = (VIEW_HEIGHT - renderedHeight) / 2;

    const project = ([lon, lat]: Position) => ({
      x: offsetX + (lon - minLon) * longitudeFactor * scale,
      y: offsetY + (maxLat - lat) * scale,
    });

    const path = rings
  .map((ring) =>
    ring
      .map((point, index) => {
        const projected = project(point);

        return `${index === 0 ? "M" : "L"}${projected.x.toFixed(2)},${projected.y.toFixed(2)}`;
      })
      .join(" "),
  )
  .join(" ");

    const markers = branches.map((branch) => {
      const coordinates = cityCoordinates[branch.city.toLowerCase().trim()];

      if (!coordinates) return null;

      return project([coordinates.lon, coordinates.lat]);
    });

    return { path, markers };
  }, [rings]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !mapData) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add("(min-width: 900px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=1100",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        timeline
          .fromTo(
            ".branches-premium__eyebrow",
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.3 },
          )
          .fromTo(
            ".branches-premium__title-line",
            { yPercent: 110, rotate: 3 },
            {
              yPercent: 0,
              rotate: 0,
              stagger: 0.12,
              duration: 0.65,
              ease: "power3.out",
            },
            "-=0.1",
          )
          .fromTo(
            ".branches-premium__copy",
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.35 },
            "-=0.25",
          )
          .fromTo(
            ".branches-premium__map",
            { scale: 0.9, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.7 },
            "-=0.3",
          )
          .fromTo(
            ".branches-premium__india-outline",
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.5, ease: "none" },
            "-=0.45",
          )
          .fromTo(
            ".branches-premium__item",
            { x: 35, autoAlpha: 0 },
            {
              x: 0,
              autoAlpha: 1,
              stagger: 0.13,
              duration: 0.45,
              ease: "power2.out",
            },
            "-=1.1",
          )
          .fromTo(
            ".branches-premium__marker",
            { scale: 0, transformOrigin: "center" },
            {
              scale: 1,
              stagger: 0.12,
              duration: 0.3,
              ease: "back.out(2)",
            },
            "-=0.8",
          );
      });

      mm.add("(max-width: 899px)", () => {
        gsap.fromTo(
          ".branches-premium__reveal",
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
            },
          },
        );
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [mapData]);

  return (
    <section
      className="branches-premium"
      ref={sectionRef}
      aria-labelledby="branches-premium-title"
    >
      <div className="container branches-premium__inner">
        <div className="branches-premium__intro">
          <p className="eyebrow eyebrow--light branches-premium__eyebrow branches-premium__reveal">
            <span />
            Our branches
          </p>

          <h2
            className="branches-premium__title"
            id="branches-premium-title"
          >
            <span className="branches-premium__title-line">A nationwide</span>
            <span className="branches-premium__title-line">presence.</span>
            <span className="branches-premium__title-line branches-premium__title-accent">
              One standard.
            </span>
          </h2>

          <p className="branches-premium__copy branches-premium__reveal">
            Five locations. One considered approach to accounting, taxation,
            assurance and business advisory.
          </p>

          <div className="branches-premium__counter branches-premium__reveal">
            <strong>05</strong>
            <span>Locations across India</span>
          </div>
        </div>

        <div className="branches-premium__map branches-premium__reveal">
          <div className="branches-premium__map-heading">
            <span>VRA ASSOCIATES</span>
            <span>INDIA NETWORK</span>
          </div>

          <svg
            className="branches-premium__svg"
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
            role="img"
            aria-label="Geographic outline of India with five VRA Associates branch locations"
          >
            <defs>
              <linearGradient
                id="vraMapGold"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#E6D5AF" />
                <stop offset="55%" stopColor="#C7A96F" />
                <stop offset="100%" stopColor="#927443" />
              </linearGradient>

              <radialGradient id="vraMapMarker">
                <stop offset="0%" stopColor="#FFF6DF" />
                <stop offset="48%" stopColor="#D7B77A" />
                <stop offset="100%" stopColor="#A1844E" />
              </radialGradient>

              <filter id="vraMapGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Real geographic boundary from the local GeoJSON file */}
            {mapData && (
              <path
                className="branches-premium__india-outline"
                d={mapData.path}
                pathLength={1}
                fill="none"
                fillRule="evenodd"
                stroke="url(#vraMapGold)"
                strokeWidth="1.65"
                strokeDasharray="1"
                strokeDashoffset="0"
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            )}

            {/* Branch markers use the same geographic projection as the map */}
            {mapData?.markers.map((point, index) => {
              if (!point) return null;

              const branch = branches[index];
              const active = activeIndex === index;

              return (
                <g
                  key={branch.city}
                  className={`branches-premium__marker ${active ? "is-active" : ""}`}
                  transform={`translate(${point.x}, ${point.y})`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${branch.city}, ${branch.state}`}
                  aria-pressed={active}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                >
                  <circle
                    className="branches-premium__marker-pulse"
                    r="13"
                  />

                  <circle
                    className="branches-premium__marker-halo"
                    r="9"
                  />

                  <circle
                    className="branches-premium__marker-ring"
                    r="6.5"
                  />

                  <circle
                    className="branches-premium__marker-dot"
                    r="2.8"
                  />

                  {active && (
                    <g className="branches-premium__marker-label">
                      <rect x="12" y="-25" width="76" height="20" rx="2" />
                      <text x="20" y="-12">
                        {branch.city.toUpperCase()}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {mapError && (
            <p className="branches-premium__map-error">
              India map boundary could not be loaded.
            </p>
          )}

          {!mapData && !mapError && (
            <p className="branches-premium__map-loading">
              Loading India map…
            </p>
          )}

          <div className="branches-premium__map-footer">
            <span>GEOGRAPHIC BRANCH NETWORK</span>
            <span>01 — 05</span>
          </div>
        </div>

        <div className="branches-premium__locations">
          <div className="branches-premium__locations-heading branches-premium__reveal">
            <span>OUR NETWORK</span>
            <span>SELECT A LOCATION</span>
          </div>

          <ol className="branches-premium__list">
            {branches.map((branch, index) => (
              <li
                className={`branches-premium__item ${
                  activeIndex === index ? "is-active" : ""
                }`}
                key={branch.city}
              >
                <button
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={activeIndex === index}
                  className="branches-premium__branch"
                >
                  <span className="branches-premium__number">
                    0{index + 1}
                  </span>

                  <span className="branches-premium__branch-info">
                    <strong>{branch.state}</strong>
                    <small>{branch.city}</small>
                  </span>

                  <span className="branches-premium__pin">
                    <MapPin size={17} strokeWidth={1.5} />
                  </span>

                  <ArrowUpRight
                    className="branches-premium__arrow"
                    size={17}
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ol>

          <p className="branches-premium__note branches-premium__reveal">
            Connected by clarity. Guided by professional care.
          </p>
        </div>
      </div>
    </section>
  );
}