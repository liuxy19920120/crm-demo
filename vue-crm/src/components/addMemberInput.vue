<template>
  <div class="selectMember">
    <div class="inputSearch">
        <div class="selectUserList fl" v-show="selectMemberTabShow" @click="delSelectUser">
              <span class="selectItem" v-for="(item,index) in selectUserList" :key="index">
                  {{item.userName}}<i class="del" :data-index="index" :data-userName="item.userName">X</i>
              </span>
        </div>
        <input type="text" v-model="inputValue" ref="inputWorkmate" class="fl" v-show="selectMemberTabShow" placeholder="请输入同事名称">
    </div>
    <div class="selectMemberItem clearfix">
        <div class="selectTips clearfix">
             <div v-show="!selectMemberTabShow" @click="selectMemberTab">
                <i>选择员工</i>
            </div> 
            <!-- <Button slot="append" type="text" icon="plus-round" v-show="!selectMemberTabShow" @click="selectMemberTab">选择员工</Button> -->
             <div class="selectMemberTab clearfix" v-show="selectMemberTabShow">
                <div class="fl selectTabs">
                    <div class="lately" v-show="tabNum === '02'">
                        <div class="range-letter-nav">
                            <ul class="clearfix">
                                <li v-for="(item,index) in activeLetter" :key="index" :class="{active:item}">{{index}}</li>
                            </ul>
                        </div>
                        <div class="range-letter-list">
                          <ul @click="getWorkmate">
                              <li v-for="(item,index) in userList" :key="index">
                                  <div class="userKeyName">{{item.userKeyName}}</div>
                                  <div>
                                      <img class="userImg"  src="../assets/images/employee_default.png"/>
                                      <span :class="{userName:true,userNameActive:item.activeFlag}" :data-key="index" :data-userName="item.userName">{{item.userName}}</span>
                                  </div>
                              </li>
                          </ul>
                        </div>
                    </div>
                    <div class="workMate" v-show="tabNum === '01'">
                        <div class="remindInfo">

                            <p>您还没有历史查询记录，可以通过以下方式进行查找：</p>
                            <ol>
                                <li>1.通过右侧“同事”直接选择</li>
                                <li>2.输入同事姓名/全拼</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div class="fl selectOptions">
                    <a :class="{active:tabNum === '01'}" @click="changeTab('01')">最近</a>
                    <a :class="{active:tabNum === '02'}" @click="changeTab('02')">同事</a>
                </div>
            </div> 
        </div>
    </div>
</div>
</template>

<script>
export default {
  props:['showFlag'],
  data () {
      return {
          selectMemberTabShow:this.showFlag,
          tabNum:'02',
          inputValue:'',
          userList:[
              {
                  userName:'刘小玉',
                  userKeyName:'L',
                  userImg:'../assets/images/employee_default.png',
                  activeFlag:false
              },
               {
                  userName:'闫雅静',
                  userKeyName:'Y',
                  userImg:'../assets/images/employee_default.png',
                  activeFlag:false
              }
          ],
          selectUserList:[

          ],
          activeLetter:{
              '★':false,
              A:false,
              B:false,
              C:false,
              D:false,
              E:false,
              F:false,
              G:false,
              H:false,
              I:false,
              J:false,
              K:false,
              L:false,
              M:false,
              N:false,
              O:false,
              P:false,
              Q:false,
              R:false,
              S:false,
              T:false,
              U:false,
              V:false,
              W:false,
              X:false,
              Y:false,
              Z:false,
              "#":false
          }
      }
  },
  watch:{
      showFlag(){
          if(this.showFlag){
            if(this.selectUserList.length){
                    this.selectUserList.forEach((item) =>{
                        for(var i=0;i<this.userList.length;i++){
                                if(this.userList[i].userName === item.userName){
                                    this.userList[i].activeFlag = false
                                    break
                                }
                            }
                    })
                }
                this.selectUserList = []
                this.selectMemberTabShow = false
          }
      }
  },
  mounted () {
    this.userList.forEach((item) => {
      if(!this.activeLetter[item.userKeyName]){
          this.activeLetter[item.userKeyName] = true
      }
    })
  },
  methods:{
      setCaretPosition(textDom, pos){
         if(textDom.setSelectionRange) {
          // IE Support
          textDom.focus()
          textDom.setSelectionRange(pos, pos)
         }else if (textDom.createTextRange) {
          // Firefox support
          var range = textDom.createTextRange()
          range.collapse(true)
          range.moveEnd('character', pos)
          range.moveStart('character', pos)
          range.select()
         }
      },
      selectMemberTab() {
        this.selectMemberTabShow = true
        this.setCaretPosition(this.$refs.inputWorkmate,0)
      },
      changeTab(tab){
         this.tabNum = tab
      },
      getWorkmate(ev){
        let target = ev.target
        if(target.classList.contains('userName')){
           this.userList[target.dataset.key].activeFlag  = !this.userList[target.dataset.key].activeFlag
           if(this.userList[target.dataset.key].activeFlag){
              this.selectUserList.unshift({
                  userName:target.dataset.username
              })
           }else{
              for(var i=0;i<this.selectUserList.length;i++){
                  if(this.selectUserList[i].userName === target.dataset.username){
                     this.selectUserList.splice(i,1)
                     break
                  }
              }
           }
        }
      },
      delSelectUser(){
        for(var i=0;i<this.selectUserList.length;i++){
            if(this.selectUserList[i].userName === item.userName){
                this.selectUserList.splice(i,1)
                break
            }
         }
        for(var i=0;i<this.userList.length;i++){
            if(this.userList[i].userName === item.userName){
                this.userList[i].activeFlag = false
                break
            }
         }
      }
  }
}
</script>

