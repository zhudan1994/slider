 // 无缝连接思想：复制该组图片，使得在第一张图片时跳转到第二组的第一张图片， 使得在第二组的最后一张图片时跳转到第一组的最后一张图片

/**
 * [Slider 移动端的轮播图插件]
 * @param {[type]} options [description]
 * container: 外层容器
 * item: 每项图片的容器选择器
 * nav: 圆点的选择器
 * duration: 每张幻灯片停留时间
 * speed： 图片切换速度
 * autoPlay： 是否自动播放
 * activeClass： 圆点激活样式
 */
 function Slider(options) {
     this.container = document.querySelector(options.container);
     this.container.innerHTML += this.container.innerHTML;
     this.items = document.querySelectorAll(options.item);
     this.nav = document.querySelectorAll(options.nav);
     this.duration = options.duration || 3000;
     this.speed = options.speed || 500;
     this.activeClass = options.activeClass || "active";
     this.autoPlay = options.autoPlay || true;
     this.timer = null;
     this.currentIndex = 0;
     this.translateX = 0;
     this.startX = 0;
     this.startPoint = 0;
 }
 Slider.prototype = {
     constructor: Slider,
     init: function() {
         this.container.parentNode.style.height = this.items[0].offsetHeight + "px";
         this.container.style.width = this.items.length + "00%";
         for (var i = 0; i < this.items.length; i++) {
             this.items[i].style.width = 100 / this.items.length + "%";
         }
     },
     slide: function() {
         var _this = this;
         var wrap = this.container.parentNode;

         function tab() {
             _this.container.style.transition = _this.speed + "ms";
             _this.container.style.transform = "translateX(" + -_this.currentIndex * wrap.offsetWidth + "px)";
             _this.container.style.WebkitTransform = "translateX(" + -_this.currentIndex * wrap.offsetWidth + "px)";
             _this.translateX = -_this.currentIndex * wrap.offsetWidth;
             for (var i = 0; i < _this.nav.length; i++) {
                 _this.nav[i].className = "";
             }
             _this.nav[_this.currentIndex % _this.nav.length].className = _this.activeClass;
         }

         function autoPlay() {
             clearInterval(_this.timer);
             _this.timer = setInterval(function() {
                 if (_this.currentIndex == _this.items.length - 1) {
                    _this.currentIndex = _this.nav.length - 1;
                 }
                _this.container.style.transition = "none";
                _this.container.style.transform = "translateX(" + -_this.currentIndex * wrap.offsetWidth + "px)";
                _this.container.style.WebkitTransform = "translateX(" + -_this.currentIndex * wrap.offsetWidth + "px)";
                _this.translateX = -_this.currentIndex * wrap.offsetWidth;
                 // 此处延时是为了阻止transition被覆盖产生动画效果
                 setTimeout(function() {
                     _this.currentIndex++;
                     tab();
                 }, 30);
             }, _this.duration);
         }
         // 阻止手机默认事件
         document, addEventListener("touchstart", function(e) {
             e.preventDefault(); 
         }, false);
         wrap.addEventListener("touchstart", function(e) {
             clearInterval(_this.timer);
             _this.currentIndex = Math.round(Math.abs(_this.translateX / wrap.offsetWidth));
             if (_this.currentIndex == 0) {
                 _this.currentIndex = _this.nav.length;
             }
             if (_this.currentIndex == _this.items.length - 1) {
                 _this.currentIndex = _this.nav.length - 1;
             }
             _this.container.style.transition = "none";
             _this.container.style.transform = "translateX(" + -_this.currentIndex * wrap.offsetWidth + "px)";
             _this.container.style.WebkitTransform = "translateX(" + -_this.currentIndex * wrap.offsetWidth + "px)";
             _this.startPoint = e.changedTouches[0].pageX;
             _this.startX = -_this.currentIndex * wrap.offsetWidth;
         }, false);
         wrap.addEventListener("touchmove", function(e) {
             var endPoint = e.changedTouches[0].pageX;
             var distX = endPoint - _this.startPoint;
             _this.translateX = distX + _this.startX;
             _this.container.style.transition = "none";
             _this.container.style.transform = "translateX(" + _this.translateX + "px)";
             _this.container.style.WebkitTransform = "translateX(" + _this.translateX + "px)";
         });
         wrap.addEventListener("touchend", function(e) {
             _this.currentIndex = Math.round(Math.abs(_this.translateX / wrap.offsetWidth));
             tab();
             if (_this.autoPlay) {
                 autoPlay();
             }
         }, false);

         _this.init();
         if (_this.autoPlay) {
             autoPlay();
         }
     }
 }
