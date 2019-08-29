import regeneratorRuntime from '../../lib/runtime/runtime';
import {openSetting,getSetting,chooseAddress,showModal,showToast,requestPayment} from '../../utils/asyncWx.js'
import {request} from "../../request/index.js"
// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
        {id:0,name:"全部",isActive:true},
        {id:1,name:"待付款",isActive:false},
        {id:2,name:"待发货",isActive:false},
        {id:3,name:"退款/退货",isActive:false},
    ],
    historyOrder:[],
    type:1
  },
  
  handleChangeItem(e){
    // 获取传递过来的id
    const {id} = e.detail;
    this.changeTitleByIndex(id)
    const type = id+1;
   this.getOrderList(type)
  },
// 根据索引修改标题
changeTitleByIndex(id){
  // 获取tabs数据
  const {tabs} = this.data;
  tabs.forEach((v)=>{
    v.id===id ? v.isActive=true : v.isActive=false;
 })
 this.setData({
   tabs
 })
},
  onShow() {
    // 获取type
    let currentPages =  getCurrentPages();
    let currentPage = currentPages[currentPages.length - 1];
    const {type }= currentPage.options;
    this.getOrderList(type)
  // 根据索引跳到对应的标题
   let index = type-1;
   this.changeTitleByIndex(index)

  },
  // 获取订单数组
 async getOrderList(type){
  // 获取token
const token =   wx.getStorageSync("token");
// 判断是否有token值 如果没有 让它跳转到授权页面
if(!token){ wx.navigateTo({ url: '/pages/auth/index' }); }
  // 发起请求获取历史订单数据
  const {orders} =await request({url:"/my/orders/all",header:{Authorization:token},data:{type}})
  // 在这里 我先把所获取的日期时间转换成人类看得懂的格式
  orders.forEach((v)=>{ v.sureTime = (new Date(v.create_time*1000)).toLocaleString(); })
  // 存
  this.setData({ historyOrder:orders  })
},
})