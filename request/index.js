 // 设定请求次数 应该在请求之前设置请求次数为0
 let requestCount = 0;
export const request = (params)=>{
    // 公共接口前缀
    // console.log(params)
    //  让请求次数加1
    requestCount++;
    // console.log(requestCount);
    const baseUrl = 'https://api.zbztb.cn/api/public/v1';
    // 请求开始时给一个加载中的按钮
    wx.showLoading({
        title: '加载中',
      });
    //    console.log(requestCount)
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete:()=>{
                // 让请求次数减一
                requestCount--;
                // 假如requestCount===0 则让加载中显示
                if(requestCount===0){
                    console.log(requestCount)
                    wx.hideLoading();
                }
            }
        });
    })
}

  