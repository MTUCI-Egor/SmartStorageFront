let curentChartHoursHum = 0;


createChartButton(".hum1d", "button_day_hum", setChartHum, 24, 12)
createChartButton(".hum3d", "button_day_hum", setChartHum, 72, 12)
createChartButton(".hum7d", "button_day_hum", setChartHum, 168, 14)


async function drawCircularTemp(){
    let resp = await fetch("http://127.0.0.1:8000/hum?limit=1")
    data = await resp.json()
    document.querySelector(".statistics_number_style_hum").innerText = data[0].Humidity
}

async function loadDataHum(hours,amount){
    resp = await fetch(`http://127.0.0.1:8000/getSensorsData?period=${hours}%20hours&amount=${amount}`)
    arr = await resp.json()
    data_time = arr.time
    data_hum = arr.hum
    data_time_1d = data_time.map((date_str) => `${new Date(date_str).getHours()}:${new Date(date_str).getMinutes() > 9 ? new Date(date_str).getMinutes() : '0' + new Date(date_str).getMinutes() }`)
    // console.log(data_hum)
    return [data_time_1d, data_hum]
}

async function drawChatHum(data){
   var ctxHum = document.getElementById("myChartHum").getContext('2d');
    drawChart(data, ctxHum, 'Значение влажности в %', 'rgb(223, 105, 58)')
}

async function setChartHum(hours, amount){
    drawCircularTemp()
    if (curentChartHoursHum === hours){return}
    curentChartHoursHum = hours;
    let dataHum = await loadDataHum(hours,amount);
    drawChatHum(dataHum);
}

setChartHum(24,12);