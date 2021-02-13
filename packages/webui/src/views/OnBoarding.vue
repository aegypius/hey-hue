<template>
  <ViewLayout title="Welcome !">
    <center>
        <img src="/img/hue-bridge.jpg">
    </center>
    <ol>
      <li>Display a graphic of the Bridge</li>
      <li>Ask for user to press the button of the bridge</li>
      <li>Get token</li>
      <li>Set onboarding complete</li>
    </ol>
  </ViewLayout>
</template>

<script>
import ViewLayout from '@/components/ViewLayout'

export default {
  components: {
    ViewLayout
  }
}
</script>
