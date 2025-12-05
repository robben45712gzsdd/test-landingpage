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

    <!-- Navigation Dots -->
    <div class="hidden top-1/2 right-8 z-[1800] fixed lg:flex flex-col gap-6 -translate-y-1/2">
      <button 
        v-for="(dot, i) in sectionDots"
        :key="i"
        @click="scrollToSection(dot.id)"
        :class="[
          'w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 cursor-pointer hover:border-cyan-400/60',
          dot.active 
            ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]'
            : 'border-cyan-400/40'
        ]"
        :title="dot.label"
      />
    </div>

    <!-- Section Label -->
    <div class="hidden md:block top-20 left-1/2 z-[1800] fixed -translate-x-1/2 pointer-events-none">
      <span class="font-bold text-cyan-400/60 text-xs tracking-widest animate-pulse">
        {{ currentSectionLabel }}
      </span>
    </div>

    <!-- Progress Bar -->
    <div class="top-[70px] right-0 left-0 z-[1999] fixed bg-white/5 h-1">
      <div 
        ref="progressBar"
        class="bg-gradient-to-r from-cyan-400 via-green-400 to-blue-500 shadow-[0_0_20px_rgba(34,211,238,0.8)] h-full transition-all duration-100"
      ></div>
    </div>

    <!-- HOME SECTION -->
    <section 
      id="home"
      ref="heroSection"
      class="top-[70px] left-0 z-10 fixed flex justify-center items-center w-full h-[calc(100vh-70px)] overflow-hidden"
    >
      <video
        ref="heroVideo"
        :src="videos[0]"
        class="-z-10 absolute inset-0 w-full h-full object-cover"
        muted
        autoplay
        loop
        playsinline
      />
      <div class="-z-10 absolute inset-0 bg-black/40" />
      <div class="z-10 relative px-8 max-w-3xl text-center">
        <h1 class="mb-6 font-bold text-5xl md:text-7xl tracking-tight">
          <span class="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent">
            Entertain
          </span>
          <br />
          <span class="bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 text-transparent">
            The World
          </span>
        </h1>
        <p class="font-light text-white/80 text-lg md:text-xl leading-relaxed">
          Experience hyper-casual gaming like never before. Instant fun, endless possibilities.
        </p>
      </div>
    </section>

    <!-- GAMES SECTION -->
    <section 
      id="games"
      ref="gamesShowcase"
      class="z-20 relative bg-black opacity-0 min-h-[600vh] transition-opacity duration-300 pointer-events-none"
      :class="{ 'opacity-100 pointer-events-auto': gamesVisible }"
    >
      <!-- Fixed Video -->
      <div class="top-[70px] left-0 z-10 fixed w-full h-[calc(100vh-70px)] overflow-hidden pointer-events-none">
        <video
          ref="gamesVideo"
          :src="videos[0]"
          class="w-full h-full object-cover transition-opacity duration-500"
          muted
          autoplay
          loop
          playsinline
        />
        <div class="absolute inset-0 bg-black/50" />
      </div>

      <!-- Sidebar -->
      <div class="top-[70px] left-0 z-50 fixed bg-black/90 backdrop-blur-md p-8 border-cyan-500/20 border-r w-96 h-[calc(100vh-70px)] overflow-y-auto">
        <div class="space-y-8" ref="gamesSidebarContent">
          <div 
            v-for="(card, i) in games"
            :key="i"
            :ref="`gameCard${i+1}`"
            :class="[
              'p-6 rounded-lg border border-cyan-500/30 transition-all duration-500 cursor-pointer translate-y-20 opacity-0',
              i === 0 ? 'active' : ''
            ]"
          >
            <h3 class="mb-2 font-bold text-cyan-400 text-lg">{{ card.name }}</h3>
            <p class="text-white/70 text-sm">{{ card.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Scrollable Content -->
      <div class="ml-96 pt-[70px]">
        <div 
          v-for="(section, i) in 6"
          :key="i"
          :ref="`gameSection${i+1}`"
          class="relative flex justify-center items-center px-12 h-screen"
        >
          <div class="text-center">
            <h2 
              :ref="`gameTitle${i+1}`"
              class="opacity-0 mb-4 font-bold text-6xl md:text-7xl"
            >
              <span class="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent">
                {{ gamesSections[i].title }}
              </span>
            </h2>
            <p 
              :ref="`gameSubtitle${i+1}`"
              class="opacity-0 font-semibold text-yellow-400 text-3xl md:text-4xl"
            >
              {{ gamesSections[i].subtitle }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT SECTION -->
    <section 
      id="about"
      ref="aboutSection"
      class="z-20 relative bg-black opacity-0 px-8 py-32 border-cyan-500/20 border-t transition-all translate-y-10 duration-700"
    >
      <div class="mx-auto max-w-4xl">
        <h2 class="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-12 font-bold text-transparent text-5xl md:text-6xl">
          About Voodoo
        </h2>
        <div class="space-y-6 text-white/80 text-lg leading-relaxed">
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
      <div class="mx-auto max-w-7xl text-center">
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
      games: [
        { name: 'Mob Control', desc: 'Strategy & Control' },
        { name: 'Puzzle Quest', desc: 'Brain Teasers' },
        { name: 'Speed Rush', desc: 'Racing & Rush' },
        { name: 'Flip Master', desc: 'Master & Flip' }
      ],
      gamesSections: [
        { title: 'Discover', subtitle: 'Strategy & Control' },
        { title: 'Create', subtitle: 'Puzzle & Stack' },
        { title: 'Play', subtitle: 'Racing & Rush' },
        { title: 'Connect', subtitle: 'Master & Flip' },
        { title: 'Explore', subtitle: 'New Adventures' },
        { title: 'Achieve', subtitle: 'Endless Fun' }
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
    // Wait for GSAP to load from CDN
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
    scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },

    setupSectionTracking() {
      const trackScroll = () => {
        const scrollPos = window.scrollY + window.innerHeight / 2;
        const heroSection = this.$refs.heroSection;
        const gamesShowcase = this.$refs.gamesShowcase;

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

        this.sectionDots.forEach(dot => {
          dot.active = dot.id === currentSection;
        });

        // Update games visibility based on computed opacity
        if (this.$refs.gamesShowcase) {
          const opacity = parseFloat(window.getComputedStyle(this.$refs.gamesShowcase).opacity);
          this.gamesVisible = opacity > 0.3;
        }
      };

      window.addEventListener('scroll', trackScroll, { passive: true });
    },

    setupScrollTriggers() {
      const gsap = window.gsap;
      if (!gsap) return;

      // Games showcase fade in - START ONLY AFTER HOME SECTION ENDS (at 100vh)
      if (this.$refs.gamesShowcase && this.$refs.heroSection) {
        gsap.fromTo(this.$refs.gamesShowcase,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: this.$refs.heroSection,
              start: 'bottom 50%',
              end: 'bottom 0%',
              scrub: 0.8,
              toggleActions: 'play reverse reverse play'
            }
          }
        );
      }

      // Game sections animations - Each section scrolls independently
      for (let i = 1; i <= 6; i++) {
        const titleRef = this.$refs[`gameTitle${i}`]?.[0];
        const subtitleRef = this.$refs[`gameSubtitle${i}`]?.[0];
        const sectionRef = this.$refs[`gameSection${i}`]?.[0];
        const cardIndex = (i - 1) % 4;

        if (!titleRef || !sectionRef) continue;

        // Set initial state - content from bottom
        gsap.set([titleRef, subtitleRef], { opacity: 0, y: 100 });

        // Animate content from bottom up
        gsap.to([titleRef, subtitleRef], {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
            toggleActions: 'play reverse reverse play',
            onEnter: () => {
              this.switchGameCard(cardIndex);
              this.changeGameVideo(i - 1);
            },
            onEnterBack: () => {
              this.switchGameCard(cardIndex);
              this.changeGameVideo(i - 1);
            }
          }
        });

        // Hide content when leaving section
        gsap.to([titleRef, subtitleRef], {
          opacity: 0,
          y: -80,
          duration: 0.8,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: sectionRef,
            start: 'bottom 40%',
            end: 'bottom 10%',
            scrub: 0.8,
            toggleActions: 'play reverse reverse play'
          }
        });
      }

      // Animate sidebar buttons appearing from bottom up
      for (let i = 1; i <= 4; i++) {
        const cardRef = this.$refs[`gameCard${i}`]?.[0];
        if (!cardRef) continue;

        gsap.set(cardRef, { y: 80, opacity: 0 });

        // Staggered appearance
        gsap.to(cardRef, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: (i - 1) * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: this.$refs.gamesShowcase,
            start: 'top 60%',
            end: 'top 40%',
            scrub: 0.6,
            toggleActions: 'play reverse reverse play'
          }
        });
      }

      // About section animation
      if (this.$refs.aboutSection) {
        gsap.from(this.$refs.aboutSection, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: this.$refs.aboutSection,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.6,
            toggleActions: 'play reverse reverse play'
          }
        });
      }

      // Hide games video when leaving games section
      if (this.$refs.gamesShowcase) {
        gsap.to(this.$refs.gamesShowcase, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: this.$refs.gamesShowcase,
            start: 'bottom 30%',
            end: 'bottom 0%',
            scrub: 0.8,
            toggleActions: 'play reverse reverse play'
          }
        });
      }
    },

    setupProgressBar() {
      const updateProgress = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = Math.min((window.scrollY / totalHeight) * 100, 100);
        if (this.$refs.progressBar) {
          this.$refs.progressBar.style.width = scrolled + '%';
        }
      };
      window.addEventListener('scroll', updateProgress, { passive: true });
    },

    switchGameCard(index) {
      for (let i = 0; i < 4; i++) {
        const card = this.$refs[`gameCard${i + 1}`]?.[0];
        if (card) {
          card.style.opacity = i === index ? '1' : '0';
        }
      }
    },

    changeGameVideo(videoIndex) {
      const gamesVideo = this.$refs.gamesVideo;
      if (!gamesVideo) return;

      // Load video immediately without fade
      gamesVideo.src = this.videos[videoIndex % this.videos.length];
      gamesVideo.load();
      gamesVideo.play().catch(() => {});
    }
  },
  head() {
    return {
      title: 'Voodoo - Entertain the World',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Entertain the world with Voodoo games'
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
