<template>
  <div class="bg-black w-full overflow-x-hidden relative">
    <!-- Animated Background -->
    <div
      class="fixed inset-0 bg-gradient-to-br from-red-950 via-black to-purple-950 opacity-40 pointer-events-none"
    ></div>

    <!-- Floating Particles -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="particle particle-1"></div>
      <div class="particle particle-2"></div>
      <div class="particle particle-3"></div>
    </div>

    <!-- Scroll Progress -->
    <div class="top-0 right-0 left-0 z-[2001] fixed h-1 bg-black/50">
      <div
        ref="progressBar"
        class="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 shadow-[0_0_30px_rgba(239,68,68,0.8)] h-full transition-all duration-100"
      ></div>
    </div>

    <!-- Header -->
    <header
      class="top-0 right-0 left-0 z-[2000] fixed bg-black/40 backdrop-blur-2xl border-red-500/20 border-b h-20"
    >
      <nav
        class="flex justify-between items-center mx-auto px-12 h-full"
      >
        <div class="relative group">
          <div
            class="relative bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-red-400 font-black text-transparent text-2xl lg:text-3xl tracking-wider drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(239,68,68,0.7)] transition-all duration-300"
            style="text-shadow: 0 0 10px rgba(239, 68, 68, 0.4)"
          >
            NEKSOLUTION
          </div>
        </div>

        <!-- Desktop Menu -->
        <div class="md:flex gap-8 hidden">
          <a
            v-for="section in ['home', 'games', 'about']"
            :key="section"
            :href="`#${section}`"
            :class="[
              'font-bold text-sm  tracking-widest uppercase transition-all duration-300 relative group',
              currentSection === section
                ? 'text-red-500 scale-110'
                : 'text-white/60 hover:text-red-400',
            ]"
          >
            {{ section }}
            <span
              v-if="currentSection === section"
              class="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-pink-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
            ></span>
          </a>
        </div>

        <!-- Mobile Menu Icon -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden text-red-500"
        >
          <svg
            class="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      <!-- Mobile Dropdown Menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-black/95 backdrop-blur-2xl border-red-500/20 border-t"
      >
        <a
          v-for="section in ['home', 'games', 'about']"
          :key="section"
          :href="`#${section}`"
          @click="mobileMenuOpen = false"
          class="block hover:bg-red-500/10 px-6 py-4 font-bold text-sm text-white/70 hover:text-red-400 uppercase tracking-wider transition-all"
        >
          {{ section }}
        </a>
      </div>
    </header>

    <!-- Section Dots -->
    <div
      class="top-1/2 right-6 lg:right-10 z-[1800] fixed flex-col gap-5 -translate-y-1/2 hidden lg:flex"
    >
      <button
        v-for="(dot, index) in sectionDots"
        :key="index"
        :class="[
          'w-3 h-3 rounded-full border-2 transition-all duration-500 cursor-pointer',
          dot.active
            ? 'bg-red-500 border-red-500 scale-150 shadow-[0_0_25px_rgba(239,68,68,0.9)]'
            : 'border-red-500/40 hover:border-red-500 hover:scale-125',
        ]"
        :title="dot.label"
        @click="scrollToSection(dot.id)"
      ></button>
    </div>

    <!-- Section Label -->
    <div
      class="top-24 left-1/2 z-[1800] fixed -translate-x-1/2 pointer-events-none hidden md:block"
    >
      <span
        class="font-black text-red-500/70 text-xs tracking-[0.3em] uppercase animate-pulse"
      >
        {{ currentSectionLabel }}
      </span>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="fixed inset-0 z-[3000] flex items-center justify-center bg-black"
    >
      <div class="text-center">
        <div class="relative mx-auto mb-6 w-20 h-20">
          <div
            class="absolute inset-0 border-4 border-red-500/20 rounded-full"
          ></div>
          <div
            class="absolute inset-0 border-4 border-transparent border-t-red-500 rounded-full animate-spin"
          ></div>
        </div>
        <p
          class="bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 font-bold text-transparent text-xl"
        >
          Loading Experience...
        </p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-if="error && !loading"
      class="fixed inset-0 z-[3000] flex items-center justify-center bg-black px-4"
    >
      <div class="text-center max-w-md">
        <div class="relative mx-auto mb-6 w-20 h-20">
          <div
            class="absolute inset-0 bg-red-500/20 rounded-full animate-ping"
          ></div>
          <svg
            class="relative w-20 h-20 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 class="mb-3 font-black text-2xl text-red-500">Failed to Load</h2>
        <p class="mb-6 text-base text-white/60">{{ error }}</p>
        <button
          @click="fetchGames"
          class="bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] px-8 py-3 rounded-full font-bold text-white transition-all hover:scale-110 duration-300"
        >
          Retry
        </button>
      </div>
    </div>

    <!-- HOME SECTION -->
    <section
      id="home"
      ref="heroSection"
      class="relative flex justify-center items-center w-full h-screen overflow-hidden"
    >
      <video
        ref="heroVideo"
        class="absolute inset-0 -z-10 brightness-[0.4] w-full h-full object-cover"
        src="https://framerusercontent.com/assets/OPfeNYS6cWntQd8n6oAbg6AZnFM.mp4"
        muted
        playsinline
        autoplay
        loop
      ></video>

      <div
        class="absolute inset-0 -z-10 bg-gradient-to-br from-red-950/60 via-black/70 to-purple-950/60"
      ></div>

      <!-- Animated Rings -->
      <div class="absolute inset-0 -z-5 flex justify-center items-center">
        <div
          class="border-2 border-red-500/10 opacity-20 rounded-full animate-ping w-96 h-96"
        ></div>
        <div
          class="absolute border-2 border-pink-500/10 opacity-20 rounded-full animate-ping animation-delay-500 w-[600px] h-[600px]"
        ></div>
      </div>

      <div class="relative z-10 px-4 md:px-8 max-w-5xl text-center">
        <div ref="heroTitle" class="mb-6 overflow-hidden">
          <h1
            class="mb-2 font-black text-5xl md:text-8xl lg:text-7xl tracking-tight leading-none"
          >
            <span
              class="bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-transparent animate-gradient"
            >
              ENTERTAIN
            </span>
          </h1>
          <h1
            class="font-black text-5xl md:text-8xl lg:text-7xl tracking-tight leading-none"
          >
            <span
              class="bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 text-transparent animate-gradient animation-delay-300"
            >
              THE WORLD
            </span>
          </h1>
        </div>

        <p
          ref="heroSubtitle"
          class="mx-auto mb-10 max-w-3xl font-light text-white/90 text-xl md:text-2xl leading-relaxed"
        >
          Experience next-generation gaming with stunning visuals, instant
          gameplay, and revolutionary design
        </p>

        <button
          ref="heroButton"
          @click="scrollToSection('games')"
          class="group relative px-10 py-4 rounded-full font-bold text-lg overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 group-hover:scale-110 transition-transform duration-300"
          ></div>
          <span class="relative flex items-center gap-3"> EXPLORE GAMES </span>
        </button>

        <!-- Scroll Indicator -->
      </div>
    </section>

    <!-- GAMES SECTION -->
    <section
      v-if="!loading && !error"
      id="games"
      ref="gamesSection"
      class="relative bg-black w-full pb-20 md:pb-0"
    >
      <!-- Desktop: Fixed Background Videos -->
      <div
        class="top-20 left-0 right-0 z-0 fixed md:block hidden h-[calc(100vh-80px)] overflow-hidden pointer-events-none"
      >
        <video
          v-for="(game, index) in games"
          :key="game.id"
          :ref="`gameVideo${index}`"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          :class="{
            'opacity-100': currentGameIndex === index,
            'opacity-0': currentGameIndex !== index,
          }"
          :src="game.videoUrl"
          muted
          playsinline
          autoplay
          loop
        ></video>

        <!-- Split Overlay: Left side dark, Right side clear -->
        <div class="absolute inset-0 pointer-events-none">
          <!-- Left Side: Dark overlay for text area -->
          <div
            class="absolute top-0 bottom-0 left-0 w-[55%] bg-gradient-to-r from-black/90 via-black/70 to-transparent"
          ></div>

          <!-- Right Side: Light overlay to keep video visible -->
          <div
            class="absolute top-0 bottom-0 right-0 w-[45%] bg-gradient-to-l from-black/20 via-transparent to-transparent"
          ></div>

          <!-- Dynamic Color Accent -->
          <div
            class="absolute inset-0 transition-opacity duration-1000"
            :style="{
              background: `radial-gradient(circle at ${
                70 + currentGameIndex * 5
              }% 50%, rgba(239, 68, 68, 0.15), transparent 60%)`,
              opacity: 0.6,
            }"
          ></div>
        </div>
      </div>

      <!-- Game Cards -->
      <div class="relative z-10">
        <div class="md:block hidden h-[30vh]"></div>

        <div
          v-for="(game, index) in games"
          :key="game.id"
          class="md:h-screen w-full"
          :ref="`gameSection${index}`"
          :data-game-section="index"
        >
          <!-- Mobile Card -->
          <div class="md:hidden px-4 py-6">
            <div
              class="relative backdrop-blur-xl bg-gradient-to-br from-red-950/40 via-black/60 to-purple-950/40 hover:shadow-[0_0_50px_rgba(239,68,68,0.3)] p-6 border-2 border-red-500/30 rounded-3xl transition-all duration-500 overflow-hidden group"
            >
              <!-- Animated Border -->
              <div
                class="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 blur-xl transition-opacity duration-500"
              ></div>

              <div class="relative">
                <video
                  class="mb-5 rounded-2xl w-full h-52 object-cover shadow-2xl"
                  :src="game.videoUrl"
                  muted
                  playsinline
                  autoplay
                  loop
                ></video>

                <div class="space-y-4">
                  <div class="space-y-1">
                    <h3
                      class="drop-shadow-[0_0_25px_rgba(239,68,68,0.8)] font-black text-3xl text-red-500"
                    >
                      {{ game.title1 }}
                    </h3>
                    <h3
                      class="bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-black text-3xl text-transparent"
                    >
                      {{ game.title2 }}
                    </h3>
                  </div>

                  <p class="font-light text-sm text-white/80 leading-relaxed">
                    {{ game.description }}
                  </p>

                  <div class="flex flex-col gap-3">
                    <a
                      href="https://apps.apple.com"
                      target="_blank"
                      class="flex justify-center items-center gap-2 backdrop-blur-xl bg-white/10 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] px-4 py-3 border-2 border-red-500/40 hover:border-red-400 rounded-xl font-bold text-white text-xs hover:scale-105 transition-all duration-300"
                    >
                      <svg
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.06 2.29.38 3.02.91.99-.72 2.45-.84 3.02-.91 5.54.28 6.26 7.94 2.96 12.97zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                        />
                      </svg>
                      App Store
                    </a>
                    <a
                      href="https://play.google.com/store"
                      target="_blank"
                      class="flex justify-center items-center gap-2 backdrop-blur-xl bg-white/10 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] px-4 py-3 border-2 border-red-500/40 hover:border-red-400 rounded-xl font-bold text-white text-xs hover:scale-105 transition-all duration-300"
                    >
                      <svg
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"
                        />
                      </svg>
                      Google Play
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop Fixed Content -->
          <div
            v-show="currentGameIndex === index"
            class="top-1/2  z-20 fixed md:block hidden max-w-3xl px-8 -translate-x-1/2 -translate-y-1/2 pointer-events-auto game-content"
            :ref="`gameContent${index}`"
            
          >
            <div class="space-y-8">
              <div class="space-y-2">
                <h2
                  class="drop-shadow-[0_0_40px_rgba(239,68,68,0.9)] font-black text-6xl lg:text-7xl text-red-500 leading-tight"
                >
                  {{ game.title1 }}
                </h2>
                <h2
                  class="bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-[0_0_30px_rgba(251,191,36,0.6)] font-black text-6xl lg:text-7xl text-transparent leading-tight"
                >
                  {{ game.title2 }}
                </h2>
              </div>

              <p
                class="font-light text-white/90 text-xl lg:text-2xl leading-relaxed"
              >
                {{ game.description }}
              </p>

              <div class="flex gap-4">
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  class="group relative flex items-center gap-3 backdrop-blur-2xl bg-white/10 px-6 py-4 border-2 border-red-500/50 rounded-2xl font-bold text-white hover:scale-110 transition-all duration-300 overflow-hidden"
                >
                  <div
                    class="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-red-500/20 to-pink-500/20 transition-opacity"
                  ></div>
                  <svg
                    class="relative w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.06 2.29.38 3.02.91.99-.72 2.45-.84 3.02-.91 5.54.28 6.26 7.94 2.96 12.97zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                    />
                  </svg>
                  <span class="relative">App Store</span>
                </a>
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  class="group relative flex items-center gap-3 backdrop-blur-2xl bg-white/10 px-6 py-4 border-2 border-red-500/50 rounded-2xl font-bold text-white hover:scale-110 transition-all duration-300 overflow-hidden"
                >
                  <div
                    class="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-red-500/20 to-pink-500/20 transition-opacity"
                  ></div>
                  <svg
                    class="relative w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"
                    />
                  </svg>
                  <span class="relative">Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT SECTION -->
    <section
      id="about"
      ref="aboutSection"
      class="relative bg-gradient-to-br from-red-950/50 via-black to-purple-950/50 px-6 md:px-12 py-24 md:py-40 border-red-500/30 border-t w-full z-20"
    >
      <div class="relative mx-auto max-w-4xl">
        <div
          class="absolute -inset-20 opacity-30 bg-red-500/10 blur-3xl rounded-full"
        ></div>

        <h2
          class="relative bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 mb-12 md:mb-16 font-black text-5xl md:text-7xl text-center text-transparent"
        >
          About Voodoo
        </h2>

        <div
          class="relative space-y-6 md:space-y-8 font-light text-lg md:text-xl text-white/85 leading-relaxed"
        >
          <p
            class="backdrop-blur-sm bg-white/5 hover:bg-white/10 p-6 border border-red-500/20 hover:border-red-500/40 rounded-2xl transition-all duration-300"
          >
            Voodoo is a leading mobile game publisher creating hyper-casual
            games that are always fresh, always fun, and always satisfying. With
            a focus on simple yet addictive gameplay, our games have been
            downloaded by millions worldwide.
          </p>
          <p
            class="backdrop-blur-sm bg-white/5 hover:bg-white/10 p-6 border border-red-500/20 hover:border-red-500/40 rounded-2xl transition-all duration-300"
          >
            We believe in creating gaming experiences that are instantly
            engaging and endlessly entertaining. From strategy to puzzles,
            racing to flipping challenges, Voodoo games offer something for
            everyone.
          </p>
          <p
            class="backdrop-blur-sm bg-white/5 hover:bg-white/10 p-6 border border-red-500/20 hover:border-red-500/40 rounded-2xl transition-all duration-300"
          >
            Join our community of players and discover why Voodoo games are the
            most fun you can have on your phone.
          </p>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer
      class="relative bg-black/95 px-6 md:px-12 py-16 border-red-500/30 border-t w-full z-20"
    >
      <div class="mx-auto max-w-6xl text-center">
        <h3
          class="bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 mb-6 font-black text-3xl text-transparent"
        >
          VOODOO GAMES
        </h3>
        <p class="mb-10 text-sm md:text-base text-white/50">
          &copy; 2025 Voodoo. All rights reserved.
        </p>
        <div
          class="flex flex-wrap justify-center gap-6 md:gap-10 text-sm md:text-base"
        >
          <a
            href="#"
            class="text-white/60 hover:text-red-400 transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            class="text-white/60 hover:text-red-400 transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#"
            class="text-white/60 hover:text-red-400 transition-colors duration-300"
          >
            Contact Us
          </a>
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
      mobileMenuOpen: false,
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
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        this.mobileMenuOpen = false;
      }
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
      if (this.$refs.heroButton) {
  // Animation khi load
  gsap.from(this.$refs.heroButton, {
    y: 10,
    duration: 1,
    delay: 0.8,
    ease: "power3.out",
    overwrite: "auto", // ✅ Ngừa conflict
  });

  // ✅ Scroll animation (tự động reverse khi scroll back)
  gsap.to(this.$refs.heroButton, {
    scrollTrigger: {
      trigger: this.$refs.heroSection,
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
      // ❌ Xóa onLeaveBack
    },
    y: -90,
    opacity: 0,
    scale: 1.1,
    ease: "power2.out",
    overwrite: "auto", // ✅ Tự động overwrite animation cũ
  });
}

      // Game sections animations
      this.games.forEach((game, index) => {
        this.$nextTick(() => {
          const gameSection = document.querySelector(
            `[data-game-section="${index}"]`
          );
          const gameContent = this.$refs[`gameContent${index}`]?.[0];

          if (!gameSection || !gameContent) return;

          // Switch game index
          gsap.to(
            {},
            {
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
            }
          );

          // Content animation timeline
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: gameSection,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 0.8,
            },
          });

          tl.fromTo(
            gameContent,
            {
              opacity: 0,
              scale: 0.5,
              rotationY: -15,
            },
            {
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 0.3,
              ease: "power2.out",
            }
          )
            .to(gameContent, {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "none",
            })
            .to(gameContent, {
              opacity: 0,
              scale: 0.9,
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
          content: "Experience next-generation gaming",
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
.game-content {
  left: 50%;
}

@media (min-width: 768px) {
  .game-content {
    left: 36%;
  }
}

@media (min-width: 1024px) and (max-width: 1335px) {
  .game-content {
    left: 36%;
  }
}

@media (min-width: 1336px) {
  .game-content {
    left: 28%;
  }
}

/* Animated Gradient */
@keyframes gradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-500 {
  animation-delay: 500ms;
}

/* Floating Particles */
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.8), transparent);
  border-radius: 50%;
  animation: float 20s infinite ease-in-out;
}

.particle-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.particle-2 {
  top: 60%;
  left: 80%;
  animation-delay: 5s;
  animation-duration: 25s;
}

.particle-3 {
  top: 80%;
  left: 30%;
  animation-delay: 10s;
  animation-duration: 30s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(100px, -100px) scale(1.5);
    opacity: 0.6;
  }
  50% {
    transform: translate(200px, 50px) scale(1);
    opacity: 0.3;
  }
  75% {
    transform: translate(50px, 150px) scale(1.2);
    opacity: 0.5;
  }
}

/* Smooth Transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>