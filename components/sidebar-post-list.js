const SidebarPostList = {
  props: [
    'list',
    'currentPost'
  ],
  methods: {
    isLinkActivePost: function( item ){
      if( item.href ){ console.log(item.href); return this.currentPost === item.href; }
      return false;
    },
    anchorEmitter: function( event, key ){
      console.log(event.target);
      this.$emit('anchor-click', event.target.attributes.href.value );
    },
    anchorChildEmitter: function( event ){
      console.log(event.target, event.target.parentElement);
      this.$emit('anchor-inner-click', event.target.parentElement.attributes.href.value );
    }
  },
  template: `
    <ul class="viewer-nav">
      <li v-for="item of list" :key="item.id" :class="'nav-item' + (isLinkActivePost(item) ? ' active' : '')">
        <span v-if="item.href" class="nav-item__button">
          <a
            :href="item.href"
            :title="'Link to ' + item.text"
            target="_self" class="theme_bd nav-item__link"
            @click.prevent.self="anchorEmitter"
          >
            <span @click="anchorChildEmitter" class="content-spacing">{{ item.text }}</span>
          </a>
        </span>

        <span v-else>{{ item.text }}</span>

        <a
          v-if="item.file"
          :href="item.href"
          :title="'Link to ' + item.text"
          target="_self" class="nav-item__link--download"
        >
          <span>&darr;</span>
        </a>
      </li>
    </ul>
  `
};
