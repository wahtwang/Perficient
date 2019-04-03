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
    searchStr: {
      get: function() {
        return this.$store.state.fuzzySearchStr
      },
      set: function(val) {
        this.$store.state.fuzzySearchStr = val
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
      //删除本地session
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
