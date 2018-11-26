let config = {
    //常用参数设置
    common:{
        smsTimes : 60,//短信过期时间
        url:'/',
        cacheTime:86400//存放缓存过期时间 单位秒
    },
    //基础uri
    uri:{
        protocol:'https://',
        appUrl:'yys.52zym.com',
        port:80,
        colon:':',
        et:'/',
    },
    //微信相关
    wechat:{
        appId:'',
        openid:'',
        baseService:'service/'
    },
    //用户相关
    user:{
        baseService:'service/userservice/',
    },
    debug:false,
    key:'app'
};
export default config;