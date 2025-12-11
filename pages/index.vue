<template>
  <div class="bg-black w-full overflow-x-hidden">
    <!-- Header -->
    <header
      class="top-0 right-0 left-0 z-[2000] fixed flex items-center bg-black/80 shadow-lg backdrop-blur-md px-4 sm:px-6 lg:px-8 border-cyan-500/10 border-b h-[60px] sm:h-[65px] lg:h-[70px]"
    >
      <nav class="flex justify-between items-center w-full">
        <div
          class="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold text-transparent text-lg md:text-xl lg:text-2xl tracking-widest"
        >
          NekSolution
        </div>
        <div class="hidden md:flex gap-4 lg:gap-8">
          <a
            href="#home"
            class="font-medium text-white/70 hover:text-cyan-400 transition-colors duration-300 text-sm lg:text-base"
            >Home</a
          >
          <a
            href="#games"
            class="font-medium text-white/70 hover:text-cyan-400 transition-colors duration-300 text-sm lg:text-base"
            >Games</a
          >
          <a
            href="#about"
            class="font-medium text-white/70 hover:text-cyan-400 transition-colors duration-300 text-sm lg:text-base"
            >About</a
          >
        </div>
      </nav>
    </header>

    <!-- Mobile Navigation Menu -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 z-[1900] bg-black/90 border-t border-cyan-500/20 flex justify-around py-3">
      <a href="#home" class="flex flex-col items-center text-white/70 hover:text-cyan-400 text-xs">
        <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        Home
      </a>
      <a href="#games" class="flex flex-col items-center text-white/70 hover:text-cyan-400 text-xs">
        <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M21 6h-7V3c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v3H3c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1zm-1 14H4V7h16v13z"/></svg>
        Games
      </a>
      <a href="#about" class="flex flex-col items-center text-white/70 hover:text-cyan-400 text-xs">
        <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
        About
      </a>
    </div>

    <!-- Section Navigation Dots -->
    <div
      class="hidden top-1/2 right-4 md:right-8 z-[1800] lg:flex flex-col gap-6 -translate-y-1/2"
    >
      <button
        v-for="(dot, index) in sectionDots"
        :key="index"
        :class="[
          'w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 cursor-pointer',
          dot.active
            ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]'
            : 'border-cyan-400/40 hover:border-cyan-400/60',
        ]"
        :title="dot.label"
        @click="scrollToSection(dot.id)"
      ></button>
    </div>

    <!-- Section Label -->
    <div
      class="hidden md:block top-20 left-1/2 z-[1800] fixed -translate-x-1/2 pointer-events-none"
    >
      <span
        class="font-bold text-cyan-400/60 text-xs tracking-widest animate-pulse"
      >
        {{ currentSectionLabel }}
      </span>
    </div>

    <!-- Scroll Progress -->
    <div class="top-[60px] md:top-[70px] right-0 left-0 z-[1999] fixed bg-white/5 h-1">
      <div
        ref="progressBar"
        class="bg-gradient-to-r from-cyan-400 via-green-400 to-blue-500 shadow-[0_0_20px_rgba(34,211,238,0.8)] h-full transition-all duration-100"
      ></div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="fixed inset-0 z-[3000] flex items-center justify-center bg-black">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-cyan-400 text-lg">Loading games...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error && !loading" class="fixed inset-0 z-[3000] flex items-center justify-center bg-black px-4">
      <div class="text-center max-w-md">
        <svg class="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h2 class="text-red-400 text-xl font-bold mb-2">Failed to load games</h2>
        <p class="text-white/60 mb-4">{{ error }}</p>
        <button 
          @click="fetchGames"
          class="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-lg text-white font-semibold transition-colors"
        >
          Retry
        </button>
      </div>
    </div>

    <!-- HOME SECTION -->
    <section
      class="relative w-full h-screen flex justify-center items-center pb-32 overflow-hidden"
      id="home"
      ref="heroSection"
    >
      <video
        ref="heroVideo"
        class="absolute inset-0 -z-10 brightness-[0.8] w-full h-full object-cover"
        src="https://framerusercontent.com/assets/OPfeNYS6cWntQd8n6oAbg6AZnFM.mp4"
        muted
        playsinline
        autoplay
        loop
        preload="metadata"
      ></video>
      <div
        class="absolute inset-0 -z-10 bg-gradient-to-br from-black/60 via-black/40 to-black/60"
      ></div>
      <div class="z-10 relative px-4 md:px-8 max-w-3xl text-center">
        <h1
          ref="heroTitle"
          class="bg-clip-text bg-gradient-to-r from-white to-cyan-400 drop-shadow-[0_6px_30px_rgba(0,212,255,0.4)] mb-4 md:mb-6 font-bold text-transparent text-3xl md:text-5xl lg:text-7xl tracking-tight leading-tight"
        >
          Entertain The World
        </h1>
        <p
          ref="heroSubtitle"
          class="drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] font-light text-white/90 text-base md:text-lg lg:text-xl leading-relaxed px-2"
        >
          Experience next-generation hyper-casual gaming with stunning visuals
          and instant gameplay.
        </p>
      </div>
    </section>

    <!-- GAMES SHOWCASE SECTION -->
    <section v-if="!loading && !error" id="games" class="relative bg-black w-full pb-[80px] md:pb-0" ref="gamesSection">
      <!-- Fixed Background Video (Hidden on Mobile) -->
      <div
        class="hidden md:block top-[70px] left-0 right-0 z-0 fixed h-[calc(100vh-70px)] overflow-hidden pointer-events-none"
      >
        <video
          v-for="(game, index) in games"
          :key="game.id"
          :ref="`gameVideo${index}`"
          class="absolute inset-0 w-full h-full object-cover brightness-[0.6] transition-opacity duration-700"
          :class="{ 'opacity-100': currentGameIndex === index, 'opacity-0': currentGameIndex !== index }"
          :src="game.videoUrl"
          muted
          playsinline
          autoplay
          loop
          preload="metadata"
        ></video>
        <div class="absolute inset-0 bg-black/40"></div>
        
        <!-- Transition Overlay Effect -->
        <div 
          ref="transitionOverlay"
          class="absolute inset-0 pointer-events-none"
          :style="{ opacity: transitionProgress }"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20"></div>
        </div>
      </div>

      <!-- Game Cards Content -->
      <div class="relative z-10">
        <!-- Buffer -->
        <div class="hidden md:block h-[40vh]"></div>

        <!-- Game Cards -->
        <div
          v-for="(game, index) in games"
          :key="game.id"
          class="md:h-screen w-full bg-black md:bg-transparent"
          :ref="`gameSection${index}`"
          :data-game-section="index"
        >
          <!-- Mobile Card Layout -->
          <div class="md:hidden px-4 py-8">
            <div class="bg-gradient-to-br from-blue-900/30 to-black/60 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <video
                class="w-full h-48 object-cover rounded-lg mb-4"
                :src="game.videoUrl"
                muted
                playsinline
                autoplay
                loop
              ></video>
              <div class="space-y-4">
                <div class="flex flex-col gap-1">
                  <span class="drop-shadow-[0_0_20px_rgba(34,211,238,0.7)] text-cyan-400 font-black text-2xl">
                    {{ game.title1 }}
                  </span>
                  <span class="bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent font-black text-2xl">
                    {{ game.title2 }}
                  </span>
                </div>
                <p class="text-white/80 text-sm leading-relaxed">
                  {{ game.description }}
                </p>
                <div class="flex gap-2 flex-col">
                  <a
                    href="https://apps.apple.com"
                    target="_blank"
                    class="flex items-center justify-center gap-2 bg-white/8 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] backdrop-blur-2xl px-3 py-2 border border-cyan-500/30 hover:border-cyan-400 rounded-lg font-semibold text-white text-xs transition-all duration-300"
                  >
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.06 2.29.38 3.02.91.99-.72 2.45-.84 3.02-.91 5.54.28 6.26 7.94 2.96 12.97zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    App Store
                  </a>
                  <a
                    href="https://play.google.com/store"
                    target="_blank"
                    class="flex items-center justify-center gap-2 bg-white/8 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] backdrop-blur-2xl px-3 py-2 border border-cyan-500/30 hover:border-cyan-400 rounded-lg font-semibold text-white text-xs transition-all duration-300"
                  >
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.45 2.426c-.094.148-.15.32-.15.504v7.636h16.8V2.93c0-.184-.056-.356-.15-.504m-16.35.504c0-.832.65-1.506 1.45-1.506h15.1c.8 0 1.45.674 1.45 1.506"/>
                    </svg>
                    Play Store
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop Fixed Content -->
          <div
            v-show="currentGameIndex === index"
            class="hidden md:block fixed left-1/2 z-20 max-w-2xl px-8 pointer-events-auto md:left-[34%] lg:left-[26%]"
            :data-game-content="index"
            :ref="`gameContent${index}`"
            :style="{
              top: '50%',
              transform: `translate(-50%, -50%)`,
            }"
          >
            <div class="max-w-2xl">
              <div
                class="flex flex-col gap-0 mb-6 font-black text-4xl md:text-5xl leading-9 tracking-tight"
              >
                <span
                  class="drop-shadow-[0_0_30px_rgba(34,211,238,0.9)] text-cyan-400"
                >
                  {{ game.title1 }}
                </span>
                <span
                  class="bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-[0_0_15px_rgba(255,195,0,0.5)] text-transparent"
                >
                  {{ game.title2 }}
                </span>
              </div>
              <h2
                class="drop-shadow-[0_4px_20px_rgba(34,211,238,0.2)] mb-8 font-semibold text-white text-lg md:text-xl leading-relaxed"
              >
                {{ game.description }}
              </h2>
              <div class="flex gap-3 mx-auto">
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  class="flex items-center justify-center gap-3 bg-white/8 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] backdrop-blur-2xl px-4 py-3 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg font-semibold text-white text-sm transition-all hover:-translate-y-1 duration-300"
                >
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.06 2.29.38 3.02.91.99-.72 2.45-.84 3.02-.91 5.54.28 6.26 7.94 2.96 12.97zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  App Store
                </a>
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  class="flex items-center justify-center gap-3 bg-white/8 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] backdrop-blur-2xl px-4 py-3 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg font-semibold text-white text-sm transition-all hover:-translate-y-1 duration-300"
                >
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.45 2.426c-.094.148-.15.32-.15.504v7.636h16.8V2.93c0-.184-.056-.356-.15-.504m-16.35.504c0-.832.65-1.506 1.45-1.506h15.1c.8 0 1.45.674 1.45 1.506"/>
                  </svg>
                  Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT SECTION -->
    <section
      class="relative bg-gradient-to-br from-blue-950/80 to-black/90 px-4 md:px-8 py-20 md:py-32 border-cyan-500/20 border-t w-full z-20"
      id="about"
      ref="aboutSection"
    >
      <div class="mx-auto max-w-2xl">
        <h2
          class="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 md:mb-12 font-bold text-transparent text-4xl md:text-6xl text-center"
        >
          About Voodoo
        </h2>
        <div class="space-y-4 md:space-y-6 text-white/85 text-base md:text-lg leading-relaxed">
          <p>
            Voodoo is a leading mobile game publisher creating hyper-casual
            games that are always fresh, always fun, and always satisfying. With
            a focus on simple yet addictive gameplay, our games have been
            downloaded by millions worldwide.
          </p>
          <p>
            We believe in creating gaming experiences that are instantly
            engaging and endlessly entertaining. From strategy to puzzles,
            racing to flipping challenges, Voodoo games offer something for
            everyone.
          </p>
          <p>
            Join our community of players and discover why Voodoo games are the
            most fun you can have on your phone.
          </p>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer
      class="relative bg-black/95 px-4 md:px-8 py-12 border-cyan-500/20 border-t w-full z-20"
    >
      <div class="mx-auto max-w-4xl text-center">
        <h3 class="mb-4 font-bold text-cyan-400 text-2xl">Voodoo Games</h3>
        <p class="mb-8 text-white/60 text-sm md:text-base">
          &copy; 2025 Voodoo. All rights reserved.
        </p>
        <div class="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-base">
          <a
            href="#"
            class="text-white/70 hover:text-cyan-400 transition-colors duration-300"
            >Privacy Policy</a
          >
          <a
            href="#"
            class="text-white/70 hover:text-cyan-400 transition-colors duration-300"
            >Terms of Service</a
          >
          <a
            href="#"
            class="text-white/70 hover:text-cyan-400 transition-colors duration-300"
            >Contact Us</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      games: [],
      loading: true,
      error: null,
      currentGameIndex: 0,
      currentSection: "home",
      currentSectionLabel: "HOME",
      transitionProgress: 0,
      sectionDots: [
        { id: "home", label: "Home", active: true },
        { id: "games", label: "Games", active: false },
        { id: "about", label: "About", active: false },
      ],
      scrollListener: null,
      sectionTrackListener: null,
    };
  },
  async mounted() {
    await this.fetchGames();

    const waitForGSAP = setInterval(() => {
      if (window.gsap && window.ScrollTrigger) {
        clearInterval(waitForGSAP);
        window.gsap.registerPlugin(window.ScrollTrigger);

        this.$nextTick(() => {
          this.setupScrollAnimations();
          this.setupProgressBar();
          this.setupSectionTracking();
        });
      }
    }, 100);

    setTimeout(() => clearInterval(waitForGSAP), 5000);
  },
  beforeDestroy() {
    if (this.scrollListener)
      window.removeEventListener("scroll", this.scrollListener);
    if (this.sectionTrackListener)
      window.removeEventListener("scroll", this.sectionTrackListener);
  },
  methods: {
    async fetchGames() {
      this.loading = true;
      this.error = null;

      try {
        const response = await this.$axios.$get(
          "http://154.26.134.211:8090/api/Game/GetListGame"
        );

        if (response.isSuccess && response.data) {
          this.games = response.data;
        } else {
          throw new Error(response.message || "Failed to fetch games");
        }
      } catch (err) {
        console.error("Error fetching games:", err);
        this.error = err.message || "Unable to load games. Please try again.";
      } finally {
        this.loading = false;
      }
    },

    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    },

    setupSectionTracking() {
      const trackScroll = () => {
        const scrollPos = window.scrollY + window.innerHeight / 2;
        const heroHeight = this.$refs.heroSection?.offsetHeight || 0;
        const gamesHeight = this.$refs.gamesSection?.offsetHeight || 0;

        let currentSection = "home";
        let sectionLabel = "HOME";

        if (scrollPos < heroHeight) {
          currentSection = "home";
          sectionLabel = "HOME";
        } else if (scrollPos < heroHeight + gamesHeight) {
          currentSection = "games";
          sectionLabel = "GAMES";
        } else {
          currentSection = "about";
          sectionLabel = "ABOUT";
        }

        this.currentSection = currentSection;
        this.currentSectionLabel = sectionLabel;
        this.sectionDots.forEach((dot) => {
          dot.active = dot.id === currentSection;
        });
      };

      this.sectionTrackListener = trackScroll;
      window.addEventListener("scroll", trackScroll, { passive: true });
    },

    setupScrollAnimations() {
      const gsap = window.gsap;
      if (!gsap || this.games.length === 0) return;

      // Hero section animations
      if (this.$refs.heroTitle && this.$refs.heroSubtitle) {
        gsap.to([this.$refs.heroTitle, this.$refs.heroSubtitle], {
          scrollTrigger: {
            trigger: this.$refs.heroSection,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
          y: -150,
          opacity: 0,
          scale: 1.1,
          ease: "power2.out",
        });
      }

      // Game sections với hiệu ứng transition mượt hơn
      this.games.forEach((game, index) => {
        this.$nextTick(() => {
          const gameSection = document.querySelector(
            `[data-game-section="${index}"]`
          );
          const gameContent = this.$refs[`gameContent${index}`]?.[0];

          if (!gameSection || !gameContent) return;

          // Switch game index
          gsap.to({}, {
            scrollTrigger: {
              trigger: gameSection,
              start: "top 60%",
              end: "top 40%",
              onEnter: () => {
                this.currentGameIndex = index;
              },
              onEnterBack: () => {
                this.currentGameIndex = index;
              },
            },
          });

          // Timeline cho animation
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: gameSection,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 0.8,
            },
          });

          // Từ nhỏ to dần khi scroll xuống
          tl.fromTo(
            gameContent,
            { 
              opacity: 0,
              scale: 0.3
            },
            { 
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            }
          )
          // Giữ ở trạng thái full size
          .to(gameContent, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "none",
          })
          // Fade out khi scroll tiếp
          .to(gameContent, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          });
        });
      });

      // About section animation
      if (this.$refs.aboutSection) {
        gsap.from(this.$refs.aboutSection, {
          scrollTrigger: {
            trigger: this.$refs.aboutSection,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
          opacity: 0,
          y: 50,
        });
      }
    },

    setupProgressBar() {
      const scrollListener = () => {
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = Math.min((window.scrollY / docHeight) * 100, 100);
        if (this.$refs.progressBar) {
          this.$refs.progressBar.style.width = scrolled + "%";
        }
      };
      this.scrollListener = scrollListener;
      window.addEventListener("scroll", scrollListener, { passive: true });
    },
  },
  head() {
    return {
      title: "Voodoo - Entertain the World",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Entertain the world",
        },
      ],
    };
  },
};
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>