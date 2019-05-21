export default {
  beforeRouteUpdate(to, from, next) {
    let timer = setInterval(() => {
      if (this.$refs.main.$el.scrollTop > 50) {
        this.$refs.main.$el.scrollTop -= 50
      } else {
        this.$refs.main.$el.scrollTop = 0
        clearInterval(timer)
      }
    }, 5)
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
    console.log(this)
  },
  computed: {
    equip: {
      get: function() {
        return this.$store.state.fuzzyEquip
      },
      set: function(val) {
        this.$store.state.fuzzyEquip = val
      }
    },
    name: {
      get: function() {
        this.$store.state.change
        return localStorage.getItem('name')
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
      this.$confirm('确定退出登录?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '登出成功'
        })
        this.$store.state.fuzzyEquip = ''
        localStorage.clear()
        this.$router.push('/')
      })
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
