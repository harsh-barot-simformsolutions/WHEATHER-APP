const http = require("http");
const fs = require ("fs");
var requests = require("requests")
const homeFile = fs.readFileSync("home.html","utf-8");

const replaceVal = (tempVal , orgVal) =>{
        let temprature = tempVal.replace("{%tempval%}",orgVal.main.temp);
         temprature = temprature.replace("{%tempmin%}",orgVal.main.temp_min);
         temprature = temprature.replace("{%tempmax%}",orgVal.main.temp_max);
         temprature = temprature.replace("{%location%}",orgVal.name);
         temprature = temprature.replace("{%country%}",orgVal.sys.country);
         temprature = temprature.replace("{%country%}",orgVal.weather[0].main);
         return temprature;
}
const server = http.createServer((req,res)=>{
  if(req.url == "/"){
    requests("http://api.openweathermap.org/data/2.5/weather?q=bharuch&appid=025d036e150e470f4a60ecb99e651f2d")
    .on("data", (chunk) => {
      const objdata = JSON.parse(chunk);
      const arrData = [objdata];
      console.log(arrData);
      // console.log(arrData[0].main.temp);
      const realTimeData = arrData.map((val) =>
         replaceVal(homeFile,val)).join("");
         res.write(realTimeData);
        // console.log(realTimeData);
    })
    .on("end",(err)=>{
      if(err) return console.log("Connection closed due to error",err);
      res.end();
      console.log("end");
    });
  }
});
server.listen(3000,"localhost");