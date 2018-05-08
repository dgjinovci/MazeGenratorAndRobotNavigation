
var ctx;
var START;
var END; 
var item;
var interval;


function call_prims_algorithm(ctx, grid, start, anim_speed = 0) {
	
	this.ctx = ctx;
	this.START = start;
	this.END = START;
	this.item = START;
	
	
	clearInterval(interval);
	if(anim_speed>0){
		interval = setInterval(function() {random_prims_algorithm(true)}, anim_speed)
	}else{
		random_prims_algorithm(false);
	}
}


var visited = []
function random_prims_algorithm(breakWhile) { 
	
	
	while (item!=null) {
		
		
		//Generate new finish point, large as possible
		if(item.r >= END.r && item.c >=END.c){
			END = item;
		}
		
		
		r = item.r
		c = item.c		
		
		GRID[c][r] = 0
		draw(r,c, "#fff")
		
		
		var neighbors = []
		
		if(r+2 < ROW-2 && GRID[c][r+2] != 0) {
			neighbors.push({c: c, r: r+2})
			draw(r+2,c, "#0000ff")
		}
		if(r-2 > 0 && GRID[c][r-2] != 0) {
			neighbors.push({c: c, r: r-2})
			draw(r-2,c, "#0000ff")
		}
		if(c+2 < COL-2 && GRID[c+2][r] != 0) {
			neighbors.push({c: c+2, r: r})
			draw(r,c+2, "#0000ff")
		}
		if(c-2 > 0 && GRID[c-2][r] != 0) {
			neighbors.push({c: c-2,r: r})
			draw(r,c-2, "#0000ff")
		}
		
		
		if(neighbors.length > 0) {
			rnd = Math.floor(Math.random() * neighbors.length);
			new_item = neighbors[rnd]
			
			r = Math.floor((item.r + new_item.r)/2)
			c = Math.floor((item.c + new_item.c)/2)
			
			GRID[r][c] = 0
			draw(r,c, "#fff")
			
			item = new_item
			
			visited.push(item)
			
		}else{
			item = visited.pop()
			
			if(item == null) {
			
				clearInterval(interval);
				
				window.dispatchEvent(new CustomEvent('onPrimsFinished', { detail: END}));
				
			}
		}
		
		if(breakWhile) break;
	}
}

function draw(r,c, color) {
	ctx.fillStyle = color
	ctx.fillRect(c * 20, r * 20, 20, 20);
}