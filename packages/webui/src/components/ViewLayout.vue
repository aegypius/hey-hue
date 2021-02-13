<template>
  <main>
    <ViewHeader :title="title" />
    <ViewContent>
      <slot />
    </ViewContent>
  </main>
</template>

<script>
import ViewHeader from '@/components/ViewHeader'
import ViewContent from '@/components/ViewContent'

export default {
  components: {
    ViewHeader,
    ViewContent
  },
  props: {
    title: {
      type: String
    }
  }
}
</script>
