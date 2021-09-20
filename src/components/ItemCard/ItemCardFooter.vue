<template>
  <div>
    <div class="item-card-footer">
      <div>{{source}}</div>
      <q-space/>
      <div>{{date}}</div>
    </div>
</div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component';

class Props {
  readonly source = prop<string>({ required: true });
  readonly date = prop<string>({ required: true });
}

export default class ItemCardFooter extends Vue.with(Props) {
}
</script>
<style lang="scss">
  .item-card-footer {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      height: 20%;
      opacity: 0.5;
    }
</style>
