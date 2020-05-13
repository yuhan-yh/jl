<?php
$link = @mysqli_connect("localhost:3306","root","123456","yh");
if(!$link){
    //失败的状态信息
    $data = array("code"=>0,"errMsg"=>"数据路径选择失败","sucMsg"=>"");
    die(json_encode($data));//将数值转成json形式返回
}
?>