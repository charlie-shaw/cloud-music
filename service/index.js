const TIME_OUT = 60000
const BASE_URL = 'https://service-4hzfxqhu-1312031959.gz.apigw.tencentcs.com/release'


class Request{
	constructor(BASE_URL=''){
		this.BASE_URL = BASE_URL
	}
	request(options) {
		const {url} = options
		return new Promise((resolve, reject) => {
			uni.request({
				...options,
				url: this.BASE_URL + url,
				timeout: TIME_OUT,
				success(res) {
					resolve(res.data)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	}
	
	get(options) {
		return this.request({...options,method:"GET"})
	}
	
	post(options) {
		return this.request({...options,method:"POST"})
	}
}
export default new Request(BASE_URL)

