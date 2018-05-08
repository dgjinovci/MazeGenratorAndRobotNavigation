

var GRID = []
var END;
var ctx;
var open_list = []
var closed_list = []
var interval = null 
function call_a_star(ctx, grid, start, end, anim_speed = 20) {

	this.ctx = ctx;
	GRID = grid;
	open_list = []
	closed_list = []
	start.g = 0;
	start.h = 0;
	start.f = 0;
	open_list.push(start);
	this.END = end;
	interval = setInterval(function() {a_star_algorithm(anim_speed > 0)}, anim_speed)
}


function a_star_algorithm(breakWhile) {
		
		//Sorry ska while ne javascript ose uI kejt bllokohet 
		//po duhna me bo me interval :A
	while(open_list.length > 0) {
		
		var indx = 0;
		var current = {row:0,col:0,g:0,h:0, f: 9999}
		for(var i = 0; i < open_list.length; i++){
			if( open_list[i].f < current.f) {
				current = open_list[i];
				indx = i;
			}
		}
		
		open_list.splice(indx, 1);
		closed_list.push(current);
		
		
		var r = current.r;
		var c = current.c;
		
		
		if(r == END.r && c == END.c){ 
			make_road(closed_list, current);
			console.log('Fuckin found')
			clearInterval(interval);
			return;
		}
		
		var neighbors = []
		//top
		if(GRID[r-1][c] == 0 && r-1 >0) {
			var rc = {r:r-1, c:c}
			neighbors.push(rc);
			draw(rc.r, rc.c, 'orange')
		}
		//bottom
		if(GRID[r+1][c] == 0 && r+1 < GRID.length-1) {
			var rc = {r:r+1, c:c}
			neighbors.push(rc);
			draw(rc.r, rc.c, 'orange')
		}
		//right
		if(GRID[r][c+1] == 0 && c+1 < GRID[0].length-1) {
			var rc = {r:r, c:c+1}
			neighbors.push(rc);
			draw(rc.r, rc.c, 'orange')
		}
		//left
		if(GRID[r][c-1] == 0 && c-1 >0) {
			var rc = {r:r, c:c-1}
			neighbors.push(rc);
			draw(rc.r, rc.c, 'orange')
		}
		

		for(var i = 0; i < neighbors.length; i++) {
		
			n = neighbors[i];
			
			if(is_in_list(n.r,n.c, closed_list) > -1)
				continue;
			
			n.g = current.g + 1
			n.h = heuristics_manhattan(n.r,n.c);
			n.f = n.g+n.h;
			n.parent = {r:current.r, c: current.c};
			
			var indx = is_in_list(n.r,n.c, open_list);
			
			if(indx > -1) {
				itm = open_list[indx];
				
				if(itm.g < n.g) {
					
					//open_list[indx] = n;
					open_list[indx].parent = {r:n.r,c:n.c}
				}
				
			}else{
				open_list.push(n);
			}
		}
		
		
		if(breakWhile) break;
		
	}
	
}

function is_in_list(r,c, list){
	for(var i = 0; i < list.length; i++) 
		if(list[i].r == r && list[i].c == c) 
			return i;
		
	return -1;
}

function heuristics_manhattan(r,c){
	return Math.abs(r-END.r) + Math.abs(c-END.c);
}


function make_road(list, current) {

	var item = current.parent;
	
	do {
		draw(item.r, item.c, '#00ff00')
		indx = is_in_list(item.r, item.c, list)
		item = null;
		if(indx > -1) {
			item = list[indx].parent;
		}
	}
	while(item != null)
}

function draw(r,c, color) {
	ctx.fillStyle = color
	ctx.fillRect(c * 20, r * 20, 20, 20);
}