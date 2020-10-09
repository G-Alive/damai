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


if (isset($_POST['user']) && isset($_POST['pass'])) {
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $result = $conn->query("select * from registrydamai where username='$user' and password='$pass'");
    if ($result->fetch_assoc()) { //匹配成功
        echo true;
    } else { //匹配不成功
        echo false;
    }
}
