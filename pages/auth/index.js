import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import {login} from '../../utils/asyncWx.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取授权信息
 async handleGetUserInfo(e){
  //  获取请求所必备的元素encryptedData	,rawData, iv, signature
    const{encryptedData,rawData,iv,signature}= e.detail;
    const {code} =await login();
    const obj = {encryptedData,rawData,iv,signature,code}
    // 发起请求
    const {token} = await  request({url:'/users/wxlogin',method:'post',data:obj})
    // 把token值存到缓存中
    wx.setStorageSync("token", token);
    // 从哪里来 回那里去
    wx.navigateBack({
    delta: 1
    });
  }
})