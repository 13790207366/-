// 打开授权信息
export const openSetting = ()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
}
// 获取授权信息

export const getSetting = ()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
        });
          
    })
}
// 获取用户地址信息
export const chooseAddress = ()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
}
// 调取用户提示框
/**
 * 
 * promise形式的wx.showModal对话框
 * @param {object} param0 要 传递的参数
 */
export const showModal = ({content})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content: content,
            success: (result) => {
                resolve(result)
            },
        });
    })
}


/**
 * 
 * promise形式的wx.showToast对话框
 * @param {object} param0 要 传递的参数
 */
export const showToast = ({title})=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title: title,
            icon: 'none',
            success: (result) => {
                resolve(result)
    },
    fail: (err) => {
        reject(err)
    }
        });
    })
}
/**
 * 
 * promise形式的wx.login
 *
 */
export const login = ()=>{
    return new Promise((resolve,reject)=>{
        wx.login({
            timeout:10000,
            success: (result) => {
                resolve(result)
            },
    fail: (err) => {
        reject(err)
    }
        });
    })
}

/**
 * 
 * promise形式的wx.payment
 *@param {object} param0 要 传递的参数
 */
export const requestPayment = (pay)=>{
    return new Promise((resolve,reject)=>{
        wx.requestPayment({
            ...pay,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
}


  