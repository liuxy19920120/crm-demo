<template>
  <div>
    <header-nav ref="header"></header-nav>
    <div id="crm-layout" ref="crmLayout">
        <div class='crm-aside fl'>
            <ul id="tab" ref="tab">
                <li class="active">
                    <i class="el-icon-fa-window-maximize"></i>
                </li>
                <li>
                    <i class="el-icon-fa-comment"></i>
                </li>
                <li>
                    <i class="el-icon-fa-bar-chart-o"></i>
                </li>
                <li>
                    <i class="el-icon-fa-asterisk"></i>
                </li>
            </ul>
            <div ref="tabPane" id="tab-pane">
                <div class="tab-active">
                    <p class="createNew">
                        <i>+</i>
                        <span class="text">快速新建</span>
                    </p>
                    <ul>
                        <li>
                            <a href="">
                                <i class="el-icon-fa-pie-chart"></i>
                                <span class="text">CRM信息</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i class="el-icon-fa-tasks"></i>
                                <span class="text">销售线索</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i class="el-icon-fa-suitcase"></i>
                                <span class="text">线索池</span>
                            </a>
                        </li>
                        <li>
                            <a href="" class="active">
                                <i class="el-icon-fa-building-o"></i>
                                <span class="text">客户</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i class="el-icon-fa-address-book-o"></i>
                                <span class="text">联系人</span>
                            </a>
                        </li>
                    </ul>               
                </div>
                <div>22</div>
                <div>33</div>
                <div>44</div>
                <p class="theme-set">
                    <span class="fold-btn">
                        <i class="el-icon-fa-navicon"></i>
                    </span>
                </p>
            </div>
        </div>
        <div ref="crmModuleWrap" class="fl">
            <el-row>
                <el-col :span="24">
                    <div class="crm-tit">
                        <h2 class="dt-tit">
                        客户
                        </h2>
                        <el-input
                            placeholder="搜索客户名称"
                            icon="search"
                            class="fl dt-sc-box"
                            :on-icon-click="handleIconClick">
                        </el-input>
                        <div class="fr dt-right">
                            <router-link to="/createNew" class="createNew_btn" exact tag="button">
                            新建
                            </router-link>
                            <el-dropdown>
                                <el-button>
                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item class="crm-drop">智能表单</el-dropdown-item>
                                    <el-dropdown-item class="crm-drop">导入</el-dropdown-item>
                                    <el-dropdown-item class="crm-drop">导出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>      
                        </div>
                    </div>
                    </el-col>
                    <el-col :span="24">
                        <ul class="batch-trem">
                        <li>
                            <span class="item-tit">业务类型：</span>
                            <el-select class="item_drop" :value="bussinessTypeValue">
                                <el-option class=""
                                v-for="item in bussinessType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <span class="item-tit">场景：</span>
                            <el-select class="item_drop" :value="sceneValue">
                                <el-option class=""
                                v-for="item in scene"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <span class="item-tit">视图：</span>
                            <span class="main_item_tabs_active">列表</span><span class="main_item_tabs_btn">地图</span>
                        </li>
                        <li class="noborder">
                            <span class="term-custom-btn"><i class="el-icon-fa-filter" style="font-size:14px;vertical-align:middle;"></i> 高级筛选</span>
                        </li>
                        </ul>
                    </el-col>
                    <div>
                        <el-col :span="24">
                            <div ref="mainList" id="mainList">
                                <el-table class="main-list"
                                    ref="multipleTable"
                                    :data="clientList"
                                    border
                                    style="width: 100%"
                                    tooltip-effect="dark"
                                    max-height="350"
                                    >
                                    <el-table-column
                                    type="selection"
                                    width="55">
                                    </el-table-column>
                                    <el-table-column
                                    fixed
                                    prop="infomation.clientName"
                                    label="客户名称"
                                    width="150">
                                    <template scope="scope">
                                        <el-button
                                        @click.native.prevent="deleteRow(scope.$index, clientList)"
                                        type="text"
                                        size="small" prop="infomation.clientName">
                                        {{ scope.row.infomation.clientName }}
                                        </el-button>
                                    </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="infomation.clinetFrom"
                                    label="来源"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="regionLocation.info"
                                    label="国家、省、市、区"
                                    width="200">
                                    </el-table-column>
                                    <el-table-column
                                    prop="infomation.businessInfo"
                                    label="行业"
                                    width="300">
                                    </el-table-column>
                                    <el-table-column
                                    prop="infomation.createTime"
                                    label="创建时间"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="regionLocation.address"
                                    label="详细地址"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="infomation.relationGroup"
                                    label="相关团队"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="infomation.clientType"
                                    label="客户类型"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="infomation.bussinessType"
                                    label="业务类型"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="120">
                                    <template scope="scope">
                                        <el-button
                                        @click.native.prevent="getInfo(scope.$index, clientList)"
                                        type="text"
                                        size="small">
                                        详细信息
                                        </el-button>
                                    </template>
                                    </el-table-column>
                                </el-table>     
                            </div>                   
                        </el-col>
                        <el-col :span="24">
                            <div class="main-block">
                                <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage4"
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="10"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="clientList.length">
                                </el-pagination>
                            </div>
                        </el-col>      
                    </div>
            </el-row>
        </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from '@/components/header'
