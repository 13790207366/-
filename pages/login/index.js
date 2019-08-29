// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 登录事件
  getuserinfo(e){
    console.log(e)
    // 获取用户信息
    const {userInfo} =e.detail;
    // 将用户信息存储本地
    wx.setStorageSync("userInfo", userInfo);
    // 从哪里来回哪里去
      wx.navigateBack({
        delta: 1
      });
  }
})