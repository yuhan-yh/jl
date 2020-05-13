<?php
// print "我是insert.php";
    $m1 = $_REQUEST["m1"];
    $m2 = $_REQUEST["m2"];
    $m3 = $_REQUEST["m3"];
    $m4 = $_REQUEST["m4"];
    //@表示就算出错了也不报错
   //封装连接数据库功能
   include "sql.php";//调用
   $sql = "INSERT jinlishopcar (usename,goodsid,price,num) VALUES('".$m1."','".$m2."',".$m3.",".$m4.")";
    $res = mysqli_query($link, $sql);//插入数据
    if($res){
        //如果成功插入数据,查询mysql中数据并将数据返回
        function select(){
            //提前将$link处理成全局变量
            global $link;
            $sql = "SELECT * FROM jinlishopcar";
            $res = mysqli_query($link,$sql);//查询数据
            if($res){
                //成功查询的话，先准备一个大数组
                $bigArr = array();
                //每次解析出一条数组，push进大数组
                while(true){
                    $arr = mysqli_fetch_assoc($res);
                    if(!$arr){
                    break;
                    }
                    array_push($bigArr,$arr);
                }
                $data = array("code"=>1,"errMsg"=>"","sucMsg"=>$bigArr);
            } else{
                $data = array("code"=>3,"errMsg"=>"请求失败","sucMsg"=>"");
            }
            return $data;
        }
        echo json_encode(select());
    }else{
        //插入失败返回下面的data
        $data = array("code"=>2,"errMsg"=>"插入失败","sucMsg"=>"");
        echo json_encode($data);
    }
    // code:
    //     0:数据库连接或选择失败
    //     1：成功
    //     2：插入失败
    //     3：查询失败
     
?>