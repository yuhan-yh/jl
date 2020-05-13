<?php
function select(){
    //提前将$link处理成全局变量
    global $link;
    $sql = "SELECT * FROM jinli";
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
?>