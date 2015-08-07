/**
 * Created by Administrator on 15-8-4.
 */
$(document).ready(function(){
    //左侧导航折叠展开
    $("div.container-left").delegate("h6","click",function(){
        //执行完之后外层div高度变了，要调整一下高度
        $(this).next("ul").slideToggle(200);
        //slideToggle的回调函数不能实时获取新高度，只能用折衷办法：延时在slideToggle方法之后执行
        setTimeout(heightAdjust,201);
    });
    //给左侧导航绑定点击事件，展开相应题目
    $("ul.question-nav").delegate("li","click",function(){
        //传递对象过去是为了获取题目的ID
        showQuestion($(this));
    });
    //给打字开始按钮绑定事件，显示文本框
    $("#type-start-bt").click(function(){
        $("#type-area").show();
    });
});
function showQuestion(obj){
    //ID只在获取试题时有用
    var questionId = obj.attr("questionId");
    var target = obj.parent("ul.question-nav").attr("target");
    console.log(target);
    //先隐藏当前显示的
    $("div.question-item:visible").hide();
    //然后显示点击的题目
    $("div."+target).show();
}
