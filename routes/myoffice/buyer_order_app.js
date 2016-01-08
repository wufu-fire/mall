module.exports = function ( app ) {
    app.get('/buyer_order',function(req,res){
        if(req.session.user){
            res.render('buyer_order');
        }else{
            res.redirect('login');
        }
    })

    /*接收到买家下的订单*/
    app.post('/buy_order', function (req, res) {  
        if(req.session.user){
            // console.log(req.body);
            var company = global.dbHelper.getModel('company');
            var order = global.dbHelper.getModel('order');
            company.find({"uId":req.session.user._id},{"name":1,"_id":0},function (error, doc) {
                if (error) {
                    console.log(error);
                }else{
                    // console.log(doc[0].name);
                    order.create({
                        goods_id: req.body.goods_id,
                        buyer_id: req.session.user._id,
                        seller_id: req.body.seller_id,
                        goods_kind: req.body.goods_kind,
                        buy_company: doc[0].name,
                        sell_company:req.body.sell_company,
                        volume:req.body.volume,
                        role:req.body.role,
                        unit_price:req.body.unit_price,
                        order_date:new Date(req.body.order_date)
                    }, function (error, doc) {
                        if (error) {
                            console.log(error);
                            // console.log(0);
                            res.json(0);
                        } else {
                            // console.log(doc);
                            res.json(1);
                        }
                    })
                }
            });
            
        }else{
            res.redirect('login');
        }                   
    })

    /*计算数据库有多少商品信息*/
    app.get('/buyer_order_count',function(req,res){
        if(req.session.user){
            var order = global.dbHelper.getModel('order');
            order.count({"buyer_id":req.session.user._id},function (err,doc) {
                if (err) {
                    console.log(err);
                } else{
                    // console.log(doc);
                    res.json(doc);
                }
            })
        }else{
            res.redirect('login');
        }
    })

    /*页面加载时，数据返回*/
    app.get('/buyer_order_data',function(req,res){
        if(req.session.user){
            var order = global.dbHelper.getModel('order');
            order.find({"buyer_id":req.session.user._id},{"sell_company":1,"goods_kind":1,"order_date":1,"order_status":1}
            	,{sort:{order_date:-1},limit:2},function (err,doc) {
                if (err) {
                    console.log(err);
                } else{
                    res.json(doc);
                    // console.log(doc);
                }
            })
        }else{
            res.redirect('login');
        }
    });

    /*页面加载时，数据返回*/
    app.get('/buyer_order_page/:page',function(req,res){
        if(req.session.user){
        	var page = parseInt(req.params.page);
            var order = global.dbHelper.getModel('order');
            order.find({"buyer_id":req.session.user._id},{"sell_company":1,"goods_kind":1,"order_date":1,"order_status":1}
            	,{sort:{order_date:-1},limit:2,skip:2*(page-1)},function (err,doc) {
                if (err) {
                    console.log(err);
                } else{
                    res.json(doc);
                    // console.log(doc);
                }
            })
        }else{
            res.redirect('login');
        }
    });


}