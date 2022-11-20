const baseconfig = {
	baseurl: 'https://g520m13575.xicp.fun',
	timeout: 50000
}
function request(config) {
	return new Promise((resolve,resject) => {
		config = inter_request(config) 
		let {url, method = 'GET', data, header} = config
		uni.request({
			url: baseconfig.baseurl + url,
			method,
			data,
			header,
			timeout: baseconfig.timeout,
			success: (result) => {
				resolve(result)
			},
			fail: (err) => {
				resject(err)
			}
		})
	})
}


function inter_request(config) {
	let token = uni.getStorageSync('token')
	config.header = {
		'Authorization': token
	}	
	return config
}
export default request