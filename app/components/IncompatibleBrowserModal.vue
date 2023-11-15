<template>
  <b-modal ref="modal" :title="$t('incompatibleBrowser.incompatibleBrowser')" no-close-on-esc no-close-on-backdrop>
    <p>
      <i18n path="incompatibleBrowser.message.i0" tag="span">
        <template v-slot:webSpeechAPI>
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API" target="_blank"
            class="text-secondary">{{
              $t(
                'incompatibleBrowser.message.webSpeechAPI'
              )
            }}</a>
        </template>
      </i18n>
    </p>
    <p>
      <i18n path="incompatibleBrowser.message.i1" tag="span">
        <template v-slot:switchToGoogleChrome>
          <strong>{{
            $t('incompatibleBrowser.message.switchToGoogleChrome')
          }}</strong>
        </template>
      </i18n>
    </p>
  </b-modal>
</template>

<script>
import { BButton, BModal } from 'bootstrap-vue';

export default {
  components: {
    BButton,
    BModal,
  },
  methods: {
    showModal() {
      this.$refs.modal.show();
    },
    hideModal() {
      this.$refs.modal.hide();
      this.$store.commit('SET_INCOMPATIBLE_BROWSER_MODAL_INVISIBLE');
    },
  },
};
</script>
