const CodeLink = {
  props: {
    text: String,
    href: String,
    file: String
  },
  methods: {
    loadCode: function( event ){
      event.preventDefault();

console.log('query');

      let ele = document.querySelector('#ajaxContent');
      let frame = document.createElement('iframe');
      frame.setAttribute('width', '100%');
      frame.setAttribute('height', '100%');
      frame.setAttribute('src', (event.target.attributes.href ?
        event.target.attributes.href :
        event.target.parentElement.attributes.href
      ).value);

      ele.classList.remove('post-viewer');
      ele.classList.add('code-viewer');
      ele.innerHTML = '';
      ele.append(frame);
    }
  },
  template: '<li class="nav-item"><span class="nav-item__button"><a v-if="href" v-bind:href="href" v-bind:title="\'Link to \' + text" v-on:click.capture="loadCode" target="_self" class="nav-item__link"><span v-on:click="loadCode">{{ text }}</span></a><span v-else>{{ text }}</span><a v-if="file" :href="file" :title="\'Link to \' + text" target="_self" class="nav-item__link--download"><span>&darr;</span></a></span></li>'
}
