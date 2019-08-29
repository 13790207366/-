// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:0,name:"商品收藏",isActive:true},
      {id:1,name:"品牌收藏",isActive:false},
      {id:2,name:"店铺收藏",isActive:false},
      {id:3,name:"浏览足迹",isActive:false},
  ],
  // 存储本地获取的收藏信息
  collectInfo:[]
  },
  onShow :function(){
  let collectInfo =  wx.getStorageSync("collectInfo");
  this.setData({
    collectInfo
  })
  console.log(collectInfo)


      
  }
})