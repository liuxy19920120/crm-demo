<template>
  <Row>
      <div id="wrap" ref="wrap" :style="{height:layoutHeight+'px'}">
        <Col span="6" id="login">
            <h3 class='loginTitle'>
                <Icon type="log-in"></Icon>
                登录
            </h3>
            <Card>
                <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="user">
                        <Input type="text" v-model="formInline.user" placeholder="用户名">
                            <Icon type="ios-person" slot="prepend" size="14"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="密码">
                            <Icon type="ios-locked" slot="prepend" size="14"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" class="fr" @click="login('formInline')">登录</Button>
                        <Button class="fr" style="margin-right:10px;" @click="registerShow = true">注册</Button>
                    </FormItem>
                </Form>
            </Card>
        </Col>
      </div>
      <register-modal :registerShow="registerShow" @registerShowChange="registerShow= false"></register-modal>
  </Row>
</template>

<script>
import registerModal from '@/components/register'
import Cookies from 'js-cookie'
export default {
  components: {
    registerModal
  },
  data () {
    return {
      layoutHeight:document.documentElement.clientHeight,
      registerShow: false,
      formInline: {
        user: 'admin',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.$refs.wrap.style.height = this.$store.state.clientHeight + 'px'
  },
  methods: {
    login (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          Cookies.set('user',this.formInline.user)
          Cookies.set('password',this.formInline.password)
          this.$router.push('/main/clientShow')
          localStorage.tabIndex = '01-3'
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    }
  }

}
</script>

<style>
  #wrap{
      width: 100%;
      background: url('../assets/images/login_bg.jpg') no-repeat center;
      background-size: cover;
      position: relative;
  }
  #login{
      position: absolute;
      right: 100px;
      top:200px;
      background:#fff;
  }
  .loginTitle{
      line-height: 20px;
      font-size: 14px;
      font-weight: bold;
      margin: 10px;
  }
</style>
