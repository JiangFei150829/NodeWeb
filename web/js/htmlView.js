$(initView);
//初始化函数(html加载完成之后)
function initView() {
    initVue();
    initVueData();
}
//初始化vue
function initVue() {
    window.vueapp = new Vue({
        el: '#vueapp',
        data: {
            message: 'Hello word!',
            items: []
        }
    });
}
//初始化vue的数据
function initVueData() {
    $.ajax({
        url: '/getJson',
        type: 'GET',
        data: {
            cmd: "htmlView"
        },
        success: function(data) {
            vueapp.items = data.sites;
        },
        error: function(xhr, status, error) {},
    });
}
//按钮点击事件
function buttonClick() {
    window.location.href = "pageJump?page=test";
};