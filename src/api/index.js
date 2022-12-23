import http from './http.js'
import md5 from 'js-md5'

export function login(account,psw) {
    return http.post('user/login', {
        loginName:account,
        passwordMd5:md5(psw)
    }).then(res => {
        return res
    })
}

export function register(account, psw) {
    return http.post('user/register', {
        loginName: account,
        password: psw
    }).then(res => {
        return res
    })
}

export function homeData() {
    return http.get('/index-infos').then(res => {
        return res
    })
}