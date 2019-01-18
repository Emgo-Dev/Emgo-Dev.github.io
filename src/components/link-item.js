const LinkItem = {
  props: [
    'text',
    'href',
    'file'
  ],
  methods: {
    anchorEmitter: function( event, key ){
      console.log(event.target);
      this.$emit('anchor-click', event.target.attributes.href.value );
    },
    anchorChildEmitter: function( event ){
      console.log(event.target, event.target.parentElement);
      this.$emit('anchor-inner-click', event.target.parentElement.attributes.href.value );
    },
    emitter: function( name, data ){
      this.$emit(name, data);
    }
  },
  template: `
    <li class="nav-item">
      <span class="nav-item__button">
        <a
            v-if="href"
            v-bind:href="href"
            v-bind:title="\'Link to \' + text"
            target="_self" class="nav-item__link"
            @click.prevent.self="anchorEmitter">
          <span @click="anchorChildEmitter">{{ text }}</span>
        </a>

        <span v-else>{{ text }}</span>

        <a v-if="file" :href="file" :title="\'Link to \' + text" target="_self" class="nav-item__link--download"><span>&darr;</span></a>
      </span>
    </li>
  `
}
