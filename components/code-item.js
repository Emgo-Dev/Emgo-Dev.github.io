const CodeItem = {
  props: [
    'src'
  ],
  methods: {
  },
  template: `
    <li class="nav-item">
      <span class="nav-item__frame">
        <iframe :src="src"></iframe>
      </span>
    </li>
  `
}
