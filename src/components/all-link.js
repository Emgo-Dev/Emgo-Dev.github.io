const AllLink = {
  props: {
    text: String,
    href: String,
    file: String
  },
  template: '<li><a v-if="href" v-bind:href="href" v-bind:title="\'Link to \' + text" target="_self">{{ text }}</a><span v-else>{{ text }}</span> <a v-if="file" :href="file" :title="\'Link to \' + text" target="_self">Download Project</a></li>'
}
