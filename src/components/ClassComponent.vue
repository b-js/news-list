<template>
  <div>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component';

class Props {
  readonly filter_value = prop<string>({ required: true });
}

export default class Header extends Vue.with(Props) {
}
</script>
