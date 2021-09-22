<template>
  <div style="height: 100%">
    <div v-if="is_grid" class="grid-view">
      <grid-card
        class="grid-card"
        v-for="(item, index) in items_visible"
        :label="item.source" :item="item"
        :key="index"/>
    </div>
    <div v-if="is_list" class="list-view">
      <list-card
        class="list-card"
        v-for="(item, index) in items_visible" :label="item.source" :item="item" :key="index"/>
    </div>
    <div class="main-app_content_pagination">
      <q-pagination
        :value="pagination"
        @update:model-value="updatePagination"
        active-color="primary"
        color="black"
        :flat="true"
        dense
        :max="Math.ceil(items_filtered.length / this.items_limit[this.view])"
        :max-pages="6"
        boundary-numbers
        :model-value="pagination"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import RssFrame from 'src/models/RssFrame';
import { View } from 'src/models/types';
import ListCard from 'src/components/ItemCard/ListCard.vue';
import GridCard from 'src/components/ItemCard/GridCard.vue';

class Props {
  readonly rssFrame = prop<RssFrame>({ type: Object, required: true });
  readonly view = prop<View>({ required: true });
  filter!: string;
}
@Options({
  components: {
    ListCard, GridCard,
  },
})
export default class RssContent extends Vue.with(Props) {
  pagination = 1;
  items_limit: Record<string, number> = {
    list: 3,
    grid: 4,
  }
  @Watch('filter')
  dropPagination() {
    this.pagination = 1;
  }
  get is_list() {
    return this.view === View.LIST;
  }
  get is_grid() {
    return this.view === View.GRID;
  }
  get items_filtered() {
    return this.rssFrame.items.filter((item) => {
      if (this.filter) {
        return `${item.description}${item.title}`.toLowerCase().includes(this.filter.toLowerCase());
      }
      return item;
    });
  }
  get items_visible() {
    return this.items_filtered
      .slice(((this.pagination - 1) * this.items_limit[this.view]), ((this.pagination - 1) * this.items_limit[this.view]) + this.items_limit[this.view]);
  }
  checkItems(page: number) {
    return this.rssFrame.items.length <= page * this.items_limit[this.view] + (this.items_limit[this.view] * 2);
  }
  async updatePagination(page: number) {
    if (this.checkItems(page)) await this.rssFrame.nextPage();
    this.pagination = page;
  }
}
</script>
<style lang="scss">
  .q-pagination > .q-btn.q-btn--standard:first-of-type {
    background: none !important;
    color: #0029FF !important;
  }
  .q-pagination > .q-btn.q-btn--standard:first-of-type::before {
    box-shadow: none !important;
  }
  .q-pagination > .q-btn {
    font-weight: 700;
    font-size: 18px;
  }
  .q-pagination > div > .q-btn {
    font-weight: 700;
    font-size: 18px;
  }
</style>
