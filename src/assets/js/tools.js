import config from './config/index'
import request from "./request";
let localforage = require("localforage");
let tools = {
    log:function () {
        var length = arguments.length;
        if(length > 1){
            config.debug && console.log(arguments);
        }else {
            config.debug && console.log(arguments[0]);
        }
    },
    utility: { // 全局工具类定义
        isMobile: function() {
            return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/BlackBerry/i);
        },
        // 检验Email
        regMail: /^(?:[a-z\d]+[_\-\+\.]?)*[a-z\d]+@(?:([a-z\d]+\-?)*[a-z\d]+\.)+([a-z]{2,})+$/i,
        // 手机号，13 14 15 18开头的11位数字
        regCellphone: /(^1[3|4|5|8][0-9]\d{8}$)|(^17[0|6|7|8]\d{8}$)/i,
        // 6位数字
        regPassword: /^\d{6}$/i,
        // 手机，座机
        regPhone: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
        //完整的固定电话
        fullTelePhone: /^0\d{2,3}(\-)?\d{7,8}$/,
        // 截取以数字开头的所有数字
        regStartNumber: /^\d+/,
        regRequires: /^.{0,13}$/,
        regDiscountCode: /^(\d{7}|\d{13})$/,
        //4位数字
        regFour: /^\d{4}$/,
        //6为数字
        regSix: /^\d{6}$/,
        //座位号
        regSeat: /^\d{1,2}[a-zA-Z]{1}$/,
        //身份证后4位
        regId: /^\d{3}([0-9]|X)$/,
        //中文
        regChinese: /[\u4E00-\u9FA5]/i,
        //获取中英文字符长度
        getBytesCount: function(str) {
            var bytesCount = 0;
            if (str != null) {
                for (var i = 0; i < str.length; i++) {
                    var c = str.charAt(i);
                    if (/^[\u0000-\u00ff]$/.test(c)) {
                        bytesCount += 1;
                    } else {
                        bytesCount += 2;
                    }
                }
            }
            return bytesCount;
        },
        getStringLength: function(str) {
            var len = 0;
            for (var i = 0; i < str.length; i++) {
                if (str.charAt(i) > '~') {
                    len += 2;
                } else {
                    len++;
                }
            }
            return len;
        },
        isSms:function (sms) {
            if(!sms){
                return false;
            }
            if(!tools.utility.regCellphone.test(sms)){
                return false;
            }
            return true;
        },
        checkidno:function (idno) {
            var vcity = { 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
                21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",
                33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
                42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",
                51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
                63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
            };
            //取身份证前两位,校验省份
            var checkProvince = function(obj) {
                var province = obj.substr(0,2);
                if(vcity[province] == undefined) {
                    return false;
                }
                return true;
            };
            //15位转18位身份证号
            var changeFivteenToEighteen = function(obj) {
                if(obj.length == '15') {
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var cardTemp = 0, i;
                    obj = obj.substr(0, 6) + '19' + obj.substr(6, obj.length - 6);
                    for(i = 0; i < 17; i ++) {
                        cardTemp += obj.substr(i, 1) * arrInt[i];
                    }
                    obj += arrCh[cardTemp % 11];
                    return obj;
                }
                return obj;
            };
            //检查号码是否符合规范，包括长度，类型
            var isCardNo = function(obj) {
                //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
                var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
                if(reg.test(obj) === false) {
                    return false;
                }
                return true;
            };
            //校验位的检测
            var checkParity = function(obj) {
                //15位转18位
                obj = changeFivteenToEighteen(obj);
                var len = obj.length;
                if(len == '18') {
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var cardTemp = 0, i, valnum;
                    for(i = 0; i < 17; i ++) {
                        cardTemp += obj.substr(i, 1) * arrInt[i];
                    }
                    valnum = arrCh[cardTemp % 11];
                    if (valnum == obj.substr(17, 1)){
                        return true;
                    }
                    return false;
                }
                return false;
            };
            //校验日期
            var verifyBirthday = function(year,month,day,birthday) {
                var now = new Date();
                var now_year = now.getFullYear();
                //年月日是否合理
                if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
                    //判断年份的范围（3岁到100岁之间)
                    var time = now_year - year;
                    if(time >= 0 && time <= 130) {
                        return true;
                    }
                    return false;
                }
                return false;
            };
            //检查生日是否正确
            var checkBirthday = function(obj) {
                var len = obj.length;
                //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
                if(len == '15') {
                    var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
                    var arr_data = obj.match(re_fifteen);
                    var year = arr_data[2];
                    var month = arr_data[3];
                    var day = arr_data[4];
                    var birthday = new Date('19'+year+'/'+month+'/'+day);
                    return verifyBirthday('19'+year,month,day,birthday);
                }
                //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
                if(len == '18') {
                    var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
                    var arr_data = obj.match(re_eighteen);
                    var year = arr_data[2];
                    var month = arr_data[3];
                    var day = arr_data[4];
                    var birthday = new Date(year+'/'+month+'/'+day);
                    return verifyBirthday(year,month,day,birthday);
                }
                return false;
            };
            if(isCardNo(idno) === false) {
                return false;
            }
            //检查省份
            if(checkProvince(idno) === false) {
                return false;
            }
            //校验生日
            if(checkBirthday(idno) === false) {
                return false;
            }
            //检验位的检测
            if(checkParity(idno) === false) {
                return false;
            }
            return true;
        }
    },
    toUtf8:function (str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for(i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            }
        }
        return out;
    },
    getBase64Image:function (img,callback) {
        var getBase64 = function (img) {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
            return canvas.toDataURL("image/"+ext);
        };
        var image = new Image();
        image.src = img;
        image.onload = function(){
            var imgStr = getBase64(image);
            imgStr = imgStr.replace("data:image/jpeg;base64,","");
            imgStr = imgStr.replace("data:image/png;base64,","");
            imgStr = imgStr.replace("data:image/jpg;base64,","");
            callback(imgStr);
        }
    },
    formatTime:function(time){
        var now = new Date(time);
        var cmonth = now.getMonth() + 1;
        var day = now.getDate();
        if (cmonth < 10) cmonth = '0' + cmonth;
        if (day < 10) day = '0' + day;
        var hours = now.getHours();
        if (hours < 10) hours = '0' + hours;
        var minutes = now.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;
        var second = now.getSeconds();
        if (second < 10) second = '0' + second;
        var newDate = [now.getFullYear(),cmonth,day,hours,minutes,second];
        return newDate;
    },
    changeTime:function (d,length) {
        if(!d){
            return;
        }
        length = length ? length : 5;
        return d.substr(0,d.length-length);
    },
    getCache:function (key,type,cacheTime,callback) {
        if(type === 1){
            return localStorage.getItem(key);
        }
        if(type === 2){
            var cacheNewTime = false;
            if(cacheTime >= 1){
                cacheNewTime = cacheTime;
            }
            if(cacheTime === true){
                cacheNewTime = config.common.cacheTime;
            }
            if(cacheNewTime){
                var timestamp = Date.parse( new Date());
                timestamp = Math.round(timestamp/10)/100;
                var time = localStorage.getItem(key);
                if(time && ((timestamp - time) < cacheNewTime)){
                    localforage.getItem(key).then(function(res) {
                        callback && callback(res);
                    });
                }else {
                    callback && callback(false);
                }
            }else {
                localforage.getItem(key).then(function(res) {
                    callback && callback(res);
                });
            }
        }else {
            callback && callback(false);
        }

    },
    setCache:function (key,data,type,cacheTime,callback) {
        if(type === 1){
            if(data){
                return localStorage.setItem(key,data);
            }else {
                return false;
            }
        }
        if(type === 2){
            localforage.setItem(key, data, function() {
                var timestamp = Date.parse( new Date());
                cacheTime && localStorage.setItem(key,Math.round(timestamp/10)/100);
                callback && callback(true);
            });
        }else {
            console.log('type error!');
        }
    },
    delCache:function (key,type,cacheTime,callback) {
        if(type === 1){
            return localStorage.removeItem(key);
        }
        if(type === 2){
            localforage.removeItem(key, function() {
                cacheTime && localStorage.removeItem(key);
                callback && callback(true);
            });
        }else {
            tools.log('type error!');
        }
    },
    wordwrap : function (str, width) {
        width = width || 64;
        if (!str) {
            return str;
        }
        var regex = '(.{1,' + width + '})( +|$\n?)|(.{1,' + width + '})';
        return str.match(RegExp(regex, 'g')).join('\n');
    },
    randomString(len){
        len = len || 32;
        var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            //0~32的整数
            pwd += $chars.charAt(Math.floor(Math.random() * (maxPos+1)));
        }
        return pwd;
    },
    addMinutes:function (date,minutes) {
        return date+parseInt(minutes*60000);
    },
    trim:function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    request: request
};
export default tools