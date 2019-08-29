import regeneratorRuntime from '../../lib/runtime/runtime';
import {openSetting,getSetting,chooseAddress,showModal,showToast,requestPayment} from '../../utils/asyncWx.js'
import {request} from "../../request/index.js"
// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存储购物车数据
    cart:{},
    // 总价格
    totalPrice:0,
    // 总数量
    totalNumber:0,
  },
  onShow: function(){
   const cart =  wx.getStorageSync("cart");
    // 获取总价格和总数量 总数据
    let totalPrice = 0;
    let totalNumber = 0;
    // 遍历总数据
    // 首先把对象里面的所有键值对的值提取出来组成数组
    let arr = Object.values(cart);
   arr.forEach((v)=>{
      if(v.checked){
        // 求取总价格和总数量
        totalPrice += v.goods_price * v.num;
        totalNumber += v.num;
      }else{
        delete(cart[v.goods_id]);
      }
    })
    // 修改渲染页面的数据
    this.setData({totalPrice,totalNumber,cart})
    console.log(totalPrice,totalNumber,cart)
  },
//  点击支付
 async handleGetOrder(){
   try{
       // 判断用户有没有获取用户权限
    //  获取本地存储的token值
    const token = wx.getStorageSync("token");
      
    if(!token){
      // 跳转页面到获取权限的页面
      wx.navigateTo({
        url: '/pages/auth/index',
      });
        
    }else{
      //假如有token值
      // 请求头
      const header = {Authorization:token}
      // 总价格
      const{cart} = this.data;
      const order_price = this.data.totalPrice;
      //收货地址
      const{all} = wx.getStorageSync("address");
      const consignee_addr = all;
      // 订单数组
      let goods = [];
      for (const key in cart) {
        if (cart.hasOwnProperty(key)) {
          goods.push({
            goods_id:cart[key].goods_id,
            goods_number:cart[key].num,
          goods_price:cart[key].goods_price
          })
          
        }
      }
      // 把数据封装成一个对象
      const orderParams  = {order_price,consignee_addr,goods}
      // console.log(orderParams)
      // 发起请求
      const {order_number} = await request({url:"/my/orders/create",method:"post",header:header,data:orderParams})
      // console.log(order_number)
      // 获取支付参数
      const {pay} = await request({url:"/my/orders/req_unifiedorder",method:"post",header:header,data:{order_number}})
      // console.log(pay)
      // 发起微信支付
      await requestPayment(pay);
      // 查看订单支付状态
      const res = await request({url:"/my/orders/chkOrder",header:header,data:{order_number}})
      console.log(res);
      // 提醒用户支付成功
     await showToast({title:"支付成功"});
      // 支付成功后直接跳转到订单详情页面
      wx.navigateTo({url: '/pages/order/index'});
        
      
    }
   }catch(error){
    //  发送异步请求 把error发送到我们的服务器来分析统计错误
    await  showToast({title:"支付失败"})
   }
  }
})