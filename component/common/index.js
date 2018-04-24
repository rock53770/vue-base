;(function($){
	var w = document.documentElement.clientWidth;
	var h = document.documentElement.clientHeight;
	$('.outer').css({
		height: h,
		width: w
	});

	var oThree = document.querySelectorAll(".three")[0];
	var oBigImg = document.querySelectorAll(".big_img")[0];
	var aImg = document.querySelectorAll("li img");
	
	oBigImg.onclick = function(){
		oBigImg.style.display = "none";
	};
	for (var i = aImg.length - 1; i >= 0; i--) {
		aImg[i].onclick = function(){
			oBigImg.style.display = "block";
			oBigImg.style.background = "#000 url(" + this.src + ") center no-repeat";
			oBigImg.style.backgroundSize = "contain";
		};
	}
	oBigImg.addEventListener('touchmove', function(e){e.preventDefault();}, false);


	document.getElementById('content').addEventListener('touchmove',function(event){
		event.preventDefault(); 
	},false);
	document.getElementById('bigimg').addEventListener('touchmove',function(event){
		event.preventDefault(); 
	},false);

	var num = 0;
	$(document).swipeUp(function(){
		if(num >=1 ){
			$('.arrow_down').hide();
			setTimeout(function(){$('.content').hide();},1000);
			$('.list').addClass('slideInUp');
			$('.list').removeClass('hide');

			$('.two').find('.box').removeClass('fadeIn');
			return;
		}
		pageMove('up');
	});
	$(document).swipeDown(function(){
		console.log(num)
		if(num <= 0){
			return;
		}
		pageMove('down');
	})
	function pageMove(direction){
		if(direction == 'up'){
			var outClass = 'slideOutUp';
			var inClass = 'slideInDown';
			//var outClass = 'pt-page-moveToTop';
			//var inClass = 'pt-page-moveFromBottom';
			
			//$('.page-0').addClass(outClass);

			//return;	

			if(num >= 8){
				$('.arrow_down').hide();
			}
			var last = num+1;
			var now = num;
			num++;
			
		}else{
			
			var outClass = 'slideOutDown';
			var inClass = 'slideInDown';
			//var outClass = 'pt-page-moveToBottom';
			//var inClass = 'pt-page-moveFromTop';
			
			if(num < 11){
				$('.arrow_down').show();
			}
			var last = num-1;
			var now = num;
			num--;
		}

		$('.page-'+now).addClass(outClass);	
		$('.page-'+last).removeClass('hide');	
		//$('.page-'+last).addClass(inClass);	
		
		setTimeout(function(){
			$('.page-'+now).removeClass('zindex');	
			$('.page-'+now).removeClass(outClass);	
			//$('.page-'+now).addClass('hide');	
			$('.page-'+now).find("img").addClass("hide");
			
			$('.page-'+last).addClass('zindex');	
			$('.page-'+last).removeClass(inClass);	
			$('.page-'+last).find(".box").removeClass("hide");
			
		},1000);	
	}


	$(window).scroll(function() {
	  	if($(window).scrollTop() == '0'){
	  		//$('.content').removeClass('hide');
			$('.list').addClass('list animated time3 slideOutDown');
			$('.arrow_down').show();
			$('.content').show();
			setTimeout(function(){
	  			$('.list').attr('class','list animated hide');
	  		},3000);
	  	}

	});
	
})(Zepto)