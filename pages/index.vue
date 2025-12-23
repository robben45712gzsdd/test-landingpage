<template>
  <div class="relative bg-black w-full overflow-x-hidden">
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
    <div class="top-0 right-0 left-0 z-[2001] fixed bg-black/50 h-1">
      <div
        ref="progressBar"
        class="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 shadow-[0_0_30px_rgba(239,68,68,0.8)] h-full transition-all duration-100"
      ></div>
    </div>

    <!-- Header -->
    <header
      class="top-0 right-0 left-0 z-[2000] fixed bg-black/40 backdrop-blur-2xl border-red-500/20 border-b h-20"
    >
      <nav class="flex justify-between items-center mx-auto px-12 h-full">
        <div class="group relative">
          <div
            class="relative bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(239,68,68,0.7)] font-black text-transparent text-2xl lg:text-3xl tracking-wider transition-all duration-300"
            style="text-shadow: 0 0 10px rgba(239, 68, 68, 0.4)"
          >
            NEKSOLUTION
          </div>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex gap-8">
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
              class="right-0 -bottom-2 left-0 absolute bg-gradient-to-r from-red-500 to-pink-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] h-0.5"
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
          class="block hover:bg-red-500/10 px-6 py-4 font-bold text-white/70 hover:text-red-400 text-sm uppercase tracking-wider transition-all"
        >
          {{ section }}
        </a>
      </div>
    </header>

    <!-- Section Dots -->
    <div
      class="hidden top-1/2 right-6 lg:right-10 z-[1800] fixed lg:flex flex-col gap-5 -translate-y-1/2"
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
      class="hidden md:block top-24 left-1/2 z-[1800] fixed -translate-x-1/2 pointer-events-none"
    >
      <span
        class="font-black text-red-500/70 text-xs uppercase tracking-[0.3em] animate-pulse"
      >
        {{ currentSectionLabel }}
      </span>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="z-[3000] fixed inset-0 flex justify-center items-center bg-black"
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

    <div
      v-if="error && !loading"
      class="z-[3000] fixed inset-0 flex justify-center items-center bg-black px-4"
    >
      <div class="max-w-md text-center">
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
        <h2 class="mb-3 font-black text-red-500 text-2xl">Failed to Load</h2>
        <p class="mb-6 text-white/60 text-base">{{ error }}</p>
        <button
          @click="fetchGames"
          class="bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] px-8 py-3 rounded-full font-bold text-white hover:scale-110 transition-all duration-300"
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

      <!-- Animated Rings -->
      <div class="z-[100] absolute inset-0 flex justify-center items-center">
        <div
          class="opacity-20 border-2 border-red-500/10 rounded-full w-96 h-96 animate-ping"
        ></div>
        <div
          class="absolute opacity-20 border-2 border-pink-500/10 rounded-full w-[600px] h-[600px] animate-ping animation-delay-500"
        ></div>
      </div>

      <div class="z-10 relative px-4 md:px-8 max-w-5xl text-center">
        <div ref="heroTitle" class="mb-6 overflow-hidden">
          <h1
            class="mb-2 font-black text-5xl lg:text-7xl md:text-8xl leading-none tracking-tight"
          >
            <span
              class="bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-transparent animate-gradient"
            >
              ENTERTAIN
            </span>
          </h1>
          <h1
            class="font-black text-5xl lg:text-7xl md:text-8xl leading-none tracking-tight"
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
          class="group relative px-10 py-4 rounded-full overflow-hidden font-bold text-lg"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 group-hover:scale-110 transition-transform duration-300"
          ></div>
          <span class="relative flex items-center gap-3 text-white"> EXPLORE GAMES </span>
        </button>

        <!-- Scroll Indicator -->
      </div>
    </section>

    <!-- GAMES SECTION -->
    <section
      v-if="!loading && !error"
      id="games"
      ref="gamesSection"
      class="relative bg-black pb-20 md:pb-0 w-full"
    >
      <!-- Transition Blend Overlay -->
      <div
        ref="transitionBlend"
        class="hidden md:block top-0 right-0 left-0 z-[6] fixed h-screen bg-black opacity-0 pointer-events-none transition-opacity duration-1000"
      ></div>

      <!-- Desktop: Fixed Background Videos (Including Hero) -->
      <div
        ref="gameVideosContainer"
        class="hidden md:block top-0 right-0 left-0 z-[1] fixed h-screen overflow-hidden pointer-events-none"
      >
        <!-- Hero Video (index -1) -->
        <video
          ref="heroVideoFixed"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          :class="{
            'opacity-100': currentGameIndex === -1,
            'opacity-0': currentGameIndex !== -1,
          }"
          src="../assets/video/animated-retro-gamepad-loopable-video-2025-12-09-04-44-52-utc_1_online-video-cutter.com.mp4"
          muted
          playsinline
          autoplay
          loop
        ></video>

        <!-- Game Videos -->
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
          <!-- Hero Overlay (when currentGameIndex === -1) - Very light overlay -->
          <div
            v-if="currentGameIndex === -1"
            class="absolute inset-0 bg-gradient-to-br from-black/10 via-black/20 to-black/10 transition-opacity duration-1000"
          ></div>

          <!-- Game Overlay (when currentGameIndex >= 0) -->
          <template v-else>
            <!-- Left Side: Dark overlay for text area -->
            <div
              class="top-0 bottom-0 left-0 absolute bg-gradient-to-r from-black/90 via-black/70 to-transparent w-[55%]"
            ></div>

            <!-- Right Side: Light overlay to keep video visible -->
            <div
              class="top-0 right-0 bottom-0 absolute bg-gradient-to-l from-black/20 via-transparent to-transparent w-[45%]"
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
          </template>
        </div>
      </div>

      <!-- Game Cards -->
      <div class="z-10 relative">
        <div class="hidden md:block h-[30vh]"></div>

        <div
          v-for="(game, index) in games"
          :key="game.id"
          class="w-full md:h-screen"
          :ref="`gameSection${index}`"
          :data-game-section="index"
        >
          <!-- Mobile Card -->
          <div class="md:hidden px-4 py-6">
            <div
              class="group relative bg-gradient-to-br from-red-950/40 via-black/60 to-purple-950/40 hover:shadow-[0_0_50px_rgba(239,68,68,0.3)] backdrop-blur-xl p-6 border-2 border-red-500/30 rounded-3xl overflow-hidden transition-all duration-500"
            >
              <!-- Animated Border -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
              ></div>

              <div class="relative">
                <video
                  class="shadow-2xl mb-5 rounded-2xl w-full h-52 object-cover"
                  :src="game.videoUrl"
                  muted
                  playsinline
                  autoplay
                  loop
                ></video>

                <div class="space-y-4">
                  <div class="space-y-1">
                    <h3
                      class="drop-shadow-[0_0_25px_rgba(239,68,68,0.8)] font-black text-red-500 text-3xl"
                    >
                      {{ game.title1 }}
                    </h3>
                    <h3
                      class="bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-black text-transparent text-3xl"
                    >
                      {{ game.title2 }}
                    </h3>
                  </div>

                  <p class="font-light text-white/80 text-sm leading-relaxed">
                    {{ game.description }}
                  </p>

                  <div class="flex gap-3 mt-8">
                    <a
                      href="https://apps.apple.com"
                      target="_blank"
                    >
                      <img
                        src="../assets/Download_on_the_App_Store_Badge.svg"
                        class="w-auto h-12 object-contain"
                      />
                    </a>
                    <a
                      href="https://play.google.com/store"
                      target="_blank"
                    >
                      <img
                        src="../assets/Google_Play_Store_badge_EN.svg"
                        class="w-auto h-12 object-contain"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop Fixed Content -->
          <div
            v-show="currentGameIndex === index"
            class="hidden md:block top-1/2 z-20 fixed px-8 max-w-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-auto game-content"
            :ref="`gameContent${index}`"
          >
            <div class="space-y-8">
              <div class="flex">
                <img
                  :src="game.linkImg"
                  :alt="`${game.title1} ${game.title2} Logo`"
                  class="drop-shadow-[0_0_25px_rgba(239,68,68,0.6)] max-w-[280px] max-h-34 object-contain"
                />
              </div>

              <p
                class="pr-24 font-bold text-white/90 text-xl lg:text-2xl leading-relaxed"
              >
                {{ game.description }}
              </p>

              <div class="flex gap-4">
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  class="group inline-block relative hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="93"
                    viewBox="3.552713678800501e-15 -8.881784197001252e-16 540.0040000000001 160"
                    width="144"
                  >
                    <linearGradient
                      id="a"
                      gradientTransform="matrix(4.0022 0 0 4.0011 191.95 -349.736)"
                      gradientUnits="userSpaceOnUse"
                      x1="-23.235"
                      x2="-23.235"
                      y1="97.431"
                      y2="61.386"
                    >
                      <stop offset="0" stop-color="#1a1a1a" stop-opacity=".1" />
                      <stop
                        offset=".123"
                        stop-color="#212121"
                        stop-opacity=".151"
                      />
                      <stop
                        offset=".308"
                        stop-color="#353535"
                        stop-opacity=".227"
                      />
                      <stop
                        offset=".532"
                        stop-color="#575757"
                        stop-opacity=".318"
                      />
                      <stop
                        offset=".783"
                        stop-color="#858585"
                        stop-opacity=".421"
                      />
                      <stop
                        offset="1"
                        stop-color="#b3b3b3"
                        stop-opacity=".51"
                      />
                    </linearGradient>
                    <path
                      d="M536.418 141.11a15.328 15.324 0 0 1-15.345 15.325H18.926a15.348 15.344 0 0 1-15.364-15.324V18.905A15.368 15.364 0 0 1 18.926 3.561H521.07a15.344 15.34 0 0 1 15.345 15.344z"
                    />
                    <path
                      d="M120.577 79.158c-.116-12.896 10.562-19.17 11.05-19.462-6.047-8.814-15.42-10.018-18.714-10.114-7.872-.829-15.508 4.709-19.519 4.709-4.09 0-10.265-4.63-16.92-4.493-8.565.132-16.578 5.09-20.972 12.787-9.069 15.697-2.305 38.763 6.383 51.45 4.347 6.218 9.425 13.152 16.073 12.908 6.504-.264 8.933-4.141 16.781-4.141 7.776 0 10.058 4.14 16.837 3.985 6.98-.108 11.374-6.242 15.569-12.512 5.022-7.118 7.04-14.135 7.12-14.496-.16-.056-13.552-5.169-13.688-20.621zM107.77 41.235c3.498-4.373 5.891-10.323 5.227-16.36-5.063.224-11.394 3.5-15.04 7.778-3.226 3.769-6.107 9.947-5.363 15.756 5.687.424 11.526-2.868 15.176-7.174z"
                      fill="#fff"
                    />
                    <path
                      d="M130.198 0H62.993l26.323 39.989h40.882a4.733 4.733 0 0 0 4.729-4.724V4.726A4.734 4.734 0 0 0 130.198 0z"
                      fill="url(#a)"
                      transform="scale(4.00216 4.0011)"
                    />
                    <g fill="#fff">
                      <path
                        d="M214.776 126.05h-9.089l-4.979-15.64h-17.305l-4.743 15.64h-8.848l17.149-53.246h10.59zm-15.568-22.201l-4.503-13.904c-.476-1.42-1.373-4.766-2.685-10.031h-.16c-.529 2.265-1.373 5.61-2.53 10.03l-4.426 13.905zm59.584 2.532c0 6.53-1.773 11.691-5.323 15.48-3.178 3.373-7.128 5.058-11.839 5.058-5.086 0-8.744-1.813-10.966-5.446v20.146h-8.532v-41.343c0-4.102-.108-8.307-.316-12.62h7.504l.476 6.086h.16c2.846-4.585 7.164-6.878 12.96-6.878 4.53 0 8.312 1.788 11.337 5.37 3.022 3.588 4.539 8.302 4.539 14.147zm-8.693.312c0-3.737-.84-6.818-2.53-9.246-1.844-2.525-4.322-3.79-7.427-3.79-2.106 0-4.019.705-5.727 2.093-1.713 1.4-2.834 3.23-3.358 5.494a11.142 11.14 0 0 0-.397 2.597v6.405c0 2.79.857 5.146 2.57 7.074 1.713 1.92 3.938 2.885 6.675 2.885 3.214 0 5.716-1.244 7.505-3.713 1.792-2.477 2.689-5.742 2.689-9.799zm52.865-.312c0 6.53-1.773 11.691-5.323 15.48-3.182 3.373-7.128 5.058-11.843 5.058-5.086 0-8.744-1.813-10.966-5.446v20.146H266.3v-41.343c0-4.102-.108-8.307-.316-12.62h7.504l.476 6.086h.16c2.841-4.585 7.16-6.878 12.959-6.878 4.526 0 8.308 1.788 11.342 5.37 3.018 3.588 4.539 8.302 4.539 14.147zm-8.697.312c0-3.737-.845-6.818-2.534-9.246-1.845-2.525-4.314-3.79-7.42-3.79-2.105 0-4.018.705-5.735 2.093-1.713 1.4-2.83 3.23-3.353 5.494-.26 1.056-.4 1.916-.4 2.597v6.405c0 2.79.86 5.146 2.565 7.074 1.713 1.917 3.938 2.885 6.683 2.885 3.218 0 5.72-1.244 7.504-3.713 1.793-2.477 2.69-5.742 2.69-9.799zm58.083 4.422c0 4.533-1.585 8.218-4.734 11.063-3.466 3.104-8.305 4.66-14.508 4.66-5.731 0-10.326-1.103-13.792-3.316l1.973-7.11c3.742 2.217 7.853 3.32 12.327 3.32 3.218 0 5.72-.727 7.504-2.172 1.79-1.448 2.694-3.385 2.694-5.801 0-2.165-.749-3.977-2.218-5.454-1.476-1.472-3.918-2.845-7.348-4.105-9.325-3.477-13.991-8.562-13.991-15.252 0-4.37 1.649-7.946 4.939-10.743 3.29-2.793 7.652-4.19 13.079-4.19 4.846 0 8.884.845 12.09 2.53l-2.141 6.953c-3.018-1.632-6.424-2.448-10.234-2.448-3.01 0-5.37.74-7.06 2.212-1.42 1.317-2.14 2.921-2.14 4.826 0 2.1.82 3.845 2.453 5.213 1.417 1.26 4.002 2.633 7.74 4.105 4.586 1.849 7.956 4.001 10.113 6.474 2.174 2.473 3.254 5.558 3.254 9.235zm28.283-17.057h-9.405v18.641c0 4.741 1.657 7.106 4.979 7.106 1.525 0 2.79-.128 3.79-.396l.236 6.478c-1.68.628-3.894.944-6.635.944-3.37 0-6.004-1.028-7.905-3.085-1.893-2.057-2.845-5.501-2.845-10.35V94.041h-5.603V87.64h5.603v-7.03l8.38-2.529v9.56h9.405zm42.351 12.48c0 5.9-1.689 10.746-5.058 14.535-3.526 3.901-8.217 5.846-14.064 5.846-5.643 0-10.13-1.869-13.475-5.602-3.346-3.74-5.019-8.454-5.019-14.14 0-5.95 1.729-10.823 5.175-14.612 3.454-3.793 8.104-5.69 13.951-5.69 5.635 0 10.162 1.873 13.588 5.61 3.273 3.625 4.902 8.307 4.902 14.052zm-8.844.195c0-3.517-.76-6.533-2.286-9.058-1.789-3.049-4.35-4.573-7.668-4.573-3.418 0-6.04 1.524-7.824 4.573-1.529 2.525-2.29 5.593-2.29 9.218 0 3.521.761 6.546 2.29 9.063 1.845 3.049 4.418 4.573 7.752 4.573 3.262 0 5.82-1.556 7.668-4.65 1.57-2.584 2.358-5.62 2.358-9.146zm36.591-11.575a14.848 14.844 0 0 0-2.69-.236c-3 0-5.322 1.128-6.955 3.401-1.417 2-2.13 4.53-2.13 7.582v20.146h-8.532V99.747a269.866 269.794 0 0 0-.248-12.087h7.432l.312 7.346h.236c.905-2.525 2.322-4.561 4.267-6.086a10.318 10.315 0 0 1 6.167-2.056c.789 0 1.5.056 2.133.156zm38.16 9.879a20.01 20.006 0 0 1-.311 3.869h-25.598c.096 3.793 1.337 6.698 3.714 8.698 2.157 1.785 4.947 2.681 8.372 2.681 3.79 0 7.248-.6 10.358-1.812l1.337 5.917c-3.634 1.585-7.925 2.373-12.875 2.373-5.955 0-10.63-1.753-14.032-5.25-3.394-3.5-5.095-8.206-5.095-14.1 0-5.785 1.581-10.606 4.747-14.451 3.314-4.106 7.792-6.158 13.427-6.158 5.535 0 9.725 2.052 12.571 6.158 2.253 3.252 3.386 7.286 3.386 12.075zm-8.136-2.213c.06-2.532-.5-4.713-1.656-6.558-1.477-2.376-3.75-3.56-6.796-3.56-2.79 0-5.063 1.156-6.792 3.476-1.42 1.845-2.265 4.062-2.525 6.634zM180.942 53.979c-2.374 0-4.427-.116-6.136-.312V27.924a46.45 46.437 0 0 1 7.224-.544c9.786 0 14.292 4.813 14.292 12.659 0 9.05-5.323 13.94-15.38 13.94zm1.432-23.299c-1.32 0-2.445.08-3.377.273v19.569c.504.08 1.472.116 2.833.116 6.412 0 10.062-3.65 10.062-10.483 0-6.094-3.302-9.475-9.518-9.475zm27.992 23.495c-5.515 0-9.09-4.117-9.09-9.707 0-5.825 3.65-9.979 9.402-9.979 5.435 0 9.089 3.922 9.089 9.671 0 5.898-3.766 10.015-9.401 10.015zm.16-16.62c-3.03 0-4.971 2.832-4.971 6.793 0 3.885 1.981 6.718 4.93 6.718s4.931-3.029 4.931-6.798c0-3.84-1.94-6.714-4.89-6.714zm40.69-2.677l-5.904 18.869h-3.846l-2.445-8.194a62.154 62.137 0 0 1-1.517-6.094h-.08c-.308 2.056-.892 4.117-1.513 6.094l-2.601 8.194h-3.886l-5.555-18.87h4.31l2.137 8.971c.505 2.137.929 4.153 1.281 6.058h.08c.308-1.589.812-3.573 1.553-6.018l2.681-9.006h3.418l2.566 8.814a73.86 73.86 0 0 1 1.516 6.214h.112c.273-1.94.7-4.001 1.281-6.214l2.293-8.814zm21.731 18.869h-4.194V42.912c0-3.337-1.28-5.01-3.806-5.01-2.485 0-4.194 2.137-4.194 4.622v11.223h-4.195V40.27c0-1.668-.04-3.457-.156-5.397h3.69l.196 2.912h.117c1.128-2.016 3.417-3.297 5.983-3.297 3.962 0 6.563 3.03 6.563 7.959zm11.567 0h-4.199V26.219h4.199zm15.292.428c-5.511 0-9.09-4.117-9.09-9.707 0-5.825 3.65-9.979 9.398-9.979 5.439 0 9.089 3.922 9.089 9.671.004 5.898-3.766 10.015-9.397 10.015zm.156-16.62c-3.03 0-4.97 2.832-4.97 6.793 0 3.885 1.984 6.718 4.926 6.718 2.953 0 4.93-3.029 4.93-6.798.005-3.84-1.933-6.714-4.886-6.714zm25.778 16.192l-.304-2.173h-.112c-1.281 1.749-3.15 2.6-5.52 2.6-3.381 0-5.783-2.368-5.783-5.553 0-4.657 4.039-7.066 11.03-7.066v-.348c0-2.484-1.316-3.729-3.918-3.729-1.86 0-3.494.468-4.93 1.4l-.853-2.756c1.745-1.088 3.922-1.633 6.48-1.633 4.93 0 7.42 2.601 7.42 7.807v6.95c0 1.904.084 3.38.272 4.505zm-.577-9.399c-4.658 0-6.995 1.129-6.995 3.805 0 1.98 1.204 2.949 2.877 2.949 2.133 0 4.118-1.628 4.118-3.841zm24.454 9.399l-.196-3.03h-.116c-1.205 2.29-3.23 3.458-6.06 3.458-4.55 0-7.92-4.001-7.92-9.63 0-5.902 3.494-10.06 8.264-10.06 2.526 0 4.315.853 5.323 2.565h.084V26.22h4.199V48.66c0 1.825.044 3.533.156 5.086zm-.62-11.103c0-2.641-1.75-4.894-4.419-4.894-3.11 0-5.01 2.757-5.01 6.638 0 3.805 1.972 6.41 4.926 6.41 2.637 0 4.502-2.293 4.502-5.01zm30.816 11.53c-5.511 0-9.085-4.116-9.085-9.706 0-5.825 3.65-9.979 9.397-9.979 5.44 0 9.09 3.922 9.09 9.671.003 5.898-3.763 10.015-9.402 10.015zm.156-16.62c-3.026 0-4.967 2.833-4.967 6.794 0 3.885 1.981 6.718 4.927 6.718 2.954 0 4.93-3.029 4.93-6.798.009-3.84-1.932-6.714-4.89-6.714zm31.801 16.193h-4.198V42.912c0-3.337-1.28-5.01-3.806-5.01-2.485 0-4.19 2.137-4.19 4.622v11.223h-4.199V40.27c0-1.668-.04-3.457-.156-5.397h3.69l.196 2.912h.116c1.125-2.016 3.418-3.3 5.98-3.3 3.962 0 6.567 3.028 6.567 7.958zm28.22-15.725h-4.615v9.163c0 2.333.808 3.497 2.441 3.497.74 0 1.361-.08 1.861-.196l.116 3.185c-.812.312-1.9.468-3.253.468-3.306 0-5.283-1.825-5.283-6.602v-9.515h-2.754v-3.144h2.754V31.42l4.118-1.245v4.698h4.614zm22.203 15.725h-4.19V42.992c0-3.377-1.277-5.086-3.806-5.086-2.173 0-4.198 1.477-4.198 4.466v11.375h-4.19V26.219h4.19v11.335h.084c1.32-2.056 3.234-3.069 5.675-3.069 3.994 0 6.435 3.105 6.435 8.039zm22.749-8.427h-12.587c.08 3.573 2.445 5.59 5.947 5.59 1.861 0 3.574-.312 5.087-.892l.652 2.913c-1.785.776-3.886 1.164-6.331 1.164-5.903 0-9.397-3.73-9.397-9.51 0-5.786 3.578-10.136 8.925-10.136 4.822 0 7.848 3.573 7.848 8.97a8.084 8.082 0 0 1-.144 1.901zm-3.846-2.988c0-2.913-1.47-4.97-4.15-4.97-2.41 0-4.315 2.097-4.587 4.97z"
                      />
                    </g>
                  </svg>
                </a>
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  class="group inline-block relative hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:cc="http://creativecommons.org/ns#"
                    xmlns:dc="http://purl.org/dc/elements/1.1/"
                    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                    id="svg51"
                    width="159"
                    height="93.333"
                    version="1.1"
                    viewBox="0 0 180 53.333"
                    xml:space="preserve"
                  >
                    <metadata id="metadata9">
                      <rdf:RDF
                        ><cc:Work rdf:about=""
                          ><dc:format>image/svg+xml</dc:format
                          ><dc:type
                            rdf:resource="http://purl.org/dc/dcmitype/StillImage" /></cc:Work
                      ></rdf:RDF>
                    </metadata>
                    <path
                      id="path11"
                      d="m173.33 53.333h-166.66c-3.6666 0-6.6665-2.9999-6.6665-6.6665v-39.999c0-3.6666 2.9999-6.6665 6.6665-6.6665h166.66c3.6666 0 6.6665 2.9999 6.6665 6.6665v39.999c0 3.6666-2.9999 6.6665-6.6665 6.6665"
                      fill="#100f0d"
                      stroke-width=".13333"
                    />
                    <path
                      id="path35"
                      d="m142.58 40h2.4879v-16.669h-2.4879zm22.409-10.664-2.8519 7.2264h-0.0853l-2.9599-7.2264h-2.6799l4.4399 10.1-2.5319 5.6185h2.5946l6.8412-15.718zm-14.11 8.7706c-0.81331 0-1.9506-0.40786-1.9506-1.4156 0-1.2865 1.416-1.7797 2.6373-1.7797 1.0933 0 1.6093 0.23546 2.2733 0.55732-0.19333 1.5442-1.5226 2.6379-2.9599 2.6379zm0.30133-9.1352c-1.8013 0-3.6666 0.79371-4.4386 2.5521l2.208 0.92184c0.47198-0.92184 1.3506-1.2218 2.2733-1.2218 1.2866 0 2.5946 0.77131 2.6159 2.1442v0.17133c-0.45066-0.25733-1.416-0.64318-2.5946-0.64318-2.3813 0-4.8039 1.3077-4.8039 3.7524 0 2.2302 1.952 3.6671 4.1386 3.6671 1.672 0 2.5959-0.75054 3.1732-1.6301h0.0867v1.2874h2.4026v-6.391c0-2.9593-2.2106-4.6103-5.0612-4.6103zm-15.376 2.3937h-3.5386v-5.7133h3.5386c1.86 0 2.9159 1.5396 2.9159 2.8566 0 1.2917-1.056 2.8567-2.9159 2.8567zm-0.064-8.0337h-5.9614v16.669h2.4869v-6.3149h3.4746c2.7573 0 5.4679-1.9958 5.4679-5.1765 0-3.1801-2.7106-5.1769-5.4679-5.1769zm-32.507 14.778c-1.7188 0-3.1573-1.4396-3.1573-3.415 0-1.9984 1.4385-3.4583 3.1573-3.4583 1.6969 0 3.0286 1.46 3.0286 3.4583 0 1.9754-1.3317 3.415-3.0286 3.415zm2.8567-7.8403h-0.086c-0.55826-0.66572-1.6328-1.2672-2.9853-1.2672-2.8359 0-5.4348 2.4921-5.4348 5.6925 0 3.1786 2.5989 5.6488 5.4348 5.6488 1.3525 0 2.427-0.6016 2.9853-1.2885h0.086v0.81558c0 2.1703-1.1598 3.3296-3.0286 3.3296-1.5245 0-2.4697-1.0953-2.8567-2.0188l-2.1691 0.90206c0.62238 1.503 2.2759 3.351 5.0259 3.351 2.9218 0 5.392-1.7188 5.392-5.9077v-10.181h-2.3634zm4.0822 9.7304h2.4906v-16.669h-2.4906zm6.164-5.4988c-0.0641-2.1911 1.6978-3.3078 2.9645-3.3078 0.98851 0 1.8254 0.49425 2.1057 1.2026zm7.7326-1.8906c-0.47238-1.2666-1.9114-3.6082-4.8541-3.6082-2.9218 0-5.3488 2.2983-5.3488 5.6707 0 3.1791 2.4062 5.6707 5.6275 5.6707 2.5989 0 4.1031-1.589 4.7264-2.513l-1.9333-1.289c-0.64465 0.94531-1.5249 1.5682-2.7931 1.5682-1.2666 0-2.1692-0.58012-2.7483-1.7186l7.5815-3.1359zm-60.409-1.8682v2.4057h5.7565c-0.17186 1.3532-0.62292 2.3411-1.3104 3.0286-0.83798 0.83745-2.1483 1.7614-4.4462 1.7614-3.5443 0-6.315-2.8567-6.315-6.4009s2.7707-6.4013 6.315-6.4013c1.9118 0 3.3077 0.75198 4.3388 1.7186l1.6974-1.6973c-1.4396-1.3745-3.351-2.427-6.0362-2.427-4.8552 0-8.9363 3.9524-8.9363 8.807 0 4.8541 4.0811 8.8066 8.9363 8.8066 2.6202 0 4.5967-0.85932 6.143-2.4702 1.5896-1.5896 2.0838-3.8234 2.0838-5.628 0-0.55785-0.04333-1.0734-0.1292-1.5032zm14.772 7.3675c-1.7188 0-3.201-1.4177-3.201-3.4368 0-2.0406 1.4822-3.4364 3.201-3.4364 1.7181 0 3.2003 1.3958 3.2003 3.4364 0 2.0191-1.4822 3.4368-3.2003 3.4368zm0-9.1075c-3.137 0-5.6927 2.3842-5.6927 5.6707 0 3.265 2.5557 5.6707 5.6927 5.6707 3.1358 0 5.692-2.4057 5.692-5.6707 0-3.2865-2.5562-5.6707-5.692-5.6707zm12.417 9.1075c-1.7176 0-3.2003-1.4177-3.2003-3.4368 0-2.0406 1.4828-3.4364 3.2003-3.4364 1.7188 0 3.2005 1.3958 3.2005 3.4364 0 2.0191-1.4817 3.4368-3.2005 3.4368zm0-9.1075c-3.1358 0-5.6915 2.3842-5.6915 5.6707 0 3.265 2.5557 5.6707 5.6915 5.6707 3.137 0 5.6927-2.4057 5.6927-5.6707 0-3.2865-2.5557-5.6707-5.6927-5.6707"
                      fill="#fff"
                      stroke-width=".13333"
                    />
                    <path
                      id="path37"
                      d="m27.622 25.899-14.194 15.066c5.34e-4 0.0031 0.0016 0.0057 0.0021 0.0089 0.43532 1.636 1.9296 2.8406 3.703 2.8406 0.70892 0 1.3745-0.19166 1.9453-0.52812l0.04533-0.02656 15.978-9.22-7.479-8.141"
                      fill="#eb3131"
                      stroke-width=".13333"
                    />
                    <path
                      id="path39"
                      d="m41.983 23.334-0.0136-0.0093-6.8982-3.999-7.7717 6.9156 7.7987 7.7977 6.8618-3.9592c1.203-0.64945 2.0197-1.9177 2.0197-3.3802 0-1.452-0.80571-2.7139-1.9968-3.3655"
                      fill="#f6b60b"
                      stroke-width=".13333"
                    />
                    <path
                      id="path41"
                      d="m13.426 12.37c-0.08533 0.31466-0.13018 0.64425-0.13018 0.98651v26.623c0 0.34162 0.04432 0.67233 0.13072 0.98587l14.684-14.681-14.684-13.914"
                      fill="#5778c5"
                      stroke-width=".13333"
                    />
                    <path
                      id="path43"
                      d="m27.727 26.668 7.3473-7.3451-15.96-9.2534c-0.58012-0.34746-1.2572-0.54799-1.9817-0.54799-1.7734 0-3.2697 1.2068-3.7051 2.8447-5.34e-4 0.0016-5.34e-4 0.0027-5.34e-4 0.0041l14.3 14.298"
                      fill="#3bad49"
                      stroke-width=".13333"
                    />
                    <path
                      id="path33"
                      d="m63.193 13.042h-3.8895v0.96251h2.9146c-0.0792 0.78545-0.39172 1.4021-0.91878 1.85-0.52705 0.44799-1.2 0.67292-1.9958 0.67292-0.87291 0-1.6125-0.30413-2.2186-0.90824-0.59385-0.61665-0.89584-1.3792-0.89584-2.2979 0-0.91864 0.30199-1.6812 0.89584-2.2978 0.60612-0.60412 1.3457-0.90624 2.2186-0.90624 0.44799 0 0.87504 0.07707 1.2666 0.24586 0.39172 0.16866 0.70625 0.40412 0.95211 0.70625l0.73958-0.73958c-0.33546-0.38132-0.76038-0.67292-1.2876-0.88544-0.52705-0.21253-1.077-0.31453-1.6708-0.31453-1.1645 0-2.1519 0.40412-2.9582 1.2104-0.80625 0.80825-1.2104 1.8041-1.2104 2.9811 0 1.177 0.40412 2.175 1.2104 2.9813 0.80625 0.80611 1.7937 1.2104 2.9582 1.2104 1.2229 0 2.1979-0.39172 2.9479-1.1876 0.66038-0.66238 0.99784-1.5582 0.99784-2.679 0-0.1896-0.02293-0.39172-0.05627-0.60425zm1.5068-3.7332v8.0249h4.6852v-0.98544h-3.654v-2.5457h3.2958v-0.96251h-3.2958v-2.5437h3.654v-0.98758zm11.255 0.98758v-0.98758h-5.5145v0.98758h2.2417v7.0373h1.0312v-7.0373zm4.9925-0.98758h-1.0312v8.0249h1.0312zm6.8066 0.98758v-0.98758h-5.5144v0.98758h2.2415v7.0373h1.0312v-7.0373zm10.406 0.05626c-0.79585-0.81877-1.7708-1.2229-2.9354-1.2229-1.1666 0-2.1415 0.40412-2.9374 1.2104-0.79585 0.79585-1.1874 1.7937-1.1874 2.9811s0.39159 2.1854 1.1874 2.9813c0.79585 0.80611 1.7708 1.2104 2.9374 1.2104 1.1541 0 2.1395-0.40426 2.9354-1.2104 0.79585-0.79585 1.1874-1.7938 1.1874-2.9813 0-1.177-0.39159-2.1729-1.1874-2.9686zm-5.1332 0.67078c0.59372-0.60412 1.3229-0.90624 2.1978-0.90624 0.87291 0 1.6021 0.30213 2.1854 0.90624 0.59372 0.59372 0.88531 1.3686 0.88531 2.2978 0 0.93131-0.29159 1.7041-0.88531 2.2979-0.58332 0.60412-1.3125 0.90824-2.1854 0.90824-0.87491 0-1.6041-0.30413-2.1978-0.90824-0.58132-0.60625-0.87291-1.3666-0.87291-2.2979 0-0.92918 0.29159-1.6916 0.87291-2.2978zm8.7706 1.3125-0.0437-1.548h0.0437l4.0791 6.5457h1.077v-8.0249h-1.0312v4.6957l0.0437 1.548h-0.0437l-3.8999-6.2437h-1.2562v8.0249h1.0312z"
                      fill="#fff"
                      stroke="#fff"
                      stroke-miterlimit="10"
                      stroke-width=".26666"
                    />
                  </svg>
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
      class="z-20 relative bg-gradient-to-br from-red-950/50 via-black to-purple-950/50 px-6 md:px-12 py-24 md:py-40 border-red-500/30 border-t w-full"
    >
      <div class="relative mx-auto max-w-4xl">
        <div
          class="absolute -inset-20 bg-red-500/10 opacity-30 blur-3xl rounded-full"
        ></div>

        <h2
          class="relative bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 mb-12 md:mb-16 font-black text-transparent text-5xl md:text-7xl text-center"
        >
          About NEKSOLUTION
        </h2>

        <div
          class="relative space-y-6 md:space-y-8 font-light text-white/85 text-lg md:text-xl leading-relaxed"
        >
          <p
            class="bg-white/5 hover:bg-white/10 backdrop-blur-sm p-6 border border-red-500/20 hover:border-red-500/40 rounded-2xl transition-all duration-300"
          >
            NEKSOLUTION is a leading mobile game publisher creating hyper-casual
            games that are always fresh, always fun, and always satisfying. With
            a focus on simple yet addictive gameplay, our games have been
            downloaded by millions worldwide.
          </p>
          <p
            class="bg-white/5 hover:bg-white/10 backdrop-blur-sm p-6 border border-red-500/20 hover:border-red-500/40 rounded-2xl transition-all duration-300"
          >
            We believe in creating gaming experiences that are instantly
            engaging and endlessly entertaining. From strategy to puzzles,
            racing to flipping challenges, NEKSOLUTION games offer something for
            everyone.
          </p>
          <p
            class="bg-white/5 hover:bg-white/10 backdrop-blur-sm p-6 border border-red-500/20 hover:border-red-500/40 rounded-2xl transition-all duration-300"
          >
            Join our community of players and discover why NEKSOLUTION games are the
            most fun you can have on your phone.
          </p>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer
      class="z-20 relative bg-black/95 px-6 md:px-12 py-16 border-red-500/30 border-t w-full"
    >
      <div class="mx-auto max-w-6xl text-center">
        <h3
          class="bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 mb-6 font-black text-transparent text-3xl"
        >
          NEKSOLUTION GAMES
        </h3>
        <p class="mb-10 text-white/50 text-sm md:text-base">
          &copy; 2025 NEKSOLUTION. All rights reserved.
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
      currentGameIndex: -1,
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

      // Transition from hero to first game
      gsap.to({}, {
        scrollTrigger: {
          trigger: this.$refs.heroSection,
          start: "bottom 60%",
          end: "bottom 40%",
          onEnter: () => {
            this.currentGameIndex = 0;
          },
          onLeaveBack: () => {
            this.currentGameIndex = -1;
          },
        },
      });

      // Hero section text animations
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
      title: "NEKSOLUTION - Entertain the World",
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