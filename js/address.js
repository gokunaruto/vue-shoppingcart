/* sean 2018 3 29*/
new Vue({
    el: '.container',
    data: {
        limitNum: 3,
        addressList: [],
        currentIndex: 0,
        shippingMethod: 1
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList()
        })
    },
    computed: {
        filterAddress: function () {
            return this.addressList.slice(0, this.limitNum) //获取addressList的前三个
        }
    },
    methods: {

        //获取json里的地址信息
        getAddressList: function () {
            this.$http.get('data/address.json').then(reponse => {
                var res = reponse.data;
            if (res.status == "0") {
                this.addressList = res.result;
            }
        })
        },

        //设为默认地址
        setDefault: function (x) {   //点击时参数传入item.addressId
            this.addressList.forEach((item, index) => {
                if(item.addressId == x)
       
            {
                item.isDefault = true;
            }
         else
            {
                item.isDefault = false;
            }
        })
        }

    }
})