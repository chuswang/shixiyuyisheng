import config from './config/index';
import tools from './tools';
let request = function() {
    let self = {};
    let axios = require('axios');
    /*ajax请求基础方法*/
    let ajax = function (url, data, type,is_base_url,dataType = 'json', success,error) {
        if(is_base_url){
            var baseURL = url;
            url = '';
        }else {
            var baseURL = config.uri.protocol+config.uri.appUrl+config.uri.colon+config.uri.port+config.uri.et;
        }
        type = (type===null || type==="" || typeof(type)==="undefined")? "post" : type;
        data = (data===null || data==="" || typeof(data)==="undefined")? null : data;
        let headers = {'Accept':'application/json;charset=UTF-8'};
        if(data.token){
            let token = tools.getCache('token',1);
            if(token){
                headers = {'Accept':'application/json;charset=UTF-8','token':token};
            }
            delete data['token'];
        }
        axios({
            method: type,
            data: data,
            baseURL: baseURL,
            responseType: dataType,
            headers: headers,
            url: url,
            timeout:config.common.requestTimeout,
        }).then(data=> {
            let dats = data.data;
            if(dats.code && dats.code !== 200){
                error && error(dats);
            }else {
                if(dats.code){
                    success && success(dats);
                }else {
                    success && success(data);
                }
            }
        }).catch(err=> {
            error && error(err);
        });
    };
    //获取信息
    self.getData = function (data,success,error) {
        let url = config.wechat.baseService;
        ajax(url,data,'post',false,'json',success,error);
    };
    
    return self;
};
export default request()