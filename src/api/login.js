import request from '@/utils/request'

// 로그인 방법
export function login(username, password, code, uuid) { //로그인 function을 export 하겠다
  const data = { //데이터 username, password, code, uuid를 던지면
    username,
    password,
    code,
    uuid
  }
  return request({ //요청할 것이다
    url: '/login', //이 url로
    headers: {
      isToken: false,
      repeatSubmit: false
    },
    method: 'post', //post 형식으로
    data: data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}
