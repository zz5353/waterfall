$(document).ready(function() {

    $(window).on("load", function() {
        imgLocation();
    });
    $(window).resize(function() {
        imgResetLocation();
        imgLocation();
    });
    $(window).scroll(function() {
        loadMore();
        imgLocation();
    });
});

function loadMore() {//加载更多
    var $box = $('.box');
    var lastboxHeight = $box.last().get(0).offsetTop;//获取最后一个.box文档顶部的距离
    var windowHeight = $(window).height();//当前窗口高度
    var scrollHeight = $(window).scrollTop();//鼠标滚动的距离
    if (scrollHeight + windowHeight > lastboxHeight) {
        var $box = $("<div>").addClass("box").appendTo($(".container"));
        $box.css({ "opacity": "0"});
        $box.animate({ "opacity": "1"}, 3000);//延时动画
        var $content = $("<div>").addClass("content").appendTo($box);
        var i = parseInt(20 * Math.random())+1;//随机加载图片
        $("<img>").attr("src", "./images/img (" + i + ").jpg").appendTo($content);
    }

}

function imgLocation() { //设置图片摆放位置
    var $box = $(".box");
    var boxWidth = $box.eq(0).width();
    var containerWidth = $('.container').width();
    var windowWidth = $(window).width();
    var numInRow = 0;
    if (windowWidth < containerWidth) { //判断窗口宽度是否小于容器宽度
        numInRow = Math.floor(windowWidth / boxWidth);
    } else {
        numInRow = Math.floor(containerWidth / boxWidth);
    }
    var boxArr = [];
    $box.each(function(index, value) {
        var boxHeight = $box.eq(index).height();
        if (index < numInRow) {
            boxArr[index] = boxHeight;
        } else {
            var minBoxHeight = Math.min.apply(null, boxArr); //获取最小高度
            var minBoxIndex = $.inArray(minBoxHeight, boxArr); //获取最小高度的索引
            $(value).css({ //设置css样式
                "position": "absolute",
                "top": minBoxHeight,
                "left": $box.eq(minBoxIndex).position().left
            });
            boxArr[minBoxIndex] += $box.eq(index).height();
        };
    });
}

function imgResetLocation() { //浏览器窗口宽度改变时，重置图片摆放位置
    var $box = $(".box");
    $box.each(function() {
        $(this).removeAttr("style");
    });
}
