<template>
    <div class="main-app__header row">
      <div class="main-app__header_title col-md-8 col-12">
        <div class="main-app__header_title-label">
          Список новостей
        </div>
        <div class="main-app__header_title-refresh">
          <q-btn @click="refresh" flat dense size="md" class="q-pa-sm main-app__header_title-button" text-color="primary">
            <svg width="20" height="20" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.29973 0.0524773C10.3583 -0.0731896 11.3802 0.0315329 12.3247 0.316378C15.4638 1.26307 17.7722 4.233 17.8129 7.75586H19.8649C19.9789 7.75586 20.04 7.90247 19.9708 7.99882L16.8684 12.3427C16.8155 12.4139 16.7096 12.4139 16.6607 12.3427L13.5584 8.00301C13.4892 7.90247 13.5502 7.76005 13.6642 7.76005H15.7121C15.6755 5.44359 14.2871 3.46643 12.3247 2.61608C11.5838 2.29354 10.7654 2.13017 9.90636 2.17625C8.72566 2.23908 7.63861 2.69567 6.7592 3.41616C6.29099 3.80154 5.607 3.70939 5.25279 3.21091C4.91487 2.73756 5.00851 2.07572 5.45636 1.71128C6.53934 0.819046 7.85846 0.224222 9.29973 0.0524773ZM13.2408 12.594C12.3655 13.3187 11.2743 13.7753 10.0936 13.834C9.23051 13.88 8.41217 13.7125 7.67525 13.3941C5.71285 12.5438 4.32045 10.5666 4.28788 8.25015H6.33577C6.44977 8.25015 6.51084 8.10354 6.44163 8.0072L3.33925 3.66331C3.28632 3.5921 3.18047 3.5921 3.13161 3.66331L0.0292317 8.00301C-0.0399815 8.10354 0.0210892 8.24596 0.135087 8.24596H2.18705C2.2237 11.7688 4.53216 14.7429 7.67525 15.6854C8.61981 15.9703 9.64172 16.0708 10.7003 15.9493C12.1415 15.7818 13.4607 15.187 14.5436 14.2947C14.9915 13.9261 15.0851 13.2685 14.7472 12.7951C14.393 12.3008 13.709 12.2087 13.2408 12.594Z" fill="#0029FF"/>
            </svg>
          </q-btn>
        </div>
      </div>
      <div class="main-app__header_filter col-md-4 col-12">
        <slot name="filter"/>
      </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

class Props {
}

export default class HeaderComponent extends Vue.with(Props) {
  refresh() {
    this.$emit('refresh');
  }
}
</script>
<style lang="scss">
  .main-app {
    &__header {
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      width: 100%;
      &_title {
        display: flex;
        align-content: center;
        align-items: center;
        &-button {
          background-color: #FFFFFF;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
          border-radius: 20px;
        }
        &-label {
          margin: 0 0 0 0;
          font-size: 1.8em;
          font-weight: bold;
          width: 80%;
          @media (min-width: 1024px) {
            width: 50%;
                      font-size: 2.5em;
          }
        }
        &-refresh {
          width: 20%;
                      text-align: right;
          @media (min-width: 1024px) {
            text-align: left;
            width: 50%;
          }
        }
      }
      &_filter {
          background-color: #FFFFFF;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
          border-radius: 3px;
          height: 25px;
          margin-top: 15px;
          &_icon {
            opacity: 0.5;
            cursor: pointer;
          }
        }
    }
    &__separator {
      margin: 25px 0 20px 0;
    }
  }
</style>
