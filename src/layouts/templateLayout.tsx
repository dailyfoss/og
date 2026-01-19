import React from "react";
import { z } from "zod";
import { TemplateIllustration } from "../components/TemplateIllustration";
import { ILayout } from "./types";

const betaLayoutConfig = z.object({
  Theme: z.enum(["dark", "light"]).nullish(),
  Title: z.string(),
  Description: z.string(),
  License: z.string().nullish(),
  SelfHosted: z.string().nullish(),
  Windows: z.string().nullish(),
  MacOS: z.string().nullish(),
  Linux: z.string().nullish(),
  Web: z.string().nullish(),
  Android: z.string().nullish(),
  iOS: z.string().nullish(),
  ScreenshotUrl: z.string().nullish(),
});

type BetaLayoutConfig = z.infer<typeof betaLayoutConfig>;

// Theme colors (same as alpha layout)
const themes = {
  dark: {
    bg: "#0f0f1a",
    text: "#FFFFFF",
    textSecondary: "#9CA3AF",
    iconFill: "#E5E7EB",
    linuxIcon: "https://cdn.simpleicons.org/linux/FFFFFF",
    // Badge colors for dark mode
    licenseBg: "linear-gradient(135deg, rgba(16,185,129,0.25) 0%, rgba(6,95,70,0.25) 100%)",
    licenseBorder: "1px solid rgba(16,185,129,0.6)",
    licenseIcon: "#34D399",
    licenseText: "#6EE7B7",
    selfHostedBg: "linear-gradient(135deg, rgba(139,92,246,0.25) 0%, rgba(76,29,149,0.25) 100%)",
    selfHostedBorder: "1px solid rgba(139,92,246,0.6)",
    selfHostedIcon: "#A78BFA",
    selfHostedText: "#C4B5FD",
    platformBg: "rgba(255,255,255,0.08)",
    platformWebBg: "rgba(16,185,129,0.15)",
    platformWebBorder: "1px solid rgba(16,185,129,0.4)",
    platformDesktopBg: "rgba(59,130,246,0.15)",
    platformDesktopBorder: "1px solid rgba(59,130,246,0.4)",
    platformMobileBg: "rgba(249,115,22,0.15)",
    platformMobileBorder: "1px solid rgba(249,115,22,0.3)",
  },
  light: {
    bg: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
    iconFill: "#374151",
    linuxIcon: "https://cdn.simpleicons.org/linux/000000",
    // Badge colors for light mode
    licenseBg: "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(6,95,70,0.15) 100%)",
    licenseBorder: "1px solid rgba(16,185,129,0.5)",
    licenseIcon: "#059669",
    licenseText: "#047857",
    selfHostedBg: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(76,29,149,0.12) 100%)",
    selfHostedBorder: "1px solid rgba(139,92,246,0.5)",
    selfHostedIcon: "#7C3AED",
    selfHostedText: "#6D28D9",
    platformBg: "rgba(0,0,0,0.05)",
    platformWebBg: "rgba(16,185,129,0.1)",
    platformWebBorder: "1px solid rgba(16,185,129,0.4)",
    platformDesktopBg: "rgba(59,130,246,0.1)",
    platformDesktopBorder: "1px solid rgba(59,130,246,0.4)",
    platformMobileBg: "rgba(249,115,22,0.1)",
    platformMobileBorder: "1px solid rgba(249,115,22,0.3)",
  },
};

const getPlatformIcons = (theme: "dark" | "light") => ({
  Windows: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={themes[theme].iconFill}>
      <path d="M3 5.548l7.065-.966v6.822H3V5.548zm0 12.904l7.065.966v-6.822H3v5.856zm7.935 1.083L21 21V12.596h-10.065v6.939zM21 3l-10.065 1.465v6.939H21V3z" />
    </svg>
  ),
  MacOS: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={themes[theme].iconFill}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  ),
  Linux: () => (
    <img src={themes[theme].linuxIcon} width="18" height="18" alt="Linux" />
  ),
  Web: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={themes[theme].iconFill}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  ),
  Android: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={themes[theme].iconFill}>
      <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.84 5.84 0 0012 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31A5.983 5.983 0 006 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
    </svg>
  ),
  iOS: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={themes[theme].iconFill}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  ),
});


