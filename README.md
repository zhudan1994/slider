# slider
移动端幻灯片效果
用法：
```
var slider = new Slider({
	 container: '#list', // 幻灯片的外层容器
	 item: '#list li',//每个图片包裹的外层容器
	 nav: "#nav span", // 每个圆点选择器
	 activeClass: "active", // 圆点激活样式
	 duration: 3000, // 每张图片停留的时间
	 speed: 1000, // 图片移动的速度
	 autoPlay: true // 是否自动播放
});
slider.slide();
```
实例：
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
	<title>Document</title>
	<style type="text/css">
	    *{
	    	margin: 0;
	    	padding: 0;
	    }
	    html,body{
	    	width: 100%;
	    	height: 100%;
	    }
		#wrap{
			overflow: hidden;
			position: relative;
		}
		#list {
			position: absolute;
			left: 0;
			top: 0;
			list-style: none;
		}
		#list li {
			float: left
		}
		#list img {
			width: 100%;
			display: block;
		}
		#nav {
			position: absolute;
			left: 0;
			bottom: 3px;
			width: 100%;
			line-height: 10px;
			text-align: center;
		}
		#nav span {
			display: inline-block;
			width: 10px;
			height: 10px;
			background: #c00;
			border-radius: 50%;
		}
		#nav .active {
			background: green;
		}
	</style>
</head>
<body>
	<div id="wrap">
		<ul id="list">
			<li>
				<a href="">
					<img src="img/1.jpg">
				</a>
			</li>
			<li>
				<a href="">
					<img src="img/2.jpg">
				</a>
			</li>
			<li>
				<a href="">
					<img src="img/3.jpg">
				</a>
			</li>
			<li>
				<a href="">
					<img src="img/4.jpg">
				</a>
			</li>
			<li>
				<a href="">
					<img src="img/5.jpg">
				</a>
			</li>
		</ul>
		<nav id="nav">
			<span class="active"></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</nav>
	</div>
	<script type="text/javascript" src="slider.js"></script>
	<script type="text/javascript">

        window.onload = function () {
        	var slider = new Slider({
	        	container: '#list',
	        	item: '#list li',
	        	nav: "#nav span",
	        	activeClass: "active",
	        	duration: 3000,
	        	speed: 1000,
	        	autoPlay: true
	        });
	        slider.slide();

        }
	</script>
</body>
</html>
```
