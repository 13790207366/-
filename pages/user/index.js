import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
import {
  openSetting, getSetting, chooseAddress,
  showModal, showToast, requestPayment
} from '../../utils/asyncWx.js'
import { request } from "../../request/index.js"
// pages/user/index.js
Page({
  /**
   * 思路:一开始加载个人中心的时候 判断用户是否有登录 也就是判断是否有个人用户信息
   *    1.如果有的话 就渲染页面
   *    2.如果没有的话 跳转到登录页面进行登录
   */
  data:{
    userInfo:{},
    collectInfo:[]
  },
  onShow: function () {
    //获取个人信息
    const userInfo = wx.getStorageSync("userInfo");
    // 判断个人信息是否为空
    if (!userInfo) {
      // 跳转到登录页面获取授权信息
      wx.navigateTo({ url: '/pages/login/index' });
    } else {
      // 获取收藏信息
      const collectInfo =  wx.getStorageSync("collectInfo");
      // 直接把 数据渲染到页面
      this.setData({
        userInfo,collectInfo
      })
    }
  

      
  },
  
})