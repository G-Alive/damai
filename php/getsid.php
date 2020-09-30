<?php
header('content-type:text/html;charset=utf-8');
define('HOST','localhost');
define('USERNAME','root');
define('PASSWORD','root');
define('DBNAME','data2007');
$conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);
if($conn->connect_error){
die('数据库连接失败'.$conn->connect_error);
};
$conn->query('SET NAMES UTF8');

//解决跨域
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');

if (isset($_GET['sid'])) {
    $sid = $_GET['sid']; //接收首页传入的sid
    $result = $conn->query("select * from damai_list where sid=$sid");
    echo json_encode($result->fetch_assoc());
}
