window.addEventListener('load', function () {
    // 只有加载完了 css 样式 再执行js代码
    var focus = document.querySelector('.focus');
    var arrowl = document.querySelector('.arrow-l');
    var arrowR = document.querySelector('.arrow-r');
    // 获取轮播图框的宽度
    var focuswidth = focus.offsetWidth;
    // 当鼠标经过的时候 左右按钮显示  且轮播图停止
    focus.addEventListener('mouseenter', function () {
        arrowl.style.display = 'block';
        arrowR.style.display = 'block';
        clearInterval(timer);
        timer = null;  // 清楚定时器
    })
    // 当鼠标离开的时候   且轮播图开启
    focus.addEventListener('mouseleave', function () {
        arrowl.style.display = 'none';
        arrowR.style.display = 'none';

        timer = setInterval(function () {
            // 手动调用点击事件
            arrowR.click();
        },2000)
    })

    // 动态生成小圆圈  有几张图片 就有几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    
    for (var i = 0; i < ul.children.length; i++){
        // 根据图片创建小圆圈
        var li = document.createElement('li');
        // 因为小li 需要传参 看看 点击的是哪个小圆圈 所以给他自定义设定一个属性
        li.setAttribute('index', i);
        ol.appendChild(li);
        ol.children[0].className = 'current'
        // 给每个小li 添加 一个点击事件  排他思想
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++){
               ol.children[i].className = ''
            }
            this.className = 'current';
            // 轮播图  就是 用 点击的index * 图片的宽度 就是focus 整个大框的移动距离 
            // 获取index的索引  index * 盒子的大小   正好可以切换图片
            var index = this.getAttribute('index');
            // 当我们点击了某个小li  就要把当前的小li 的索引号 给num
            num = index;
             // 当我们点击了某个小li  就要把当前的小li 的索引号 给circle
            circle = index;
            animate(ul, -index * focuswidth);
        })
    }
    // 克隆第一章图片（li）放到ul的最后面  true 是深克隆 
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击右侧按钮  图片滚动一张
    var num = 0;
    // 控制点击之后的小圆圈的播放
    var circle = 0;
    // flag 节流阀 就是让图片不被连续点击 必须要等到下一张图片执行完毕之后 再进行下一张图片
    var flag = true;
    arrowR.addEventListener('click', function () {
        if (flag) {
        flag = false;
        // 如果走到了最后复制的一张图片，此时，我们的ul 要快速复原left改为0
        if (num == ul.children.length-1) {
            ul.style.Left = 0;
            num = 0
        }
        num++;
        animate(ul, -num * focuswidth, function () {
                flag = true;
        });
        // 点击右侧按钮 ，小圆圈跟随一起变化  可以再声明一个变量控制小圆圈的播放
        circle++;
        // circle==克隆的最后一张图片的时候  让它为0 
        if (circle == ol.children.length) {
            circle = 0;
        }

        // 调用函数
        clear();
       }
    })
    // 点击上一张图片
    arrowl.addEventListener('click', function () {
        if (flag) {
            flag = false;
         // 如果num = 0 时  就让它跳去最后一张图片上面去
         if (num == 0) {
            num = ul.children.length - 1;
            ul.style.Left = -num * focuswidth + 'px';
        }
        num--;
            animate(ul, -num * focuswidth, function () {
                flag = true;
        });
        // 点击右侧按钮 ，小圆圈跟随一起变化  可以再声明一个变量控制小圆圈的播放
        circle--;
        // circle < 0  让它为  ol.children.length-1
        if (circle < 0) {
            circle = ol.children.length - 1;
        }
        // 调用函数
        clear();
        }
    })
    // 封装函数
    function clear() {
        
        for (var i = 0; i < ol.children.length; i++){
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    // 自动播放轮播图
    var timer = setInterval(function () {
        // 手动调用点击事件
        arrowR.click();
    },2000)
})