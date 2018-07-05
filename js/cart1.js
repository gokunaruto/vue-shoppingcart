new Vue({
  el: '#app',
  data: {
    productList: [],
    totalMoney: 0,
    checkAll: false,
    delFlag: false,
    curProduct: ''
  },
  mounted () {
    this.$nextTick(function () {
      this.cartView()
    })
  },
    
  filters: {
    money(value, type) {
      return '￥' + value.toFixed(2) + type
    }
  },

  methods:{
    cartView() {
      this.$http.get('../data/cartData.json').then(res => {
        this.productList = res.data.result.list;
      })
    },

    changeNumber(item, way) {
      if( way < 0) {
        item.productQuantity --;
        if(item.productQuantity < 1) {
          item.productQuantity = 1
        }
      }else{
        item.productQuantity ++;     
      }
      this.calcTotalMoney() 
    },

    selectProduct(item) {
      if (typeof item.checked == 'undefined') {
        this.$set(item, 'checked', true)
      }else{
        item.checked = !item.checked
      }
      this.calcTotalMoney() 
    }, 

    checkAllFlag(flag) {
      this.checkAll = flag;
      this.productList.forEach((item, index) => {
        if(typeof item.checked == 'undefined') {
          this.$set(item, 'checked', flag)
        }else{
          item.checked = flag
        }
      });
      this.calcTotalMoney() 
    },

    
    calcTotalMoney() {
      this.totalMoney = 0;
      this.productList.forEach((item, index) => {
        if(item.checked) {
          this.totalMoney += item.productPrice*item.productQuantity
        }
      })
    },

    delConfirm(item) {
      this.delFlag = true;
      this.curProduct = item //声明curProduct属性来保存此时的item
    },

    delProduct() {
      var index = this.productList.indexOf(this.curProduct)
      this.productList.splice(index, 1);
      this.delFlag = false
    }

  }
})

