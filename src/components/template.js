import SysUser from './sys/SysUser'
import Goods from './goods/goods'
import GoodsType from './goods/goodsType'
import Order from './goods/order'
// import Test from './Test'
export default {
    tabs: function(){
        return {
		  '/goods/type': {
		    content:GoodsType,
		    title:'商品类型',
		    name:'/goods/type'
		  },'/goods/goods': {
		    content:Goods,
		    title:'商品登记',
		    name:'/goods/goods'
		  },'/goods/order': {
		    content:Order,
		    title:'订单信息',
		    name:'/goods/order'
		  },'/sys/user': {
		    content:SysUser,
		    title:'用户管理',
		    name:'/sys/user'
		  }
    	}
    }
}
