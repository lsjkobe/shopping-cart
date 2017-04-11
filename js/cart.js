/**
 * Created by Leo.li on 2017/4/11.
 */
var vm = new Vue({
    el: "#app",
    data: {
        totalMoney: 0,
        productList: [],
        isSelectAll: false,
        confirmDelete: false,
        curProduct: ''
    },
    //局部过滤器，全局过滤器（Vue.filter）
    filters: {
        //通过过滤器格式化金钱
        formatMoney: function (value) {
            return "￥ " + value.toFixed(2);
        }
    },
    //vue实力创建完成后做的方法
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();
        });
    },
    methods: {
        cartView: function () {
            // var _this = this;
            // axios.get('../data/cartData.json')
            //     .then(
            //         // 使用箭头函数的话，this的作用域并不会变，还是指向vmCart
            //         // 	(retObj)=>{
            //         // 	if(retObj.status == 200){
            //         // 		this.totalMoney = retObj.data.result.totalMoney;
            //         // 		this.list = retObj.data.result.list;
            //         // 	}
            //         // }
            //         // 不使用箭头函数的场合
            //         // 如果要使用vmCart实例，
            //         // 就必须在mounted钩子函数里再调用一次$nextTick方法才能保证el被render在dom中
            //         function (res) {
            //             var data = res.data.result.list;
            //             _this.productList = data;
            //             _this.totalMoney = res.result.totalMoney;
            //         }
            //     )
            //     .catch(function (errorObj) {
            //         // console.log("get data error...");
            //     })

            //ES6语法方式
            let _this = this;
            axios.get('../data/cartData.json').then(res => {
                this.productList = res.data.result.list;
            });
        },
        changeQuentity: function (product, way) {
            if (way > 0) {
                product.productQuentity++;
            } else if (product.productQuentity != 0) {
                product.productQuentity--;
            }
            this.calcTotalPrice();
        },
        selectGood: function (item) {
            if (typeof item.isChecked == 'undefined') {
                // Vue.set(item, "isChecked", true);
                this.$set(item, "isChecked", true);
            } else {
                item.isChecked = !item.isChecked;
            }
            let checkAllFlag = true;
            this.productList.forEach(function (item, index) {
                checkAllFlag = checkAllFlag && item.isChecked;
            });
            this.isSelectAll = checkAllFlag;
            this.calcTotalPrice();
        },
        selectAll: function (flag) {
            this.isSelectAll = flag;
            let _this = this;
            this.productList.forEach(function (value, index) {
                if (typeof value.isChecked == 'undefined') {
                    // Vue.set(value, "isChecked", true);
                    _this.$set(value, "isChecked", _this.isSelectAll);
                } else {
                    value.isChecked = _this.isSelectAll;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function () {
            let _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function (item, index) {
                if (item.isChecked) {
                    _this.totalMoney += item.productPrice * item.productQuentity;
                }
            });
        },
        delConfirm: function (item) {
            this.confirmDelete = true;
            this.curProduct = item;
        },
        delGood: function () {
            let index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.confirmDelete = false;
        }
    }
});
//全局过滤器（Vue.filter）
Vue.filter("formatMoney2", function (value, type) {
    return "￥ " + value.toFixed(2) + type;
})