const baseurl='http://192.168.0.8:5200'
export const myRequest=(options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseurl+options.url,
			method:options.method||'GET',
			data:options.data||{},
			success:(res)=>{
				if(res.data.length>0){
					if(res.data[0].type!=='success'){
						return uni.showToast({
							title:'获取数据失败',
							icon:'none'
						})
					}
					resolve(res)
				}
				else{
					resolve(res)
				}
			},
			fail:(err)=>{
				reject(err)
			}
		})
	})
}