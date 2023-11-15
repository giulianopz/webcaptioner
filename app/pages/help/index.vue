<template>
  <div>
    <div class="jumbotron d-flex flex-column justify-content-center rounded-0">
      <div class="container">
        <h1 class="text-center mb-4">
          Web Captioner Help Center
        </h1>

      </div>
    </div>
    <div class="container mt-4 mt-sm-5 pb-5">

      <h2 class="mb-3">Getting Started</h2>
      <article-list :articles="articles.gettingStarted" />

      <h2 class="mb-3">Integrations</h2>
      <article-list :articles="articles.integrations" />

      <h2 class="mb-3">Troubleshooting</h2>
      <article-list :articles="articles.troubleshooting" />

      <h2 class="mb-3">Other Topics</h2>
      <article-list :articles="articles.otherTopics" />
    </div>
  </div>
</template>

<script>
import ArticleList from '~/components/help/ArticleList';

export default {
  layout: 'site',
  components: {
    ArticleList,
  },
  async asyncData({ app, params, res }) {
    try {
      const gettingStarted = await app.$axios.$get(
        '/api/docs/categories/getting-started/articles'
      );

      const integrations = await app.$axios.$get(
        '/api/docs/categories/integrations/articles'
      );

      const troubleshooting = await app.$axios.$get(
        '/api/docs/categories/troubleshooting/articles'
      );

      const otherTopics = await app.$axios.$get(
        '/api/docs/categories/other-topics/articles'
      );
      return {
        articles: {
          gettingStarted,
          integrations,
          troubleshooting,
          otherTopics,
        },
      };
    } catch (error) {
      // if (res) {
      //   res.statusCode = 404; // send 404 back
      //   return { notFound: true };
      // }
      console.log(e)
    }
  },
  data: function () {
    return {
      articles: {
        gettingStarted: [],
        integrations: [],
      },
    };
  },
  computed: {
    query: {
      get() {
        return this.$store.state.help.query;
      },
      set(query) {
        this.$store.state.help.query = query;
      },
    },
  },
  methods: {
    searchFocus() {
      if (this.query) {
        this.$router.replace({
          path: '/help/search',
          query: { query: this.query },
        });
      }
    },
  },
  watch: {
    query() {
      if (this.query) {
        const path = '/help/search';
        if (this.$route.path === path) {
          // We're already on the search page.
          // Do $router.replace instead of .push.
          this.$router.replace({
            path,
            query: { query: this.query },
          });
        } else {
          // Navigate to it for the first time
          this.$router.push({
            path,
            query: { query: this.query },
          });
        }
      }
    },
  },
};
</script>
