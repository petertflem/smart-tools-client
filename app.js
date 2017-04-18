var request = require("request");
var SerialPort = require("serialport");
SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});

var port = new SerialPort('COM3', {
  parser: SerialPort.parsers.readline('\n')
});

port.on('data', function (data) {
  console.log('Sending data: ' + data);
  
  request({
    url: 'https://smart-tools.herokuapp.com/smart-tools-data',
    method: "POST",
    json: { 'data': data }
  });
});
