<template>
  <header class="header">
    <Row>
      <Col span="6"><div class="company-name">宜家股份有限公司</div></Col>
      <Col span="8">
          <Menu mode="horizontal" theme="light" active-name="1" class="fl">
            <MenuItem name="1">
                <Icon type="ios-paper"></Icon>
                工作
            </MenuItem>
            <MenuItem name="2">
                <Icon type="pie-graph"></Icon>
                CRM
            </MenuItem>
            <MenuItem name="3">
                 <Icon type="stats-bars"></Icon>
                应用
            </MenuItem>
            <MenuItem name="4">
                <Icon type="settings"></Icon>
                管理
            </MenuItem>
        </Menu>
      </Col>
      <Col span="7">
        <Input
            icon="ios-search-strong"
            placeholder="搜索同事、工作或附件"
            class="fl header-search">
        </Input>
      </Col>
      <Col span="3">
          <Dropdown class="fr" placement="bottom-end" @on-click="itemClickHandle">
            <a href="javascript:void(0)" class="header-siect">
                刘小玉
                <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem>升级说明</DropdownItem>
                <DropdownItem>个人设置</DropdownItem>
                <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>
  </header>
</template>

<script>
export default {
  methods: {
    itemClickHandle (name) {
      if (name === 'logout') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>
  .header{
      height: 60px;
      margin: 0 30px;
  }
  .header Menu ::before{
      font-size: 18px;
  }
  .company-name{
    line-height: 60px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ilipsis;
    float: left;
    cursor: default;
  }
  .header-search{
      width: 300px;
      margin-top:14px; 
  }

  .header-siect{
     margin: 20px 10px 0 0;
     display: inline-block;
  }
  .header-drop{
      font-size: 14px;
  }
</style>
