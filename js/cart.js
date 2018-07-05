/* sean 2018 3 29*/

 new Vue({
    el:'#app',
    data:{
        productList:[],
        totalMoney:0,
        checkAllFlag:false,
        delFlag:false,
        curProduct:''
    },
   filters: {
      money: function (value) {
        return '$' + value.toFixed(2)
   }
},
    mounted: function () {
        this.$nextTick(function () {
            this.cartView()
        })
    },
    methods:{

        //先获取接口的List赋值给productList
        cartView: function () {
          
            this.$http.get('data/cartData.json').then(res => {  //vue-resource插件的方法
                this.productList = res.data.result.list;
                // this.totalMoney = res.data.result.totalMoney
            })
        },

        // 商品数量的+ —
        changeMoney: function (item,way) {
            if(way < 0) {
                item.productQuantity++
            }else{
                item.productQuantity--;
                if(item.productQuantity < 1) {
                    item.productQuantity = 1;
                }

            }
            this.totalPrice()
        },

        //商品的单选按钮
        selectedProduct: function (item) {
            if(typeof item.checked == 'undefined') {
                //Vue.set(item,'checked',true);//注入checked:true  然后class的check属性就为true了
                this.$set(item,'checked',true)
            }else{
                item.checked = !item.checked //取反 false
            }
            this.totalPrice()
        },

        //商品的全选，取消全选按钮
        checkAll: function (flag) {
            this.checkAllFlag = flag;


                this.productList.forEach( (item,index) => {
                    if(typeof item.checked == 'undefined') {

                    this.$set(item,'checked',this.checkAllFlag)
                }else{
                    item.checked = this.checkAllFlag;
                }
                })

            this.totalPrice()
        },

        //总金额
        totalPrice: function () {
            this.totalMoney = 0;
            this.productList.forEach( (item,index) => {
                if(item.checked) {
                    this.totalMoney += item.productPrice*item.productQuantity
            }
            })
        },
        
        //删除功能，
        delConfirm: function (item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        //删除商品
        delProduct: function () {
            var index = this.productList.indexOf(this.curProduct);//获取此商品index
            this.productList.splice(index,1);//删除此商品
            this.delFlag = false
        }
    }
});
//全局过滤器
// Vue.filter('money',function (value,type) {
//     return '￥' + value.toFixed(2) + type
// })