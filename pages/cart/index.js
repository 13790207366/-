import regeneratorRuntime from '../../lib/runtime/runtime';
import {openSetting,getSetting,chooseAddress,showModal,showToast} from '../../utils/asyncWx.js'

// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存储地址信息
    addressInfo:{},
    // 存储购物车数据
    cart:{},
    // 总价格
    totalPrice:0,
    // 总数量
    totalNumber:0,
    // 全选状态
    isAllChecked:true,
    // 购物车内有没有商品
    hasgoods:true,

  },
  // 点击获取收货地址信息
 async addAdressInfo(){
  //  判断当前地址信息的三种状态
  const userInfo = await getSetting();
   // 当scope为空或者等于true时
   if(userInfo.authSetting["scope.address"]===undefined||userInfo.authSetting["scope.address"]===true){
      // 直接获取地址
   }else{
      // v 打开授权页面
      await openSetting();
   }
   //由于上面不管执行哪一个 都会直接调用获取地址的方法 所以统一写在这里
   const res1 =await chooseAddress();
   //给本地存储的购物车对象添加一个最详细的地址键值对
   res1.all = res1.provinceName+res1.cityName+res1.countyName+res1.detailInfo;
  
  // console.log(res1)
   //把购物车数据存进本地存储
    wx.setStorageSync("address",res1);
   //在这里 我直接把存进去的取出来用
   const addressInfo =  wx.getStorageSync("address");
   //直接给在data中定义好的对象赋值
   this.setData({
    addressInfo
   })
  },
  onShow: function(){
   const cart =  wx.getStorageSync("cart");
   this.setCart(cart)
    this.setData({cart})
  },
  // 这个函数里面有修改总数量 总价格和checked状态的方法
  setCart(cart){
    // console.log(cart)
    // 获取总价格和总数量 总数据
    let totalPrice = 0;
    let totalNumber = 0;
    // 遍历总数据
    // 首先把对象里面的所有键值对的值提取出来组成数组
    let arr = Object.values(cart);
     // 获取全选状态
     let isAllChecked = true;
   arr.forEach((v)=>{
      if(v.checked){
        // 求取总价格和总数量
        totalPrice += v.goods_price * v.num;
        totalNumber += v.num;
      }else{
        //如果v.checked有没被选中的 就让全选按钮变为false
        isAllChecked=false;
      }
    })
    // 这一步是判断购物车是否有商品 如果没有就让全选框为false
    isAllChecked = arr.length===0 ? false:isAllChecked;
     // 判断购物车是否为空
     let hasgoods = this.data.hasgoods;
     hasgoods = arr.length===0? false:true;
    // 修改渲染页面的数据
    this.setData({totalPrice,totalNumber,isAllChecked,cart,hasgoods})
    // 修改本地存储数据
    wx.setStorageSync("cart", cart);
      
    // console.log(cart)
   
  },
  // 复选框change事件
  handleChangeChecked(e){
    // console.log(e)
//获取被改变的状态的id
    const {id} = e.currentTarget.dataset;
// 获取data里面的cart对象
const {cart } = this.data;
//被改变的值取反
cart[id].checked = !cart[id].checked;
// 调用setcart函数
this.setCart(cart);
 },
  // 全选框change事件
  handleAllChecked(){
    // 获取data里面的cart对象
let {cart,isAllChecked } = this.data;
// 取反
isAllChecked = !isAllChecked;
//遍历cart 对每个商品的选中状态进行修改
for (const key in cart) {
  if (cart.hasOwnProperty(key)) {
    //当全选框改变的时候 让复选框跟着改变
    cart[key].checked = isAllChecked; 
  }
}
    // 再次调用setcart
    this.setCart(cart);
  },
  // 商品数量加减点击事件
 async handleChangeNum(e ){
    
    const {id,operation}= e.currentTarget.dataset;
    const {cart} = this.data;
    // 判断数量是不是等于1
    if(cart[id].num===1&&operation===-1){
      // 提示用户是否删除
      const res = await showModal({content:"请问你是否确定要删除？"});
      if(res.confirm){
        // 用户确定删除
        delete(cart[id]);
        this.setCart(cart);
      }else{
        console.log({content:"您已经取消删除"});
      }
     
    }else{
        // 修改数量
        cart[id].num += operation;
        this.setCart(cart)
    }
   
    
  },
  // 点击结算
  handleSubmit(){
    // console.log("跳转成功");
    // 获取地址信息和购物车信息
    const{addressInfo,totalNumber} = this.data;
    // 判断地址是否为空
    if(!addressInfo.all){
      // 假如没有 提示用户地址为空
      showToast({title:"地址为空 请填写相关信息"})
     return false
    }
     // 判断勾选商品是否为空
    //  首先得获取所有被勾选的商品 也就是totalNumber值是否大于0
    else if(totalNumber<=0){
      // 勾选的商品为0 提示用户没有商品 请用户选购商品
      showToast({title:"您没有选择需要购买的商品"})
      return false
    }
    wx.navigateTo({
      url: '/pages/pay/index',
      success: (result) => {
        console.log(result)
      }
    });
  }
})