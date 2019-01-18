const Viewer = {
  props: ['className'],
  template: `
    <div v-bind:class="'viewer ' + (className || '')">
      <slot>
        <h1 class="title--placeholder">Please Click a Link to the Left</h1>
      </slot>
    </div>
  `
};
