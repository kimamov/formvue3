<script setup>
import { ref } from 'vue'

const props = defineProps({
  context: Object,
})

const captchaUrl=props.context.captchaUrl;
</script>

<template>
    <figure class="captcha_img-wrapper">
        <img :src="captchaUrl" :width="props.context?.width" :height="props.context?.height">
    </figure>
    <p v-if="props.context?.refreshText">{{ props.context?.refreshText }}</p>
    <!-- <FormKit v-bind="$attrs" type="text" /> -->
</template>