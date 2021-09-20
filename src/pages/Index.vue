<template xmlns:template="http://www.w3.org/1999/html">
  <q-page class="main-app">
    <header-component @refresh="refresh">
      <template v-slot:filter>
        <q-input
          v-model="filter_value"
          borderless dense model-value=""
          bg-color="white"
        >
          <template v-slot:append>
            <q-icon v-if="filter_value !== ''" name="close" @click="filter_value = ''" class="main-app__header_filter_icon" />
            <q-icon name="search" size="md" class="main-app__header_filter_icon"/>
          </template>
        </q-input>
      </template>
    </header-component>
    <q-separator class="main-app__separator"/>
    <div class="main-app__tabs row">
      <q-tabs indicator-color="transparent" v-model="target_source" shrink stretch dense active-color="black">
        <q-tab class="text-primary"
               name="all">
          <template v-slot:default>
            <b>Все</b>
          </template>
        </q-tab>
        <q-tab
          v-for="(data_source, index) in data_sources_array"
          :key="index"
          class="text-primary"
          :name="data_source.label"
        >
          <template v-slot:default>
            <b>{{data_source.label}}</b>
          </template>
        </q-tab>
      </q-tabs>
      <q-space/>
      <div>
        <q-btn-toggle
          v-model="view"
          model-value="list"
          flat
          dense
          color="grey"
          toggle-color="primary"
          :options="[
          {icon: 'fas fa-th-large', value: 'grid'},
          {icon: 'fas fa-th-list', value: 'list'},
        ]"></q-btn-toggle>
      </div>
    </div>
    <div class="main-app_content row">
      <q-tab-panels
      animated
      keep-alive
      v-if="!loading"
      class="col-12 main-app_content_tab_panels" v-model="target_source">
        <q-tab-panel class="main-app_content_tab_panels_panel"
                    :key="'all'" name="all">
          <rss-content :rss-frame="all" :view="view" :filter="filter_value"/>
        </q-tab-panel>
        <q-tab-panel class="main-app_content_tab_panels_panel"
                    v-for="(rssFrame, index) in data_sources_array" :key="index"
                     :name="rssFrame.label">
          <rss-content
            :rss-frame="rssFrame"
            :view="view"
            :filter="filter_value"
          />
        </q-tab-panel>
      </q-tab-panels>
      <q-inner-loading :showing="loading">
        <q-spinner-bars
          color="primary"
          size="4em"
        />
      </q-inner-loading>
    </div>
  </q-page>
</template>

<script lang="ts">
import RssContent from 'components/RssContent.vue';
import HeaderComponent from 'components/HeaderComponent.vue';
import { Options, Vue } from 'vue-class-component';
import { getData } from 'src/api/sources';
import RssFrame, { RssDataAll } from 'src/models/RssFrame';
import { ISource } from 'src/models/Sources';
import { View } from 'src/models/types';

  @Options({
    components: {
      HeaderComponent, RssContent,
    },
  })
export default class PageIndex extends Vue {
  filter_value: string = '';
  loading = true;
  target_source: string = 'lenta.ru';
  view: View = View.GRID;
  pagination: Record<string, number> = {};
  source_urls: ISource[] = [
    {
      label: 'mos.ru',
      url: 'https://www.mos.ru/rss',
    },
    {
      label: 'lenta.ru',
      url: 'https://lenta.ru/rss/news',
    },
  ]
  data_sources_array: RssFrame[] = [];

  async refresh() {
    await this.init();
  }
  async init() {
    this.loading = true;
    this.data_sources_array = await Promise.all(this.source_urls.map((source) => new RssFrame().init(source, getData)));
    this.pagination = this.data_sources_array.reduce((acc:Record<string, number>, dsa) => {
      acc[dsa.label] = 1;
      return acc;
    }, {});
    this.loading = false;
  }
  get all() {
    return new RssDataAll(this.data_sources_array.flatMap((dsa) => dsa.items));
  }
  async mounted() {
    await this.init();
  }
}
</script>
<style lang="scss">
  .main-app {
    padding: 5px 10px;
    margin: 0 auto 0 auto;
    position: relative;
    max-width: 1020px;
    width: 100%;
    display: flex;
    flex-direction: column;
    &_content {
      transition: opacity .5s;
      padding-top: 24px;
      flex: 1;
      &_tab_panels {
        background-color: #FBFBFB;
        &_panel {
          padding: 2px;
        }
      }
    }
  }

  .grid-view {
    height: 90%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    @media (max-width: 800px) {
      justify-content: center;
      height: auto;
    }
  }

  .grid-view > div {
    display: flex;
    flex-basis: calc(50% - 12px);
    max-height: calc(50% - 24px);
    // max-height: calc(50% - 24px);
    flex-direction: column;
    justify-content: space-between;
    @media (max-width: 800px) {
      flex-basis: calc(100% - 20px);
      // height: auto;
    }
  }
  .list-card {
    height: 33%;
  }
</style>
