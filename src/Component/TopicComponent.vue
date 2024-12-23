<template>
    <span class="topic">主题:</span>
    <span class="topic-content">{{ topic }}</span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TopicComponent',
  props: {
    topic: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>

<style scoped>
</style>
