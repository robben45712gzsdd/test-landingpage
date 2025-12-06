<template>
  <div class="bg-black w-full overflow-x-hidden">
    <!-- Header -->
    <header class="top-0 right-0 left-0 z-[2000] fixed flex items-center bg-black/80 shadow-lg backdrop-blur-md px-8 border-cyan-500/10 border-b h-[70px]">
      <nav class="flex justify-between items-center w-full">
        <div class="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold text-transparent text-2xl tracking-widest">
          Voodoo
        </div>
        <div class="hidden md:flex gap-8">
          <a href="#home" class="font-medium text-white/70 hover:text-cyan-400 transition-colors duration-300">Home</a>
          <a href="#games" class="font-medium text-white/70 hover:text-cyan-400 transition-colors duration-300">Games</a>
          <a href="#about" class="font-medium text-white/70 hover:text-cyan-400 transition-colors duration-300">About</a>
        </div>
      </nav>
    </header>

    <!-- Section Navigation Dots -->
    <div class="hidden top-1/2 right-8 z-[1800] fixed lg:flex flex-col gap-6 -translate-y-1/2">
      <button 
        v-for="(dot, index) in sectionDots" 
        :key="index"
        :class="[
          'w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 cursor-pointer',
          dot.active 
            ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]'
            : 'border-cyan-400/40 hover:border-cyan-400/60'
        ]"
        :title="dot.label"
        @click="scrollToSection(dot.id)"
      ></button>
    </div>

    <!-- Section Label -->
    <div class="hidden md:block top-20 left-1/2 z-[1800] fixed -translate-x-1/2 pointer-events-none">
      <span class="font-bold text-cyan-400/60 text-xs tracking-widest animate-pulse">
        {{ currentSectionLabel }}
      </span>
    </div>

    <!-- Scroll Progress -->
    <div class="top-[70px] right-0 left-0 z-[1999] fixed bg-white/5 h-1">
      <div 
        ref="progressBar"
        class="bg-gradient-to-r from-cyan-400 via-green-400 to-blue-500 shadow-[0_0_20px_rgba(34,211,238,0.8)] h-full transition-all duration-100"
      ></div>
    </div>

    <!-- HOME SECTION -->
    <section class="top-[70px] left-0 z-10 fixed flex justify-center items-center w-full h-[calc(100vh-70px)] overflow-hidden scroll-snap-start" id="home" ref="heroSection">
      <video
        ref="heroVideo"
        class="-z-10 absolute inset-0 brightness-[0.8] w-full h-full object-cover"
        :src="videos[0]"
        muted
        playsinline
        autoplay
        loop
        preload="metadata"
      ></video>
      <div class="-z-10 absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
      <div class="z-10 relative px-8 max-w-3xl text-center">
        <h1 class="bg-clip-text bg-gradient-to-r from-white to-cyan-400 drop-shadow-[0_6px_30px_rgba(0,212,255,0.4)] mb-6 font-bold text-transparent text-5xl md:text-7xl tracking-tight">
          Entertain The World
        </h1>
        <p class="drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] font-light text-white/90 text-lg md:text-xl leading-relaxed">
          Experience next-generation hyper-casual gaming with stunning visuals and instant gameplay.
        </p>
      </div>
    </section>

    <!-- GAMES SHOWCASE SECTION -->
    <section class="z-5 relative bg-black opacity-0 min-h-[600vh] transition-opacity duration-300 pointer-events-none" :class="{ 'opacity-100 pointer-events-auto': gamesVisible }" id="games" ref="gamesShowcase">
      <!-- Fixed Video Background -->
      <div class="top-[70px] left-0 z-10 fixed w-full h-[calc(100vh-70px)] overflow-hidden pointer-events-none">
        <video
          ref="gamesVideo"
          class="w-full h-full object-cover transition-opacity duration-500"
          :src="videos[0]"
          muted
          playsinline
          autoplay
          loop
          preload="metadata"
        ></video>
        <div class="absolute inset-0 bg-black/50"></div>
      </div>

      <!-- Left Sidebar -->
      <div class="top-[70px] left-0 z-50 fixed bg-gradient-to-br from-black/85 to-blue-950/75 shadow-[-20px_0_60px_rgba(0,212,255,0.1)] backdrop-blur-3xl p-8 border-cyan-500/25 border-r w-96 h-[calc(100vh-70px)] overflow-y-auto">
        <div class="space-y-8" ref="gamesSidebarContent">
          <!-- Game 1 -->
          <div class="top-0 left-0 absolute opacity-0 w-full transition-all duration-500 pointer-events-none" ref="gameCard1">
            <div class="p-8">
              <div class="flex flex-col gap-0 mb-6 font-black text-4xl leading-9 tracking-tight">
                <span class="drop-shadow-[0_0_30px_rgba(0,212,255,0.9)] text-cyan-400">MOB</span>
                <span class="bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-[0_0_15px_rgba(255,195,0,0.5)] text-transparent">CONTROL</span>
              </div>
              <h2 class="drop-shadow-[0_4px_20px_rgba(0,212,255,0.2)] mb-6 font-semibold text-white text-lg leading-relaxed">
                The always fresh, oddly satisfying strategy game where anyone can feel skilled and powerful.
              </h2>
              <div class="flex flex-col gap-3">
                <a href="https://apps.apple.com" target="_blank" class="flex items-center gap-3 bg-white/8 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] backdrop-blur-2xl px-4 py-3 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg font-semibold text-white text-sm transition-all hover:-translate-y-1 duration-300">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.06 2.29.38 3.02.91.99-.72 2.45-.84 3.02-.91 5.54.28 6.26 7.94 2.96 12.97zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                  App Store
                </a>
                <a href="https://play.google.com/store" target="_blank" class="flex items-center gap-3 bg-white/8 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] backdrop-blur-2xl px-4 py-3 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg font-semibold text-white text-sm transition-all hover:-translate-y-1 duration-300">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3.45 2.426c-.094.148-.15.32-.15.504v7.636h16.8V2.93c0-.184-.056-.356-.15-.504m-16.35.504c0-.832.65-1.506 1.45-1.506h15.1c.8 0 1.45.674 1.45 1.506"/></svg>
                  Google Play
                </a>
              </div>
            </div>
          </div>

          <!-- Game 2 -->
          <div class="top-0 left-0 absolute opacity-0 w-full transition-all duration-500 pointer-events-none" ref="gameCard2">
            <div class="p-8">
              <div class="flex flex-col gap-0 mb-6 font-black text-4xl leading-9 tracking-tight">
                <span class="drop-shadow-[0_0_30px_rgba(0,212,255,0.9)] text-cyan-400">STACK</span>
                <span class="bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-[0_0_15px_rgba(255,195,0,0.5)] text-transparent">BLAST</span>
              </div>
              <h2 class="drop-shadow-[0_4px_20px_rgba(0,212,255,0.2)] mb-6 font-semibold text-white text-lg leading-relaxed">
                Stack colorful blocks and blast them away in this addictive puzzle adventure.
              </h2>
              <div class="flex flex-col gap-3">
                <a href="https://apps.apple.com" target="_blank" class="flex items-center gap-3 bg-white/8 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] backdrop-blur-2xl px-4 py-3 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg font-semibold text-white text-sm transition-all hover:-translate-y-1 duration-300">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.06 2.29.38 3.02.91.99-.72 2.45-.84 3.02-.91 5.54.28 6.26 7.94 2.96 12.97zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                  App Store
                </a>
                <a href="https://play.google.com/store" target="_blank" class="flex items-center gap-3 bg-white/8 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] backdrop-blur-2xl px-4 py-3 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg font-semibold text-white text-sm transition-all hover:-translate-y-1 duration-300">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3.45 2.426c-.094.148-.15.32-.15.504v7.636h16.8V2.93c0-.184-.056-.356-.15-.504m-16.35.504c0-.832.65-1.506 1.45-1.506h15.1c.8 0 1.45.674 1.45 1.506"/></svg>
                  Google Play
                </a>
              </div>
            </div>
          </div>

          <!-- Game 3 -->
          <div class="top-0 left-0 absolute opacity-0 w-full transition-all duration-500 pointer-events-none" ref="gameCard3">
            <div class="p-8">
              <div class="flex flex-col gap-0 mb-6 font-black text-4xl leading-9 tracking-tight">
                <span class="drop-shadow-[0_0_30px_rgba(0,212,255,0.9)] text-cyan-400">RUSH</span>
                <span class="bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-[0_0_15px_rgba(255,195,0,0.5)] text-transparent">HOUR</span>
              </div>
              <h2 class="drop-shadow-[0_4px_20px_rgba(0,212,255,0.2)] mb-6 font-semibold text-white text-lg leading-relaxed">
                Navigate through endless traffic in this fast-paced arcade racing challenge.
              </h2>
              <div class="flex flex-col gap-3">
                <a href="https://apps.apple.com" target="_blank" class="flex items-center gap-3 bg-white/8 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] backdrop-blur-2xl px-4 py-3 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg font-semibold text-white text-sm transition-all hover:-translate-y-1 duration-300">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.06 2.29.38 3.02.91.99-.72 2.45-.84 3.02-.91 5.54.28 6.26 7.94 2.96 12.97zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                  App Store
                </a>
                <a href="https://play.google.com/store" target="_blank" class="flex items-center gap-3 bg-white/8 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] backdrop-blur-2xl px-4 py-3 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg font-semibold text-white text-sm transition-all hover:-translate-y-1 duration-300">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3.45 2.426c-.094.148-.15.32-.15.504v7.636h16.8V2.93c0-.184-.056-.356-.15-.504m-16.35.504c0-.832.65-1.506 1.45-1.506h15.1c.8 0 1.45.674 1.45 1.506"/></svg>
                  Google Play
                </a>
              </div>
            </div>
          </div>

          <!-- Game 4 -->
          <div class="top-0 left-0 absolute opacity-0 w-full transition-all duration-500 pointer-events-none" ref="gameCard4">
            <div class="p-8">
              <div class="flex flex-col gap-0 mb-6 font-black text-4xl leading-9 tracking-tight">
                <span class="drop-shadow-[0_0_30px_rgba(0,212,255,0.9)] text-cyan-400">FLIP</span>
                <span class="bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-[0_0_15px_rgba(255,195,0,0.5)] text-transparent">MASTER</span>
              </div>
              <h2 class="drop-shadow-[0_4px_20px_rgba(0,212,255,0.2)] mb-6 font-semibold text-white text-lg leading-relaxed">
                Master the art of flipping as you conquer impossible obstacles with style.
              </h2>
              <div class="flex flex-col gap-3">
                <a href="https://apps.apple.com" target="_blank" class="flex items-center gap-3 bg-white/8 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] backdrop-blur-2xl px-4 py-3 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg font-semibold text-white text-sm transition-all hover:-translate-y-1 duration-300">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.06 2.29.38 3.02.91.99-.72 2.45-.84 3.02-.91 5.54.28 6.26 7.94 2.96 12.97zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                  App Store
                </a>
                <a href="https://play.google.com/store" target="_blank" class="flex items-center gap-3 bg-white/8 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] backdrop-blur-2xl px-4 py-3 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg font-semibold text-white text-sm transition-all hover:-translate-y-1 duration-300">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3.45 2.426c-.094.148-.15.32-.15.504v7.636h16.8V2.93c0-.184-.056-.356-.15-.504m-16.35.504c0-.832.65-1.506 1.45-1.506h15.1c.8 0 1.45.674 1.45 1.506"/></svg>
                  Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scrollable Content -->
      <div class="ml-96 pt-[70px]">
        <section class="relative flex justify-center items-center px-12 h-screen scroll-snap-start" ref="gameSection1">
          <div class="z-10 relative max-w-2xl text-center">
            <h1 class="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 drop-shadow-[0_8px_40px_rgba(0,212,255,0.3)] mb-4 font-bold text-transparent text-7xl translate-y-20" ref="gameTitle1">Discover</h1>
            <p class="opacity-0 drop-shadow-[0_4px_20px_rgba(255,195,0,0.4)] font-semibold text-yellow-400 text-4xl translate-y-20" ref="gameSubtitle1">Strategy & Control</p>
          </div>
        </section>

        <section class="relative flex justify-center items-center px-12 h-screen scroll-snap-start" ref="gameSection2">
          <div class="z-10 relative max-w-2xl text-center">
            <h1 class="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 drop-shadow-[0_8px_40px_rgba(0,212,255,0.3)] mb-4 font-bold text-transparent text-7xl translate-y-20" ref="gameTitle2">Create</h1>
            <p class="opacity-0 drop-shadow-[0_4px_20px_rgba(255,195,0,0.4)] font-semibold text-yellow-400 text-4xl translate-y-20" ref="gameSubtitle2">Puzzle & Stack</p>
          </div>
        </section>

        <section class="relative flex justify-center items-center px-12 h-screen scroll-snap-start" ref="gameSection3">
          <div class="z-10 relative max-w-2xl text-center">
            <h1 class="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 drop-shadow-[0_8px_40px_rgba(0,212,255,0.3)] mb-4 font-bold text-transparent text-7xl translate-y-20" ref="gameTitle3">Play</h1>
            <p class="opacity-0 drop-shadow-[0_4px_20px_rgba(255,195,0,0.4)] font-semibold text-yellow-400 text-4xl translate-y-20" ref="gameSubtitle3">Racing & Rush</p>
          </div>
        </section>

        <section class="relative flex justify-center items-center px-12 h-screen scroll-snap-start" ref="gameSection4">
          <div class="z-10 relative max-w-2xl text-center">
            <h1 class="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 drop-shadow-[0_8px_40px_rgba(0,212,255,0.3)] mb-4 font-bold text-transparent text-7xl translate-y-20" ref="gameTitle4">Connect</h1>
            <p class="opacity-0 drop-shadow-[0_4px_20px_rgba(255,195,0,0.4)] font-semibold text-yellow-400 text-4xl translate-y-20" ref="gameSubtitle4">Master & Flip</p>
          </div>
        </section>

        <section class="relative flex justify-center items-center px-12 h-screen scroll-snap-start" ref="gameSection5">
          <div class="z-10 relative max-w-2xl text-center">
            <h1 class="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 drop-shadow-[0_8px_40px_rgba(0,212,255,0.3)] mb-4 font-bold text-transparent text-7xl translate-y-20" ref="gameTitle5">Explore</h1>
            <p class="opacity-0 drop-shadow-[0_4px_20px_rgba(255,195,0,0.4)] font-semibold text-yellow-400 text-4xl translate-y-20" ref="gameSubtitle5">New Adventures</p>
          </div>
        </section>

        <section class="relative flex justify-center items-center px-12 h-screen scroll-snap-start" ref="gameSection6">
          <div class="z-10 relative max-w-2xl text-center">
            <h1 class="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 drop-shadow-[0_8px_40px_rgba(0,212,255,0.3)] mb-4 font-bold text-transparent text-7xl translate-y-20" ref="gameTitle6">Achieve</h1>
            <p class="opacity-0 drop-shadow-[0_4px_20px_rgba(255,195,0,0.4)] font-semibold text-yellow-400 text-4xl translate-y-20" ref="gameSubtitle6">Endless Fun</p>
          </div>
        </section>
      </div>
    </section>

    <!-- ABOUT SECTION -->
    <section class="z-20 relative bg-gradient-to-br from-blue-950/80 to-black/90 px-8 py-32 border-cyan-500/20 border-t scroll-snap-start" id="about" ref="aboutSection">
      <div class="mx-auto max-w-2xl">
        <h2 class="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-12 font-bold text-transparent text-6xl text-center">About Voodoo</h2>
        <div class="space-y-6 text-white/85 text-lg leading-relaxed">
          <p>
            Voodoo is a leading mobile game publisher creating hyper-casual games that are always fresh, always fun, and always satisfying. With a focus on simple yet addictive gameplay, our games have been downloaded by millions worldwide.
          </p>
          <p>
            We believe in creating gaming experiences that are instantly engaging and endlessly entertaining. From strategy to puzzles, racing to flipping challenges, Voodoo games offer something for everyone.
          </p>
          <p>
            Join our community of players and discover why Voodoo games are the most fun you can have on your phone.
          </p>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="z-20 relative bg-black/95 px-8 py-12 border-cyan-500/20 border-t">
      <div class="mx-auto max-w-4xl text-center">
        <h3 class="mb-4 font-bold text-cyan-400 text-2xl">Voodoo Games</h3>
        <p class="mb-8 text-white/60">&copy; 2025 Voodoo. All rights reserved.</p>
        <div class="flex flex-wrap justify-center gap-8">
          <a href="#" class="text-white/70 hover:text-cyan-400 transition-colors duration-300">Privacy Policy</a>
          <a href="#" class="text-white/70 hover:text-cyan-400 transition-colors duration-300">Terms of Service</a>
          <a href="#" class="text-white/70 hover:text-cyan-400 transition-colors duration-300">Contact Us</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      videos: [
        'https://framerusercontent.com/assets/coA6LVNceeKnXPsNbxxTzspCMWQ.mp4',
        'https://framerusercontent.com/assets/J2HtjlxUFqocuEczSgMyv0Se8.mp4',
        'https://framerusercontent.com/assets/OPfeNYS6cWntQd8n6oAbg6AZnFM.mp4',
        'https://framerusercontent.com/assets/EdenTRJNwjluKd054NftzAgjFnU.mp4'
      ],
      currentSection: 'home',
      currentSectionLabel: 'HOME',
      gamesVisible: false,
      sectionDots: [
        { id: 'home', label: 'Home', active: true },
        { id: 'games', label: 'Games', active: false },
        { id: 'about', label: 'About', active: false }
      ]
    };
  },
  mounted() {
    const waitForGSAP = setInterval(() => {
      if (window.gsap && window.ScrollTrigger) {
        clearInterval(waitForGSAP);
        window.gsap.registerPlugin(window.ScrollTrigger);
        
        this.$nextTick(() => {
          this.setupScrollTriggers();
          this.setupProgressBar();
          this.setupSectionTracking();
        });
      }
    }, 100);
    
    setTimeout(() => clearInterval(waitForGSAP), 5000);
  },
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },

    setupSectionTracking() {
      const trackScroll = () => {
        const scrollPos = window.scrollY + window.innerHeight / 2;
        const heroSection = this.$refs.heroSection;
        const gamesShowcase = this.$refs.gamesShowcase;
        const aboutSection = this.$refs.aboutSection;

        let currentSection = 'home';
        let sectionLabel = 'HOME';

        if (heroSection && scrollPos < heroSection.offsetHeight) {
          currentSection = 'home';
          sectionLabel = 'HOME';
        } else if (gamesShowcase && scrollPos < heroSection.offsetHeight + gamesShowcase.offsetHeight) {
          currentSection = 'games';
          sectionLabel = 'GAMES';
        } else {
          currentSection = 'about';
          sectionLabel = 'ABOUT';
        }

        this.currentSection = currentSection;
        this.currentSectionLabel = sectionLabel;

        this.sectionDots.forEach((dot) => {
          dot.active = dot.id === currentSection;
        });

        if (gamesShowcase) {
          const gamesOpacity = parseFloat(window.getComputedStyle(gamesShowcase).opacity);
          this.gamesVisible = gamesOpacity > 0.5;
        }
      };

      window.addEventListener('scroll', trackScroll, { passive: true });
    },

    setupScrollTriggers() {
      const gsap = window.gsap;
      if (!gsap) return;
      
      if (this.$refs.gamesShowcase && this.$refs.heroSection) {
        gsap.fromTo(this.$refs.gamesShowcase, 
          { opacity: 0 },
          {
            scrollTrigger: {
              trigger: this.$refs.heroSection,
              start: 'bottom bottom',
              end: 'bottom 80%',
              scrub: 0.8,
              markers: false
            },
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
          }
        );
      }

      if (this.$refs.gamesShowcase && this.$refs.gameSection6) {
        gsap.to(this.$refs.gamesShowcase, 
          {
            scrollTrigger: {
              trigger: this.$refs.gameSection6,
              start: 'bottom 20%',
              end: 'bottom 0%',
              scrub: 0.8,
              markers: false
            },
            opacity: 0,
            duration: 0.8,
            ease: 'power2.in'
          }
        );
      }

      const gameSections = [
        { ref: this.$refs.gameSection1, titleRef: this.$refs.gameTitle1, subtitleRef: this.$refs.gameSubtitle1, index: 0 },
        { ref: this.$refs.gameSection2, titleRef: this.$refs.gameTitle2, subtitleRef: this.$refs.gameSubtitle2, index: 1 },
        { ref: this.$refs.gameSection3, titleRef: this.$refs.gameTitle3, subtitleRef: this.$refs.gameSubtitle3, index: 2 },
        { ref: this.$refs.gameSection4, titleRef: this.$refs.gameTitle4, subtitleRef: this.$refs.gameSubtitle4, index: 3 },
        { ref: this.$refs.gameSection5, titleRef: this.$refs.gameTitle5, subtitleRef: this.$refs.gameSubtitle5, index: 0 },
        { ref: this.$refs.gameSection6, titleRef: this.$refs.gameTitle6, subtitleRef: this.$refs.gameSubtitle6, index: 1 }
      ];

      gameSections.forEach((section) => {
        if (!section.ref) return;

        gsap.set([section.titleRef, section.subtitleRef], {
          opacity: 0,
          y: 50
        });

        gsap.to([section.titleRef, section.subtitleRef], {
          scrollTrigger: {
            trigger: section.ref,
            start: 'top 60%',
            end: 'center 40%',
            scrub: 0.8,
            onEnter: () => {
              this.switchGameCard(section.index);
              this.changeGameVideo(section.index);
            },
            onEnterBack: () => {
              this.switchGameCard(section.index);
              this.changeGameVideo(section.index);
            }
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out'
        });

        gsap.to([section.titleRef, section.subtitleRef], {
          scrollTrigger: {
            trigger: section.ref,
            start: 'bottom 45%',
            end: 'bottom 20%',
            scrub: 0.8
          },
          opacity: 0,
          y: -30,
          duration: 0.6,
          ease: 'power2.in'
        });
      });

      if (this.$refs.aboutSection) {
        gsap.from(this.$refs.aboutSection, {
          scrollTrigger: {
            trigger: this.$refs.aboutSection,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.8
          },
          opacity: 0,
          y: 50,
          duration: 0.8
        });
      }
    },

    switchGameCard(index) {
      const gsap = window.gsap;
      if (!gsap) return;
      
      const gameCards = [
        this.$refs.gameCard1,
        this.$refs.gameCard2,
        this.$refs.gameCard3,
        this.$refs.gameCard4
      ];

      gameCards.forEach((card, i) => {
        if (card) {
          if (i === index) {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              pointerEvents: 'auto'
            });
          } else {
            gsap.to(card, {
              opacity: 0,
              y: 20,
              duration: 0.3,
              ease: 'power2.in',
              pointerEvents: 'none'
            });
          }
        }
      });
    },

    changeGameVideo(index) {
      const gsap = window.gsap;
      if (!gsap) return;
      
      const gamesVideo = this.$refs.gamesVideo;
      if (gamesVideo) {
        gsap.to(gamesVideo, {
          opacity: 0.3,
          duration: 0.5,
          ease: 'power2.inOut'
        });

        setTimeout(() => {
          gamesVideo.src = this.videos[index];
          gamesVideo.play().catch(() => {});
          gsap.to(gamesVideo, {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.inOut'
          });
        }, 250);
      }
    },

    setupProgressBar() {
      const scrollListener = () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = Math.min((window.scrollY / docHeight) * 100, 100);
        if (this.$refs.progressBar) {
          this.$refs.progressBar.style.width = scrolled + '%';
        }
      };
      window.addEventListener('scroll', scrollListener, { passive: true });
    }
  },
  head() {
    return {
      title: 'Voodoo - Entertain the World',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Entertain the world'
        }
      ]
    }
  }
}
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
