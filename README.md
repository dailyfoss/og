# DailyFOSS OG Image Generator

Dynamic Open Graph image generator for DailyFOSS projects.

## Features

- 🎨 Multiple image formats: SVG, PNG, WebP
- 🚀 High-quality image rendering with 2x supersampling
- 📱 Responsive layouts
- 🔗 Shareable URLs for dynamic OG images
- 🐳 Docker-ready for easy deployment

## Quick Start

### Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3003`

### Production (Docker)

```bash
docker-compose up -d
```

See [DOCKER_DEPLOY.md](./DOCKER_DEPLOY.md) for detailed deployment instructions.

## Usage

### Generate OG Image

```
https://og.dailyfoss.biz.id/api/image?fileType=png&layoutName=dailyfoss-beta&Theme=dark&Title=Your+App&Description=Your+description
```

### Parameters

- `fileType` - Image format: `svg`, `png`, or `webp`
- `layoutName` - Layout template name
- `Theme` - Theme: `light` or `dark`
- `Title` - Application title
- `Description` - Application description
- `ScreenshotUrl` - Screenshot URL
- `License` - License type
- `SelfHosted` - Self-hosted: `true` or `false`

### Example HTML Usage

```html
<meta property="og:image" content="https://og.dailyfoss.biz.id/api/image?fileType=png&layoutName=dailyfoss-beta&Theme=dark&Title=Umami&Description=Privacy-first+analytics" />
```

## Environment Variables

- `NEXT_PUBLIC_BASE_URL` - Your domain (e.g., https://og.dailyfoss.biz.id)

## Tech Stack

- Next.js 13
- Satori (SVG generation)
- Sharp (Image processing)
- Resvg (SVG to PNG conversion)
- TypeScript
- Tailwind CSS

## License

MIT
