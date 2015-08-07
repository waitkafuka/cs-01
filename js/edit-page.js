$(document).ready(function () {
    //编辑头像
    $("#head-img,.edit-bt,.inp").click(function(){
        var targetID = $(this).attr("target");//对应目标模态框的ID
        var  target = $("#"+targetID);
        target.show();
        $("div.mask-page").show();
        adjust(target);
    });
    //关闭按钮
    $("div.edit-box div.title img,input.cancel-button,input.ok-button").click(function(){
        $(this).parents("div.edit-box").hide();
        $("div.mask-page").hide();
    });
});
