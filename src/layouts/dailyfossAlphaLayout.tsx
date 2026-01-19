import React from "react";
import { z } from "zod";
import { TemplateIllustration } from "../components/TemplateIllustration";
import { ILayout } from "./types";

const alphaLayoutConfig = z.object({
  Theme: z.enum(["dark", "light"]).nullish(),
  Title: z.string(),
  Description: z.string(),
  ScreenshotUrl: z.string().nullish(),
  License: z.string().nullish(),
  SelfHosted: z.string().nullish(),
  Windows: z.string().nullish(),
  MacOS: z.string().nullish(),
  Linux: z.string().nullish(),
  Web: z.string().nullish(),
  Android: z.string().nullish(),
  iOS: z.string().nullish(),
});

type AlphaLayoutConfig = z.infer<typeof alphaLayoutConfig>;

// Theme colors
const themes = {
  dark: {
    bg: "#0f0f1a",
    text: "#FFFFFF",
    textSecondary: "#9CA3AF",
    iconFill: "#E5E7EB",
    linuxIcon: "https://cdn.simpleicons.org/linux/FFFFFF",
    tagline: "#9CA3AF",
  },
  light: {
    bg: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
    iconFill: "#374151",
    linuxIcon: "https://cdn.simpleicons.org/linux/000000",
    tagline: "#999ca0ff",
  },
};

const getPlatformIcons = (theme: "dark" | "light") => ({
  Windows: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={themes[theme].iconFill}>
      <path d="M3 5.5L10.5 4.5V11.5H3V5.5ZM3 18.5V12.5H10.5V19.5L3 18.5ZM11.5 4.3L21 3V11.5H11.5V4.3ZM11.5 12.5H21V21L11.5 19.7V12.5Z" />
    </svg>
  ),
  MacOS: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={themes[theme].iconFill}>
      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
    </svg>
  ),
  Linux: () => (
    <img src={themes[theme].linuxIcon} width="20" height="20" alt="Linux" />
  ),
  Web: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={themes[theme].iconFill}>
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z" />
    </svg>
  ),
  Android: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={themes[theme].iconFill}>
      <path d="M6 18C6 18.55 6.45 19 7 19H8V22.5C8 23.33 8.67 24 9.5 24C10.33 24 11 23.33 11 22.5V19H13V22.5C13 23.33 13.67 24 14.5 24C15.33 24 16 23.33 16 22.5V19H17C17.55 19 18 18.55 18 18V8H6V18ZM3.5 8C2.67 8 2 8.67 2 9.5V16.5C2 17.33 2.67 18 3.5 18C4.33 18 5 17.33 5 16.5V9.5C5 8.67 4.33 8 3.5 8ZM20.5 8C19.67 8 19 8.67 19 9.5V16.5C19 17.33 19.67 18 20.5 18C21.33 18 22 17.33 22 16.5V9.5C22 8.67 21.33 8 20.5 8ZM15.53 2.16L16.84 0.85C17.03 0.66 17.03 0.34 16.84 0.15C16.65 -0.04 16.33 -0.04 16.14 0.15L14.65 1.64C13.85 1.23 12.95 1 12 1C11.05 1 10.15 1.23 9.35 1.64L7.86 0.15C7.67 -0.04 7.35 -0.04 7.16 0.15C6.97 0.34 6.97 0.66 7.16 0.85L8.47 2.16C6.97 3.26 6 5.01 6 7H18C18 5.01 17.03 3.26 15.53 2.16ZM10 5H9V4H10V5ZM15 5H14V4H15V5Z" />
    </svg>
  ),
  iOS: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={themes[theme].iconFill}>
      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
    </svg>
  ),
});

