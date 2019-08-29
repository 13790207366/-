import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime'
// pages/goods_detail/index.js
Page({
/**
   * 页面的初始数据
   */
  data: {
    DetailInfo:{
    },
    // 商品收藏
  collectInfo:[],
  // 是否收藏
  isCollect:false
  },
  // 商品数据
  goodsInfo:{},
  
  // 请求详情页面数据
  async getDetailInfo(goods_id){
    // 发送请求 向服务器请求对应id的详情页 这里要带id过去
    const result = await request({url:"/goods/detail",data:{goods_id:goods_id}})   
    this.setData({
      DetailInfo:{
        goods_name:result.goods_name,
        goods_price:result.goods_price,
        goods_introduce:result.goods_introduce,
       pics:result.pics,
      }
    })
    this.goodsInfo = result;
    console.log(this.goodsInfo);
  },
  // 点击轮播图放大预览
  zoomPreview(e){
    // 获取所点击的轮播图索引
    const {index} = e.currentTarget.dataset;
    // 获取轮播图链接列表 API方法所需
    const urls =  this.data.DetailInfo.pics.map((v)=>{return v.pics_big})
    // 拿到当前索引所对应的大图 API方法所需
    const current = urls[index];
    // console.log(urls);
    // 用微信的预览图片的API方法实现
    wx.previewImage({
      current,
      urls
    })
    // console.log(e);
    
  },
  // 购物车点击事件
  getCartNum(){
    // 思路 把购物车数量存进本地存储
    // {商品id:商品信息，商品id:商品信息...}
    // 本地存储的名字叫：cart 
    // 判断本地存储中是否有 如果有就修改num数量
    //如果没有 则把数据存进去
    // wx.getStorageSync("cart", cart)||{};


    // 获取本地存储数据 对象.属性
    const cart = wx.getStorageSync("cart")||{};
    // 存储数据 存储前判断是否已经添加过该商品
      if(cart[this.goodsInfo.goods_id]){
        // 如果有该商品
        // 让num自增
        cart[this.goodsInfo.goods_id].num++;
      }else{
        // 如果没有该商品
        //把goods_id从goodsInfo中结构出来放进cart本地存储里面
        //cart[this.goodsInfo.goods_id]相当于cart.goods_id
        cart[this.goodsInfo.goods_id]=this.goodsInfo;
        // 并且添加一个num计数器 初始值是1 代表添加了一次
        cart[this.goodsInfo.goods_id].num = 1;
        //  添加单选框选中状态
        cart[this.goodsInfo.goods_id].checked = true;
      }
      // 把数据存储到本地存储里面去
      wx.setStorageSync("cart", cart);
        console.log(this.goodsInfo)
      // console.log(cart[this.goodsInfo.goods_id]);
      // 提示给用户
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        mask:true
      })
      
  },
  handleCollect(){
    // 获取本地存储中的数据
   let collect =  wx.getStorageSync("collectInfo")||[];
  const index =  collect.findIndex((v)=>v.goods_id===this.goodsInfo.goods_id)
  console.log(index)
    if(index===-1){
    // 修改isCollect
    this.setData({
      isCollect:true,
      
    })
    // 把数据填进空数组
    collect.push(this.goodsInfo)
    // 提示用户添加成功
      wx.showToast({
        title: '添加成功',
        icon: 'none',
        mask: true,
      });
    }else{
      this.setData({
        isCollect:false
      })
      // 提示用户添加成功
       wx.showToast({
        title: '取消成功',
        icon: 'none',
        mask: true,
      });
      collect.splice(index,1)
    }
    // 把数据存进本地存储 
    wx.setStorageSync("collectInfo", collect);
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetailInfo(options.goods_id)
  //  console.log(options)
  },

})