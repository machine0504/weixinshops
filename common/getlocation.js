	var QQMapWX = require('../common/qqmap-wx-jssdk.js');
	var qqmapsdk;
	const address=()=>{
		return new Promise((resolve,reject)=>{
			qqmapsdk = new QQMapWX({
				key: 'CWUBZ-627RK-ZDIJR-APUZX-IGZQS-PNFWB'
			});
			qqmapsdk.reverseGeocoder({
				success:(res)=>{
					resolve(res)
				},
				fail:(err)=>{
					reject(err)
				}
			})
		})
	}
	export{
		address
	}