// "use strict";

Vue.directive('slip', {
    bind:function(el){
    	console.log("bind");
    	var oUp = el.children[0];
    	var options = {
	        startStatus : {},
			canMove : true,
			direction : undefined,
			downWidth:"60px",
			itemTranTime:500,
			upTranTime:500,
		};

    	function swipedirection(x1, x2, y1, y2) {
		  return Math.abs(x1 - x2) >=
		    Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
		}
    	oUp.ontouchstart  = function(ev){
			options.startStatus.x1 = ev.touches[0].pageX;
			options.startStatus.y1 = ev.touches[0].pageY;

			this.ontouchmove = function(ev){

				if(options.direction === undefined) {
					options.direction = swipedirection(options.startStatus.x1, ev.touches[0].pageX, options.startStatus.y1, ev.touches[0].pageY);
					if("Left" == options.direction){
						ev.preventDefault();
						for(var i=0; i<el.parentNode.children.length; i++){
							el.parentNode.children[i].children[0].style.webkitTransform = "translate3d(0,0,0)";
						}
					} else {
						// this.style.webkitTransform = "translate3d(0,0,0)";
			
					}
				}
				
			};
			this.ontouchend = function(){
				if("Left" == options.direction){
					this.style.webkitTransform = "translate3d(-" + options.downWidth + ",0,0)";
					// self.canMove = false;
				} else {
					for(var i=0; i<el.parentNode.children.length; i++){
						el.parentNode.children[i].children[0].style.webkitTransform = "translate3d(0,0,0)";
					}
				}
				options.direction = undefined;
			};
		};
    },
    inserted:function(el){
    	console.log("inserted");
    },
    update:function(el){
    	console.log("update");
    },
    componentUpdated:function(el){
    	console.log("componentUpdated");
    },
    unbind:function(el){
    	var oUp = el.children[0];
    	console.log("unbind");
    }
});
