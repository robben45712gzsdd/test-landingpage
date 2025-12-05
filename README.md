# Voodoo Landing Page

A modern, animated landing page inspired by voodoo.io built with Nuxt 2 and GSAP animations.

## 🚀 Features

- **Modern Hero Section**: Eye-catching hero with floating animated cards
- **Product Showcase**: Grid display of featured games and apps with hover animations
- **Statistics Section**: Animated stats counter with GSAP
- **Call-to-Action Section**: Engaging CTA section with decorative animations
- **Smooth Scrolling**: Scroll-triggered animations throughout the page
- **Responsive Design**: Fully responsive on mobile, tablet, and desktop
- **GSAP Animations**: Professional animations using GSAP and ScrollTrigger

## 📋 Prerequisites

- Node.js 12 or higher
- npm or yarn

## 🛠️ Setup

1. Clone or download this project
2. Install dependencies:

```bash
npm install
```

## 🏃 Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📦 Build

Build for production:

```bash
npm run build
```

Generate static site:

```bash
npm run generate
```

## 🎨 Components

- **Header**: Fixed navigation with smooth scroll effect
- **Hero**: Hero section with animated floating cards
- **Products**: Product showcase grid with scroll animations
- **Stats**: Statistics section with animated counters
- **CTA**: Call-to-action section with decorative animations
- **Footer**: Footer with links and social media

## 🔧 Customization

### Colors
Edit the gradient colors in components or main CSS. The primary gradient is:
```
linear-gradient(135deg, #667eea 0%, #764ba2 100%)
```

### Content
Update product data in `components/Products.vue` and `components/Stats.vue`

### Animations
GSAP animations are configured in each component's `mounted()` lifecycle hook

## 📱 Responsive Breakpoints

- Desktop: > 768px
- Tablet: < 768px
- Mobile: < 480px

## 🚀 Performance Tips

- Images are rendered as emoji placeholders (replace with actual images)
- GSAP animations are GPU-accelerated
- ScrollTrigger prevents animation jank with intersection observer
- CSS animations are optimized for performance

## 📄 License

MIT License

## 🎯 Next Steps

To customize this landing page:

1. Replace emoji placeholders with actual product images
2. Update company information and links
3. Add real content to the stats section
4. Customize colors to match your brand
5. Add more sections as needed

Enjoy! 🎉
