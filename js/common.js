$(document).ready(function () {
    //给资料不完整的提示信息绑定关闭事件
    $("#warn-close").click(function () {
        $(".warn-msg-box").remove();
    });
    //鼠标放到用户头像上，展开登出按钮
    $("#username").mouseover(function () {
        $(".sign-out-box").show();
        $("span#username").children("img").attr("src", "../../img/icon_12.png");
    });
    $("#username").mouseout(function () {
        $(".sign-out-box").hide();
        $("span#username").children("img").attr("src", "../../img/icon_09.png");
    });
    //排序按钮绑定事件
    $(".sort-box").click(function () {
        var flag = $(this).attr('flag');
        if (flag == 'down') {
            $(this).children('img').attr('src', '../../img/sort_up_01.png');
            $(this).attr('flag', 'up')
        } else {
            $(this).children('img').attr('src', '../../img/sort_down_01.png');
            $(this).attr('flag', 'down');
        }
    });
    //我的任务详情页展开收起事件
    $(".spread-button").click(function () {
        var flag = $(this).attr("flag");//0是展开状态
        var current_tab = $(this).prevAll("span.current-project-tab").attr("target");//项目详情页变成了多tab形式，这里补上当前tab参数
        if ("0" == flag) {
            $(this).children("span").text("展开");
            $(this).children("img").attr("src", "../../img/icon_09.png");
            //隐藏div
            $(this).parent().nextAll("ul:first,h5:first,table:first").slideToggle(300);//这是为我的任务详情页面准备的
            //为项目详情页面准备的
            $("#" + current_tab).slideToggle(300);
            $(this).attr("flag", "1");
        } else {
            $(this).children("span").text("收起");
            $(this).children("img").attr("src", "../../img/icon_12.png");
            $(this).parent().nextAll("ul:first,h5:first,table:first").slideToggle(300);//这是为我的任务详情页面准备的
            $("#" + current_tab).slideToggle(300);//项目详情页面的展开
            //显示div
            $(this).attr("flag", "0");
        }
    });
    //项目详情页新增的tab切换方式
    $("div.pro-item-title").delegate("span.horizon-tab-group", "click", function () {
        //先隐藏所有的子项目框体
        $("div.item-box-01").hide();
        //显示点击对应的框体
        var targetId = $(this).attr("target");
        $("#" + targetId).show();
        //先取消所有点击框的背景
        $("span.current-project-tab").removeClass("current-project-tab");
        //然后给当前点击框添加背景
        $(this).addClass("current-project-tab");
        //设置展开文本和箭头
        $(this).nextAll(".spread-button").child("span").text("收起");
        $(this).nextAll(".spread-button").child("img").attr("src", "../../img/icon_12.png");
        return false;
    });
    //页面左右div高度自适应
    heightAdjust();
    //职业评测页面，点击答案文本也可以选中该答案
    $("div.test-list").delegate("span", "click", function () {
        //先把其他选中状态取消掉
        $(this).prev("input").trigger("click");
        return false;
    });
});
//个人资料页的高度自适应问题
function heightAdjust() {
    //个人资料页，使左边的导航栏高度和右边的一样。因为右边的高度是不固定的，这样可以让左边的div背景色高度和右边一致
    //改动：始终使小的跟随大的高度
    var left_height = $("div.container-left").height();
    var right_height = $("div.container-right").height();
    var main_height = $("div.main-content").height();
    console.log(main_height);
    console.log("左侧：" + left_height);
    console.log("右侧：" + right_height);
    if (left_height < right_height) {
        $("div.container-left").height(right_height);
    } else if (left_height > right_height) {
        $("div.container-right").height(left_height);
    }
}
//数据加载中图片显示
function showLoadingImg() {
    $("div.data-loading").show();
    //图片居中
    var img = $("div.data-loading img");
    var left = windowWidth() / 2 - (img.width() / 2);
    var top = windowHeight() / 2 - (img.height() / 2);
    $("div.data-loading img").css({top: top + "px", left: left + "px"});
}
//隐藏加载中的图片
function hideLoadingImg() {
    $("div.data-loading").hide();
}
var code_time = 60;//60s后再次获取
var code_timer;//定义定时器
//发送验证码按钮计时器
function count(o) {
    if (code_time == 0) {
        o.removeAttribute('disabled');
        o.value = "获取验证码";
        clearInterval(code_timer);
        code_time = 60;
    } else {
        o.setAttribute("disabled", true);
        o.value = code_time + "秒后重新发送";
        code_time--;
        code_timer = setTimeout(function () {
            count(o);
        }, 1000);
    }
}

/**自定义弹出框
 *
 * @param title:框体标题
 * @param content：提示内容，可自定义html标签
 * @param height:可选。重新设置框体高度
 * @param callBack:可选。无参数的回调函数
 */
function alertTips(title, content, callBack) {
    $("div.mask-page").show();
    $("div#alertTips-box #tip-title").html(title);
    $("div#alertTips-box #tips-content").html(content);
    adjust($("div#alertTips-box"));
    $("div#alertTips-box").show();
    if (callBack) {
        //把callBack函数绑定到确定按钮上
        $("div#alertTips-box").delegate("#alert-ok-bt", "click", function () {
            callBack();
            $("div.mask-page,div#alertTips-box").hide();
        });
    }
}
/* 定位到页面中心 */
function adjust(obj) {
    var w = obj.width();
    var h = obj.height();
    var t = scrollY() + (windowHeight() / 2) - (h / 2);
    if (t < 0) t = 0;

    var l = scrollX() + (windowWidth() / 2) - (w / 2);
    if (l < 0) l = 0;

    obj.css({left: l + 'px', top: t + 'px'});
}

//浏览器视口的高度
function windowHeight() {
    var de = document.documentElement;
    return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
}

//浏览器视口的宽度
function windowWidth() {
    var de = document.documentElement;

    return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth
}

/* 浏览器垂直滚动位置 */
function scrollY() {
    var de = document.documentElement;

    return self.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;
}

/* 浏览器水平滚动位置 */
function scrollX() {
    var de = document.documentElement;

    return self.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
}