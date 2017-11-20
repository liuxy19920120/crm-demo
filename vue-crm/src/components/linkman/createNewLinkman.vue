<template>
  <transition name="slide-fade">
    <div id="form">
        <Form :model="formValidate" :label-width="80" ref="formValidate" :rules="ruleValidate">
          <Row class="create-title clearfix">
              <Col span="6" class="fl">
                  <h1>新建联系人</h1>
              </Col>
              <Col span="8" class="fr">
                  <div class="create-title-button">
                     <Form-item class="button">
                        <Button type="ghost" class="fr" style="margin-left: 8px" @click="goMain">取消</Button>
                        <Button type="primary"class="fr" @click="addLinkmanList('formValidate')">保存</Button>
                    </Form-item> 
                  </div>
              </Col>
          </Row>
           <Row class="create-content">
              <Row class="create-information code-row-bg" type="flex" justify="center">
                  <Col span="14">
                      <h3>基本信息</h3>
                           <Row>
                               <Col span="10" class="fl">
                                    <Form-item label="客户名称" prop="linkmanName">
                                        <Input v-model="formValidate.linkmanName"  placeholder="请输入客户名称">
                                        <Button slot="append" icon="plus-round"></Button>
                                        </Input>
                                    </Form-item>
                                </Col>
                                <div span="10" class="fr">
                                    <Form-item label="名片" prop="uploadList">
                                        <div class="demo-upload-list fl" v-for="(item,index) in formValidate.uploadList" :key="index">
                                            <template v-if="item.status === 'finished'">
                                                <img :src="item.url">
                                                <div class="demo-upload-list-cover">
                                                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                            </template>
                                        </div>
                                            <Upload
                                                class="fl"
                                                ref="upload"
                                                :show-upload-list="false"
                                                :on-success="handleSuccess"
                                                :format="['jpg','gif','png']"
                                                :max-size="2048"
                                                :on-format-error="handleFormatError"
                                                :on-exceeded-size="handleMaxSize"
                                                :before-upload="handleBeforeUpload"
                                                multiple
                                                type="drag"
                                                action="http://localhost:8001/assets/upload/images/"
                                                style="display: inline-block;width:58px;">
                                                <div style="width: 58px;height:58px;line-height: 58px;">
                                                    <Icon type="camera" size="20"></Icon>
                                                </div>
                                            </Upload> 
                                            <span class="uploadInfo">
                                                支持jpg、gif、png等格式的图片,最多可添加5张
                                            </span> 
                                            <Modal title="View Image" v-model="visible">
                                                <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                                            </Modal> 
                                    </Form-item>
                                </div>
                           </Row>
                           <Col span="10" class="fl">
                              <Form-item label="部门" prop="linkmanBranch">
                                 <Input v-model="formValidate.linkmanBranch">
                                  </Input>
                              </Form-item>
                          </Col>
                           <Col span="10" class="fr">
                              <Form-item label="职务" prop="linkmanDuty">
                                 <Input v-model="formValidate.linkmanDuty">
                                  </Input>
                              </Form-item>
                          </Col>
                          <Col span="10" class="fl">
                              <Form-item label="关键决策人" prop="policyMaker">
                                  <Select
                                          v-model="formValidate.policyMaker"
                                          placeholder="请选择">
                                      <Option value="0">否</Option>
                                      <Option value="1">是</Option>
                                  </Select>
                              </Form-item>
                          </Col>
                  </Col>
                  <Col span="14" class="concatInformation">
                      <h3>联系方式</h3>
                          <Row>
                            <div class="fl" style="width:421px;">
                              <Form-item 
                                v-for="(item, index) in formValidate.phoneNum"
                                :key="index"
                                :label="'电话' + item.index"
                                prop="phoneNum">
                                <Row>
                                    <Col span="18">
                                        <Input type="text" v-model="item.value" placeholder="请输入电话号码"></Input>
                                    </Col>
                                    <Col span="4" offset="1" v-show="formValidate.phoneNum.length > 1">
                                        <Button type="ghost" @click="removePhoneNum(index)">删除</Button>
                                    </Col>
                                </Row>
                              </Form-item>
                              <Row>
                                <Col span="16">
                                    <Button type="text" long @click="addPhoneNum" icon="plus-round">添加电话号码</Button>
                                </Col>
                              </Row>
                          </div>
                          <div class="fr" style="width:421px;">
                              <Form-item  
                                v-for="(item, index) in formValidate.mobilePhoneNum"
                                :key="index"
                                :label="'手机' + item.index"
                                prop="mobilePhoneNum">
                                <Row>
                                    <Col span="18">
                                        <Input type="text" v-model="item.value" placeholder="请输入手机号码"></Input>
                                    </Col>
                                    <Col span="4" offset="1" v-show="formValidate.mobilePhoneNum.length > 1">
                                        <Button type="ghost" @click="removeMobilePhoneNum(index)">删除</Button>
                                    </Col>
                                </Row>
                              </Form-item>
                                <Row>
                                    <Col span="16">
                                        <Button type="text" long @click="addMobilePhoneNum" icon="plus-round">添加手机号码</Button>
                                    </Col>
                                </Row>
                          </div>
                          </Row>
                          <Col span="10" class="fl">
                              <Form-item label="邮件" prop="linkmanEmail">
                                 <Input v-model="formValidate.linkmanEmail">
                                  </Input>
                              </Form-item>
                          </Col>
                           <Col span="10" class="fr">
                              <Form-item label="地址" prop="linkmanAddress">
                                 <Input v-model="formValidate.linkmanAddress">
                                  </Input>
                              </Form-item>
                          </Col>
                  </Col>
                  <Col span="14">
                      <h3>附加信息</h3>  
                          <Col span="10" class="createBirth fl">
                             <Form-item label="生日" prop="linkmanBirth">
                                <Row type="flex" justify="space-between" class="code-row-bg">
                                    <Col span="8">
                                        <Select v-model="formValidate.linkmanBirth.year" placeholder="请选择年份">
                                            <Option value="2017">2017年</Option>
                                        </Select>
                                    </Col>
                                    <Col span="8">
                                        <Select v-model="formValidate.linkmanBirth.month" placeholder="请选择月份">
                                            <Option value="01">01月</Option>
                                            <Option value="02">02月</Option>
                                            <Option value="03">03月</Option>
                                        </Select>
                                    </Col>
                                    <Col span="8">
                                        <Select v-model="formValidate.linkmanBirth.day" placeholder="请选择">
                                            <Option value="01">01日</Option>
                                            <Option value="02">02日</Option>
                                            <Option value="03">03日</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </Form-item>
                          </Col>
                          <Col span="10" class="fr">
                              <Form-item label="性别" prop="linkmanSex">
                                  <Select
                                          v-model="formValidate.linkmanSex"
                                          placeholder="请选择">
                                      <Option value="0">男</Option>
                                      <Option value="1">女</Option>
                                  </Select>
                              </Form-item>
                          </Col>
                          <Col span="10" class="fl">
                              <Form-item label="公司名称" prop="linkmanCompanyName">
                                  <Input v-model="formValidate.linkmanCompanyName"></Input>
                              </Form-item>
                          </Col>
                          <Col span="10" class="fr">
                              <Form-item label="介绍人" prop="introducer">
                                  <Input v-model="formValidate.introducer" placeholder="请输入">
                                  <Button slot="append" icon="plus-round"></Button>
                                  </Input>
                              </Form-item>
                          </Col>
                          <Col span="10" class="fl">
                              <FormItem label="备注" prop="commit">
                                <Input v-model="formValidate.commit" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                              </FormItem>
                          </Col>
                  </Col>    
              </Row>
          </Row> 
        </Form>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      formValidate: {  // form表单内容
         linkmanName:'', // 客户名称
         uploadList: [], // 客户名片
         linkmanBranch:'', // 客户部门
         linkmanDuty:'', // 客户职务
         policyMaker:'', // 关键决策人
         phoneNum: [  // 电话
            {
                value: '',
                index: ''
            }
        ],
        mobilePhoneNum: [ // 手机
            {
                value: '',
                index: ''
            }
        ],
        linkmanEmail:'', // 邮件
        linkmanAddress:'', // 地址
        linkmanBirth:{  // 生日
            year:'',
            month:'',
            day:''
        },
        linkmanSex:'', // 性别
        linkmanCompanyName:'', // 公司名称
        introducer: '' , // 介绍人 
        commit:'' // 备注
      },
      ruleValidate: {  // 校验规则
        // clientName: [{
        //   required: true,
        //   message: '姓名不能为空',
        //   trigger: 'change blur'
        // }],
        // email: [{
        //   required: true,
        //   message: '邮箱不能为空',
        //   trigger: 'change blur'
        // }, {
        //   type: 'email',
        //   message: '邮箱格式不正确',
        //   trigger: 'change blur'
        // }],
        // url: [
        //   {
        //     type: 'url',
        //     message: 'url格式不正确',
        //     trigger: 'chagne blur'
        //   }
        // ]
      },
    imgName: '',
    visible: false,
    phoneIndex:0,
    mobilePhoneIndex:0
  }
},
  mounted () {
      this.formValidate.uploadList = this.$refs.upload.fileList;
  },
  methods: {
    // 添加电话号码
    addPhoneNum () {
        this.phoneIndex++
        this.formValidate.phoneNum.push({
            value: '',
            index: this.phoneIndex
        });
    },
    // 删除电话号码
    removePhoneNum (index) {
        this.phoneIndex--
        this.formValidate.phoneNum.splice(index,1)
    },
    // 添加手机号码
    addMobilePhoneNum () {
        this.mobilePhoneIndex++
        this.formValidate.mobilePhoneNum.push({
            value: '',
            index: this.mobilePhoneIndex
        });
    },
    // 删除手机号码
    removeMobilePhoneNum (index) {
        this.mobilePhoneIndex--
        this.formValidate.mobilePhoneNum.splice(index,1)
    },
    // 添加联系人
    addLinkmanList (formData) {
    //   this.$refs[formData].validate((valid) => {
    //     if (valid) {
    //       this.$store.dispatch('createNewLinkman', {
    //         formValidate: this.formValidate,
    //         newRouter: this.$router
    //       })
    //       this.$Message.success('提交成功!')
    //     } else {
    //       this.$Message.error('表单验证失败! 请重新输入')
    //     }
    //   })
        this.$router.push({
            name:'linkmanShow_index'
        })
    },
    // 点击取消按钮
    goMain () {
      this.$router.go(-1)
    },
    handleView (name) {
        this.imgName = name;
        this.visible = true;
    },
    handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess (res, file) {
        // file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        // file.name = '7eb99afb9d5f317c912f08b5212fd69a';
    },
    handleFormatError (file) {
        this.$Notice.warning({
            title: '文件类型',
            desc: file.name + '文件类型必须是（jpg 、png、gif'
        });
    },
    handleMaxSize (file) {
        this.$Notice.warning({
            title: '文件大小限制',
            desc: file.name + '大小超过2M，请重新上传'
        });
    },
    handleBeforeUpload () {
        const check = this.formValidate.uploadList.length < 5;
        if (!check) {
            this.$Notice.warning({
                title: '最多上传5张图片'
            });
        }
        return check;
    }

  }
}
</script>
<style>
.create-title {
    margin: auto;
    height: 80px;
    line-height: 80px;
    background-color: #f4f6f9;
    margin-bottom: 20px;
}

.create-title h1 {
    margin-left: 30px;
    line-height: 80px;
    font-size: 28px;
    color: #212b36;
}

.create-title-button .button {
    margin-top:24px;
    line-height: 80px;
}

#form .create-content {
     display: inline;
     vertical-align: top;
     margin:0 auto;
}
.create-content h3 {
    font-size: 18px;
    line-height: 80px;
    color: #191c21;
    font-size: 20px;
}
.create-information .ivu-col-span-14 {
    margin:0 auto;
    width: 80%;
}
.ivu-col-span-20 {
    margin:0 auto;
}
.create-content .ivu-form-item {
    width:400px;
}
.ivu-col-span-10 {
    height:89px;
}
.ivu-col-span-10 p {
    line-height:32px;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 1s ease;
}
.slide-fade-enter{
   transform: translateX(100px); 
   opacity: 0;
}
.slide-fade-leave-to{
  transform: translateX(0px);
  opacity: 1;
}
.demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hsidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}

.create-content .concatInformation .ivu-form-item{
    margin-bottom:14px;
}
.uploadInfo{
    display: inline-block;
    line-height: 35px;
    margin-left: 10px;
}
</style>
