const LinkView = {
  props: ['list'],
  template: `
    <nav>
      <ul>
        <slot>
          <link-item v-for="item of list" :key="item.id" :file="item.file" :text="item.text" :href="item.href"></link-item>
        </slot>
      </ul>
    </nav>
  `,
  components: {
    'LinkItem': typeof LinkItem !== 'undefined' ? LinkItem : (logError('LinkItem is undefined.'), {}),
  }
};
