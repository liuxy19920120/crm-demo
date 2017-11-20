const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// for parsing application/json
app.use(bodyParser.json());  // 客户端发送过来的json格式
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));  // 解析客户端发送的key=value&key=value

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

const multer  = require('multer');  // 处理上传的模块
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/uploads/'); // 设置存储的位置
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // 存储文件的名字
  }
})

var upload = multer({ storage }); // 指定上传的信息
// APi用来做上传的
app.post('/upload',upload.single('miaov'), (req, res) => {
	res.send('上传ok')
})

// 锁定
app.post('/lockStatus',function(req,res){
	let list = req.body
	// 判断是否存在数据
	let isExist = fs.existsSync('./data/clientList.json')
	let arr = []
	if(isExist){
		let data = fs.readFileSync('./data/clientList.json')
		if(data.toString()){
			arr = JSON.parse(data)
		}
		list.forEach(function(item){
			let id = item.clientId
			for(var i=0;i<arr.length;i++){
				if(arr[i].clientId === id){
					arr[i].lockStatus = '1'
					break
				}
			}
		})
		fs.writeFileSync('./data/clientList.json', JSON.stringify(arr))
		res.send({
		    code: 0
		})
	}else{
		throw new Error('数据不存在')
		res.send({
		    code: 1
		})
	}
})
// 解锁
app.post('/unlockStatus',function(req,res){
	let list = req.body
	// 判断是否存在数据
	let isExist = fs.existsSync('./data/clientList.json')
	let arr = []
	if(isExist){
		let data = fs.readFileSync('./data/clientList.json')
		if(data.toString()){
			arr = JSON.parse(data)
		}
		list.forEach(function(item){
			let id = item.clientId
			for(var i=0;i<arr.length;i++){
				if(arr[i].clientId === id){
					arr[i].lockStatus = '0'
					break
				}
			}
		})
		fs.writeFileSync('./data/clientList.json', JSON.stringify(arr))
		res.send({
		    code: 0
		})
	}else{
		throw new Error('数据不存在')
		res.send({
		    code: 1
		})
	}
})
// 获取客户列表
app.post('/getClientList',function(req,res){
	// 判断是否存在数据
	let isExist = fs.existsSync('./data/clientList.json')
	let arr = []
	if(isExist){
		let data = fs.readFileSync('./data/clientList.json')
		if(data.toString()){
			arr = JSON.parse(data)
		}
	}
	res.send({
		code:0,
		clientList:arr
	})
})
// 新建客户
app.post('/createNewClient', function(req,res){
	// 获取请求信息
	let newClient = req.body
	// 文件是否存在
	let isExist = fs.existsSync('./data/clientList.json')
	let arr = []
	// 文件存在
	if(isExist){
		// 读取文件 转换成对象
	    let d = fs.readFileSync('./data/clientList.json')
	    if(d.toString()){
	      arr = JSON.parse(d);
	    }
	}
    let obj = {
    	clientId:Date.now(), // 客户编号
    	clientName:'--', // 客户姓名
    	dutyOfficer: '--', // 负责人
    	dutyOfficerSection: '--', // 负责人所在部门
    	clientLevel: '--', // 客户级别
    	business:'--', // 行业
    	createTime: dateFormat(), // 创建时间
    	clientStatus: '0', // 状态 0:已分配 1:未分配
    	createUser: '--', // 创建人
    	moveNum: '--',  // 转手次数
    	modifyTime:dateFormat(),  // 最后修改时间
    	group: '--',  // 相关团队
    	lockStatus:'0',  // 锁定状态 0:未锁定 1:已锁定
    	clinetFrom:'--', // 来源
    	businessLevel1:'--', // 1级行业
    	businessLevel2: '--', // 2级行业
    	phoneNum:'--', // 电话
    	fax:'--', // 传真
    	email:'--', // 邮箱
    	url:'--', // url
    	comment:'--', // 备注
    	clientType:'--', // 客户类型
    	businessType:'--', // 业务类型
	    locationInfo:'--', // 定位信息
	    location:'--',   // 定位坐标
	    country:'--',  // 国家
	    province:'--', // 省
	    city:'--', // 市
	    area:'--', // 区
	    detailLocation:'--',// 国家、省、市、区
	    address:'--' // 详细地址
    }
    Object.assign(obj,newClient)
    // 设置行业
    obj['business'] = obj['businessLevel1']+obj['businessLevel2']
    // 国家、省、市、区
    obj['detailLocation'] = obj['country']+obj['province'] + obj['city']+ obj['area']
    // 详细地址
    obj['address'] = obj['locationInfo']
    arr.push(obj)
    fs.writeFileSync('./data/clientList.json', JSON.stringify(arr))
	res.send({
	    code: 0
	})
})

// 注册用户
app.post('/register',function(req,res){
	// 获取用户信息
	let userInfo = req.body
	// 用户文件
	let isExist = fs.existsSync('./data/clientUser.json')
	let arr = []
	let obj = {
		userName:userInfo.userName,
		password:userInfo.passwd,
		email:userInfo.email
	}
	if(isExist){
		// 读取文件 转换成对象
	    let d = fs.readFileSync('./data/clientUser.json')
	    if(d.toString()){
	      arr = JSON.parse(d);
	    }
	    let registered  = arr.some(function(item){
	    	return item.userName === userInfo.userName
	    })
	    if(registered){
	    	res.send({
	    		code:1,
	    		data:{
	    			message:'此用户已经注册，请直接登录'
	    		}
	    	})
	    	return
	    }else{
	    	arr.push(obj)
	    }
	}else{
		arr.push(obj)
	}
	 fs.writeFileSync('./data/clientUser.json', JSON.stringify(arr))
	 res.send({
	 	code:0
	 })
})

// 获取客户列表
app.post('/getLinkmanList',function(req,res){
	// 判断是否存在数据
	let isExist = fs.existsSync('./data/linkmanList.json')
	let arr = []
	if(isExist){
		let data = fs.readFileSync('./data/linkmanList.json')
		if(data.toString()){
			arr = JSON.parse(data)
		}
	}
	res.send({
		code:0,
		linkmanList:arr
	})
})

let host = 'localhost';
let port = 8888;
app.listen(port,host,() => {
	console.log('http://'+host+':'+port);
})

// 时间format
function dateFormat(){
	// 当前时间
	let date = new Date();
	// 年
	let year = date.getFullYear();
	// 月
	let month = date.getMonth() +1;
	// 日
	let day = date.getDate();
	// 时
	let hour = date.getHours();
	// 分
	let minutes = date.getMinutes();
	// 秒
	let seconds = date.getSeconds();
	return year + '/'+ addZero(month) +'/'+ addZero(day) +' '+ addZero(hour) +':'+ addZero(minutes) +':'+ addZero(seconds)
}

function addZero(n){
	return n < 10?'0'+n:n
}
