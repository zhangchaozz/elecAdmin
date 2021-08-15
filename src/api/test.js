import request from '@/utils/request'

export function test(data) {
	return request({
		//url:"/test",
		url: "http://127.0.0.1:5000/test",
		method: "get"
	})
}