import request from './request.js'
let getfrilist = async () => {
	let res = request({
		url: '/user/getfriendlist',
		method: 'GET',
	}).then(result => {
		let list = result.data.data.map(item => {
			return {
				name: item.username,
				age: item.id,
				img: item.head_pic
			}
		})
		return list
	})
	return res
	
}
export default getfrilist