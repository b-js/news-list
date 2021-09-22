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
    <div class="main-app_tabs row">
      <q-tabs no-caps indicator-color="transparent" v-model="target_source" shrink stretch dense active-color="black">
        <q-tab class="text-primary main-app_tabs_tab"
               name="all">
          <template v-slot:default>
            <b>Все</b>
          </template>
        </q-tab>
        <q-tab
          v-for="(data_source, index) in data_sources_array"
          :key="index"
          class="text-primary main-app_tabs_tab"
          :name="data_source.label"
        >
          <template v-slot:default>
            <b>{{data_source.label}}</b>
          </template>
        </q-tab>
      </q-tabs>
      <q-space/>
      <div>
        <q-btn flat dense size="11px" @click="view = 'grid'" icon="fas fa-th-large" :style="{ color: view === 'grid' ? '#0029FF' : '#C4C4C4'}"></q-btn>
        <q-btn flat dense size="11px" @click="view = 'list'" :style="{ color: view === 'list' ? '#0029FF' : '#C4C4C4'}">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="18" height="8" :fill="view === 'list' ? '#0029FF' : '#C4C4C4'"/>
            <rect y="10" width="18" height="8" :fill="view === 'list' ? '#0029FF' : '#C4C4C4'"/>
          </svg>
        </q-btn>
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
  target_source: string = 'Lenta.ru';
  view: View = View.LIST;
  pagination: Record<string, number> = {};
  source_urls: ISource[] = [
    {
      label: 'Mos.ru',
      url: 'https://www.mos.ru/rss',
    },
    {
      label: 'Lenta.ru',
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
    margin: 0 auto 0 auto;
    position: relative;
    max-width: 1060px;
    width: 100%;
    display: flex;
    flex-direction: column;
    @media (max-width: 1080px) {
          padding: 0 23px 0 20px;

    }
    &_tabs {
      font-size: 14px;
      height: 18px;
      text-transform: capitalize;
      @media (max-width: 360px) {
        font-size: 0.8em;
      }
        &_tab {
          @media (max-width: 360px) {
            padding: 0 8px;
          }
      }
    }
    &_content {
      transition: opacity .5s;
      padding-top: 8px;
      flex: 1;
      &_tab_panels {
        background-color: #FBFBFB;
        &_panel {
          padding: 0;
        }
      }
      &_pagination {
        padding-top: 50px;
        padding-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .grid-view {
    // height: 90%;
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
    flex-basis: calc(50% - 10px);
    max-height: calc(50% - 20px);
    // max-height: calc(50% - 24px);
    flex-direction: column;
    justify-content: space-between;
    @media (max-width: 800px) {
      flex-basis: calc(100% - 20px);
      // height: auto;
    }
  }
  // .list-card {
  //   // height: 33%;
  // }
  .q-tabs--dense .q-tab {
    min-height: 16px;
    height: 16px;
    padding: 0 8px 0 0;
}
.q-panel > div {
    height: auto;
    // width: 100%;
}
.main-app .q-tab__content {
  min-width: auto;
}
.main-app_tabs .self-stretch {
  align-self: unset;
}
</style>
