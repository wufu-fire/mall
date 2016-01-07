$(function() {
	
	//侧栏颜色
	$('.wx-ullist:eq(2) li:eq(1) a').addClass('wx-click');

	//当鼠标接触在表格行的使用颜色变化控制
	$('#wx-table tbody tr').hover(function () {
		$(this).addClass('wx-tr');
	},function () {
		$(this).removeClass('wx-tr');
	});


    /*时间日期格式化*/
    Date.prototype.Format = function(fmt)   
    { //author: meizz   
      var o = {   
        "M+" : this.getMonth()+1,                 //月份   
        "d+" : this.getDate(),                    //日   
        "h+" : this.getHours(),                   //小时   
        "m+" : this.getMinutes(),                 //分   
        "s+" : this.getSeconds(),                 //秒   
        "q+" : Math.floor((this.getMonth()+3)/3), //季度   
        "S"  : this.getMilliseconds()             //毫秒   
      };   
      if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
      for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
      return fmt;   
    }  

    /*关注信息总条数*/
    $.get("/seller_attention_count", function(data){
        localStorage.seller_attention_count = Math.ceil(data/2);

        /*页面加载时，获取到信息*/
	    $.get("/seller_attention_data", function(data){
	        var str = "";
	        for (var i = 0; i < data.length; i++) {
	            var date1 = new Date(data[i].jiaohuo_start).Format("yyyy-MM-dd");
	            var date2 = new Date(data[i].jiaohuo_end).Format("yyyy-MM-dd"); 
	            var surplus =  data[i].needVolume - data[i].hasBuy;
	            str += "<td>"+data[i]._id+"</td>";     
	            str += "<td>"+data[i].brand+"</td>";
	            str += "<td>"+data[i].kind+"</td>";
	            str += "<td>"+surplus+"</td>";
	            str += "<td>"+data[i].min_deal+"</td>";
	            str += "<td>"+data[i].unit_price+"</td>";
	            str += "<td>"+data[i].unit+"</td>";
	            str += "<td>"+date1+"至"+date2+"</td>";
	            str += "<td>"+data[i].address+"</td>";
	            str += "<td><a class='btn wx-deleteOrder' href='javascript:void(0)'>取消关注</a></td>";
	            str = "<tr>"+str+"</tr>";
	        };
	        $('#wx-tbody').html(str);
	    })

	    // 分页js引入
	    $(".wx-page").createPage({
	        pageCount:localStorage.seller_attention_count,
	        current:1,
	        backFn:function(p){
	            // console.log(p); 
	            $.get("/seller_attention_page/"+p, function(data){
			        var str = "";
			        for (var i = 0; i < data.length; i++) {
			            var date1 = new Date(data[i].jiaohuo_start).Format("yyyy-MM-dd");
			            var date2 = new Date(data[i].jiaohuo_end).Format("yyyy-MM-dd"); 
			            var surplus =  data[i].needVolume - data[i].hasBuy;
			            str += "<td>"+data[i]._id+"</td>";     
			            str += "<td>"+data[i].brand+"</td>";
			            str += "<td>"+data[i].kind+"</td>";
			            str += "<td>"+surplus+"</td>";
			            str += "<td>"+data[i].min_deal+"</td>";
			            str += "<td>"+data[i].unit_price+"</td>";
			            str += "<td>"+data[i].unit+"</td>";
			            str += "<td>"+date1+"至"+date2+"</td>";
			            str += "<td>"+data[i].address+"</td>";
			            str += "<td><a class='btn wx-deleteOrder' href='javascript:void(0)'>取消关注</a></td>";
			            str = "<tr>"+str+"</tr>";
			        };
			        $('#wx-tbody').html(str);
	    		});
	        }
	    })

		/*点击取消关注*/
		$(document).on('click','.wx-deleteOrder',function(){
	        var id = $(this).parents('tr').find('td').first().text();
	        $.get("/seller_attention_delete/"+id, function(data){
	        	console.log(data)
			 	if (data == 0) {
			 		// $(this).parents('tr').hide();
			 		location.href = location.href;
			 	}     
	    	})
	    })

    })

})