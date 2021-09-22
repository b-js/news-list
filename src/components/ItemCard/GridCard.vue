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
        Подробнее
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
    min-height: 256px;
    margin-top: 20px;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    &_title {
      padding: 0;
      height: 66px;
      margin: 30px 30px 25px 30px;
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      &_link {
        text-decoration: none;
      }
    }
    &_body {
      margin: 0 30px 27px 30px;
      padding: 0;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    &_link {
      height: 20px;
      margin: 0 30px 20px 30px;
      padding: 0;
    }
    &_footer {
      height: 20px;
      margin: 4px 30px 4px 30px;
      padding: 0;
      background-color: #FCFCFC;
      text-transform: lowercase;
    }
  }
</style>
