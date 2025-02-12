<template>
  <div>
    <b-alert variant="danger" dismissible :show="somethingWentWrong">Something went wrong. Please try again.</b-alert>
    <p>
      Automatically save transcripts to Dropbox. Transcripts will be saved as text files in the folder
      <strong>Apps › Web Captioner</strong> in your Dropbox.
    </p>
    <b-alert variant="danger" dismissible :show="showHowToFinishDisconnectMessage">
      To finish disconnecting your Dropbox account,
      <a href="https://www.dropbox.com/account/connected_apps">visit your connected apps in Dropbox</a> and remove Web
      Captioner.
    </b-alert>
    <transition name="fade">
      <div v-if="profileExists">
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3 col-lg-2">
                <fa :icon="['fab', 'dropbox']" size="5x" style="color:#007ee5" />
              </div>
              <div class="col-sm-9 col-lg-10">
                <h4>Connected to Dropbox</h4>
                <p class="mb-0">{{ profile.name }}</p>
                <p class="mb-0">{{ profile.email }}</p>
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <b-button variant="danger" size="sm" class="ml-auto" @click="revokeAuthToken()" :disabled="revoking">
              <fa v-if="revoking" icon="spinner" spin />Disconnect
            </b-button>
          </div>
        </div>
        <h3>Recent Transcripts</h3>
        <b-alert variant="info" :show="reachedFileCountLimit">You have a lot of files in your transcripts folder and you
          might not see all of them here. Go to your Dropbox to see them all.</b-alert>
        <div v-if="loadingTranscripts">
          <fa icon="spinner" spin class="text-muted" size="2x" />
        </div>
        <div v-else-if="transcripts && transcripts.length === 0">
          <b-alert show variant="light">Start captioning and transcripts will automatically be saved to your
            Dropbox.</b-alert>
        </div>
        <b-list-group v-else>
          <b-list-group-item v-for="(transcript, index) in transcripts" :key="index" class="py-0 pr-2"
            :href="'https://www.dropbox.com/home/Apps/Web%20Captioner/Transcripts?preview=' + transcript.name">
            <div class="row">
              <div class="col-6 col-md-6 py-3 font-weight-bold">{{ transcript.name }}</div>
              <div class="d-none d-md-flex col-md-3 text-muted py-3">{{ bytesToString(transcript.size) }}</div>
              <div class="col-6 col-md-3 d-flex">
                <b-button class="ml-auto py-3 px-4 px-sm-3" variant="link"
                  :href="'/api/storage/dropbox/transcripts/' + transcript.name.replace('.txt', '') + '?accessToken=' + accessToken"
                  v-b-tooltip.top title="Save to File">
                  <fa icon="file-alt" />
                </b-button>
                <b-button class="py-3 px-4 px-sm-3" variant="link"
                  :href="'https://www.dropbox.com/home/Apps/Web%20Captioner/Transcripts?preview=' + transcript.name"
                  v-b-tooltip.top title="Open in Dropbox">
                  <fa :icon="['fab', 'dropbox']" />
                </b-button>
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
      <div v-else>
        <b-button size="lg" :disabled="loading" href="/api/storage/dropbox/auth"
          :variant="loading ? 'outline-secondary' : 'secondary'">
          <fa v-if="loading" spin icon="spinner" />
          <fa v-else :icon="['fab', 'dropbox']" />Connect to Dropbox
        </b-button>
      </div>
    </transition>
  </div>
</template>

<script>
const queryString = require('query-string');
const bytesUtility = require('bytes');
import {
  BButton,
  BAlert,
  BListGroup,
  BListGroupItem,
  VBTooltip,
} from 'bootstrap-vue';

export default {
  components: {
    BButton,
    BAlert,
    BListGroup,
    BListGroupItem,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  middleware: ['settings-meta'],
  meta: {
    settingsPageTitle: 'Sync',
  },
  data: function () {
    return {
      loading: true,
      somethingWentWrong: false,
      loadingTranscripts: false,
      reachedFileCountLimit: false,
      revoking: false,
      showHowToFinishDisconnectMessage: false,
      transcripts: null,
      profile: {
        email: null,
        name: null,
        photoUrl: null,
      },
    };
  },
  mounted: function () {
    if (this.$route.query.somethingWentWrong) {
      // Came back from oauth and something went wrong
      this.somethingWentWrong = true;
    }

    // delay allows localStorage state to be restored
    // TODO figure out better way to handle this
    setTimeout(
      () => {
        this.$nextTick(() => {
          if (this.accessToken && this.accountId) {
            this.updateProfile({
              accessToken: this.accessToken,
              accountId: this.accountId,
            });
            this.getTranscripts({
              accessToken: this.accessToken,
            });
          } else {
            this.loading = false;
          }
        });
      },
      this.accountId ? 0 : 1000
    );
  },
  computed: {
    accessToken: {
      get() {
        return this.$store.state.settings.integrations.dropbox.accessToken;
      },
      set(accessToken) {
        this.$store.commit('SET_DROPBOX_ACCESS_TOKEN', { accessToken });
      },
    },
    accountId: {
      get() {
        return this.$store.state.settings.integrations.dropbox.accountId;
      },
      set(accountId) {
        this.$store.commit('SET_DROPBOX_ACCOUNT_ID', { accountId });
      },
    },
    profileExists: function () {
      return this.profile.name && this.profile.email;
    },
  },
  methods: {
    bytesToString: function (bytes) {
      return bytesUtility(bytes, { unitSeparator: ' ' });
    },
    revokeAuthToken: async function () {
      this.$ga.event({
        eventCategory: 'sync-dropbox',
        eventAction: 'disconnect',
      });
      this.revoking = true;
      try {
        await this.$axios.$post('/api/storage/dropbox/auth-revoke', {
          accessToken: this.accessToken,
        });
        this.resetProfile();
        this.accessToken = null;
        this.accountId = null;
        this.revoking = false;
        this.showHowToFinishDisconnectMessage = true;
      } catch (e) { console.log(e) }
    },
    updateProfile: async function ({ accessToken, accountId }) {
      if (!accessToken || !accountId) {
        this.loading = false;
        return;
      }

      try {
        const dropboxProfile = await this.$axios.$get(
          '/api/storage/dropbox/profile',
          {
            params: { accessToken, accountId },
          }
        );

        if (dropboxProfile) {
          this.profile.email = dropboxProfile.email;
          this.profile.name = dropboxProfile.name.display_name;
          this.profile.photoUrl = dropboxProfile.profile_photo_url;
        }
        this.loading = false;
      } catch (e) {
        console.log(e)
        // Unable to get profile
        this.resetProfile();

        this.accessToken = null;
        this.accountId = null;
      }
    },
    getTranscripts: async function ({ accessToken, cursor }) {
      if (!this.accessToken) {
        return;
      }

      this.loadingTranscripts = true;

      let { files, reachedFileCountLimit } = await this.$axios.$get(
        '/api/storage/dropbox/transcripts',
        { params: { accessToken, cursor } }
      ).catch(function (error) {
        console.log(error.toJSON());
      });

      if (files) {
        this.transcripts = files;
        this.loadingTranscripts = false;
        this.reachedFileCountLimit = reachedFileCountLimit;
      }
    },
    resetProfile: function () {
      this.profile.email = null;
      this.profile.name = null;
      this.profile.photoUrl = null;
    },
  },
};
</script>
