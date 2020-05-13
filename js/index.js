
this.use = location.search.slice(1).split("=")[1];
sessionStorage.setItem("usename",this.use);
if(this.use){
    
 }else{
     location.href = "./pages/login.html"
 }

$(".tuichu").click(function(){
    location.href = "./pages/login.html?tui=1";
});
$("#shouji").prop("href",`./pages/shouji.html?use=${this.use}`)


//ES6轮播图封装
class lbt{
    //传进来的数据：图的盒子(盒子里面UL LI)、豆豆的盒子(盒子里面UL LI)、左右按钮
    constructor(imgbox,pagebox,leftclick,rightclick){
        this.imgbox=imgbox;
        this.pagebox=pagebox;
        this.leftclick=leftclick;
        this.rightclick=rightclick;
        this.set();
        this.move();
        this.hover();
    }
    set(imgbox){
       //其他img设置为none，第一个为block
       this.imgbox.find("li").eq(0).css({"display":"block"}).siblings().css({"display":"none"});
       var that=this;
            //根据img的数量创建豆豆
        for(var i=0;i<this.imgbox.find("li").length;i++){
            this.pagebox.children().append("<li></li>");
            //点哪个豆豆哪个豆豆亮其他不亮并且切换到相应图片
            let ii = i;
            this.pagebox.find("li").eq(i).click(
            function(){
                //此时this是li，也就是dom元素
               $(this).addClass("on").siblings().removeClass("on");
               that.imgbox.find("li").eq(ii).css({"display":"block"}).siblings().css({"display":"none"});
            }
        );
        
        }
        //给第一个加on
        this.pagebox.find("li").eq(0).addClass("on");
        //左右按钮
        this.leftClick();
        this.rightClick();
    }
    leftClick(){
        var that=this;
        this.leftclick.click(function(){
            //先判断当前img是否是最后一个或者是第一个
            var index = that.pagebox.find(".on").index();
            if(index==0){
                that.imgbox.find("li").stop().fadeOut(1000,function(){$(this).css({"display":"none"})}).last().stop().fadeIn(1000,function(){$(this).css({"display":"block"})});
                that.pagebox.find("li").removeClass("on").last().addClass("on");
            }else{
                that.imgbox.find("li").stop().fadeOut(1000,function(){$(this).css({"display":"none"})}).eq(index-1).stop().fadeIn(1000,function(){$(this).css({"display":"block"})});
                that.pagebox.find("li").removeClass("on").eq(index-1).addClass("on");
            }
            // that.move();
        });
    }
    rightClick(){
        var that=this;
        this.rightclick.click(function(){
            //先判断当前img是否是最后一个或者是第一个
            var index = that.pagebox.find(".on").index();
            console.log(index);
            
            if(index==that.pagebox.find("li").length-1){
                that.imgbox.find("li").eq(index).stop().fadeOut(1000,function(){$(this).css({"display":"none"})});
                that.imgbox.find("li").eq(0).stop().fadeIn(1000,function(){$(this).css({"display":"block"})});
                that.pagebox.find("li").removeClass("on").first().addClass("on");
            }else{
                that.imgbox.find("li").eq(index).stop().fadeOut(1000,function(){$(this).css({"display":"none"})});
                that.imgbox.find("li").eq(index+1).stop().fadeIn(1000,function(){$(this).css({"display":"block"})});
                that.pagebox.find("li").removeClass("on").eq(index+1).addClass("on");
            }
            // that.move();
        });
    }
    move(){
        var that=this;
        clearInterval();
        //设定时器
        this.jsq=setInterval(()=>{
            //当前img淡出后下一个img淡入,此处模拟右按钮功能
            // that.rightclick.trigger("click");
            var index = that.pagebox.find(".on").index();
            if(index==that.pagebox.find("li").length-1){
                that.imgbox.find("li").stop().fadeOut(1000,function(){$(this).css({"display":"none"})}).first().stop().fadeIn(1000,function(){$(this).css({"display":"block"})});
                that.pagebox.find("li").removeClass("on").first().addClass("on");
            }else{
                that.imgbox.find("li").stop().fadeOut(1000,function(){$(this).css({"display":"none"})}).eq(index+1).stop().fadeIn(1000,function(){$(this).css({"display":"block"})});
                that.pagebox.find("li").removeClass("on").eq(index+1).addClass("on");
            }
        },2000);
    }
    hover(){
        var that=this;
         //鼠标划入清除计时器，划出开启计时器
         $(".bannerslide").hover(
            function(){
                // console.log("鼠标划入");
                clearInterval(that.jsq);
            },
            function(){
                // console.log("鼠标划出");
                that.move();
            }
        );
    }
}
new lbt($(".banner"),$(".menu-page"),$(".arrowleft"),$(".arrowright"));

$.ajax({
    type:"GET",
    dataType:"json",
    url:"./php/remai.php",
    success:function(data){
        // console.log(data);
        var str ="";
        data.forEach(item=>{
            str+=`<li>
            <a href="./pages/xiangqing.html?goodsid=${item.goodsId}">
                <div class="hr-phoneimg">
                    <img class="after" src="${item.img.shouyeImg[0]}" alt="">
                    <img class="before" src="${item.img.shouyeImg[1]}" alt="">
                </div>
                <div class="hr-des">
                    <p class="hr-title">${item.name}</p>
                    <p class="hr-detail">${item.msg}</p>
                    <p class="hr-price">
                        <span class="hr-money">￥</span>
                        ${item.price}
                    </p>
                </div>
            </a>
        </li>`
        });
        $(".hr-right").html(str);
    }
});
$.ajax({
    type:"GET",
    dataType:"json",
    url:"./php/jingmei.php",
    success:function(data){
        var str ="";
        data.forEach(item=>{
            str+=`
        <li>
            <a href="./pages/xiangqing.html?goodsid=${item.goodsId}">
                <img src="${item.img.shouyeImg}" alt="">
                <div class="hr-des">
                    <p class="hr-title">${item.name}</p>
                    <p class="hr-detail">${item.msg}</p>
                    <p class="hr-price">
                        <span class="hr-money">￥</span>
                        ${item.price}
                    </p>
                </div>
            </a>
        </li>`
        });
        $(".eas").html(str);
    }
});