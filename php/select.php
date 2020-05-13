<?php
// print "我是select。php";
//调用数据库连接
include "sql.php";
//调用查询
include "sel.php";
echo json_encode(select());//把查询到的数据转json
?>