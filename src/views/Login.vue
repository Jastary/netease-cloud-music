<template>
  <div class="login">
    <div class="title">Login</div>
    <input type="text" name="phone" class="phone" v-model="phone" placeholder="请输入手机号码">
    <input type="password" name="password" class="password" v-model="password" placeholder="请输入登录密码">
    <van-button class="btn" @click="Login" round type="success">登录</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      password:''
    }
  },

  methods: {
    Login: async function () {
      let res = await this.$store.dispatch('getLogin', { phone: this.phone, password: this.password })
      console.log(res);
      //判断登录之后的状态:登录成功就跳转到个人中心
      if (res.data.code === 200) {
        //跳转之前调用修改用户的登录状态
        this.$store.commit('updateIsLogin', true)
        this.$router.push('/infoUser')
      } else {
        alert('手机或者密码错误，请重新输入')
        this.password = ""
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .login{
    width: 100%;
    height: 13.34rem;
    .title{
      font-size: .5rem;
      font-weight: 700;
      text-align: center;
      margin-top: 2rem;
    }
    .phone,.password{
      height: .6rem;
      margin-top: .8rem;
      margin-left: 25%;
      font-size: .32rem;
    }
    .btn{
      display: block;
      width: 1.6rem;
      margin-top: 1rem;
      font-size: .34rem;
      margin-left: 40%;
    }
  }
</style>