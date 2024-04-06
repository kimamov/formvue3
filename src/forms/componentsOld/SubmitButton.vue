<script>
import BphButton from "./BphButton.vue";

export default {
  name: "SubmitButton",
  components: {BphButton}
}
</script>

<template>
  <BphButton class="btn--secondary" v-bind="$attrs"/>
</template>
