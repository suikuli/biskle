const express=require('express')
const secret = '!@#$%asd123tyu456^&*()_+'
const app = express()
const port = '8972'
app.use(express.json())
app.use(express.urlencoded({extended:true}));
var fs = require("fs")
userdata = JSON.parse(fs.readFileSync('users.json').toString())


//login========================================================
app.post('/api/login',(req,res)=>{
    const {acc,psw} = req.body;
    var inform = JSON.parse(fs.readFileSync('users.json').toString())
    for (let index = 0; index < inform.userdatas.length; index++) {
        if (acc == inform.userdatas[index].name && psw == inform.userdatas[index].password) {
            var uuidres = {"uuid":inform.userdatas[index].id}
        }
    }
    if (!uuidres) {
        res.status(200).json({msg:'用户名或密码错误'});
    }
    res.json(uuidres)
});

app.post('/api/login/confirm',(req,res)=>{
    const {uuid}=req.body;
    var inform = JSON.parse(fs.readFileSync('users.json').toString())
    for (let index = 0; index < inform.userdatas.length; index++) {
        if (uuid == inform.userdatas[index].id) {
            res.status(201).json({"state":"signed"});
        }
    }
    res.status(201).json({"state":"unvalid uuid"});
});

//api==========================================================
app.post('/api/wallet',(req,res)=>{
    const {uuid} = req.body;
    userdata = JSON.parse(fs.readFileSync('users.json').toString())
    for (let index = 0; index < userdata.userdatas.length; index++) {
        if (uuid == userdata.userdatas[index].id) {
            var goldinfo = {
                gold: userdata.userdatas[index].gold
            };
        }
    }
    if (!goldinfo) {
        res.status(400).json('no id in list');
    }
    res.json(goldinfo)
});
app.get('/api/seat',(req,res)=>{
    res.json('seats requested')
});
app.post('/api/account',(req,res)=>{
    const {uuid} = req.body;
    userdata = JSON.parse(fs.readFileSync('users.json').toString())
    for (let index = 0; index < userdata.userdatas.length; index++) {
        if (uuid == userdata.userdatas[index].id) {
            var user = {
                id: userdata.userdatas[index].id,
                name: userdata.userdatas[index].name,
            };
        }
    }
    if (!user) {
        res.status(400).json('no id in list');
    }
    res.status(200).json(user);
});


app.get('/api/monitor',(req,res)=>{
    var seatinfo=JSON.parse(fs.readFileSync('seat.json'))
    res.json(seatinfo);
});



//server=======================================================
let nextid=[]
app.get('/win11up.jpg',(req,res)=>{
    res.sendFile( 'win11up.jpg' )
});
app.get('/serene.jpg',(req,res)=>{
    res.sendFile( 'serene.jpg' )
});
app.get('/invertedworld.webp',(req,res)=>{
    res.sendFile( 'invertedworld.webp' )
});
app.get('/',(req,res)=>{
    res.sendFile( 'main.html' )
});
app.get('/login',(req,res)=>{
    res.sendFile( 'login.html' )
});
app.get('/admin_management',(req,res)=>{
    res.sendFile( 'admin.html' )
});
app.get('/admin_management/login',(req,res)=>{
    res.sendFile( 'login_admin.html' )
});
app.post('/admin_management/login/login',(req,res)=>{
    const {acc,psw} = req.body;
    if (acc == 'admin' && psw == '123456') {
        var uuidres = {"uuid":"123456789000"}
    }
    if (!uuidres) {
        res.status(200).json({msg:'用户名或密码错误'});
    }
    res.json(uuidres)
});

app.post('/admin_management/login/login/confirm',(req,res)=>{
    const {uuid}=req.body;
    var inform = JSON.parse(fs.readFileSync('users.json').toString())
    if (uuid == "123456789000") {
        res.status(201).json({"state":"signed"});
    }
    res.status(201).json({"state":"unvalid uuid"});
});



app.post('/lists',(req,res)=>{
    const {uuid} = req.body;
    unupdate=JSON.parse(fs.readFileSync('seat.json'))
    for (let index = 0; index < (unupdate.seatdatas.length); index++) {
        if (uuid == unupdate.seatdatas[index].uuid) {
            var user = {
                index: unupdate.seatdatas[index].index,
                price: unupdate.seatdatas[index].price
            };
        }
    }
    if (!user) {
        res.json({
            price:'没找到你的拍卖单提交记录呢'
        });
    }
    res.json(user)
});


app.post('/',(req,res)=>{
    const{index_req,price_req,uuid_req}=req.body;
    userdata = JSON.parse(fs.readFileSync('users.json').toString())
    reg_index1=/[1-6]/
    reg_index2=/[A-H]/
    reg_price=/\d+/
    flag=0
    flag2=0
    if (!uuid_req){
        res.status(200).json({state:'relogin'});
    }
    for (let index = 0; index < userdata.userdatas.length; index++) {
        if (uuid_req == userdata.userdatas[index].id) {
            var user = 1
            if (index_req==userdata.userdatas[index].previous) {
            var previousa=1
        }
        }
        
    }
    if (!user) {
        res.status(200).json({state:'relogin'});
    }else if (previousa==1){
        res.status(200).json({state:'previous'})
    }else if (!index_req){
        res.status(400).json('index undefined')
    }else if (!price_req){
        res.status(400).json('req undefined')
    }else if (!(index_req.length==2) || !(reg_index1.test(index_req[0])) ||!(reg_index2.test(index_req[1]))) {
        res.status(400).json('index unvalid')
    }else if (!(Number(price_req)% 1 == 0)) {
        res.status(400).json('price unvalid')
    }else if (!(Number(price_req)>=50)){
        res.status(400).json('price unvalid')
    }else{
    seatupdated=JSON.parse(fs.readFileSync('seat.json').toString())
    seathigest=JSON.parse(fs.readFileSync('msg.json').toString())
    var newreq={
        id:nextid++,
        uuid:uuid_req,
        index:index_req,
        price:price_req
    }
    for (let index = 0; index < (seatupdated.seatdatas.length); index++) {
        if (uuid_req == seatupdated.seatdatas[index].uuid) {
            seatupdated.seatdatas.splice(index,1)
        }
    }
    for (let index = 0; index < (seatupdated.seatdatas.length); index++) {
        if (index_req == seatupdated.seatdatas[index].index && Number(price_req)<=Number(seatupdated.seatdatas[index].price)) {
            var flag=1
            var higherprice = seatupdated.seatdatas[index].price
        }
    }
    for (let index = 0; index < userdata.userdatas.length; index++) {
        if (uuid_req == userdata.userdatas[index].id) {
            if (Number(price_req)>Number(userdata.userdatas[index].gold)) {
                var flag2 = 1
            }
        };
    }
    if (flag==1) {
        res.status(201).json({"state":"low_price",'higher':higherprice})
    }else if (flag2==1) {
        res.status(201).json({"state":"low_b"})
    }
    else if (Number(price_req)<Number(seathigest[uuid_req][index_req])) {
        res.status(201).json({"state":"low_self_price",'higher':seathigest[uuid_req][index_req]})
    }else{
        seathigest[uuid_req][index_req]=price_req
        seatupdated.seatdatas.push(newreq)
        console.log(JSON.stringify(seatupdated))
        fs.writeFileSync('msg.json', JSON.stringify(seathigest))
        fs.writeFileSync('seat.json', JSON.stringify(seatupdated))
        res.status(201).json({"state":"fine"})
    }
}
});
//run==========================================================
app.listen(port,()=>{
    console.log('server running at http://localhost:'+port)
})
