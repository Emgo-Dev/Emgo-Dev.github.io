const PostLink = {
  props: {
    text: String,
    href: String
  },
  methods: {
    bubble: function( event ){ event.preventDefault(); console.log(event.target); },
    loadPost: function( event ){
      event.preventDefault();

      const href = event.target.attributes.href ? event.target.attributes.href : event.target.parentElement.attributes.href;
      const Viewer = document.querySelector('#ajaxContent');

      $.ajax({ type: 'GET', dataType: 'html', url: href.value, success: function( result ){
        /* On the remote server, result is HTML String, on local server, is an XMLDocument. */
        Viewer.classList.remove('code-viewer');
        Viewer.classList.add('post-viewer');
        Viewer.innerHTML = '';
        Viewer.innerHTML = result;
      }});
    }
  },
  template: '<li class="nav-item"><span class="nav-item__button"><a v-if="href" v-on:click.capture="loadPost" v-bind:href="href" v-bind:title="\'Link to \' + text" target="_self" class="nav-item__link"><span v-on:click="loadPost">{{ text }}</span></a><span v-else>{{ text }}</span></span></li>'
}
