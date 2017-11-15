<template>
  <header class="header">
    <el-row>
      <el-col :span="6"><div class="company-name">宜家股份有限公司</div></el-col>
      <el-col :span="15">
          <nav class="header-nav fl clearfix">
              <a href="#">工作</a>
              <a href="#">CRM</a>
              <a href="#">应用</a>
              <a href="#">管理</a>
          </nav>
          <el-input
            placeholder="搜索同事、工作或附件"
            icon="search"
            class="fl header-search"
            :on-icon-click="handleIconClick">
          </el-input>
      </el-col>
      <el-col :span="3">
           <el-col :span="12" class="fr">
            <el-dropdown class='header-select'>
            <span class="el-dropdown-link">
                刘小玉<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="header-drop">升级说明</el-dropdown-item>
                <el-dropdown-item class="header-drop">个人设置</el-dropdown-item>
                <el-dropdown-item class="header-drop">退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </el-col>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {

}
</script>

<style>
  .header{
      height: 60px;
      margin: 0 20px;
  }
  .company-name{
    line-height: 60px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    float: left;
    cursor: default;
  }
  .header-nav a{
    line-height: 60px;
     margin-right: 40px;
     height: 57px;
     float: left;
  }
  .header-search{
      width: 300px;
      margin-top:12px; 
  }

  .header-select{
     margin-top:20px;
  }
  .header-drop{
      font-size: 14px;
  }
</style>
