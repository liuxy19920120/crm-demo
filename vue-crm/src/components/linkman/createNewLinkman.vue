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
                        <Button type="primary"class="fr" @click="addClientUser('formValidate')">保存</Button>
                    </Form-item> 
                  </div>
              </Col>
          </Row>
           <Row class="create-content">
              <Row class="create-information code-row-bg" type="flex" justify="center">
                  <Col span="14">
                      <h3>基本信息</h3>
                          <Col span="10" class="fl">
                              <Form-item label="客户名称" prop="clientName">
                                  <Input v-model="formValidate.clientName" :autofocus="true" placeholder="请输入客户名称">
                                  <Button slot="append" icon="plus-round"></Button>
                                  </Input>
                              </Form-item>
                          </Col>
                          <Col span="10" class="fr">
                              <Form-item label="客户类型" prop="clientType">
                                  <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
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
                                        ref="upload"
                                        :show-upload-list="false"
                                        :default-file-list="defaultList"
                                        :on-success="handleSuccess"
                                        :format="['jpg','jpeg','png']"
                                        :max-size="2048"
                                        :on-format-error="handleFormatError"
                                        :on-exceeded-size="handleMaxSize"
                                        :before-upload="handleBeforeUpload"
                                        multiple
                                        type="drag"
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        style="display: inline-block;width:58px;">
                                        <div style="width: 58px;height:58px;line-height: 58px;">
                                            <Icon type="camera" size="20"></Icon>
                                        </div>
                                    </Upload>
                                    <Modal title="View Image" v-model="visible">
                                        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                                    </Modal>
                              </Form-item>
                          </Col>
                          <Col span="10" class="fl">
                              <Form-item label="职务" prop="clinetFrom">
                                 <Input v-model="formValidate.clientName" :autofocus="true" placeholder="请输入客户名称">
                                  </Input>
                              </Form-item>
                          </Col>
                          <Col span="10" class="fr">
                              <Form-item label="关键决策人" prop="businessLevel1">
                                  <Select
                                          v-model="formValidate.businessLevel1"
                                          placeholder="请选择"
                                          @on-change="changeBusinessLevel">
                                      <Option value="0">否</Option>
                                      <Option value="1">是</Option>
                                  </Select>
                              </Form-item>
                          </Col>
                  </Col>
                   <Col span="14">
                      <h3>联系方式</h3>
                          <Col span="10" class="fl">
                              <Form-item 
                                v-for="(item, index) in formDynamic.items"
                                v-if="item.status"
                                :key="index"
                                :label="'Item ' + item.index"
                                :prop="'items.' + index + '.value'"
                                :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
                              >
                                <Row>
                                    <Col span="18">
                                        <Input type="text" v-model="item.value" placeholder="Enter something..."></Input>
                                    </Col>
                                    <Col span="4" offset="1">
                                        <Button type="ghost" @click="handleRemove(index)">Delete</Button>
                                    </Col>
                                </Row>
                              </Form-item>
                               <FormItem>
                                    <Row>
                                        <Col span="12">
                                            <Button type="dashed" long @click="handleAdd" icon="plus-round">Add item</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                          </Col>
                          <Col span="10" class="fr">
                              <Form-item label="客户类型" prop="clientType">
                                  <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
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
                                        ref="upload"
                                        :show-upload-list="false"
                                        :default-file-list="defaultList"
                                        :on-success="handleSuccess"
                                        :format="['jpg','jpeg','png']"
                                        :max-size="2048"
                                        :on-format-error="handleFormatError"
                                        :on-exceeded-size="handleMaxSize"
                                        :before-upload="handleBeforeUpload"
                                        multiple
                                        type="drag"
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        style="display: inline-block;width:58px;">
                                        <div style="width: 58px;height:58px;line-height: 58px;">
                                            <Icon type="camera" size="20"></Icon>
                                        </div>
                                    </Upload>
                                    <Modal title="View Image" v-model="visible">
                                        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                                    </Modal>
                              </Form-item>
                          </Col>
                          <Col span="10" class="fl">
                              <Form-item label="职务" prop="clinetFrom">
                                 <Input v-model="formValidate.clientName" :autofocus="true" placeholder="请输入客户名称">
                                  </Input>
                              </Form-item>
                          </Col>
                          <Col span="10" class="fr">
                              <Form-item label="关键决策人" prop="businessLevel1">
                                  <Select
                                          v-model="formValidate.businessLevel1"
                                          placeholder="请选择"
                                          @on-change="changeBusinessLevel">
                                      <Option value="0">否</Option>
                                      <Option value="1">是</Option>
                                  </Select>
                              </Form-item>
                          </Col>
                  </Col>
                  <Col span="14">
                      <h3>地区定位</h3>   
                          <Col span="10" class="fl"  id="location">
                              <Form-item label="定位" prop="locationInfo">
                                  <Select
                                      placeholder="请输入写字楼、街道、公司名称"
                                      v-model="formValidate.locationInfo"
                                      filterable
                                      remote
                                      :label-in-value="true"
                                      :remote-method="getLocationInfo"
                                      @on-change='getLocationMap'
                                      :loading="loading">
                                      <Option v-for="(option, index) in locationList" :value="option.district + option.address + option.name" :key="option.id + Date.now()">{{option.district + option.address + option.name}}</Option>
                                  </Select>
                                  <div id="map" @click="mapExpand">
                                       <location-map class="locationMap">
                                       </location-map>
                                       <Icon type="arrow-expand" size="40" id="mapExpand" title="放大"></Icon>
                                  </div>
                              </Form-item>
                          </Col> 
                          <Col span="10" class="create-country fr">
                              <label class="ivu-form-item-label">国家/省/市/区</label>
                              <Row type="flex" justify="space-between" class="code-row-bg">
                                  <Col span="5">
                                      <Select v-model="formValidate.country" placeholder="国家">
                                          <Option value="中国">中国</Option>
                                      </Select>
                                  </Col>
                                  <Col span="5">
                                      <Select v-model="formValidate.province" placeholder="省">
                                          <Option value="北京市">北京市</Option>
                                          <Option value="河北省">河北省</Option>
                                          <Option value="河南省">河南省</Option>
                                      </Select>
                                  </Col>
                                  <Col span="5">
                                      <Select v-model="formValidate.city" placeholder="市">
                                          <Option value="北京市">北京市</Option>
                                          <Option value="天津市">天津市</Option>
                                          <Option value="保定市">保定市</Option>
                                      </Select>
                                  </Col>
                                  <Col span="5">
                                      <Select v-model="formValidate.area" placeholder="区">
                                          <Option value="海淀区">海淀区</Option>
                                      </Select>
                                  </Col>
                              </Row>
                          </Col>
                          <Col span="24" class="fl">
                              <Form-item label="详细地址" prop="address">
                                  <Input v-model="formValidate.locationInfo"></Input>
                              </Form-item>
                          </Col>
                  </Col>
              </Row>
          </Row> 
        </Form>
    </div>
  </transition>
