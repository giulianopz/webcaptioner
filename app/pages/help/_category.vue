<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'site',
  head() {
    return {
      title: `${this.categoryName} - Web Captioner Help`,
    };
  },
  data: function () {
    return {
      categoryName: '',
      categoryUrl: '',
      articles: [],
    };
  },
  async asyncData({ app, params, error }) {
    try {
      const { name: categoryName, url: categoryUrl } = await app.$axios.$get(
        '/api/docs/categories/' + params.category
      );
      const articles = await app.$axios.$get(
        '/api/docs/categories/' + params.category + '/articles'
      );
      return { categoryName, categoryUrl, articles };
    } catch (e) {
      console.log(e)
      error({
        statusCode: e.response.status,
        message: e.response.data,
        header: 'Help Center',
      });
    }
  },
};
</script>
