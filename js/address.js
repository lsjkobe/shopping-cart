/**
 * Created by Leo.li on 2017/4/11.
 */
new Vue({
    el:'.container',
    data:{
        addressIndex:0,
        limitNum:3,
        addressList:[],
        currentDefaultAddress:{},
        shippingMethod:1
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed:{
        filterAddress: function () {
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods:{
        getAddressList: function () {
            axios.get("../data/address.json").then(resp=>{
                if(resp.status == "200"){
                    this.addressList = resp.data.result;
                    this.addressList.forEach(address=>{
                        if(address.isDefault){
                            this.currentDefaultAddress = address;
                        }
                    });
                }
            });
        },
        setDefaultAddress: function (address) {
            this.currentDefaultAddress.isDefault = false;
            this.currentDefaultAddress = address;
            address.isDefault = true;
        }
    }
});