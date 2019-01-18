const Viewer = {
  props: ['className'],
  template: `
    <div v-bind:class="'viewer ' + (className || '')">
      <slot></slot>
    </div>
  `
};
