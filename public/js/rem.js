function remSize() {
    //获取设备的宽度
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth
    //控制设备的宽度：一般默认设计稿都是750px，如果超过就限制在750;也不能小于320
    if (deviceWidth >= 750) {
        deviceWidth = 750
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320
    }

    //设置字体大小
    //750px-->1rem=100px  375px--->1rem=50px
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
    // document.querySelector('body').style.fontSize = 0.3 + "rem"
}
//适配
remSize()


//实现窗口发生变化实现移动端适配
window.onresize = function () {
    //当窗口宽度发生变化的时候也要再次适配
    remSize()
}