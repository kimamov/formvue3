<script>
import BphButton from "./BphButton.vue";

export default {
  name: "BackButton",
  components: {BphButton}
}
</script>

<template>
  <BphButton class="btn--primary" v-bind="$attrs"/>
</template>
