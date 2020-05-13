<?php
// print "我是insert.php";
    //接收传进来的数据
    $m1 = $_REQUEST["m1"];
    $m2 = $_REQUEST["m2"];
    //@表示就算出错了也不报错
   //封装连接数据库功能
   include "sql.php";//调用
   $sql = "INSERT jinli (name,pass) VALUES('".$m1."',".$m2.")";
    $res = mysqli_query($link, $sql);//插入数据
    if($res){
        //如果成功插入数据,查询mysql中数据并将数据返回
        include "sel.php";
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