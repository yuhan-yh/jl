var id=location.search.split("=")[1];
//动态数据的渲染
var usename = sessionStorage.getItem("usename");
function display(){
    //功能特色，参数规格那三个盒子的切换
    $(".vi_tab_options li").click(function(){
        $(this).addClass("curr").siblings().removeClass("curr");
        $(".vi_tab_con .vi_tab_item").eq($(this).index()).css({"display":"block"}).siblings().css({"display":"none"});
    });
        //商品数量
        //每次点击先获取输入框内容
        $("#ui_quantity_redu").unbind();
        $("#ui_quantity_redu").click(function(event){
            
            var num = parseInt($(".ui_quantity_num").val());
            if(num>0){
                num--;
                change(num);
            }else{
                $(".ui_quantity_num").val(0);
            }
            event.stopPropagation();
        });
        $("#ui_quantity_add").unbind();//因为ajax时成功的触发click事件，这样的话会触发两次click也就变成一下子+2，这个可以取消
        $("#ui_quantity_add").click(function(event){
            var num = parseInt($(".ui_quantity_num").val());
            if(num>0 || num==0){
                num++;
                change(num);
            }else{
                $(".ui_quantity_num").val(0);
            }
            event.stopPropagation();
        });
        $(".ui_quantity_num").on("input",function(event){
            var num = parseInt($(".ui_quantity_num").val());
            if(num>0 || num==0){
                change(num);
            }else{
                change(0);
            }
            event.stopPropagation();
        });
        function change(num){
            // console.log(num+".");
            $(".ui_quantity_num").val(num);
            $("#infoProduct").html($("#goodName").html());
            $("#infoProductNum").html(num);
            $("#infoProductTotal").html(num*parseInt($("#JgoodsPrice").html()));
        }
        $(".item li").click(function(){
            $(this).addClass("curr").siblings().removeClass("curr");
            $(".vi_imgs_big img").eq($(this).index()).css({"display":"block"}).siblings().css({"display":"none"});
            $(".fdj img").eq($(this).index()).css({"display":"block"}).siblings().css({"display":"none"});
            $(".zzc").css({"display":"block"});
            $(".vi_imgs_big p").css({"display":"block"});
            var zuo_box=$(".vi_imgs_big");
            var zuo_img=$(".vi_imgs_big img").eq($(this).index());
            var zuo_span=$(".zzc");
            var you_box=$(".fdj");
            var you_img=$(".fdj img").eq($(this).index());
            var t = new Large(zuo_box[0],zuo_img[0],zuo_span[0],you_box[0],you_img[0]);
            t.addEvent();
        });
        //加入购物车
        
        $(".btn_addCart_dis").unbind();
        $(".btn_addCart_dis").click(
            function(){
                //获取数据然后保存到数据库
                $.ajax({
                    type:"POST",
                    url:"../php/addgoods.php",
                    data:{
                        m1:usename,
                        m2:id,
                        m3:$("#JgoodsPrice").html(),
                        m4:$("#iptQuantityQum").val()
                    },
                    dataType:"json",
                    success:function(data){
                        alert("成功加入购物车");
                    }

                });

                
            }
        );
        //放大镜
        class Large{
            constructor(zuo_box,zuo_img,zuo_span,you_box,you_img){
                this.zuo_box = zuo_box;
                this.zuo_img = zuo_img;
                this.zuo_span = zuo_span;
                this.you_box = you_box;
                this.you_img= you_img;
            }
            addEvent(){
                var that = this;
                this.zuo_box.onmouseover = function(){
                    that.over();
                }
                this.zuo_box.onmousemove = function(e){
                    var e = e || window.Event;
                    that.move(e);
                }
                this.zuo_box.onmouseout = function(){
                    that.out();
                }
    
            }
            over(){
                this.zuo_span.style.display = "block";
                this.you_box.style.display = "block";
            }
            move(e){
                // 计算遮罩层跟随鼠标移动时的left和top
                var l = e.offsetX - this.zuo_box.offsetLeft - this.zuo_span.offsetWidth/2;
                var t = e.offsetY - this.zuo_box.offsetTop - this.zuo_span.offsetHeight/2;
                if(l<0){l = 0;}//边界
                if(t<0){t = 0;}
                if(l > this.zuo_box.offsetWidth - this.zuo_span.offsetWidth){
                    l = this.zuo_box.offsetWidth - this.zuo_span.offsetWidth;
                }
                if( t > this.zuo_box.offsetHeight - this.zuo_span.offsetHeight){
                    t = this.zuo_box.offsetHeight - this.zuo_span.offsetHeight;
                }
                this.zuo_span.style.left = l+"px";
                this.zuo_span.style.top = t + "px";
                //计算右边box
                var x = l/(this.zuo_box.offsetWidth - this.zuo_span.offsetWidth);
                var y = t/(this.zuo_box.offsetHeight - this.zuo_span.offsetHeight);
                this.you_img.style.left = x*(this.you_box.offsetWidth - this.you_img.offsetWidth) +"px";
                this.you_img.style.top = y*(this.you_box.offsetHeight - this.you_img.offsetHeight) +"px";
    
            }
            out(){
                this.zuo_span.style.display = "none";
                this.you_box.style.display = "none";
            }
        }
        $(".item li").eq(0).click();
};
$.ajax({
    type:"GET",
    dataType:"json",
    url:"../php/xiangqing.php",
    success:function(data){
        for(var i=0;i<data.length;i++){
            if(data[i].goodsId==id){
                // console.log(data[i]);
                var str="";
                str+=`
                <img src="${data[i].img.largeImg[0]}" >
                <img src="${data[i].img.largeImg[1]}" alt="" style="display: none;">
                <img src="${data[i].img.largeImg[2]}" alt="" style="display: none;">
                <img src="${data[i].img.largeImg[3]}" alt="" style="display: none;">
                <img src="${data[i].img.largeImg[4]}" alt="" style="display: none;">
                <span class="zzc"></span>
                <p></p>`;
                $(".vi_imgs_big").html(str);
                var svr="";
                svr+=`
                <img src="${data[i].img.largeImg[0]}" alt="金立TC-G300快速充电器">
                <img src="${data[i].img.largeImg[1]}" alt="" style="display: none;">
                <img src="${data[i].img.largeImg[2]}" alt="" style="display: none;">
                <img src="${data[i].img.largeImg[3]}" alt="" style="display: none;">
                <img src="${data[i].img.largeImg[4]}" alt="" style="display: none;">`;
                $(".fdj").html(svr);
                var sjr="";
                sjr+=`
                    <ul class="item">
                        <li class="curr"><img src="${data[i].img.smallImg[0]}" alt=""></li>
                        <li><img src="${data[i].img.smallImg[1]}" alt=""></li>
                        <li><img src="${data[i].img.smallImg[2]}" alt=""></li>
                        <li><img src="${data[i].img.smallImg[3]}" alt=""></li>
                        <li><img src="${data[i].img.smallImg[4]}" alt=""></li>
                    </ul>`;
                $(".panel").html(sjr);
                var sqr="";
                sqr+=`
                <h1 class="name" id="goodName">${data[i].name}</h1>
                <p class="slogan">${data[i].msg}</p>
                <div class="w3_goods_infos">
                    <div class="price">
                        <span class="ue_jstfy">现价</span>
                        <em class="z w3_mr">：</em>
                        <span class="price_sale">
                            <em>￥</em>
                            <span id="JgoodsPrice">${data[i].price}</span>
                        </span>
                    </div>
                </div>
                <dl class="vi_attribute">
                    <dt class="lbl">
                        <span class="ue_jstfy">颜色</span>
                        <em class="z">：</em>
                    </dt>
                    <dd class="cont">
                        <span class="vi_color curr">
                            <img src="${data[i].img.smallImg[0]}" alt="${data[i].msg}">
                            <b class="sel"></b>
                        </span>
                    </dd>
                </dl>
                <dl class="vi_quantity">
                    <dt class="lbl jstfy">
                        <span class="ue_jstfy">购买数量</span>
                        <em class="z">：</em>
                    </dt>
                    <dd class="cont">
                        <div class="ui_quantity" id="Jquantity">
                            <div class="ui_quantity_redu ui_quantity_redu_dis" id="ui_quantity_redu"></div>
                            <input type="text" class="ui_quantity_num" id="iptQuantityQum" value="1" >
                            <div class="ui_quantity_add" id="ui_quantity_add"></div>
                        </div>
                    </dd>
                </dl>`;
                $(".vi_sumary").html(sqr);
                var swr="";
                swr+=`
                <p class="book_infos">
                    <span class="lbl">您已选择：</span>
                    <span id="infoProduct">${data[i].name}</span>
                    <span id="infoProductNum">1</span>
                    件 总计: ￥<span id="infoProductTotal">${data[i].price}</span>
                    元
                </p>
                <div class="op">
                    <a class="btn_addCart btn_addCart_dis" id="JbtnAddCart">加入购物车</a>
                    <div class="bdsharebuttonbox bdshare-button-style0-16">
                        <span>分享到：</span>
                        <a href="" class="bds_qzone style0-16" title="分享到QQ空间"></a>
                        <a href="" class="bds_tsina style0-16" title="分享到新浪微博"></a>
                        <a href="" class="bds_tqq style0-16" title="分享到腾讯微博"></a>
                        <a href="" class="bds_more style0-16" ></a>
                    </div>
                </div>`;
                $(".buy_area").html(swr);
                var ser="";
                ser+=`
                <p>
                <img src="${data[i].gnts[0]}" alt="">
                <img src="${data[i].gnts[1]}" alt="">
                <img src="${data[i].gnts[2]}" alt="">
                <img src="${data[i].gnts[3]}" alt="">
                <img src="${data[i].gnts[4]}" alt="">
                <img src="${data[i].gnts[5]}" alt="">
            </p>`;
            $(".vi_tab_info").html(ser);
            }
            display();
        }
    }
});


 
    