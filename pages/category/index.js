import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/category/index.js
// 在发送请求之前 先判断一下有没有缓存数据
// 假如没有数据  1.直接发送新的请求 获取数据 2.把新的数据存入到缓存中
//    要存入的数据的格式 key="cates" {time:存入的时间，data:接口返回值}
// 有缓存数据 则判断缓存数据是否过期
// 1.数据已经过期了 重新发送新的请求去拿新的数据
// 2.数据没有过期 此时 才使用缓存数据！！！

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryLeft:[],
    categoryRight:[],
    currentData:0,
    // 右侧滚动条的位置
    scrollTop:0
  },
  // 用于暂时存储右边列表数据 没必要的数据别放进data里面 会影响加载速度
  dates:[],
  // 获取分类页面
 async goodsCategory(){
  const result = await  request({url:'/categories'})
    // 把数据存进本地存储
    wx.setStorageSync('cates', {time:Date.now(),data:result});
      // 获取左边数据
      this.dates = result;
      console.log(this.dates);
      const categoryLeft = this.dates.map((v)=>{
        return {cat_id:v.cat_id,cat_name:v.cat_name}
      })
      // 获取右边数据
      const categoryRight = this.dates[0].children;
      // 把数据填进需要渲染的页面
    this.setData({
      categoryLeft,
      categoryRight
    })
  },
  // 添加页面
  handleTap(e){
    console.log(e)
    const { index } = e.currentTarget.dataset;
    let categoryRight = this.dates[index].children;
    this.setData({
      currentData:index,
      categoryRight,
      scrollTop:0,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从本地拿取缓存数据
    const  cates = wx.getStorageSync('cates');
    // 判断cates是否为空字符串
    if(!cates){
      // 假如没有缓存数据 则发送请求
      this.goodsCategory();
      // 并且把请求回来的数据存进本地存储
    }else{
      // 假如有缓存数据 判断缓存数据是否过期
      if(Date.now()-cates.time>1000*10){
        // 过期了 重新发送请求
        this.goodsCategory();
      }else{
        // 把数据存进this.dates里面
        this.dates = cates.data;
        // 遍历数组 获取右边数据
        const categoryLeft = this.dates.map((v)=>{
          return {cat_id:v.cat_id,cat_name:v.cat_name}
        })
         // 获取右边数据
      const categoryRight = this.dates[0].children;
        this.setData({
          categoryLeft,
          categoryRight
        })
      }
    }
    
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})