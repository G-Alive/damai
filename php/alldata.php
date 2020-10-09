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
// // CORS 解决跨域
//因为有了这两句话才解决了跨域问题
header('Access-Control-Allow-Origin:*');//跨域访问的域名，*表示所有
header('Access-Control-Allow-Method:POST,GET');//跨域支持的请求方式。
$sql = "select * from damai_list"; //获取所有的数据
$result = $conn->query($sql); //获取数据的结果集(记录集)
$arr = array();
for ($i = 0; $i < $result->num_rows; $i++) {
    $arr[$i] = $result->fetch_assoc();
}
echo json_encode($arr);//输出接口
