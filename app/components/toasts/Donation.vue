<template>
  <toast title="Support Web Captioner" :show="$store.state.donation.message.show">
    <p>I hope you've been enjoying Web Captioner!</p>
    <p>
      If you've found it helpful, please consider contributing to the <a
        href="https://github.com/giulianopz/webcaptioner">project</a>.
    </p>
  </toast>
</template>

<script>
import toast from '~/components/Toast.vue';

import { BButton } from 'bootstrap-vue';

export default {
  components: {
    toast,
    BButton,
  },
};
</script>
