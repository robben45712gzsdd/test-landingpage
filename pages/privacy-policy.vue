<template>
  <div class="relative bg-black w-full min-h-screen overflow-x-hidden">
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

    <!-- Header -->
    <header
      class="top-0 right-0 left-0 z-[2000] sticky bg-black/40 backdrop-blur-2xl border-red-500/20 border-b h-20"
    >
      <nav class="flex justify-between items-center mx-auto px-6 md:px-12 h-full">
        <nuxt-link to="/" class="group relative">
          <div
            class="relative bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(239,68,68,0.7)] font-black text-transparent text-xl md:text-2xl lg:text-3xl tracking-wider transition-all duration-300"
            style="text-shadow: 0 0 10px rgba(239, 68, 68, 0.4)"
          >
            NEKSOLUTION
          </div>
        </nuxt-link>

        <nuxt-link
          to="/"
          class="text-white/60 hover:text-red-400 font-bold text-xs md:text-sm uppercase tracking-widest transition-all duration-300"
        >
          Back to Home
        </nuxt-link>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="z-10 relative px-6 md:px-12 py-16 md:py-24">
      <div class="mx-auto max-w-5xl">
        <!-- Decorative blur elements -->
        <div class="absolute top-20 -left-32 bg-red-500/20 opacity-30 blur-[120px] rounded-full w-96 h-96"></div>
        <div class="absolute top-96 -right-32 bg-purple-500/20 opacity-30 blur-[120px] rounded-full w-96 h-96"></div>
        
        <!-- Title -->
        <div class="relative mb-16 text-center">
          <h1
            class="bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 mb-4 font-black text-transparent text-4xl md:text-5xl lg:text-7xl animate-gradient"
            style="background-size: 200% 200%"
          >
            Privacy Policy
          </h1>
          <p class="mx-auto max-w-2xl font-light text-white/60 text-base md:text-lg lg:text-xl">
            Your privacy and security are our top priorities
          </p>
          <div class="mx-auto mt-6 bg-gradient-to-r from-transparent via-red-500/50 to-transparent rounded-full w-64 h-1"></div>
        </div>

        <!-- Content -->
        <div
          class="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl p-6 md:p-8 lg:p-12 border-2 border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.15)] rounded-3xl space-y-10 md:space-y-12 text-white/85 overflow-hidden"
        >
          <!-- Animated border glow -->
          <div class="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0 opacity-0 hover:opacity-100 blur-xl -z-10 transition-opacity duration-700 pointer-events-none"></div>
          
          <!-- Terms & Conditions Section -->
          <section class="group">
            <div class="flex items-center gap-4 mb-6">
              <div class="flex justify-center items-center bg-gradient-to-br from-red-500/20 to-pink-500/20 border-2 border-red-500/40 rounded-2xl w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                <svg class="w-6 h-6 md:w-7 md:h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 class="font-black text-red-400 text-xl md:text-2xl lg:text-3xl group-hover:text-red-300 transition-colors">
                Terms & Conditions
              </h2>
            </div>
            <div class="space-y-4 md:space-y-5 text-sm md:text-base lg:text-lg leading-relaxed">
              <p class="bg-white/5 hover:bg-white/10 p-4 md:p-5 border-l-4 border-red-500/50 rounded-r-xl transition-all duration-300">
                These terms and conditions apply to the Idle Piece: Brick app
                (hereby referred to as "Application") for mobile devices that
                was created by NekSolution (hereby referred to as "Service
                Provider") as a Free service.
              </p>
              <p class="bg-white/5 hover:bg-white/10 p-4 md:p-5 border-l-4 border-red-500/50 rounded-r-xl transition-all duration-300">
                Upon downloading or utilizing the Application, you are
                automatically agreeing to the following terms. It is strongly
                advised that you thoroughly read and understand these terms
                prior to using the Application.
              </p>
              <p class="bg-white/5 hover:bg-white/10 p-4 md:p-5 border-l-4 border-red-500/50 rounded-r-xl transition-all duration-300">
                Unauthorized copying, modification of the Application, any part
                of the Application, or our trademarks is strictly prohibited.
                Any attempts to extract the source code of the Application,
                translate the Application into other languages, or create
                derivative versions are not permitted. All trademarks,
                copyrights, database rights, and other intellectual property
                rights related to the Application remain the property of the
                Service Provider.
              </p>
              <p class="bg-white/5 hover:bg-white/10 p-4 md:p-5 border-l-4 border-red-500/50 rounded-r-xl transition-all duration-300">
                The Service Provider is dedicated to ensuring that the
                Application is as beneficial and efficient as possible. As such,
                they reserve the right to modify the Application or charge for
                their services at any time and for any reason. The Service
                Provider assures you that any charges for the Application or its
                services will be clearly communicated to you.
              </p>
            </div>
          </section>

          <!-- Data & Security Section -->
          <section class="group">
            <div class="flex items-center gap-4 mb-6">
              <div class="flex justify-center items-center bg-gradient-to-br from-red-500/20 to-pink-500/20 border-2 border-red-500/40 rounded-2xl w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                <svg class="w-6 h-6 md:w-7 md:h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 class="font-black text-red-400 text-xl md:text-2xl lg:text-3xl group-hover:text-red-300 transition-colors">
                Data Storage & Security
              </h2>
            </div>
            <div class="space-y-4 md:space-y-5 text-sm md:text-base lg:text-lg leading-relaxed">
              <p class="bg-white/5 hover:bg-white/10 p-4 md:p-5 border-l-4 border-red-500/50 rounded-r-xl transition-all duration-300">
                The Application stores and processes personal data that you have
                provided to the Service Provider in order to provide the
                Service. It is your responsibility to maintain the security of
                your phone and access to the Application. The Service Provider
                strongly advise against jailbreaking or rooting your phone,
                which involves removing software restrictions and limitations
                imposed by the official operating system of your device. Such
                actions could expose your phone to malware, viruses, malicious
                programs, compromise your phone's security features, and may
                result in the Application not functioning correctly or at all.
              </p>
            </div>
          </section>

          <!-- Third-Party Services Section -->
          <section class="group">
            <div class="flex items-center gap-4 mb-6">
              <div class="flex justify-center items-center bg-gradient-to-br from-red-500/20 to-pink-500/20 border-2 border-red-500/40 rounded-2xl w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                <svg class="w-6 h-6 md:w-7 md:h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h2 class="font-black text-red-400 text-xl md:text-2xl lg:text-3xl group-hover:text-red-300 transition-colors">
                Third-Party Services
              </h2>
            </div>
            <div>
              <p class="mb-6 text-sm md:text-base lg:text-lg leading-relaxed bg-white/5 p-4 md:p-5 border-l-4 border-red-500/50 rounded-r-xl">
                Please note that the Application utilizes third-party services
                that have their own Terms and Conditions. Below are the links to
                the Terms and Conditions of the third-party service providers used
                by the Application:
              </p>
              <ul class="gap-3 grid grid-cols-1 md:grid-cols-2 text-sm md:text-base lg:text-lg">
                <li>
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    class="flex items-center gap-3 bg-white/5 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10 p-3 md:p-4 border border-red-500/30 hover:border-red-500/50 rounded-xl font-medium text-white/80 hover:text-red-400 transition-all duration-300 group/link"
                  >
                    <svg class="w-4 h-4 md:w-5 md:h-5 text-red-400 opacity-70 group-hover/link:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Google Play Services
                  </a>
                </li>
                <li>
                  <a
                    href="https://developers.google.com/admob/terms"
                    target="_blank"
                    class="flex items-center gap-3 bg-white/5 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10 p-3 md:p-4 border border-red-500/30 hover:border-red-500/50 rounded-xl font-medium text-white/80 hover:text-red-400 transition-all duration-300 group/link"
                  >
                    <svg class="w-4 h-4 md:w-5 md:h-5 text-red-400 opacity-70 group-hover/link:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    AdMob
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com/analytics/terms/"
                    target="_blank"
                    class="flex items-center gap-3 bg-white/5 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10 p-3 md:p-4 border border-red-500/30 hover:border-red-500/50 rounded-xl font-medium text-white/80 hover:text-red-400 transition-all duration-300 group/link"
                  >
                    <svg class="w-4 h-4 md:w-5 md:h-5 text-red-400 opacity-70 group-hover/link:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Google Analytics for Firebase
                  </a>
                </li>
                <li>
                  <a
                    href="https://firebase.google.com/terms/crashlytics"
                    target="_blank"
                    class="flex items-center gap-3 bg-white/5 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10 p-3 md:p-4 border border-red-500/30 hover:border-red-500/50 rounded-xl font-medium text-white/80 hover:text-red-400 transition-all duration-300 group/link"
                  >
                    <svg class="w-4 h-4 md:w-5 md:h-5 text-red-400 opacity-70 group-hover/link:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Firebase Crashlytics
                  </a>
                </li>
                <li>
                  <a
                    href="https://unity3d.com/legal/terms-of-service"
                    target="_blank"
                    class="flex items-center gap-3 bg-white/5 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10 p-3 md:p-4 border border-red-500/30 hover:border-red-500/50 rounded-xl font-medium text-white/80 hover:text-red-400 transition-all duration-300 group/link"
                  >
                    <svg class="w-4 h-4 md:w-5 md:h-5 text-red-400 opacity-70 group-hover/link:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Unity
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.applovin.com/terms/"
                    target="_blank"
                    class="flex items-center gap-3 bg-white/5 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10 p-3 md:p-4 border border-red-500/30 hover:border-red-500/50 rounded-xl font-medium text-white/80 hover:text-red-400 transition-all duration-300 group/link"
                  >
                    <svg class="w-4 h-4 md:w-5 md:h-5 text-red-400 opacity-70 group-hover/link:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    AppLovin
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <!-- Internet Connection & Charges Section -->
          <section class="group">
            <div class="flex items-center gap-4 mb-6">
              <div class="flex justify-center items-center bg-gradient-to-br from-red-500/20 to-pink-500/20 border-2 border-red-500/40 rounded-2xl w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                <svg class="w-6 h-6 md:w-7 md:h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <h2 class="font-black text-red-400 text-xl md:text-2xl lg:text-3xl group-hover:text-red-300 transition-colors">
                Internet Connection & Charges
              </h2>
            </div>
            <div class="space-y-4 md:space-y-5 text-sm md:text-base lg:text-lg leading-relaxed">
              <p class="bg-white/5 hover:bg-white/10 p-4 md:p-5 border-l-4 border-red-500/50 rounded-r-xl transition-all duration-300">
                Please be aware that the Service Provider does not assume
                responsibility for certain aspects. Some functions of the
                Application require an active internet connection, which can be
                Wi-Fi or provided by your mobile network provider. The Service
                Provider cannot be held responsible if the Application does not
                function at full capacity due to lack of access to Wi-Fi or if
                you have exhausted your data allowance.
              </p>
              <p class="bg-white/5 hover:bg-white/10 p-4 md:p-5 border-l-4 border-red-500/50 rounded-r-xl transition-all duration-300">
                If you are using the application outside of a Wi-Fi area, please
                be aware that your mobile network provider's agreement terms
                still apply. Consequently, you may incur charges from your
                mobile provider for data usage during the connection to the
                application, or other third-party charges. By using the
                application, you accept responsibility for any such charges,
                including roaming data charges if you use the application
                outside of your home territory (i.e., region or country) without
                disabling data roaming. If you are not the bill payer for the
                device on which you are using the application, they assume that
                you have obtained permission from the bill payer.
              </p>
            </div>
          </section>

          <!-- Service Provider Responsibility Section -->
          <section class="group">
            <div class="flex items-center gap-4 mb-6">
              <div class="flex justify-center items-center bg-gradient-to-br from-red-500/20 to-pink-500/20 border-2 border-red-500/40 rounded-2xl w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                <svg class="w-6 h-6 md:w-7 md:h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 class="font-black text-red-400 text-xl md:text-2xl lg:text-3xl group-hover:text-red-300 transition-colors">
                Service Provider Responsibility
              </h2>
            </div>
            <div class="space-y-4 md:space-y-5 text-sm md:text-base lg:text-lg leading-relaxed">
              <p class="bg-white/5 hover:bg-white/10 p-4 md:p-5 border-l-4 border-red-500/50 rounded-r-xl transition-all duration-300">
                Similarly, the Service Provider cannot always assume
                responsibility for your usage of the application. For instance,
                it is your responsibility to ensure that your device remains
                charged. If your device runs out of battery and you are unable
                to access the Service, the Service Provider cannot be held
                responsible.
              </p>
              <p class="bg-white/5 hover:bg-white/10 p-4 md:p-5 border-l-4 border-red-500/50 rounded-r-xl transition-all duration-300">
                In terms of the Service Provider's responsibility for your use
                of the application, it is important to note that while they
                strive to ensure that it is updated and accurate at all times,
                they do rely on third parties to provide information to them so
                that they can make it available to you. The Service Provider
                accepts no liability for any loss, direct or indirect, that you
                experience as a result of relying entirely on this functionality
                of the application.
              </p>
            </div>
          </section>

          <!-- Updates & Termination Section -->
          <section class="group">
            <div class="flex items-center gap-4 mb-6">
              <div class="flex justify-center items-center bg-gradient-to-br from-red-500/20 to-pink-500/20 border-2 border-red-500/40 rounded-2xl w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                <svg class="w-6 h-6 md:w-7 md:h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h2 class="font-black text-red-400 text-xl md:text-2xl lg:text-3xl group-hover:text-red-300 transition-colors">
                Updates & Termination
              </h2>
            </div>
            <div class="space-y-4 md:space-y-5 text-sm md:text-base lg:text-lg leading-relaxed">
              <p class="bg-white/5 hover:bg-white/10 p-4 md:p-5 border-l-4 border-red-500/50 rounded-r-xl transition-all duration-300">
                The Service Provider may wish to update the application at some
                point. The application is currently available as per the
                requirements for the operating system (and for any additional
                systems they decide to extend the availability of the
                application to) may change, and you will need to download the
                updates if you want to continue using the application. The
                Service Provider does not guarantee that it will always update
                the application so that it is relevant to you and/or compatible
                with the particular operating system version installed on your
                device. However, you agree to always accept updates to the
                application when offered to you. The Service Provider may also
                wish to cease providing the application and may terminate its
                use at any time without providing termination notice to you.
                Unless they inform you otherwise, upon any termination, (a) the
                rights and licenses granted to you in these terms will end; (b)
                you must cease using the application, and (if necessary) delete
                it from your device.
              </p>
            </div>
          </section>

          <!-- Changes to Terms Section -->
          <section class="group">
            <div class="flex items-center gap-4 mb-6">
              <div class="flex justify-center items-center bg-gradient-to-br from-red-500/20 to-pink-500/20 border-2 border-red-500/40 rounded-2xl w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                <svg class="w-6 h-6 md:w-7 md:h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 class="font-black text-red-400 text-xl md:text-2xl lg:text-3xl group-hover:text-red-300 transition-colors">
                Changes to These Terms and Conditions
              </h2>
            </div>
            <div class="space-y-4 md:space-y-5 text-sm md:text-base lg:text-lg leading-relaxed">
              <p class="bg-white/5 hover:bg-white/10 p-4 md:p-5 border-l-4 border-red-500/50 rounded-r-xl transition-all duration-300">
                The Service Provider may periodically update their Terms and
                Conditions. Therefore, you are advised to review this page
                regularly for any changes. The Service Provider will notify you
                of any changes by posting the new Terms and Conditions on this
                page.
              </p>
              <div class="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm p-4 md:p-5 border-2 border-red-500/40 rounded-xl">
                <p class="flex items-center gap-3 font-bold text-red-300">
                  <svg class="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  These terms and conditions are effective as of 2025-12-06
                </p>
              </div>
            </div>
          </section>

          <!-- Contact Section -->
          <section class="group">
            <div class="flex items-center gap-4 mb-6">
              <div class="flex justify-center items-center bg-gradient-to-br from-red-500/20 to-pink-500/20 border-2 border-red-500/40 rounded-2xl w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                <svg class="w-6 h-6 md:w-7 md:h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 class="font-black text-red-400 text-xl md:text-2xl lg:text-3xl group-hover:text-red-300 transition-colors">
                Contact Us
              </h2>
            </div>
            <div class="bg-white/5 hover:bg-white/10 p-4 md:p-6 border-l-4 border-red-500/50 rounded-r-xl transition-all duration-300">
              <p class="text-sm md:text-base lg:text-lg leading-relaxed">
                If you have any questions or suggestions about the Terms and
                Conditions, please do not hesitate to contact the Service Provider
                at
                <a
                  href="mailto:neksolution.com@gmail.com"
                  class="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold underline transition-colors"
                >
                  <svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  neksolution.com@gmail.com
                </a>
              </p>
            </div>
          </section>
        </div>

        <!-- Back Button -->
        <div class="relative mt-12 md:mt-16 text-center">
          <nuxt-link
            to="/"
            class="group inline-flex items-center gap-3 relative bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 hover:shadow-[0_0_50px_rgba(239,68,68,0.8)] px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-base md:text-lg text-white hover:scale-110 transition-all duration-300 overflow-hidden"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <span class="relative">Back to Home</span>
          </nuxt-link>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer
      class="z-20 relative bg-black/95 px-6 md:px-12 py-12 md:py-16 border-red-500/30 border-t w-full"
    >
      <div class="mx-auto max-w-6xl text-center">
        <h3
          class="bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 mb-6 font-black text-transparent text-2xl md:text-3xl"
        >
          NEKSOLUTION GAMES
        </h3>
        <p class="mb-10 text-white/50 text-xs md:text-sm lg:text-base">
          &copy; 2025 NEKSOLUTION. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "PrivacyPolicyPage",
  head() {
    return {
      title: "Privacy Policy - NEKSOLUTION",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Privacy Policy and Terms & Conditions for NEKSOLUTION games",
        },
      ],
    };
  },
};
</script>

<style scoped>
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

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Smooth Transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
