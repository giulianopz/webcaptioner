<template>
  <div class="settings-about-view" v-once>
    <div class="card bg-primary">
      <div class="card-body">
        <div class="row">
          <div class="col-3 col-sm-4 col-md-3 mb-3 mb-sm-0">
            <img src="/static/img/logo-inverse.svg" class="img-responsive">
          </div>
          <div class="col-sm-8 col-md-9">
            <div class="d-flex align-items-center h-100">
              <div>
                <h3>{{ $t('app.webCaptioner') }}</h3>
                <p class="lead mb-2">{{ $t('app.description') }}</p>
                <!--  <p class="mb-0 small">
                  <a href="/">{{ $t('settings.about.learnMore') }}</a> &middot;
                  <a href="/help">{{ $t('navbar.menu.helpCenter') }}</a>
                  <span class="d-none d-md-inline">&middot;</span>
                  <br class="d-md-none">
                  <a href="/blog">{{ $t('navbar.menu.blog') }}</a> &middot;
                  <a href="/donate">{{ $t('navbar.menu.donate') }}</a>
                </p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="my-4">

    <!--     <h2>{{ $t('settings.about.whatsNew') }}</h2>
    <whats-new /> -->

    Hi,
    <br><br>
    This is a stripped-down version of the original web service created by <a href="https://curtgrimes.com/">Curt
      Grimes</a> who stopped maintaining Web Captioner on October 31, 2023, generously donating its source code to the
    community.
    <br><br>
    I resumed this app to offer its most useful feature: a simple interface to the Web Speech API of Google Chrome for
    translating speech to text for free, optionally saving the transcript to a file.
    <br>
    This single feature is essential for many people, especially those who are deaf or hard of hearing
    because they have no other way to access precious contents on the web unless paying some expensive CART or
    Speech-to-Text services.
    <br><br>
    Any other features is temporarily disabled and I have no plans to restore them.
    <br><br>
    I'm not a JS person, so your help is more than welcome here.
    If you can, please consider contributing to the project hosted on <a
      href="https://github.com/giulianopz/webcaptioner">GitHub</a>.
    <br><br>
    > <a href="https://github.com/giulianopz">giulianopz</a>
  </div>
</template>


<!-- <script>
import whatsNew from '~/components/WhatsNew.vue';

export default {
  middleware: ['settings-meta'],
  meta: {
    settingsPageTitleKey: 'settings.about.about',
  },
  components: {
    whatsNew,
  },
};
</script> -->
