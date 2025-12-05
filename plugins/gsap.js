import Vue from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Note: ScrollSmoother requires GSAP premium/membership
// Using CSS scroll-behavior and native smooth scrolling instead
gsap.registerPlugin(ScrollTrigger)

Vue.prototype.$gsap = gsap
Vue.prototype.$ScrollTrigger = ScrollTrigger
