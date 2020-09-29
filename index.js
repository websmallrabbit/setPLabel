var fs = require('fs')
var str = ''
var typeOpt = ['一', '二', '三', '四','五','六','七','八','九','十','十一', '十二','十三','十四','十五','十六','十七','十八','十九','二十', '二十一', '二十二','二十三','二十四','二十五','二十六','二十七','二十八','二十九', '三十']

// 读取doc文档
// var mammoth = require("mammoth");
// mammoth.extractRawText({path: "./aaa.docx"})
//   .then(function(result){
//     var text = result.value; // The raw text
//     console.log(text);
//     var messages = result.messages;
//     console.log(result);
//   }).done();


function IsInArray(arr,val){

  var testStr=','+arr.join(",")+",";

  return testStr.indexOf(","+val+",")!=-1;

}

fs.readFile('./aaa.txt', 'utf-8', function (err, data) {
  if(err){
    console.error(err);
  }
  else{
    var tempArr = []
    tempArr = data.split(/[\s\n]/)
    str = tempArr.map(val => {
       if(IsInArray(typeOpt, val.substring(0,1))) {
         // str += '<h2>' + val + '</h2>'
         return '<h2>' + val + '</h2>' + '<br/>'
       } else if(val.substring(0,4).length === 4 && val.substring(0,4).charAt(val.substring(0,4).length -1) === '、') {
         return '<p class="three">' + val + '</p>' + '<br/>'
       }else if(val.substring(0,6).length === 6 && val.substring(0,6).charAt(val.substring(0,6).length -1) === '、') {
         return '<p class="four">' + val + '</p>' + '<br/>'
       } else if(val) {
         // str += '<p>' + val + '</p>'
         return '<p>' + val + '</p>' + '<br/>'
       }
    })
    str = str.join('')
    var reg=new RegExp("<br/>","g");
    str= str.replace(reg,"\r\n")

    fs.writeFile(('./index.html'), str, function (err, data) {
      console.log(data)
    })
  }
})

