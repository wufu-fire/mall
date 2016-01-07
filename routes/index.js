module.exports = function ( app ) {
    require('./register_app.js')(app);      //注册
    require('./login_app.js')(app);         //登陆
    require('./index_app.js')(app);         //首页
    require('./buy_app.js')(app);           //我要买
    require('./buyRelease_app.js')(app);    //我要买-发布需求
    require('./buyDetail_app.js')(app);     //我要买详情
    require('./sell_app.js')(app);          //我要卖
    require('./sellDetail_app.js')(app);    //我要卖-详情
    require('./sellRelease_app.js')(app);   //我要卖-发布供应
    require('./quotation_app.js')(app);     //交易详情
    require('./express_app.js')(app); 	    //物流
    require('./aboutUs_app.js')(app); 	    //关于我们
    require('./logout_app.js')(app);        //注销
    require('./myoffice/myoffice_app.js')(app);                 //我的办公室-基本信息
    require('./myoffice/count_safe_app.js')(app);               //我的办公室-账户安全
    require('./myoffice/company_information_app.js')(app);      //我的办公室-公司信息
    require('./myoffice/buyer_need_app.js')(app);               //我的办公室-买家需求
    require('./myoffice/buyer_attention_app.js')(app);          //我的办公室-买家关注
    require('./myoffice/buyer_order_app.js')(app);              //我的办公室-买家订单
    require('./myoffice/buyer_chat_app.js')(app);               //我的办公室-买家洽谈
    require('./myoffice/seller_supply_app.js')(app);            //我的办公室-卖家供应
    require('./myoffice/seller_attention_app.js')(app);         //我的办公室-卖家关注
    require('./myoffice/seller_order_app.js')(app);             //我的办公室-卖家订单
    require('./myoffice/seller_chat_app.js')(app);              //我的办公室-卖家洽谈
    require('./admin/admin_app.js')(app);                       //后台管理-入口界面
    require('./admin/type_app.js')(app);                        //后台管理-入口界面
};