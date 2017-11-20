<template>
  <transition name="slide-fade">
    <div id="form">
        <Form :model="formValidate" :label-width="80" ref="formValidate" :rules="ruleValidate">
          <Row class="create-title clearfix">
              <Col span="6" class="fl">
                  <h1>新建客户</h1>
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
                                  <Input v-model="formValidate.clientName" :autofocus="true" placeholder="请输入客户名称"></Input>
                              </Form-item>
                          </Col>
                          <Col span="10" class="fr">
                              <Form-item label="客户类型" prop="clientType">
                                  <Select v-model="formValidate.clientType" placeholder="请选择">
                                      <Option value="客户">客户</Option>
                                  </Select>
                              </Form-item>
                          </Col>
                          <Col span="10" class="fl">
                              <Form-item label="来源" prop="clinetFrom">
                                  <Select v-model="formValidate.clinetFrom" placeholder="请选择">
                                      <Option value="线上注册">线上注册</Option>
                                      <Option value="来源">来源</Option>
                                      <Option value="转介绍">转介绍</Option>
                                  </Select>
                              </Form-item>
                          </Col>
                          <Col span="10" class="fr">
                              <Form-item label="1级行业" prop="businessLevel1">
                                  <Select
                                          v-model="formValidate.businessLevel1"
                                          placeholder="请选择"
                                          @on-change="changeBusinessLevel">
                                      <Option value="IT／通信／电子／互联网">IT／通信／电子／互联网</Option>
                                      <Option value="金融业">金融业</Option>
                                      <Option value="房地产">房地产</Option>
                                  </Select>
                              </Form-item>
                          </Col>
                          <Col span="10" class="fl">
                              <Form-item label="2级行业" prop="businessLevel2">
                                  <Select
                                          v-model="formValidate.businessLevel2"
                                          placeholder="请先选择1级行业" :disabled="blDisabled" 
                                          ref="businessLevel2">
                                      <Option value="互联网电子商务">互联网电子商务</Option>
                                      <Option value="计算机硬件">计算机硬件</Option>
                                      <Option value="计算机软件">计算机软件</Option>
                                  </Select>
                              </Form-item>
                          </Col>
                          <Col span="10" class="fr">
                              <Form-item label="电话" prop="phoneNum">
                                  <Input v-model="formValidate.phoneNum"></Input>
                              </Form-item>
                          </Col>
                          <Col span="10" class="fl">
                              <Form-item label="传真" prop="fax">
                                  <Input v-model="formValidate.fax"></Input>
                              </Form-item>
                          </Col>
                          <Col span="10" class="fr">
                              <Form-item label="邮件" prop="email">
                                  <Input v-model="formValidate.email"></Input>
                              </Form-item>
                          </Col>
                          <Col span="10">
                              <Form-item label="网址" prop="url" class="fl">
                                  <Input v-model="formValidate.url"></Input>
                              </Form-item>
                          </Col>
                          <Col span="10" class="fr">
                              <Form-item label="备注" prop="comment">
                                  <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
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
      blDisabled:true // 2级行业是否可用
    }
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
    mapExpand(ev) {
      if(ev.target.id === 'mapExpand'){
          window.open('http://localhost:8080/dist/mapExpand?location='+encodeURIComponent(this.formValidate.locationInfo),'_blank')
      }   
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
</style>
