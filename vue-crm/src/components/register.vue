<template>
  <Modal
        v-model="modalShowFlag"
        class-name="vertical-center-modal"
        @on-ok="registerHandel"
        @on-cancel="registerCancelHandel"
        >
        <h2 class="registerTitle">
            <Icon type="android-exit"></Icon>
            欢迎注册
        </h2>
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="60">
            <FormItem label="用户名" prop="userName">
                <Input type="text" v-model="formCustom.userName"></Input>
            </FormItem>
            <FormItem label="邮箱" prop="email">
                <Input type="text" v-model="formCustom.email"></Input>
            </FormItem>
            <FormItem label="密码" prop="passwd">
                <Input type="password" v-model="formCustom.passwd"></Input>
            </FormItem>
            <FormItem label="确认密码" prop="passwdCheck">
                <Input type="password" v-model="formCustom.passwdCheck"></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button @click="registerCancelHandel">取消</Button>
            <Button type="primary" @click="registerHandel">注册</Button>
        </div>
  </Modal>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    const validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入密码'))
        } else if(value.length < 6){
            callback(new Error('密码长度不能小于6位'))
        } else{
            if (this.formCustom.passwdCheck !== '') {
                // 对第二个密码框单独验证
                this.$refs.formCustom.validateField('passwdCheck')
            }
            callback()
        }
    }
    const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'))
        } else if (value !== this.formCustom.passwd) {
            callback(new Error('两次输入密码不一致!'))
        } else {
            callback()
        }
    }
    const validateAge = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('年龄不能为空'));
        }
        // 模拟异步验证效果
        setTimeout(() => {
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'))
            } else {
                if (value < 18) {
                    callback(new Error('必须年满18岁'))
                } else {
                    callback()
                }
            }
        }, 1000)
    }
    return {
        formCustom: {
            passwd: '',
            passwdCheck: '',
            userName: '',
            email:''
        },
        ruleCustom: {
            passwd: [
                { validator: validatePass, trigger: 'blur' }
            ],
            passwdCheck: [
                { validator: validatePassCheck, trigger: 'blur' }
            ],
            email: [
                { required: true, message:'请输入邮箱', trigger: 'blur' },
                { type: 'email', message:'邮箱格式不正确', trigger: 'change blur' }
            ],
            userName: [
                { required: true, message:'请输入用户名', trigger: 'blur' }
            ]
        }
    }
  },
  props: ['registerShow'],
  computed: {
    modalShowFlag :{
       get() {
            return this.registerShow
       },
       set(value){
           this.registerShow = value
       }
    } 
  },
  methods: {
      registerHandel() {
         this.$refs['formCustom'].validate((valid) => {
            if (valid) {
                Axios.post(this.$store.state.address + '/register', this.formCustom)
                .then((data)=>{
                  if(data.data.code === 0){
                    this.$Message.success('注册成功!请登录')
                    this.$refs['formCustom'].resetFields()
                    this.$emit("registerShowChange")
                  }else{
                    this.$Message.warning(data.data.data.message)
                  }
                })
            } else {
                this.$Message.error('表单验证失败!')
            }
          })
      },
      registerCancelHandel() {
         this.$refs['formCustom'].resetFields();
         this.$emit("registerShowChange")
      }
  }
}
</script>

<style>
.registerTitle{
      line-height: 20px;
      font-size: 14px;
      font-weight: bold;
  }
</style>
