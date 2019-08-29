import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/goods_list/index.js
Page({

  data: {
    tabs:[
      {id:0,name:"综合",isActive:true},
      {id:1,name:"销量",isActive:false},
      {id:2,name:"价格",isActive:false}
    ],
    // 用于渲染页面的数据
    listPage:[],
  },
  // 接口用的参数
  queryParams:{
    // 搜索的关键字
    query:'',
    // 分类id
    cid:'',
    // 页码
    pagenum:1,
    // 页容量
    pagesize:10

  },
  // 总页数
  totalPage:0,
  handleChangeItem(e){
    console.log(e)
    // 获取传递过来的id
    const {id} = e.detail;
    // 获取tabs数据
    const {tabs} = this.data;
     tabs.forEach((v)=>{
       v.id===id ? v.isActive=true : v.isActive=false;
    })
    this.setData({
      tabs
    })
    
  },
  // 获取列表页面数据
 async getlistPageMessage(){
  //  请求数据
    const result = await request({url: '/goods/search',data: this.queryParams})
      // 获取总页数
      this.totalPage = Math.ceil(result.total/this.queryParams.pagesize)
      // 修改列表数据
      this.setData({
        listPage:[...this.data.listPage,...result.goods]
      })
      console.log("请求成功啦");
      // 请求成功后关闭下拉刷新
      wx.stopPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    // console.log(options)
    this.queryParams.cid= options.cid;
    this.getlistPageMessage()
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
    // console.log("enablePullDownRefresh")
    // 重置当前页
    this.queryParams.pagenum=1;
    // 重新像服务器发送请求 修改data里面渲染页面的值
    this.getlistPageMessage();
    // 请求是异步进行的 所以不能在这里关闭下拉刷新 只有在请求数据回来之后才能进行
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 先判断有没有下一页数据
    if(this.queryParams.pagenum>=this.totalPage){
      // 说明没有下一页额
      console.log("没有下一页了")
      wx.showToast({
        title: '没有下一页了',
        icon:"none"
      })
    }else{
      // console.log("有下一页")
      // 有下一页
      // 让页码自增
      this.queryParams.pagenum++;
      // 重新发起请求 并且让渲染页面的数据进行拼接
      this.getlistPageMessage()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})