export default {
  components: {
    HeaderNav
  },
  data () {
    return {
      bussinessType: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '预设业务类型'
        }
      ],
      bussinessTypeValue: '0',
      scene: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '我负责的客户'
        },
        {
          value: '2',
          label: '我联合跟进定位客户'
        },
        {
          value: '3',
          label: '我下属负责的客户'
        },
        {
          value: '4',
          label: '我下属联合跟进的客户'
        },
        {
          value: '5',
          label: '我服务的客户'
        }
      ],
      sceneValue: '1',
      multipleSelection: []
    }
  },
  computed: {
    clientList () {
      return this.$store.state.clientList
    }
  },
  mounted () {
    this.init()
    window.onresize = this.init
    this.$store.dispatch('getClientList')
  },
  methods: {
    init () {
      // 设置默认高度，使内容占满真个屏幕
      this.layoutHeight = document.documentElement.clientHeight - 60
      this.$refs.crmLayout.style.height = this.layoutHeight + 'px'
      this.$refs.crmModuleWrap.style.height = this.layoutHeight + 'px'
      this.$refs.mainList.style.height = this.layoutHeight - 167 + 'px'
      this.$refs.crmModuleWrap.style.width = document.documentElement.clientWidth - 200 + 'px'
      let tabPanes = this.$refs.tabPane.querySelectorAll('div')
      Array.from(tabPanes).forEach(function (item) {
        item.style.height = this.$refs.crmLayout.clientHeight - 50 + 'px'
      }, this)
    }
  }
}
</script>

