let app = {

    init() {
        var _this = this
        this.getData(function (data) {
            _this.render(data)
            _this.bindEvent(data)
        })
    },
    getData(callback) {
        let xhr = new XMLHttpRequest()
        xhr.open('get', 'http://api.jirengu.com/getWeather.php', true)
        xhr.send()
        xhr.onload = function () {
            callback(JSON.parse(xhr.responseText))
        }
    },
    render(data) {
        var date = new Date(data.date)
        $('.date1').innerText = date.getMonth() + 1 + "月" + date.getDate() + "日"
        $('.city1').innerText = data.results[0].currentCity
        $('.left .wendu').innerText = data.results[0].weather_data[0].date.match(/-?\d+℃/)
        $('.tu1').src = data.results[0].weather_data[0].dayPictureUrl
        setInterval(function () {
            var time = new Date()
            $('.shijian').innerText = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
        }, 1000)
        $$('.right ul li .date1').forEach(function (item, index) {

            item.innerText = data.results[0].weather_data[index + 1].date
        })
        $$('.right ul li img').forEach(function (item, index) {

            item.src = data.results[0].weather_data[index + 1].dayPictureUrl
        })
        $('.span').innerText = "PM25:" + data.results[0].pm25
        $('.tishi2').innerText = data.results[0].index[0].des
    },
    bindEvent(data) {
        $$('.tishi li').forEach(function (item, index) {
            item.onclick = function () {
                $$('.tishi li').forEach(function (node) {
                    node.classList.remove('bottom')
                })
                item.classList.add('bottom')
                var str = item.innerText
                if (str == " 穿衣") {                 
                    $('.tishi2').innerText = data.results[0].index[0].des
                } else if (str == " 洗车") {
                    $('.tishi2').innerText = data.results[0].index[1].des
                } else if (str == " 感冒") {
                    $('.tishi2').innerText = data.results[0].index[2].des
                } else if (str == " 运动") {
                    $('.tishi2').innerText = data.results[0].index[3].des
                }
            }
        })
    }
}
app.init()
function $(selector) {
    return document.querySelector(selector)
}
function $$(selector) {
    return document.querySelectorAll(selector)
}