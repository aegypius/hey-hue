<template>
  <div id="app">
    <AppNav v-if="onBoardingComplete" />
    <OnBoarding v-if="!onBoardingComplete" />
    <router-view v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppNav from '@/components/AppNav'
import OnBoarding from '@/views/OnBoarding'

export default {
  components: {
    AppNav,
    OnBoarding
  },
  computed: {
    ...mapState(['onBoardingComplete'])
  }

}
</script>

<style>
@import 'assets/tailwind.css';
</style>
