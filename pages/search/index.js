import regeneratorRuntime from '../../lib/runtime/runtime';
import {openSetting,getSetting,chooseAddress,showModal,showToast,requestPayment} from '../../utils/asyncWx.js'
import {request} from "../../request/index.js"
// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    //存储用于渲染页面的数据 搜索框的返回值
    qsearch:[],
    // 取消按钮显示与隐藏
    isShow:true
  },
  // 定时器
  TimeCount :-1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 输入框事件
 handleInput(e){
  // console.log(e)
  const {value} = e.detail;
  // 去除空字符串 控制合法性
  // 假如value值为空或者空格等 则让搜索显示的列表隐藏 清空输入框 并且让取消按钮隐藏
  // 注意:取消按钮只有在输入框有有效值的时候显示 其他时候隐藏
  if(!value.trim()){
    this.setData({
      qsearch:[],
      value:"",
      isShow:false
    })
    return
  }
  // 如果上面判断没有被执行 也就是输入值符合条件的时候 让取消按钮显示
  this.setData({
    isShow:true
  })
  // 设置定时器
  clearTimeout(this.TimeCount)
 this.TimeCount =  setTimeout(()=>{
  this.getResearch(value)
  },1000)
  //  console.log(this.TimeCount)
   this.setData({
    value:e.detail.value,
  })
  },
  // 获取数值
  async getResearch(value){
     // 请求搜索事件
     const res =await request({url:"/goods/qsearch",data:{query:value}})
     console.log(res)
     this.setData({
      qsearch:res
    })
  },
  // 点击取消按钮清空输入框内容 并且搜索列表清空 隐藏取消按钮
  // 取消按钮点击事件
  handleCancle(){
    this.setData({
      value:"",
      qsearch:[],
      isShow:false
    })
    // console.log("111")
  }
})
