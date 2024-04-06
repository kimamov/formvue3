<script>
export default {
  name: "BphButton",
  props: {
    btnLabel: {
      type: String,
      required: false
    },
    loading: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<template>
  <button class="btn" :class="{'btn--disabled': disabled || loading}" :disabled="disabled || loading">
    <template v-if="loading">
      <div class="bph-loader__wrapper">
        <div class="bph-loader"></div>
      </div>
    </template>
    <template>
      {{btnLabel}}
    </template>
  </button>
</template>

