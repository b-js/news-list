<template>
  <div>
    <q-card class="list-item-card">
      <q-card-section class="list-item-card_row row">
        <div class="col-sm-3 col-12">
          <q-carousel
            v-if="item.enclosure"
            class="q-pa-sm list-item-card_row_carousel"
            swipeable
            animated
            v-model="slide"
            :autoplay="true"
            infinite
          >
            <q-carousel-slide v-for="(img, index) in item.enclosure" :key="index" :name="index" :img-src="img._attributes.url"/>
          </q-carousel>
        </div>
        <div class="col-sm-9 col-12">
          <div class="q-pa-sm">
            <div class="text-primary">
              <b>
                <a class="list-item-card_row_link" :href="item.link" target="_blank">{{item.title}}</a>
              </b>
            </div>
            <div class="list-item-card_row_body">
              {{item.description}}
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <item-card-footer :date="item.date" :source="item.source"/>
      </q-card-section>
    </q-card>
  </div>
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
  slide = 0;
}
</script>
<style lang="scss">
  .list-item-card {
    background-color: #FFFFFF;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    &_row {
      height: 80%;
      max-height: 80%;
      padding: 16px 16px;
      &_carousel {
        max-height: 150px;
      }
      &_link {
        height: 10%;
      }
      &_body {
        padding-top: 16px;
      }
    }
  }
</style>
