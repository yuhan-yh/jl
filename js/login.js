$(".mdl").click(function(){
    $(this).css({"background":"url(/web/img/login/correct.png) no-repeat 95%"})
}
);
$(".fl").click(function(){
$(".fl").css({"color":"#ff9000"});
$(".fr").css({"color":"#888"});
$(".loginbox").css({"display":"block"});
$(".zhucebox").css({"display":"none"});
});
$(".fr").click(function(){
$(".fr").css({"color":"#ff9000"});
$(".fl").css({"color":"#888"});
$(".loginbox").css({"display":"none"});
$(".zhucebox").css({"display":"block"});
});
//检查有没有cookie，有的话免登陆，没有的话登陆
this.tui = location.search.slice(0).split("=")[0];
    if(this.tui){
        //清除cookie
        var d =new Date();
        d.setTime(d.getTime() + (-10 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString(-1);
        document.cookie =`jlusename=${$(".loginbox .usename").val()};${expires}`;
        location.href = "../pages/login.html";
    }
var ck = document.cookie.split("; ");
for(var i=0;i<ck.length;i++){
    var c = ck[i].split("=");
    // console.log(c);
    
    if(c[0]=="jlusename"){
        location.href=`../index.html?use=${c[1]}`
    }
    
}

//注册
class zhuce{
constructor(){
    this.reg();
}
reg(){
    var onoff1=0;
    var onoff2=0;
    //先验证手机号
    $(".zhucebox .usename").on("input",function(){
        // console.log($(".zhucebox .usename").val());
       if( /^1[3-9]+\d{9}$/.test($(".zhucebox .usename").val())){
        $(".zhucebox .usenamep span").css({"display":"none"});
        onoff1=1;
       }else{
        $(".zhucebox .usenamep span").css({"display":"block"});
        onoff1=0;
       }
    //    console.log(onoff1);
    });
    //再验证密码1
    $(".zhucebox .u1").on("input",function(){
        if( /^[a-z0-9]{8,16}$/.test($(".zhucebox .u1").val())){
        $(".zhucebox .up1 span").css({"display":"none"});
        onoff2=1;
       }else{
        $(".zhucebox .up1 span").css({"display":"block"});
        onoff2=0;
       }
       if($(".zhucebox .u2").val()==$(".zhucebox .u1").val()){
        $(".zhucebox .up2 span").css({"display":"none"});
        onoff2=1;
       }else{
        $(".zhucebox .up2 span").css({"display":"block"});
        onoff2=0;
       }
    //    console.log(onoff2);
       
    });
    //验证密码2
    $(".zhucebox .u2").on("input",function(){
        if($(".zhucebox .u2").val()==$(".zhucebox .u1").val()){
        $(".zhucebox .up2 span").css({"display":"none"});
        onoff2=1;
       }else{
        $(".zhucebox .up2 span").css({"display":"block"});
        onoff2=0;
       }
    //    console.log(onoff2);
    });
    //点击注册时，先验证输入框不为空，再验证onoff12都为1即可
    $(".zhuce").click(function(){
        if($(".zhucebox .usename").val()=="" || $(".zhucebox .u1").val()=="" || $(".zhucebox .u2").val()==""){
        alert("请输入手机号或密码！");
        }else{
            if(onoff1==1 && onoff2==1){
                $.ajax({
                    type:"POST",
                    dataType:"json",
                    data:{
                        m1:$(".zhucebox .usename").val()
                    },
                    url:"../php/select.php",
                    success:function(data){
                        // console.log(data);
                        var keyi=1;
                        for(var i=0;i<data.sucMsg.length;i++){
                            if($(".zhucebox .usename").val()==data.sucMsg[i].name){
                                keyi=0;
                               return alert("此用户已被注册!")
                            }
                        }
                        if(keyi==1){
                            $.ajax({
                                type:"POST",
                                dataType:"json",
                                data:{
                                    m1:$(".zhucebox .usename").val(),
                                    m2:$(".zhucebox .u1").val()
                                },
                                url:"../php/insert.php",
                                success:function(data){
                                    // console.log(data);
                                    alert("注册成功赶快去登录吧");
                                    location.reload();
                                }
                            });
                        }
                        
                    }
                });
                
            }else{
                alert("请输入正确的手机号或密码")
            }
        }
    });
}

}   
new zhuce();
class login{
    constructor(){
        this.lg();
    }
    lg(){
        // console.log($(".loginbox .usename").val());
        $(".login").click(function(){
            //输入框不能为空
            if($(".loginbox .usename").val()=="" || $(".loginbox .usepass").val()==""){
                alert("用户名或密码不能为空！");
            }else{
                $.ajax({
                    type:"POST",
                    dataType:"json",
                    url:"../php/select.php",
                    data:{
                        m1:$(".loginbox .usename").val(),
                        m2:$(".loginbox .usepass").val()
                    },
                    success:function(data){
                        // console.log(data);
                        var cunzai=1;
                        for(var i=0;i<data.sucMsg.length;i++){
                            //先验证有没有此用户
                            if($(".loginbox .usename").val()==data.sucMsg[i].name){
                                if($(".loginbox .usepass").val()==data.sucMsg[i].pass){
                                    alert("成功登陆！");
                                    //如果用户选了十天 免登陆,那么就要保存此用户到cookie
                                    if($(".loginbox #checkbox1").prop("checked")){
                                        console.log("要保存cookie");
                                        var d =new Date();
                                        d.setTime(d.getTime() + (10 * 24 * 60 * 60 * 1000));
                                        var expires = "expires=" + d.toGMTString();
                                        document.cookie =`jlusename=${$(".loginbox .usename").val()};${expires}`;
                                    }
                                    
                                    //跳转到主页面
                                    return location.href=`../index.html?use=${$(".loginbox .usename").val()}`;
                                }else{
                                   return alert("密码错误！");
                                }
                            }else{
                                cunzai=0;//不存在此用户
                            }
                        }
                        if(cunzai==0){
                            alert("此用户不存在，请注册！");
                        }
                    }
                });
            }
        });
    }
}
new login();