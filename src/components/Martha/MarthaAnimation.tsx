import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Series,
  Easing,
  Audio,
  Img,
} from "remotion";

import voiceover from "./voiceover.mp3";
import musicTrack from "./Soft Circuit Skyline.mp3";
import slackLogo from "./Slack_Symbol_2.webp";
import salesforceLogo from "./Salesforce_idN3OdcTG__1.png";
import gcpLogo from "./google cloud logo.jpeg";
import acLogo from "./ActiveCampaign_Logo_2.webp";
import zohoLogo from "./zoho-logo-web.svg";

// ─────────────────────────── Shared helpers ───────────────────────────

const PURPLE = "#7C3AED";
const PURPLE_LIGHT = "#A78BFA";
const PURPLE_DARK = "#4C1D95";
const INDIGO = "#4F46E5";
const CYAN = "#06B6D4";
const WHITE = "#FFFFFF";
const BG_DARK = "#0F0A1A";
const BG_MID = "#1A0F2E";

function fadeIn(frame: number, fps: number, startSec = 0, durationSec = 0.5) {
  return interpolate(
    frame,
    [startSec * fps, (startSec + durationSec) * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
}

function slideUp(frame: number, fps: number, startSec = 0, _durationSec = 0.6) {
  const progress = spring({
    frame: frame - startSec * fps,
    fps,
    config: { damping: 200 },
  });
  return interpolate(progress, [0, 1], [60, 0]);
}

function scaleIn(frame: number, fps: number, startSec = 0) {
  return spring({
    frame: frame - startSec * fps,
    fps,
    config: { damping: 15, stiffness: 180 },
  });
}

// ─────────────────────────── Background ───────────────────────────

const AnimatedBG: React.FC<{ accentColor?: string }> = ({
  accentColor = PURPLE,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const pulse = interpolate(Math.sin(frame / fps), [-1, 1], [0.3, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${BG_DARK} 0%, ${BG_MID} 50%, #0D1B3E 100%)`,
      }}
    >
      {/* Glowing orb top-right */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -100,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}33 0%, transparent 70%)`,
          opacity: pulse,
        }}
      />
      {/* Glowing orb bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${CYAN}22 0%, transparent 70%)`,
          opacity: pulse * 0.8,
        }}
      />
      {/* Grid lines */}
      <svg
        style={{ position: "absolute", inset: 0, opacity: 0.04 }}
        width={width}
        height={height}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={(width / 20) * i}
            y1={0}
            x2={(width / 20) * i}
            y2={height}
            stroke={WHITE}
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={(height / 12) * i}
            x2={width}
            y2={(height / 12) * i}
            stroke={WHITE}
            strokeWidth={1}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

// ─────────────────────────── Particle dots ───────────────────────────

const FloatingDots: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dots = [
    { x: 120, y: 200, size: 4, speed: 0.8 },
    { x: 340, y: 450, size: 3, speed: 1.2 },
    { x: 780, y: 150, size: 5, speed: 0.5 },
    { x: 1100, y: 300, size: 3, speed: 1.5 },
    { x: 1600, y: 500, size: 4, speed: 0.7 },
    { x: 1800, y: 180, size: 5, speed: 0.9 },
    { x: 600, y: 700, size: 3, speed: 1.1 },
    { x: 400, y: 900, size: 4, speed: 0.6 },
  ];

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {dots.map((d, i) => {
        const yOffset = Math.sin((frame / fps) * d.speed + i) * 15;
        const opacity = interpolate(
          Math.sin((frame / fps) * 0.5 + i * 0.7),
          [-1, 1],
          [0.2, 0.6],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y + yOffset,
              width: d.size,
              height: d.size,
              borderRadius: "50%",
              background: PURPLE_LIGHT,
              opacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ─────────────────────────── Martha Avatar / Logo ───────────────────────────

const MarthaAvatar: React.FC<{ size?: number; animated?: boolean }> = ({
  size = 120,
  animated = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = animated
    ? 1 + interpolate(Math.sin(frame / (fps * 0.8)), [-1, 1], [-0.03, 0.03], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  const ringOpacity = animated
    ? interpolate(
        Math.sin(frame / (fps * 1.2)),
        [-1, 1],
        [0.3, 0.7],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0.5;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer ring */}
      <div
        style={{
          position: "absolute",
          width: size + 20,
          height: size + 20,
          borderRadius: "50%",
          border: `2px solid ${PURPLE_LIGHT}`,
          opacity: ringOpacity,
          transform: `scale(${pulse})`,
        }}
      />
      {/* Middle ring */}
      <div
        style={{
          position: "absolute",
          width: size + 40,
          height: size + 40,
          borderRadius: "50%",
          border: `1px solid ${PURPLE}`,
          opacity: ringOpacity * 0.4,
          transform: `scale(${pulse * 1.02})`,
        }}
      />
      {/* Main avatar circle */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${PURPLE_DARK} 0%, ${PURPLE} 50%, ${INDIGO} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 40px ${PURPLE}66, 0 0 80px ${PURPLE}22`,
          transform: `scale(${pulse})`,
        }}
      >
        {/* "M" letter */}
        <svg
          width={size * 0.55}
          height={size * 0.55}
          viewBox="0 0 60 60"
          fill="none"
        >
          <path
            d="M8 48V12L30 36L52 12V48"
            stroke={WHITE}
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

// ─────────────────────────── Chat Bubble ───────────────────────────

const ChatBubble: React.FC<{
  text: string;
  isUser?: boolean;
  delay?: number;
  maxWidth?: number;
}> = ({ text, isUser = false, delay = 0, maxWidth = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - delay * fps;
  const opacity = interpolate(localFrame, [0, 0.3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateX = interpolate(
    spring({
      frame: localFrame,
      fps,
      config: { damping: 200 },
    }),
    [0, 1],
    [isUser ? 40 : -40, 0]
  );

  const displayedChars = Math.floor(
    interpolate(localFrame, [0, 1.5 * fps], [0, text.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const displayedText = text.slice(0, displayedChars);

  if (localFrame < 0) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        width: "100%",
        marginBottom: 12,
      }}
    >
      {!isUser && (
        <div style={{ marginRight: 10, flexShrink: 0 }}>
          <MarthaAvatar size={40} animated={false} />
        </div>
      )}
      <div
        style={{
          maxWidth,
          padding: "14px 20px",
          borderRadius: isUser ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
          background: isUser
            ? `linear-gradient(135deg, ${INDIGO}, ${PURPLE})`
            : "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          border: isUser
            ? "none"
            : `1px solid rgba(255,255,255,0.12)`,
          color: WHITE,
          fontSize: 22,
          lineHeight: 1.5,
          fontFamily: "'Inter', sans-serif",
          boxShadow: isUser
            ? `0 4px 20px ${PURPLE}44`
            : "0 2px 12px rgba(0,0,0,0.3)",
        }}
      >
        {displayedText}
        {displayedChars < text.length && (
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: "1em",
              background: PURPLE_LIGHT,
              marginLeft: 2,
              verticalAlign: "text-bottom",
              opacity: Math.sin(frame / (fps * 0.3)) > 0 ? 1 : 0,
            }}
          />
        )}
      </div>
    </div>
  );
};

// ─────────────────────────── Feature Card ───────────────────────────

const FeatureCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  delay: number;
  color?: string;
}> = ({ icon, title, description, delay, color = PURPLE }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - delay * fps;
  const scale = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 200 },
  });
  const opacity = interpolate(localFrame, [0, 0.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (localFrame < 0) return null;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        background: "rgba(255,255,255,0.05)",
        border: `1px solid ${color}44`,
        borderRadius: 20,
        padding: "28px 32px",
        backdropFilter: "blur(10px)",
        boxShadow: `0 4px 30px ${color}22`,
        flex: 1,
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontSize: 48,
          marginBottom: 14,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: WHITE,
          fontFamily: "'Inter', sans-serif",
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 20,
          color: "rgba(255,255,255,0.65)",
          fontFamily: "'Inter', sans-serif",
          lineHeight: 1.5,
        }}
      >
        {description}
      </div>
    </div>
  );
};

// ─────────────────────────── Connection line animation ───────────────────────────

const ConnectionLine: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  color?: string;
}> = ({ x1, y1, x2, y2, delay, color = PURPLE_LIGHT }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - delay * fps;
  const progress = interpolate(localFrame, [0, 0.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  return (
    <svg
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      width="100%"
      height="100%"
    >
      <defs>
        <linearGradient id={`lg-${x1}-${y1}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity={0.1} />
          <stop offset="100%" stopColor={color} stopOpacity={0.8} />
        </linearGradient>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x1 + (x2 - x1) * progress}
        y2={y1 + (y2 - y1) * progress}
        stroke={`url(#lg-${x1}-${y1})`}
        strokeWidth={2}
        strokeDasharray="6 4"
      />
      {progress > 0.9 && (
        <circle
          cx={x1 + (x2 - x1) * progress}
          cy={y1 + (y2 - y1) * progress}
          r={5}
          fill={color}
          opacity={0.8}
        />
      )}
    </svg>
  );
};


// ─────────────────────────── SCENE 1 — Hero Introduction ───────────────────────────

export const Scene1Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, fps, 0.3, 0.8);
  const titleY = slideUp(frame, fps, 0.3, 0.6);

  const subtitleOpacity = fadeIn(frame, fps, 1.0, 0.8);
  const subtitleY = slideUp(frame, fps, 1.0, 0.6);

  const taglineOpacity = fadeIn(frame, fps, 1.8, 0.7);

  const avatarScale = scaleIn(frame, fps, 0.2);

  return (
    <AbsoluteFill>
      <AnimatedBG />
      <FloatingDots />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            transform: `scale(${avatarScale})`,
            marginBottom: 40,
          }}
        >
          <MarthaAvatar size={160} animated />
        </div>

        {/* MARTHA title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 110,
            fontWeight: 900,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: -4,
            background: `linear-gradient(90deg, ${WHITE} 30%, ${PURPLE_LIGHT} 70%, ${CYAN} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
          }}
        >
          MARTHA
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            fontSize: 36,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
            letterSpacing: 2,
            textTransform: "uppercase",
            marginTop: 8,
          }}
        >
          Your AI-Powered Ultimate Secretary
        </div>

        {/* Tagline pill */}
        <div
          style={{
            opacity: taglineOpacity,
            marginTop: 36,
            padding: "10px 28px",
            borderRadius: 100,
            border: `1px solid ${PURPLE_LIGHT}55`,
            background: `${PURPLE}22`,
            color: PURPLE_LIGHT,
            fontSize: 22,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: 0.5,
          }}
        >
          The source of truth for your entire company
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────── SCENE 1B — MARTHA Meaning ───────────────────────────

export const Scene1bMarthaMeaning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const acronym = [
    { letter: "M", title: "Management", desc: "Intelligent management of complex workflows" },
    { letter: "A", title: "Automated", desc: "Seamless automation of repetitive tasks and emails" },
    { letter: "R", title: "Resourceful", desc: "Instant retrieval of lost files and creative solutions" },
    { letter: "T", title: "Task", desc: "Precision focused execution of every daily operation" },
    { letter: "H", title: "High Impact", desc: "Driving powerful results and persuasive presentations" },
    { letter: "A", title: "Assistant", desc: "Your elite AI powered partner for total business success" },
  ];

  return (
    <AbsoluteFill>
      <AnimatedBG accentColor={PURPLE} />
      <FloatingDots />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 40,
          padding: "80px 140px",
          width: "100%",
          height: "100%",
        }}
      >
        {acronym.map((item, i) => {
          const delay = 0.5 + i * 0.8; // stagger by 0.8 seconds
          const y = slideUp(frame, fps, delay, 0.4);
          const opacity = fadeIn(frame, fps, delay, 0.4);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                opacity,
                transform: `translateY(${y}px)`,
                fontFamily: "'Inter', sans-serif",
                gap: 40,
              }}
            >
              {/* Highlight Letter */}
              <div
                style={{
                  fontSize: 72,
                  fontWeight: 900,
                  background: `linear-gradient(135deg, ${PURPLE_LIGHT}, ${CYAN})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  width: 80,
                  textAlign: "center",
                }}
              >
                {item.letter}
              </div>

              {/* Text content */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 42, fontWeight: 700, color: WHITE }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
                  {item.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────── SCENE 2 — What Martha Does ───────────────────────────

export const Scene2WhatSheIs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingOpacity = fadeIn(frame, fps, 0.2, 0.6);
  const headingY = slideUp(frame, fps, 0.2, 0.5);

  const lineProgress = interpolate(frame, [0.8 * fps, 1.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  return (
    <AbsoluteFill>
      <AnimatedBG accentColor={INDIGO} />
      <FloatingDots />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 140px",
        }}
      >
        <div
          style={{
            opacity: headingOpacity,
            transform: `translateY(${headingY}px)`,
            fontSize: 56,
            fontWeight: 800,
            color: WHITE,
            fontFamily: "'Inter', sans-serif",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Connects to your systems.
          <br />
          <span
            style={{
              background: `linear-gradient(90deg, ${PURPLE_LIGHT}, ${CYAN})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Acts like the ultimate secretary.
          </span>
        </div>

        {/* Animated underline */}
        <div
          style={{
            width: `${lineProgress * 400}px`,
            height: 3,
            background: `linear-gradient(90deg, ${PURPLE}, ${CYAN})`,
            borderRadius: 3,
            marginBottom: 70,
          }}
        />

        {/* Feature cards */}
        <div
          style={{
            display: "flex",
            gap: 28,
            width: "100%",
          }}
        >
          <FeatureCard
            icon="🔗"
            title="Connects Everything"
            description="Integrates with your CRM, calendar, and business tools seamlessly"
            delay={0.6}
            color={PURPLE}
          />
          <FeatureCard
            icon="🧠"
            title="Always Remembers"
            description="The single source of truth — knows everything about your clients"
            delay={0.9}
            color={CYAN}
          />
          <FeatureCard
            icon="⚡"
            title="Acts Instantly"
            description="Takes real actions — updates, retrieves, and reports in seconds"
            delay={1.2}
            color={INDIGO}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────── SCENE 3 — Martha AI Hub ───────────────────────────

export const Scene3ZohoConnect: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingOpacity = fadeIn(frame, fps, 0.2, 0.6);
  const headingY = slideUp(frame, fps, 0.2, 0.5);

  // 5 peripheral tools (Zoho CRM is now on the perimeter)
  const peripheralTools = [
    { type: "image", src: slackLogo, alt: "Slack" },
    { type: "image", src: salesforceLogo, alt: "Salesforce" },
    { type: "image", src: gcpLogo, alt: "Google Cloud" },
    { type: "image", src: acLogo, alt: "ActiveCampaign" },
    { type: "image", src: zohoLogo, alt: "Zoho CRM" },
  ];
  
  const radius = 260;
  const centerX = 960;
  const centerY = 340;

  return (
    <AbsoluteFill>
      <AnimatedBG accentColor={PURPLE} />
      <FloatingDots />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 100,
        }}
      >
        <div
          style={{
            opacity: headingOpacity,
            transform: `translateY(${headingY}px)`,
            fontSize: 52,
            fontWeight: 800,
            color: WHITE,
            fontFamily: "'Inter', sans-serif",
            textAlign: "center",
            marginBottom: 20,
            zIndex: 10,
          }}
        >
          Connect all your tools to{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${PURPLE_LIGHT}, ${CYAN})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Martha AI
          </span>
        </div>

        {/* Central Martha hub & radial tools */}
        <div style={{ position: "relative", width: "100%", height: 600 }}>
          {/* Connection lines from Martha center to each peripheral tool */}
          {peripheralTools.map((_, i) => {
            const angle = (i * 360) / peripheralTools.length - 90;
            const rad = (angle * Math.PI) / 180;
            const x2 = centerX + Math.cos(rad) * radius;
            const y2 = centerY + Math.sin(rad) * radius;
            return (
              <ConnectionLine
                key={`line-${i}`}
                x1={centerX}
                y1={centerY}
                x2={x2}
                y2={y2}
                delay={0.8 + i * 0.15}
                color={i % 2 === 0 ? PURPLE_LIGHT : CYAN}
              />
            );
          })}

          {/* Peripheral tools around */}
          {peripheralTools.map((element, i) => {
            const angle = (i * 360) / peripheralTools.length - 90;
            const rad = (angle * Math.PI) / 180;
            const x = centerX + Math.cos(rad) * radius;
            const y = centerY + Math.sin(rad) * radius;
            
            const s = scaleIn(frame, fps, 0.9 + i * 0.15);

            return (
              <div
                key={`tool-${i}`}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  transform: `translate(-50%, -50%) scale(${s})`,
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "50%",
                  padding: 10,
                  backdropFilter: "blur(10px)",
                  border: `1px solid rgba(255,255,255,0.15)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 100,
                  height: 100,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                <Img src={element.src!} style={{ width: 66, height: 66, objectFit: "contain", borderRadius: 8 }} />
              </div>
            );
          })}

          {/* Central Martha 'M' hub node */}
          <div
            style={{
              position: "absolute",
              left: centerX,
              top: centerY,
              transform: "translate(-50%, -50%)",
            }}
          >
            {(() => {
              const s = scaleIn(frame, fps, 0.5);
              return (
                <div 
                  style={{ 
                    transform: `scale(${s})`,
                    background: `linear-gradient(135deg, ${PURPLE_DARK}, ${BG_MID})`,
                    border: `3px solid ${PURPLE}`,
                    borderRadius: "50%",
                    width: 170,
                    height: 170,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 70px ${PURPLE}66, 0 0 120px ${PURPLE}22`,
                  }}
                >
                  <MarthaAvatar size={100} animated />
                </div>
              );
            })()}
          </div>
        </div>

        {/* Caption */}
        {(() => {
          const op = fadeIn(frame, fps, 2.0, 0.5);
          return (
            <div
              style={{
                opacity: op,
                fontSize: 28,
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'Inter', sans-serif",
                textAlign: "center",
                marginTop: 0,
              }}
            >
              One central hub. Infinite possibilities.
            </div>
          );
        })()}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────── SCENE 4 — Chat Demo: Calendar ───────────────────────────

export const Scene4ChatCalendar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerOp = fadeIn(frame, fps, 0.1, 0.4);
  const headerOp = fadeIn(frame, fps, 0.2, 0.5);
  const headerY = slideUp(frame, fps, 0.2, 0.4);

  return (
    <AbsoluteFill>
      <AnimatedBG accentColor={CYAN} />
      <FloatingDots />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 140px",
        }}
      >
        {/* Header */}
        <div
          style={{
            opacity: headerOp,
            transform: `translateY(${headerY}px)`,
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 50,
          }}
        >
          <span style={{ fontSize: 42 }}>📅</span>
          <span
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: WHITE,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Calendar Management
          </span>
        </div>

        {/* Chat window */}
        <div
          style={{
            opacity: containerOp,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 28,
            padding: "40px 50px",
            width: "100%",
            maxWidth: 1100,
            backdropFilter: "blur(20px)",
          }}
        >
          <ChatBubble
            text="Martha, schedule a meeting with John Smith for tomorrow at 3 PM"
            isUser
            delay={0.4}
            maxWidth={720}
          />
          <ChatBubble
            text="Done! ✅ I've scheduled a meeting with John Smith tomorrow at 3:00 PM. I also checked for any conflicts — you're free! Shall I send him an invite?"
            isUser={false}
            delay={2.2}
            maxWidth={720}
          />
        </div>

        {/* Live calendar preview badge */}
        {(() => {
          const op = fadeIn(frame, fps, 4.5, 0.6);
          const s = spring({
            frame: frame - 4.5 * fps,
            fps,
            config: { damping: 15, stiffness: 200 },
          });
          return (
            <div
              style={{
                opacity: op,
                transform: `scale(${s})`,
                marginTop: 36,
                padding: "16px 32px",
                background: `linear-gradient(135deg, ${CYAN}22, ${PURPLE}22)`,
                border: `1px solid ${CYAN}55`,
                borderRadius: 16,
                color: WHITE,
                fontSize: 22,
                fontFamily: "'Inter', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span>🗓️</span>
              <span>Meeting added to Zoho CRM + Calendar in real time</span>
            </div>
          );
        })()}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────── SCENE 5 — Chat Demo: Client Info ───────────────────────────

export const Scene5ChatClient: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOp = fadeIn(frame, fps, 0.2, 0.5);
  const headerY = slideUp(frame, fps, 0.2, 0.4);
  const containerOp = fadeIn(frame, fps, 0.1, 0.4);

  return (
    <AbsoluteFill>
      <AnimatedBG accentColor="#10B981" />
      <FloatingDots />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 140px",
        }}
      >
        <div
          style={{
            opacity: headerOp,
            transform: `translateY(${headerY}px)`,
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 50,
          }}
        >
          <span style={{ fontSize: 42 }}>👤</span>
          <span
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: WHITE,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Client Intelligence
          </span>
        </div>

        <div
          style={{
            opacity: containerOp,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 28,
            padding: "40px 50px",
            width: "100%",
            maxWidth: 1100,
            backdropFilter: "blur(20px)",
          }}
        >
          <ChatBubble
            text="Martha, what do you know about Acme Corp?"
            isUser
            delay={0.4}
            maxWidth={700}
          />
          <ChatBubble
            text="Acme Corp — here's a quick snapshot from Zoho CRM: Last contact was on March 18th, 2025. Total deal value: $84,000. They're currently in the Proposal stage. Key contact: Sarah Connors, CEO. Open support ticket since last Tuesday. Want the full report?"
            isUser={false}
            delay={2.0}
            maxWidth={760}
          />
        </div>

        {(() => {
          const op = fadeIn(frame, fps, 5.0, 0.6);
          const s = spring({
            frame: frame - 5.0 * fps,
            fps,
            config: { damping: 15, stiffness: 200 },
          });
          return (
            <div
              style={{
                opacity: op,
                transform: `scale(${s})`,
                marginTop: 36,
                padding: "16px 32px",
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                borderRadius: 16,
                color: WHITE,
                fontSize: 22,
                fontFamily: "'Inter', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span>🔍</span>
              <span>Pulled directly from your Zoho CRM in milliseconds</span>
            </div>
          );
        })()}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────── SCENE 6 — Chat Demo: Last Week ───────────────────────────

export const Scene6ChatHistory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOp = fadeIn(frame, fps, 0.2, 0.5);
  const headerY = slideUp(frame, fps, 0.2, 0.4);
  const containerOp = fadeIn(frame, fps, 0.1, 0.4);

  return (
    <AbsoluteFill>
      <AnimatedBG accentColor="#F59E0B" />
      <FloatingDots />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 140px",
        }}
      >
        <div
          style={{
            opacity: headerOp,
            transform: `translateY(${headerY}px)`,
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 50,
          }}
        >
          <span style={{ fontSize: 42 }}>📋</span>
          <span
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: WHITE,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Activity History
          </span>
        </div>

        <div
          style={{
            opacity: containerOp,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 28,
            padding: "40px 50px",
            width: "100%",
            maxWidth: 1100,
            backdropFilter: "blur(20px)",
          }}
        >
          <ChatBubble
            text="Martha, what did we do for Acme Corp last week?"
            isUser
            delay={0.4}
            maxWidth={700}
          />
          <ChatBubble
            text="Last week with Acme Corp: 📞 3 calls logged, 🤝 1 in-person meeting (March 20), 📧 2 follow-up emails sent, 📄 Contract revision v2.3 shared on March 21, and ✅ 1 support ticket resolved. Great week! Want me to draft a summary for their record?"
            isUser={false}
            delay={2.0}
            maxWidth={760}
          />
        </div>

        {(() => {
          const op = fadeIn(frame, fps, 5.2, 0.6);
          const s = spring({
            frame: frame - 5.2 * fps,
            fps,
            config: { damping: 15, stiffness: 200 },
          });
          return (
            <div
              style={{
                opacity: op,
                transform: `scale(${s})`,
                marginTop: 36,
                padding: "16px 32px",
                background: "rgba(245, 158, 11, 0.15)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                borderRadius: 16,
                color: WHITE,
                fontSize: 22,
                fontFamily: "'Inter', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span>⏱️</span>
              <span>Complete activity log — nothing slips through the cracks</span>
            </div>
          );
        })()}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────── SCENE 7 — And More ───────────────────────────

export const Scene7AndMore: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingOp = fadeIn(frame, fps, 0.2, 0.6);
  const headingY = slideUp(frame, fps, 0.2, 0.5);

  const capabilities = [
    { icon: "🧾", text: "Generate reports instantly" },
    { icon: "📨", text: "Draft emails on your behalf" },
    { icon: "🔔", text: "Set smart reminders" },
    { icon: "📊", text: "Analyze pipeline data" },
    { icon: "🤖", text: "Answer any business question" },
    { icon: "🔄", text: "Sync data across all tools" },
  ];

  return (
    <AbsoluteFill>
      <AnimatedBG accentColor={PURPLE} />
      <FloatingDots />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 140px",
        }}
      >
        <div
          style={{
            opacity: headingOp,
            transform: `translateY(${headingY}px)`,
            fontSize: 66,
            fontWeight: 900,
            color: WHITE,
            fontFamily: "'Inter', sans-serif",
            textAlign: "center",
            marginBottom: 14,
          }}
        >
          And{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${PURPLE_LIGHT}, ${CYAN})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            so much more
          </span>
          ...
        </div>

        {/* Capability pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
            justifyContent: "center",
            marginTop: 50,
            maxWidth: 1200,
          }}
        >
          {capabilities.map((cap, i) => {
            const localFrame = frame - (0.8 + i * 0.15) * fps;
            const s = spring({
              frame: localFrame,
              fps,
              config: { damping: 12, stiffness: 180 },
            });
            const op = interpolate(localFrame, [0, 0.3 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            if (localFrame < -5) return null;

            return (
              <div
                key={i}
                style={{
                  opacity: op,
                  transform: `scale(${s})`,
                  padding: "16px 30px",
                  background: "rgba(255,255,255,0.07)",
                  border: `1px solid ${PURPLE_LIGHT}33`,
                  borderRadius: 100,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 26,
                  color: WHITE,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  boxShadow: `0 4px 20px ${PURPLE}22`,
                }}
              >
                <span>{cap.icon}</span>
                <span>{cap.text}</span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────── SCENE 8 — CTA Closing ───────────────────────────

export const Scene8CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const avatarScale = scaleIn(frame, fps, 0.3);
  const titleOp = fadeIn(frame, fps, 0.8, 0.7);
  const titleY = slideUp(frame, fps, 0.8, 0.6);
  const subtitleOp = fadeIn(frame, fps, 1.4, 0.6);
  const ctaOp = fadeIn(frame, fps, 2.0, 0.7);
  const ctaScale = spring({
    frame: frame - 2.0 * fps,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // Shimmering CTA button
  const shimmerProgress = ((frame / fps) % 2) / 2;
  const shimmerX = interpolate(shimmerProgress, [0, 1], [-200, 500]);

  return (
    <AbsoluteFill>
      <AnimatedBG />
      <FloatingDots />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        <div style={{ transform: `scale(${avatarScale})`, marginBottom: 36 }}>
          <MarthaAvatar size={140} animated />
        </div>

        <div
          style={{
            opacity: titleOp,
            transform: `translateY(${titleY}px)`,
            fontSize: 72,
            fontWeight: 900,
            fontFamily: "'Inter', sans-serif",
            textAlign: "center",
            background: `linear-gradient(90deg, ${WHITE} 20%, ${PURPLE_LIGHT} 60%, ${CYAN} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -2,
          }}
        >
          Meet Martha Today
        </div>

        <div
          style={{
            opacity: subtitleOp,
            fontSize: 32,
            color: "rgba(255,255,255,0.65)",
            fontFamily: "'Inter', sans-serif",
            textAlign: "center",
            marginTop: 16,
            maxWidth: 900,
            lineHeight: 1.5,
          }}
        >
          Let Martha handle the complexity so you can focus on what matters.
        </div>

        {/* CTA Button with shimmer */}
        <div
          style={{
            opacity: ctaOp,
            transform: `scale(${ctaScale})`,
            marginTop: 48,
            position: "relative",
            overflow: "hidden",
            padding: "22px 60px",
            background: `linear-gradient(135deg, ${PURPLE}, ${INDIGO})`,
            borderRadius: 100,
            boxShadow: `0 8px 40px ${PURPLE}55, 0 0 80px ${PURPLE}22`,
            cursor: "pointer",
          }}
        >
          {/* Shimmer overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: shimmerX,
              width: 100,
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
              transform: "skewX(-20deg)",
            }}
          />
          <span
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: WHITE,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: 0.5,
            }}
          >
            Start with Martha →
          </span>
        </div>

        {/* Brand watermark */}
        {(() => {
          const wOp = fadeIn(frame, fps, 2.8, 0.5);
          return (
            <div
              style={{
                opacity: wOp,
                marginTop: 44,
                fontSize: 20,
                color: "rgba(255,255,255,0.3)",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Martha • AI Agent • Powered by PPP
            </div>
          );
        })()}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────── Main Composition ───────────────────────────

export const MarthaAnimation: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={voiceover} volume={1} />
      <Audio src={musicTrack} volume={0.15} />

      <Series>
        {/* Scene 1: Hero — 4s */}
        <Series.Sequence durationInFrames={4 * fps} premountFor={fps}>
          <Scene1Hero />
        </Series.Sequence>

        {/* Scene 1b: MARTHA Meaning — 8s */}
        <Series.Sequence
          durationInFrames={8 * fps}
          premountFor={fps}
          offset={-15}
        >
          <Scene1bMarthaMeaning />
        </Series.Sequence>

        {/* Scene 2: What she is — 5s */}
        <Series.Sequence
          durationInFrames={5 * fps}
          premountFor={fps}
          offset={-15}
        >
          <Scene2WhatSheIs />
        </Series.Sequence>

        {/* Scene 3: Zoho connection — 4.5s */}
        <Series.Sequence
          durationInFrames={4.5 * fps}
          premountFor={fps}
          offset={-10}
        >
          <Scene3ZohoConnect />
        </Series.Sequence>

        {/* Scene 4: Calendar chat — 6s */}
        <Series.Sequence
          durationInFrames={6 * fps}
          premountFor={fps}
          offset={-10}
        >
          <Scene4ChatCalendar />
        </Series.Sequence>

        {/* Scene 5: Client info chat — 7s */}
        <Series.Sequence
          durationInFrames={7 * fps}
          premountFor={fps}
          offset={-10}
        >
          <Scene5ChatClient />
        </Series.Sequence>

        {/* Scene 6: History chat — 7s */}
        <Series.Sequence
          durationInFrames={7 * fps}
          premountFor={fps}
          offset={-10}
        >
          <Scene6ChatHistory />
        </Series.Sequence>

        {/* Scene 7: And more — 5s */}
        <Series.Sequence
          durationInFrames={5 * fps}
          premountFor={fps}
          offset={-10}
        >
          <Scene7AndMore />
        </Series.Sequence>

        {/* Scene 8: CTA — 5s */}
        <Series.Sequence
          durationInFrames={5 * fps}
          premountFor={fps}
          offset={-10}
        >
          <Scene8CTA />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
