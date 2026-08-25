<div align="center">

# ⚡ Atul Nigam — Portfolio

**AI/ML Engineer & Full-Stack Systems Developer**
B.Tech in Biochemical Engineering & Biotechnology — IIT Delhi '28

</div>

A futuristic, interactive single-page portfolio built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS 4**, and **Three.js** — featuring a live particle/molecular background, 3D-tilt project cards, an orbiting skills visualization, and embedded interactive simulators.

## ✨ Highlights

- 🌌 **Animated Three.js background** — real-time particle & molecular mesh canvas
- 🃏 **Interactive 3D-tilt project cards** with glare tracking and detail modals
- 🧪 **Live simulators** — including a client-side Adiabatic CSTR reactor demo solving coupled non-linear ODEs with Runge-Kutta 4 at 60 FPS
- 🛰️ **Orbiting skills constellation** with holographic hover tooltips
- ⏳ Scroll progress bar, typing-effect hero, and glassmorphic navigation

## 🧰 Tech Stack

| Layer | Tools |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS 4 |
| 3D / Animation | Three.js · Motion (Framer Motion) |
| Icons & FX | lucide-react · canvas-confetti |

## 🚀 Getting Started

```bash
# install dependencies
bun install   # or npm install

# start the dev server → http://localhost:3000
bun run dev

# production build
bun run build

# type-check
bun run lint
```

## 📁 Project Structure

```
src/
├── App.tsx                  # Section composition
├── index.css                # Global styles (Tailwind)
├── data/
│   └── portfolioData.ts     # All content: profile, projects, skills, timeline
├── types/
│   └── portfolio.ts         # Shared TypeScript interfaces
└── components/
    ├── AnimatedBackground.tsx    # Three.js particle field
    ├── HeroSection.tsx           # Typing hero + social links
    ├── ProjectsSection.tsx       # 3D-tilt cards grid
    ├── ProjectModals.tsx         # Detail modals + live demos
    ├── InteractiveSkillsSection.tsx
    ├── BioDeepTechSection.tsx
    ├── ExperienceTimeline.tsx
    ├── ContactSection.tsx        # Contact form + social dispatch hub
    └── Navbar.tsx / Footer.tsx / ScrollProgressBar.tsx
```

## 🔗 Connect

- **GitHub** — [baka-arch](https://github.com/baka-arch)
- **LinkedIn** — [atul-nigam-4980a2320](https://www.linkedin.com/in/atul-nigam-4980a2320/)
- **LeetCode** — [bakaSENKU](https://leetcode.com/u/bakaSENKU/)
- **Codeforces** — [BAKA_123](https://codeforces.com/profile/BAKA_123)

---

<div align="center">
Crafted with Three.js, React, Tailwind & Motion ✦
</div>