<style>
.selectMember{
    position: relative;
    margin-bottom: 15px;
}
.selectMemberItem{
    width: 100%;
    position: absolute;
    top:5px;
    left:10px;
}
.selectTips{
    height: 32px;
    cursor: pointer;
    color:#3e84e9;
    line-height: 24px;
}
.inputSearch{
    padding: 4px 7px 0;
    background: #FFF;
    border: 1px solid #ddd;
    border-radius: 2px;
    line-height: 24px;
    height: 32px;
}
.selectUserList .selectItem{
    margin: 0 8px 4px 0;
    padding: 0 26px 0 12px;
    background: #3D83E9;
    border-radius: 12px;
    color: #FFF;
    cursor: pointer;
    height: 24px;
    line-height: 24px;
    float: left;
    position: relative;
}
.selectUserList .selectItem .del{
    position: absolute;
    top: 0;
    right: 12px;
    padding-left: 3px;
    color: #a4d9ef;
    font-weight: 700;
}
.selectMemberTab{
    position: absolute;
    height: 424px;
    width: 320px;
    color: #333;
    background:#fff;
    left: -10px;
    top:32px;
}
.selectMemberTab .selectTabs{
    height: 100%;
    width: 270px;
}
.selectMemberTab .selectOptions{
    height: 100%;
    width: 50px;
    background: #F9F9F9;
}

.selectMemberTab .selectOptions a{
    display: inline-block;
    min-height: 34px;
    line-height: 17px;
    padding: 15px;
    color: #4679D2;
    text-align: center;
    cursor: pointer;
}
.selectMemberTab .selectOptions .active{
    background: #FFF;
    color: #333;
    font-weight: 700;
}
.range-letter-nav {
    margin: 0 15px 10px;
    padding: 10px 0;
    border-bottom: 1px solid #F0F0F0;
}

.range-letter-nav li{
    float: left;
    width: 17px;
    height: 20px;
    font-weight: 700;
    color: #CCC;
    text-align: center;
}

.range-letter-nav li.active{
    color: #4679D2;
}

.range-letter-list{
    height: 325px;
    overflow:auto;
    padding: 0 15px;
}
.range-letter-list li{
    height: 35px;
}
.range-letter-list .userKeyName{
    float: left;
    width: 25px;
    color: #CCC;
    font-size: 18px;
    font-weight: 700;
}

.range-letter-list .userImg{
    display: block;
    width: 25px;
    height: 25px;
    float: left;
}
.range-letter-list .userName{
    font-size: 14px;
    overflow: hidden;
    float: left;
    display: block;
    line-height: 25px;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 180px;
    text-indent: 5px;
}
.range-letter-list .userNameActive{
    background: #649CED;
    color: #FFF;
}
.workMate{
    position: relative;
}
.workMate .remindInfo{
    padding: 125px 25px 0;
    background: url(../assets/images/search.png) center 50px no-repeat;
    color: #999;
    line-height: 23px;
}
.workMate .remindInfo p{
    line-height: 24px;
}
.workMate .remindInfo ol{
    margin-top: 20px;
}
</style>
