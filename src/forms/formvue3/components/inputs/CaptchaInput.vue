<script setup lang="ts">

import { FormKitSchemaDefinition, FormKitContext } from "@formkit/core";
import { ref } from 'vue'
import type { Ref } from 'vue'

type CaptchaInputProps = {
  captchaUrl: string;
  width?: number;
  height?: number;
  refreshText?: string;
} & FormKitContext;


const props = defineProps<{
  context: CaptchaInputProps
}>();

const captchaUrl = props.context.captchaUrl;

const isLoading = ref(false);
const error: Ref<string | null> = ref(null);
const imageData: Ref<string | null> = ref(null)


async function loadImageData() {
  isLoading.value = true;
  try {
    const response = await fetch(captchaUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    imageData.value = url;
  } catch (e) {
    error.value = 'Failed to fetch image.';
  } finally {
    isLoading.value = false;
  }
}

async function reloadImageData() {
  if (isLoading.value) return;
  await loadImageData();
}

loadImageData();


console.log(props.context);

</script>

<template>
  <div class="fv-captcha">
    <figure class="captcha__img-wrapper">
      <img v-if="imageData" :src="imageData" :width="props.context?.width" :height="props.context?.height">
    </figure>
    <div v-if="isLoading" class="fv-captcha__loading"></div>
    <button @click="reloadImageData" v-else class="fv-captcha__refresh-button" v-if="props.context?.refreshText">
      {{ props.context?.refreshText }}
    </button>
    <FormKit class="fv-captcha__input" v-bind="props.context" type="text" />
    <p v-if="error" class="fv-captcha__error">{{ error }}</p>
  </div>
</template>