</template>
<script>
import locationMap from '@/components/map'
export default {
  components: {
    locationMap
  },
  data () {
    return {
      formValidate: {  // form表单内容
        clientName: '',
        clientType: '',
        clinetFrom: '',
        businessLevel1: '',
        businessLevel2: '',
        phoneNum: '',
        fax: '',
        email: '',
        url: '',
        comment: '',
        locationInfo: '',
        country: '',
        province: '',
        city: '',
        area: '',
        address: ''
      },
      ruleValidate: {  // 校验规则
        clientName: [{
          required: true,
          message: '姓名不能为空',
          trigger: 'change blur'
        }],
        email: [{
          required: true,
          message: '邮箱不能为空',
          trigger: 'change blur'
        }, {
          type: 'email',
          message: '邮箱格式不正确',
          trigger: 'change blur'
        }],
        url: [
          {
            type: 'url',
            message: 'url格式不正确',
            trigger: 'chagne blur'
          }
        ]
      },
      loading: false,
      locationList: [],
      blDisabled:true, // 2级行业是否可用
      defaultList: [
        {
            'name': 'a42bdcc1178e62b4694c830f028db5c0',
            'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        },
        {
            'name': 'bc7521e033abdd1e92222d733590f104',
            'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        }
    ],
    imgName: '',
    visible: false,
    uploadList: []
    }
  },
  mounted () {
      this.uploadList = this.$refs.upload.fileList;
  },
  methods: {
    addClientUser (formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          this.$store.dispatch('createNewClient', {
            formValidate: this.formValidate,
            newRouter: this.$router
          })
          this.$Message.success('提交成功!')
        } else {
          this.$Message.error('表单验证失败! 请重新输入')
        }
      })
    },
    // 2级行业控件可用
    changeBusinessLevel (value) {
      this.blDisabled = false
    },
    // 点击取消按钮
    goMain () {
      this.$router.go(-1)
    },
    // jsonp方式取得定位
    getLocationInfo (info) {
      if (info !== '') {
        this.loading = true
        if (this.loading) {
          setTimeout(() => {
            this.loading = false
            this.$http.jsonp('https://restapi.amap.com/v3/assistant/inputtips?s=rsv3&key=47a6ca401e4e72bccc0691a9df65aef1&city=&platform=JS&logversion=2.0&sdkversion=1.3&appname=https%3A%2F%2Fwww.fxiaoke.com%2FXV%2FHome%2FIndex%23crm%2Fcustomer&csid=CDFF25FA-AB21-4CEF-BA59-363CFCE99BEE',
              {
                params: {
                  keywords: info
                },
                jsonp: 'callback'
              })
              .then((data) => {
                this.locationList = data.body.tips
              }, (data) => {
              })
          }, 200)
        }
      } else {
        this.locationList = []
      }
    },
    // 地图
    getLocationMap (value) {
        var map = this.$store.state.map
        var point = new BMap.Point(116.331398, 39.897445)
        map.centerAndZoom(point, 12)
        var myGeo = new BMap.Geocoder()
        myGeo.getPoint(value.label, function (point) {
          if (point) {
            map.centerAndZoom(point, 16)
            map.addOverlay(new BMap.Marker(point))
          } else {
            alert('您选择地址没有解析到结果!')
          }
        }, '北京市')
        map.enableScrollWheelZoom(true)
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
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
    },
    handleFormatError (file) {
        this.$Notice.warning({
            title: 'The file format is incorrect',
            desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
    },
    handleMaxSize (file) {
        this.$Notice.warning({
            title: 'Exceeding file size limit',
            desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
    },
    handleBeforeUpload () {
        const check = this.uploadList.length < 5;
        if (!check) {
            this.$Notice.warning({
                title: 'Up to five pictures can be uploaded.'
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
.create-position .create-country .ivu-form-item {
    width:90px;
}
.ivu-col-span-10 {
    -width:180px;
    height:89px;
    -line-height:89px;
}
.ivu-col-span-10 p {
    line-height:32px;
}
.create-country .ivu-col-span-10{
    width:280px;
}
#location{
  height: 189px;
}
.locationMap{
  height: 100px;
  width: 320px;
  margin-top: 20px;
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
#map{
    position: relative;
}
#map #mapExpand{
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
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
</style>
