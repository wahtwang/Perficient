export default {
  beforeRouteUpdate(to, from, next) {
    if (to.path === '/home/fuzzySearch') {
      this.searchBtn += ' ' + 'search-btn-m-c'
    } else {
      this.searchBtn = 'search-btn search-btn-m'
    }
    if (to.path === '/home/searchReserve') {
      this.isShow += ' ' + 'hide'
    } else {
      this.isShow = ''
    }
    next()
  },
  data() {
    return {
      name: localStorage.getItem('name'),
      isShow: '',
      isCollapse: false,
      asideClass: 'home-aside home-aside-click',
      searchBtn: 'search-btn search-btn-m'
    }
  },
  created() {
    this.closeCollapse()
  },
  computed: {
    equip: {
      get: function() {
        return this.$store.state.fuzzyEquip
      },
      set: function(val) {
        this.$store.state.fuzzyEquip = val
      }
    }
  },
  methods: {
    fuzzySearch() {
      this.$router.push('/home/fuzzySearch')
    },
    searchBtnM() {
      this.$router.push('/home/fuzzySearch')
    },
    outLogin() {
      localStorage.clear()
      this.$router.push('/')
    },
    closeCollapse() {
      if (window.innerWidth >= 768) {
        return
      } else {
        this.isCollapse = true
        this.asideClass = 'home-aside'
      }
    },
    menuBtn() {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse === false) {
        this.asideClass += ' ' + 'home-aside-click'
      } else {
        this.asideClass = 'home-aside'
      }
    }
  }
}
