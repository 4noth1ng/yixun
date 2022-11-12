import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css"
import QS from 'qs'

const requests = axios.create({
    timeout: 5000,
});
requests.defaults.baseURL = 'http://43.138.210.224:9081'
requests.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';



requests.interceptors.request.use((config) => {
    nprogress.start();
    if (config.method === 'get') {
        //  给data赋值以绕过if判断
        config.data = true
    }
    return config
})
requests.interceptors.response.use((res) => {
    nprogress.done();
    return res.data
}, (error) => {
    return Promise.reject(new Error('error'))
})



export function get(url, params) {
    return new Promise((resolve, reject) => {
        requests.get(url, {
                params: params
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    });
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        requests.post(url, QS.stringify(params))
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    });
}

export default requests;