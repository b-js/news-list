<template>
  <div>
    <q-card class="list-item-card">
      <q-card-section class="card-section">
        <div class="list-item-card_row">
          <div class="list-item-card_row-image">
            <q-carousel
              v-if="item.enclosure"
              class="list-item-card_row-image-carousel"
              swipeable
              animated
              v-model="slide"
              :autoplay="true"
              infinite
            >
              <q-carousel-slide v-for="(img, index) in item.enclosure" :key="index" :name="index" :img-src="img._attributes.url"/>
            </q-carousel>
          </div>
          <div class="list-item-card_row-body">
            <div class="text-primary list-item-card_row-body-title">
                <b>
                  <a class="list-item-card_row_link" :href="item.link" target="_blank">{{item.title}}</a>
                </b>
            </div>
            <div class="list-item-card_row-body-description">
              {{item.description}}
            </div>
            <div v-if="$q.screen.width <= 800" class="list-item-card_row-body-link">
              <a :href="item.link" target="_blank">
                Подробнее
              </a>
            </div>
          </div>
        </div>
        <div class="list-item-card_footer">
          <item-card-footer :date="item.date" :source="item.source"/>
        </div>
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
    margin-top: 20px;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    max-height: 190px;
    padding: 0;
    @media (max-width: 800px) {
      max-height: unset;
    }
    &_row {
      &-image {
        width: 25%;
        margin: 30px 30px 35px 30px;
        @media (max-width: 800px) {
          width: auto;
          padding-top: 20px;
          margin: 0;
        }
        &-carousel {
          width: 200px;
          height: 100px;
          @media (max-width: 800px) {
            width: 100%;
            height: 166px;
          }
        }
      }
      &-body {
        width: 75%;
        margin: 30px 28px 27px 0;
        @media (max-width: 800px) {
          width: 100%;
        }
        &-title {
          margin-bottom: 20px;
          height: 44px;
          overflow: hidden;
          font-weight: 700;
          font-size: 18px;
          line-height: 22px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        &-description {
          height: 40px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        &-link {
          margin-top: 20px;
        }
      }
      display: flex;
      @media (max-width: 800px) {
        display: block;
        padding: 0 22px 0 22px;
      }
      &_body {
        padding-top: 16px;
      }
    }
    &_footer {
      height: 28px;
      margin: 0 30px 4px 30px;
      padding: 0;
      background-color: #FCFCFC;
      text-transform: lowercase;
      @media (max-width: 800px) {
        margin: 0 22px 4px 22px;
      }
    }
  }
  .card-section {
    padding: 0;
  }
  .list-item-card:first-of-type {
    @media (max-width: 800px) {
      margin-top: 17px;
    }
  }
</style>
