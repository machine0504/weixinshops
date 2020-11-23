var previewImg = function(index,imglist) {
	return new Promise((resolve, reject) => {
		uni.previewImage({
			urls: imglist,
			current: index,
			longPressActions: {
				itemList: ['发送给朋友', '保存图片', '收藏']
			}
		}).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
export {
	previewImg
}
