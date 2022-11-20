	'use strict';
	const crypto = require('crypto')
	exports.main = async (event, context) => {
		let body = JSON.parse(event.body)
		const res = await uniCloud.getPhoneNumber({
			appid: '__UNI__CED274C', 
			provider: 'univerify',
			apiKey: '012b693a0fd4a7419f8a5889129be9be',
			apiSecret: '1602a2b89ddb9f43cb0e5c613a4577bb',
			access_token: body.access_token,
			openid: body.openid
		})
		const result = await uniCloud.httpclient.request('https://g520m13575.xicp.fun/api/phonelogin', {
		    method: 'POST',
		    data: {
		      cell_phone: res.phoneNumber
		    },
		    contentType: 'json',
		    dataType: 'json'
		  })
		return {
			code: 0,
			message: '获取手机号成功',
			data:result.data
		}
	};
