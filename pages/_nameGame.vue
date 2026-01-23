<template>
  <div class="flex justify-center items-center bg-white min-h-screen">
    <div class="text-center">
      <h1 class="font-bold text-black text-4xl">{{ gameName }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GamePage',
  data() {
    return {
      gameName: ''
    }
  },
  mounted() {
    // Get game name from route params
    this.gameName = this.$route.params.nameGame || 'Unknown Game';
    
    // Redirect to app-ads.txt after a short delay
    setTimeout(() => {
      this.redirectToAppAds();
    }, 1000);
  },
  methods: {
    redirectToAppAds() {
      const appAdsUrl = `/${this.gameName}/app-ads.txt`;
      window.location.href = appAdsUrl;
    }
  }
}
</script>

<style scoped>
</style>