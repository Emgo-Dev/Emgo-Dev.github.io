const SidebarCodeList = {
  props: ['list'],
  template: `
    <ul class="viewer-nav">
      <li v-for="item of list" :key="item.id" class="nav-item">
        <span v-if="item.href" class="nav-item__button">
          <a
            :href="item.href"
            :title="'Link to ' + item.text"
            target="_self" class="theme_bd nav-item__link"
          >
            <span class="content-spacing">{{ item.text }}</span>
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