<style>
  .crm-aside{
      width: 200px;
      background: #2d3037;
      height: 100%;
      
  }
   .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  #tab{
      height: 50px;
      border-bottom:2px solid #22262a;
      box-sizing:border-box;
  }
  #tab li{
      text-align: center;
      float: left;
      height: 48px;
      width: 38px;
      margin:0 6px;
      
  }
  #tab li.active{
    border-bottom:2px solid #fc923f;
    color:#fff;
  }

  #tab li i{
      display: inline-block;
      margin: 14px 0;
      height: 20px;
      width: 20px;
  }
  #tab-pane{
      position: relative;
  }
  #tab-pane div{
      overflow: hidden;
      display: none;
  }
  #tab-pane .tab-active{
      display: block;
  }
  .crm-tit{
    height: 61px;
    background-color: #f4f6f9;
    border-color: #d8dde8;
    position: relative;
    z-index: 2;
  }
  .dt-tit{
    float: left;
    padding: 0 20px;
    font-size: 18px;
    line-height: 60px;
  }

  .dt-sc-box{
    width: 260px;
    margin: 13px 0 0 300px;
  }

  .dt-right{
      margin:13px 20px 0 0;
      font-size: 14px;
  }
  .crm-drop{
      font-size: 14px;
  }
  .batch-trem{
    padding: 9px 0 10px;
    border-top: 1px solid #d8dde8;
    background-color: #f4f6f9;
    line-height: 36px;
    min-height: 36px
  }
  .batch-trem li{
      float: left;
      padding-right: 20px;
      border-right: 1px solid #d8dde8;
  }
  .batch-trem .noborder{
      border:0;
  }
  .item-tit{
    padding-right: 20px;
    padding-left: 20px;
    color: #999;
    font-size: 14px
  }
  .item_drop{
      width: 135px;
  }
  .main_item_tabs{
      height: 36px;
      border-radius: 4px;
  }
  .main_item_tabs_active{
      box-sizing: border-box;
      border: 1px solid #20a0ff;
      background: #20a0ff;
      color: #fff;
      padding: 0 15px;
      height: 36px;
      line-height: 34px;
      font-size: 14px;
      display: inline-block;
      border-radius: 4px;
  }
  .main_item_tabs_btn{
      box-sizing: border-box;
      background: #fff;
      color: #999;
      border: 1px solid #d8dde8;
      padding: 0 15px;
      height: 36px;
      line-height: 34px;
      font-size: 14px;
      display: inline-block;
      border-radius: 4px;
  }

  #crm-layout .el-table{
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    border: 1px solid #dfe6ec;
    font-size: 14px;
    color: #666;
  }
  .el-table__fixed-header-wrapper thead div {
    background-color: #eef1f6;
    color: #999;
  }
  .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div {
    background-color: #eef1f6;
    color: #999;
  }
  #tab-pane .createNew {
    font-size: 14px;
    text-align: center;
    border-radius: 3px;
    color: #fff;
    padding: 0;
    background-color: #319bf5!important;
    height: 32px;
    line-height: 32px;
    margin: 12px 10px;
    border: 1px solid #ddd;
  }
   #tab-pane .createNew i{
    display: inline-block;
    font-size: 20px;
    line-height: 28px;
    font-style: normal;
    margin-right: 0;
    vertical-align: top;
  }
  #tab-pane .createNew .text{
    display: inline-block;
    font-size: 14px;
    margin-left: 6px;
    vertical-align: top;
  }
  #tab-pane ul a{
    font-size: 14px;
    color: #c4cdd5;
    display: block;
    padding: 10px 10px 10px 50px;
    min-height: 20px;
    word-wrap: break-word;
    line-height: 20px;
    color: #c4cdd5;
    text-decoration: none;
    position: relative;
  }
  #tab-pane ul a:hover{
      color: #fff;
      background: #454e57;
  }
  #tab-pane ul a.active{
      color: #fff;
      background: #454e57;
  }
  #tab-pane ul a i{
    width: 20px;
    height: 20px;
    position: absolute;
    left: 20px;
    top: 10px;
  }
  .crm-aside .theme-set{
    width: 100%; 
    height: 40px;
    background-color: #22262a;
    position: absolute;
    bottom: 0;
   }
   .crm-aside .fold-btn{
    width: 40px;
    height: 40px;
    color: #d3dbe2;
    cursor: pointer;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
   }
   .crm-aside .fold-btn i{
    display: block;
    width: 20px;
    height: 20px;
    margin: 10px auto 0;
   }
   .term-custom-btn{
       line-height: 28px;
       color: #666;
       display: inline-block;
       margin: 0 10px;
       padding: 0 10px;
       cursor: pointer;
       font-size: 14px;
       color:#999;
   }
   .term-custom-btn:hover{
       background: #fff;
       color:#319bf5;
   }
   .createNew_btn{
    color: #fff;
    background-color: #20a0ff;
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #c4c4c4;
    border-color: #20a0ff;
    margin: 0;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
   }
   #mainList{
    overflow: auto;
    }
   .main-block{
    height: 32px;
    background: #f4f6f9;
    padding: 9px 15px;
  }
</style>
