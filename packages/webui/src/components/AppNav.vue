<template lang="html">
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
              <FontAwesomeIcon size="2x" icon="lightbulb" :style="{ color: 'white' }"/>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline">
              <router-link :key="`${route.name}-desktop`" v-for="route of routes" :to="route.path" v-slot="{ href, navigate, route, isActive, isExactActive }">
                <a :href="href" @click="navigate" :class="isExactActive ? 'text-white bg-gray-900': 'text-gray-300 hover:text-white hover:bg-gray-700'" class="px-3 py-2 rounded-md text-sm font-medium capitalize focus:outline-none focus:text-white focus:bg-gray-700 mr-4">{{ route.name }}</a>
              </router-link>
            </div>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white" @click="visible = !visible">
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <svg class="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Menu open: "block", Menu closed: "hidden" -->
            <svg class="hidden h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!--
      Mobile menu, toggle classes based on menu state.

      Open: "block", closed: "hidden"
    -->
    <div :class="visible ? 'block' : 'hidden'" class="md:hidden">
      <div class="px-2 pt-2 pb-3 sm:px-3">
        <router-link :key="`${route.name}-mobile`" v-for="route of routes" :to="route.path" v-slot="{ href, navigate, route, isActive, isExactActive }">
          <a :href="href" @click="navigate" :class="isExactActive ? 'text-white bg-gray-900': 'text-gray-300 hover:text-white hover:bg-gray-700'" class="block mb-1 px-3 py-2 rounded-md text-base font-medium capitalize focus:outline-none focus:text-white focus:bg-gray-700">{{ route.name }}</a>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  computed: {
    routes () {
      return this.$router.options.routes
    }
  }
}
</script>
