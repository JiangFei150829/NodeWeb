function AlertTool() {} 
layer.config({
    extend: 'myalert/layer.css',
    skin: 'alert-message'
});
//弹出页面
AlertTool.prototype.PopView = function(title, width, height, path, colseCallBack) {
    layer.open({
        type: 2,
        title: title,
        maxmin: true,
        shadeClose: false, //点击遮罩关闭层
        area: [width, height],
        content: path,
        resize: false,
        end: colseCallBack
    });
}
//信息提示框
AlertTool.prototype.Message = function (message) {
    message = "<i class='layui-icon layui-icon-tips' style='font-size: 22px;color: #FFB800;position:relative;top:3px;rigth:5px;'></i> " + message;
    layer.alert(message, { closeBtn: 0, skin: 'alert-message', btnAlign: 'c' });
}
//是否确定执行某个动作
AlertTool.prototype.Select = function (title, confirmCallBack) {
    title = "<i class='layui-icon layui-icon-tips' style='font-size: 22px;color: #FFB800;position:relative;top:3px;rigth:5px;'></i> " + title;
    layer.open({
        content: title,
        btn: ['确认', '取消'], 
        closeBtn: 0,
        btnAlign: 'c',
        skin: 'alert-message',
        yes: function (index, layero) {
            layer.close(layer.index);
            if (confirmCallBack)confirmCallBack();
        },
        btn2: function (index, layero) {

        },
        cancel: function () {
        }
    });
}
//操作成功提示
AlertTool.prototype.Success = function(message, colseCallBack) {
    layer.msg(message, {
        icon: 1,
        time: 500 //0.5秒关闭（如果不配置，默认是3秒）
    }, function () {
        if(colseCallBack) colseCallBack();
    });
}