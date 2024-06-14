<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">RuoYi Administration System</h3>
      <el-form-item prop="username"> <!-- 폼 요소의 아이템에 세팅할거야 username을, 인풋에 들어온 값을 세팅할거야 v-model에다가 -->
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="Username"
        >
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="Password"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
<!--      <el-form-item prop="code" v-if="captchaEnabled">-->
<!--        <el-input-->
<!--          v-model="loginForm.code"-->
<!--          auto-complete="off"-->
<!--          placeholder="Verification Code"-->
<!--          style="width: 63%"-->
<!--          @keyup.enter.native="handleLogin"-->
<!--        >-->
<!--          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />-->
<!--        </el-input>-->
<!--        <div class="login-code">-->
<!--          <img :src="codeUrl" @click="getCode" class="login-code-img"/>-->
<!--        </div>-->
<!--      </el-form-item>-->
<!--      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">Remember Me</el-checkbox>-->
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">Login</span> <!-- 만약 로딩이 아니면 이걸 표시하고 -->
          <span v-else>Loading...</span> <!-- 만약 로딩이면 이걸 표시하고 -->
        </el-button>
        <div style="float: right;" v-if="register"> <!-- register 값이 있다면 -->
          <router-link class="link-type" :to="'/register'">Register Now</router-link> <!-- 이걸 표시하고 없다면 안 하고 -->
        </div>
      </el-form-item>
    </el-form>
    <!--  Footer  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2024 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import {getCodeImg, login} from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'
import {setToken} from "@/utils/auth";

