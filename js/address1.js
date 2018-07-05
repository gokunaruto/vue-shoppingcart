new Vue({
  el: '.container',
  data: {
    addressList: [],
    limitNum: 3,
    currentIndex: 0,
    shippingMethod: 1
  },
  mounted() {
    this.$nextTick(function () {
      this.getAddress()
    })
  },

  computed: {
   filterAddress() {
      return this.addressList.slice(0, this.limitNum)
    }
  },

  methods: {

    getAddress() {
      this.$http.get('data/address.json').then(res => {
        
          this.addressList = res.data.result
        
      })
    },


  }

})