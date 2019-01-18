const CodeView = {
  props: ['src', 'className'],
  template: `
    <div :class="'viewer ' + (className || '')">
      <iframe width="100%" height="100%" :src="src"></iframe>
    </div>
  `
};
