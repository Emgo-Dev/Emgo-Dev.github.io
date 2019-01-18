const PostButton = {
  props: {
    text: String,
    href: String
  },
  template: '<li><button v-if="href" v-bind:href="href" v-bind:title="\'Link to \' + text" target="_self">{{ text }}</button><span v-else>{{ text }}</span></li>'
}