export default {
  name: "Login", //컴포넌트의 이름 정의
  data() { //컴포넌트의 데이터 정의
    return {
      codeUrl: "",
      loginForm: { //파라미터 값 기본 세팅
        username: "admin",
        password: "admin123",
        captcah: null,
        // rememberMe: false
        // code: "",
        // uuid: ""
      },
      loginRules: { //로그인 규칙
        username: [
          { required: true, trigger: "blur", message: "Please enter your username" } //필수 입력, 사용자가 username 필드에서 다른 필드로 이동할 때, 메세지 띄움
        ],
        password: [
          { required: true, trigger: "blur", message: "Please enter your password" } //필수 입력, 사용자가 password 필드에서 다른 필드로 이동할 때, 메세지 띄움
        ]
        // code: [{ required: true, trigger: "change", message: "Please enter the verification code" }] //필수 입력, 사용자가 code 필드의 값을 변경할 때, 사용자가 값을 입력하지 않고 다른 값을 입력하려 할 때 메세지 띄움
      },
      loading: false,
      // Verification code toggle
      // captchaEnabled: true,
      // Registration toggle
      register: false,
      redirect: undefined
    };
  },
  watch: { //지켜보겠다 (데이터 또는 계산된 속성의 변경을 감시하고, 변경이 발생할 때마다 특정 로직을 실행할 수 있게 해줍니다.)
    $route: { //$route 객체를 (현재 활성화된 라우트 객체로, URL 경로, 매개변수, 쿼리 등 라우팅 관련 정보를 포함합니다.)
      handler: function(route) { // 새로운 route를 인수로 받음, $route가 변경될 때마다 실행됨
        this.redirect = route.query && route.query.redirect; //route.query가 존재하고, route.query.redirect 값이 있으면 이 값을 컴포넌트의 redirect 속성에 할당한다
      },
      immediate: true //옵션은 와처(watcher)가 설정될 때 즉시 핸들러 함수를 한 번 실행하도록 합니다. 즉, 컴포넌트가 마운트될 때 처음으로 이 함수가 실행됩니다.
    }
  },
  // created() { //Vue 인스턴스가 생성될 때 실행되는 라이프사이클 훅입니다.
  //   this.getCode();
  //   this.getCookie();
  // },
  methods: {
    // getCode() { //인증 코드 관련 메서드
    //   getCodeImg().then(res => {
    //     this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
    //     if (this.captchaEnabled) {
    //       this.codeUrl = "data:image/gif;base64," + res.img;
    //       this.loginForm.uuid = res.uuid;
    //     }
    //   });
    // },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = { // 로그인 폼 데이터를 쿠키에서 가져온 값으로 초기화합니다.
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },



    handleTest(){
      var test = {

      }
    },


    handleLogin() {
      // this.$refs.loginForm.validate(valid => { //검사할 것이다
      //   if (valid) {
      //     this.loading = true;
      //     if (this.loginForm.rememberMe) { //rememberMe 체크 했을 때
      //       //set 쿠키 할 때 (이름, 값, date) 형식
      //       Cookies.set("username", this.loginForm.username, { expires: 30 }); //30일이 지나면 username을 만료시킴
      //       Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 }); //30일이 지나면 password을 만료시킴
      //       Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 }); //30일이 지나면 rememberMe을 만료시킴
      //     } else { //rememberMe 체크 안 했을 때
      //       Cookies.remove("username"); //username을 쿠키에서 지우겠다
      //       Cookies.remove("password"); //password를 쿠키에서 지우겠다
      //       Cookies.remove('rememberMe'); //rememberMe를 쿠키에서 지우겠다
      //     }
      //     //store = 쿠키 값에 저장되는 값
      //     this.$store.dispatch("Login", this.loginForm).then(() => { //이 뷰에 스토어에 저장된 값을 가져와 거기에 로그인 한 값이 있으면 로그인 폼으로 던져 (맞나?)
      //       this.$router.push({ path: this.redirect || "/" }).catch(()=>{}); // 이 라우터에 이 리다이렉트 들어온 것, 혹은 루트가 들어왔을 때 잡아서 로그인 폼으로 넣을거야 (맞나?)
      //     }).catch(() => {
      //       this.loading = false;
      //       if (this.captchaEnabled) {
      //         this.getCode();
      //       }
      //     });
      //   }
      // });

      //BIZZAN 소스
      // login(this.loginForm) //login 함수 호출, this.form 인자로 전달
      //   .then(res => { //res = 서버로부터 받은 응답 객체
      //     if (!res.code) { //응답 객체 res의 code 속성이 falsy한 경우 (0, false, undefined 등), 로그인이 성공적으로 처리되었다는 의미입니다. (성공적일시 백단에서 0 줌)
      //       Cookies.set('user', res.data.admin.username, { expires: 7 }); //user라는 이름의 쿠키에 셋 (만료 7일 후)
      //       Cookies.set('userInfo', res.data.admin, { expires: 7 });
      //       setStore("leftSidebarList", res.data.permissions); //setStore 함수를 사용하여 'leftSidebarList'라는 이름의 스토어에 res.data.permissions 값을 저장합니다. 이는 사용자의 왼쪽 사이드바 메뉴 권한을 나타냅니다.
      //       localStorage.setItem("admin-auth-token", res.data.authToken); //브라우저의 localStorage에 'admin-auth-token'이라는 이름으로 사용자의 인증 토큰 (res.data.authToken)을 저장합니다. 이는 사용자가 로그인한 세션을 유지하는 데 사용됩니다.
      //       this.$router.push({ name: "home_index" }); //Vue Router를 사용하여 'home_index'라는 이름의 라우터로 이동합니다. 이동하는 라우터는 사용자가 로그인 후에 보여질 홈 페이지입니다.
      //     } else this.$Message.error(res.message); //만약 서버에서 받은 응답 객체 res의 code가 truthy한 경우 (에러 발생 시), this.$Message.error(res.message)를 호출하여 에러 메시지를 사용자에게 표시합니다.
      //   })
      //   .catch(err => console.log(err)); //login 함수 실행 중 발생한 오류를 콘솔에 출력합니다.


      login(this.loginForm)
        .then(res => {
          console.log("Login response", res);
          if (!res.code) {
            console.log("here");
            // Cookies.set('user', res.data.admin.username, {expires: 7});
            // Cookies.set('userInfo', res.data.admin, {expires: 7});
            // setStore("leftSidebarList", res.data.permission);
            // localStorage.setItem("admin-auth-token", res.data.authToken);
            // router.push({name: "home_index"});
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => console.log(err));


      //원래 소스
      // login(username, password).then(res => {//, code, uuid).then(res => {
      //   setToken(res.token)
      //   commit('SET_TOKEN', res.token)
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })


    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
