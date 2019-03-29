export default {
  data() {
    return {
      searchStr: '',
      isCollapse: false,
      asideClass: 'home-aside home-aside-click'
    }
  },
  methods: {
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