const Component: React.FC<{ config: BetaLayoutConfig }> = ({ config }) => {
  const {
    Theme, Title, Description, License, SelfHosted,
    Windows, MacOS, Linux, Web, Android, iOS, ScreenshotUrl,
  } = config;

  const theme = Theme === "light" ? "light" : "dark";
  const colors = themes[theme];
  const PlatformIcons = getPlatformIcons(theme);

  // Logo based on theme
  const logoUrl = theme === "dark" 
    ? "https://dailyfoss.github.io/logo_dark.png" 
    : "https://dailyfoss.github.io/logo_light.png";

  const desktopPlatforms = [
    { name: "Web", enabled: Web === "true", icon: PlatformIcons.Web },
    { name: "Windows", enabled: Windows === "true", icon: PlatformIcons.Windows },
    { name: "MacOS", enabled: MacOS === "true", icon: PlatformIcons.MacOS },
    { name: "Linux", enabled: Linux === "true", icon: PlatformIcons.Linux() },
  ].filter((p) => p.enabled);

  const mobilePlatforms = [
    { name: "Android", enabled: Android === "true", icon: PlatformIcons.Android },
    { name: "iOS", enabled: iOS === "true", icon: PlatformIcons.iOS },
  ].filter((p) => p.enabled);

  // Safe zone for square crop: center 630x630 area (from x:285 to x:915)
  // All important content should be within this zone

  return (
    <div tw="relative flex w-full h-full" style={{ backgroundColor: colors.bg }}>
      {theme === "dark" && (
        <div tw="flex absolute inset-0">
          <TemplateIllustration />
        </div>
      )}

      {/* Logo - absolute top left */}
      <div tw="absolute flex" style={{ top: 64, left: 64 }}>
        <img src={logoUrl} alt={Title} width={56} height={56} />
      </div>

      {/* CENTER CONTENT - Title, Description, Badges */}
      <div tw="relative flex flex-col items-center justify-center w-full" style={{marginTop: 64, paddingLeft: 64, paddingRight: 64, paddingBottom: ScreenshotUrl ? 420 : 20 }}>
        {/* Title centered */}
        <p tw="text-5xl font-bold m-0" style={{ color: colors.text }}>{Title}</p>
        
        {/* Description centered */}
        <p tw="text-xl m-0" style={{ marginTop: 8, textAlign: "center", color: colors.textSecondary }}>
          {Description}
        </p>

        {/* Badges row - all in one line, centered */}
        <div tw="flex items-center justify-center" style={{ marginTop: 16, gap: 10 }}>
          {License && (
            <div
              tw="flex items-center"
              style={{
                background: colors.licenseBg,
                borderRadius: 20,
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 6,
                paddingBottom: 6,
                marginLeft: 4,
                marginRight: 4,
                border: colors.licenseBorder,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={colors.licenseIcon} style={{ marginRight: 6 }}>
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: colors.licenseText }}>{License}</span>
            </div>
          )}
          {SelfHosted === "true" && (
            <div
              tw="flex items-center"
              style={{
                background: colors.selfHostedBg,
                borderRadius: 20,
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 6,
                paddingBottom: 6,
                marginLeft: 4,
                marginRight: 4,
                border: colors.selfHostedBorder,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={colors.selfHostedIcon} style={{ marginRight: 6 }}>
                <path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: colors.selfHostedText }}>Self-Hosted</span>
            </div>
          )}
          {/* Platform icons inline */}
          {desktopPlatforms.length > 0 && desktopPlatforms.map((p) => (
            <div
              key={p.name}
              tw="flex items-center justify-center"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                marginLeft: 4,
                marginRight: 4,
                background: p.name === "Web" ? colors.platformWebBg : colors.platformDesktopBg,
                border: p.name === "Web" ? colors.platformWebBorder : colors.platformDesktopBorder,
              }}
            >
              {p.icon}
            </div>
          ))}
          {mobilePlatforms.length > 0 && mobilePlatforms.map((p) => (
            <div
              key={p.name}
              tw="flex items-center justify-center"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                marginLeft: 4,
                marginRight: 4,
                background: colors.platformMobileBg,
                border: colors.platformMobileBorder,
              }}
            >
              {p.icon}
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CENTER SCREENSHOT */}
      {ScreenshotUrl && (
        <div
          tw="absolute flex justify-center items-start"
          style={{
            left: 64,
            right: 64,
            bottom: 0,
            height: 420,
            overflow: "hidden",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            boxShadow: theme === "light" 
              ? "0 -8px 32px rgba(0,0,0,0.15), 0 -2px 8px rgba(0,0,0,0.1)"
              : "none",
          }}
        >
          <img
            src={ScreenshotUrl}
            alt="Screenshot"
            style={{
              width: "100%",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          />
        </div>
      )}
    </div>
  );
};

export const templateLayout: ILayout<typeof betaLayoutConfig> = {
  name: "template",
  config: betaLayoutConfig,
  properties: [
    { name: "Theme", type: "select", default: "dark", options: ["dark", "light"] },
    { name: "Title", type: "text", default: "Umami" },
    { name: "Description", type: "text", default: "Privacy-first, open-source web analytics with self-hosting support" },
    { name: "ScreenshotUrl", type: "text", default: "" },
    { name: "License", type: "text", default: "MIT" },
    { name: "SelfHosted", type: "select", default: "true", options: ["true", "false"] },
    { name: "Windows", type: "select", default: "false", options: ["true", "false"] },
    { name: "MacOS", type: "select", default: "false", options: ["true", "false"] },
    { name: "Linux", type: "select", default: "true", options: ["true", "false"] },
    { name: "Web", type: "select", default: "true", options: ["true", "false"] },
    { name: "Android", type: "select", default: "false", options: ["true", "false"] },
    { name: "iOS", type: "select", default: "false", options: ["true", "false"] },
  ],
  Component,
};