const Component: React.FC<{ config: AlphaLayoutConfig }> = ({ config }) => {
  const {
    Theme, Title, Description, ScreenshotUrl, License, SelfHosted,
    Windows, MacOS, Linux, Web, Android, iOS,
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

  return (
    <div tw="relative flex w-full h-full" style={{ backgroundColor: colors.bg }}>
      {theme === "dark" && (
        <div tw="flex absolute inset-0">
          <TemplateIllustration />
        </div>
      )}

      {/* LEFT CONTENT */}
      <div
        tw="relative flex flex-col h-full px-16 pt-8 pb-14"
        style={{ width: ScreenshotUrl ? "50%" : "100%" }}
      >
        {/* Logo */}
        <div tw="flex">
          <img src={logoUrl} alt={Title} width={72} height={72} />
        </div>

        {/* Title & Description & Badges */}
        <div tw="flex flex-col" style={{ marginTop: 24, gap: 12 }}>
          <p tw="text-6xl font-bold m-0" style={{ marginBottom: 8, color: colors.text }}>{Title}</p>
          <p tw="text-2xl m-0" style={{ lineHeight: 1.4, maxWidth: 420, color: colors.textSecondary }}>
            {Description}
          </p>
          
          {/* Badges */}
          <div tw="flex flex-col" style={{ marginTop: 24, gap: 12 }}>
            <div tw="flex items-center" style={{ gap: 40 }}>
              {License && (
                <div
                  tw="flex items-center"
                  style={{
                    background: theme === "dark" 
                      ? "linear-gradient(135deg, rgba(16,185,129,0.25) 0%, rgba(6,95,70,0.25) 100%)"
                      : "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(6,95,70,0.15) 100%)",
                    borderRadius: 24,
                    paddingLeft: 14,
                    paddingRight: 14,
                    paddingTop: 8,
                    paddingBottom: 8,
                    border: theme === "dark" 
                      ? "1px solid rgba(16,185,129,0.6)"
                      : "1px solid rgba(16,185,129,0.5)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={theme === "dark" ? "#34D399" : "#059669"} style={{ marginRight: 8 }}>
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span style={{ fontSize: 15, fontWeight: 600, color: theme === "dark" ? "#6EE7B7" : "#047857" }}>{License}</span>
                </div>
              )}
              {SelfHosted === "true" && (
                <div
                  tw="flex items-center"
                  style={{
                    background: theme === "dark"
                      ? "linear-gradient(135deg, rgba(139,92,246,0.25) 0%, rgba(76,29,149,0.25) 100%)"
                      : "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(76,29,149,0.12) 100%)",
                    borderRadius: 24,
                    paddingLeft: 14,
                    paddingRight: 14,
                    paddingTop: 8,
                    paddingBottom: 8,
                    marginLeft: 14,
                    border: theme === "dark"
                      ? "1px solid rgba(139,92,246,0.6)"
                      : "1px solid rgba(139,92,246,0.5)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={theme === "dark" ? "#A78BFA" : "#7C3AED"} style={{ marginRight: 8 }}>
                    <path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                  <span style={{ fontSize: 15, fontWeight: 600, color: theme === "dark" ? "#C4B5FD" : "#6D28D9" }}>Self-Hosted</span>
                </div>
              )}
            </div>

            {/* Platform icons */}
            {(desktopPlatforms.length > 0 || mobilePlatforms.length > 0) && (
              <div tw="flex items-center" style={{ marginTop: 28, gap: 28 }}>
                {desktopPlatforms.length > 0 && (
                  <div tw="flex items-center" style={{ gap: 10 }}>
                    {desktopPlatforms.map((p) => (
                      <div
                        key={p.name}
                        tw="flex items-center justify-center"
                        style={{
                          width: 34,
                          height: 34,
                          marginRight: 8,
                          borderRadius: 8,
                          background: p.name === "Web" 
                            ? "rgba(16,185,129,0.1)"
                            : "rgba(59,130,246,0.1)",
                          border: p.name === "Web"
                            ? "1px solid rgba(16,185,129,0.4)"
                            : "1px solid rgba(59,130,246,0.4)",
                        }}
                      >
                        {p.icon}
                      </div>
                    ))}
                  </div>
                )}
                {mobilePlatforms.length > 0 && (
                  <div tw="flex items-center" style={{ gap: 6 }}>
                    {mobilePlatforms.map((p) => (
                      <div
                        key={p.name}
                        tw="flex items-center justify-center"
                        style={{
                          width: 34,
                          height: 34,
                          marginRight: 8,
                          borderRadius: 8,
                          background: "rgba(249,115,22,0.1)",
                          border: "1px solid rgba(249,115,22,0.3)",
                        }}
                      >
                        {p.icon}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dail FOSS Tagline - Bottom Left */}
      <div
        tw="absolute flex"
        style={{
          bottom: 24,
          left: 64,
        }}
      >
        <p tw="m-0" style={{ fontSize: 14, fontWeight: 600, color: colors.tagline }}>
          Discover Open Source. Every Day
        </p>
      </div>

      {/* RIGHT SCREENSHOT */}
      {ScreenshotUrl && (
        <div
          tw="absolute flex items-start justify-start"
          style={{
            top: 0,
            right: 0,
            bottom: 0,
            width: 640,
            overflow: "hidden",
          }}
        >
          <img
            src={ScreenshotUrl}
            alt="Screenshot"
            style={{
              height: "100%",
              borderRadius: "16px 0 0 16px",
              boxShadow: theme === "light" 
                ? "-8px 0 24px rgba(0,0,0,0.1)"
                : "none",
            }}
          />
          {theme === "light" && (
            <div
              tw="absolute flex"
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(270deg, rgba(0,0,0,0.05), rgba(0,0,0,0))",
                borderRadius: "0 0 0 16px",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export const dailyfossAlphaLayout: ILayout<typeof alphaLayoutConfig> = {
  name: "dailyfoss-alpha",
  config: alphaLayoutConfig,
  properties: [
    { name: "Theme", type: "select", default: "dark", options: ["dark", "light"] },
    { name: "Title", type: "text", default: "Umami" },
    { name: "Description", type: "text", default: "A simple, fast, privacy-focused website analytics tool." },
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
