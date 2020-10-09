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


//检测用户名是否重名
if (isset($_POST['username'])) {
    $user = $_POST['username'];
    $result = $conn->query("select * from registrydamai where username='$user'");
    if ($result->fetch_assoc()) { //存在
        echo true; //1
    } else {
        echo false; //空
    }
}

//接收前端表单提交的数据
if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = sha1($_POST['password']);
    $repass = sha1($_POST['repass']);
    $email = $_POST['email'];
    $conn->query("insert registrydamai values(null,'$username','$password','$repass','$email',NOW())");
    header('location:http://192.168.13.45/damai/src/login.html');
}
