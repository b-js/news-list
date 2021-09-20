<template>
  <q-card class="grid-item-card">
    <q-card-section class="grid-item-card_title text-primary text-bold">
      <b>
        <a class="grid-item-card_title_link" :href="item.link" target="_blank">{{item.title}}</a>
      </b>
    </q-card-section>
    <q-card-section class="grid-item-card_body">{{item.description}}</q-card-section>
    <q-card-section class="grid-item-card_link">
      <a :href="item.link" target="_blank">
        Подробнее...
      </a>
    </q-card-section>
    <q-card-section class="grid-item-card_footer">
      <item-card-footer :date="item.date" :source="item.source"/>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Vue, prop, Options } from 'vue-class-component';
import { RssFrameItem } from 'src/models/RssFrame';
import ItemCardFooter from 'src/components/ItemCard/ItemCardFooter.vue';

class Props {
  readonly item = prop<RssFrameItem>({ required: true });
  readonly label = prop<string>({ required: true });
}
@Options({
  components: {
    ItemCardFooter,
  },
})
export default class ListCard extends Vue.with(Props) {
}
</script>
<style lang="scss">
.grid-item-card {
  height: 100%;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    &_title {
      height: 20%;
      &_link {
        text-decoration: none;
      }
    }
    &_body {
      overflow: hidden; height: 60%
    }
    &_link {
      height: 10%;
    }
    &_footer {
      height: 10%;
    }
  }
</style>
