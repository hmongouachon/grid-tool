const grid = {
	init: function(settings) {
		grid.build_container(settings);
		grid.key_event();
    },
    build_container:function(settings){
    	if(document.querySelectorAll('t-grid')[0]) return;

    	// build container
    	let container = document.createElement('div');
        container.className = "t-grid";
        container.style.position = "fixed";
        container.style.top = "0";
        container.style.left = "0";
        container.style.width = settings.width;
        container.style.margin = '0 auto';
        container.style.height = "100%";
        container.style.pointerEvents = "none";
        container.style.zIndex = "100";
        document.body.appendChild(container);
        // document.querySelectorAll('.t-grid')[0].style.display = 'none';

        // build code container
        let code_container = document.createElement('div');
        code_container.className = "t-code";
        code_container.style.position = "fixed";
        code_container.style.top = "20px";
        code_container.style.left = "20px";
        code_container.style.height = "calc(100% - 40px)";
        code_container.style.overflowY = "scroll";
        code_container.style.fontFamily = 'SFMono-Regular,Menlo,Monaco,Consolas,monospace';
        code_container.style.fontSize = '14px';
        code_container.style.pointerEvents = "none";
        code_container.style.backgroundColor = 'white';
        code_container.style.color = '#464646';
        code_container.style.border = '1px solid #dddddd';
        code_container.style.padding = '20px';
        code_container.style.zIndex = "101";
        document.body.appendChild(code_container);
        document.querySelectorAll('.t-code')[0].style.display = 'none';
        // build grid
        grid.build_grid(container, settings);
    },
    build_grid:function(container, settings){
    	let grid_col = [];
    	let grid_row = [];
    	let grid_data = [];
    	settings.columns = parseInt(settings.columns);
    	// check if predefined array exists
    	if (typeof settings.predefined == 'undefined') {
    		settings.predefined = [];
    	}

    	if(settings.predefined.length > 0){
    		for (i = 0; i < settings.predefined.length;  i++){
    			num = i+ 1;
                // buld cols
                let col = document.createElement('span');
                col.className = "col-line col-line-" + num;
                col.style.position = "fixed";
                col.style.display = "block";
                col.style.left = settings.predefined[i][0];
                col.style.width = settings.predefined[i][1];
                col.style.height = '100%';
                // col.style.borderLeft = '1px solid red';
                col.style.backgroundColor = 'red';
                col.style.opacity = 0.25;
                container.appendChild(col);
            }
    	}

    	else {
	    	for (i = 0; i < settings.columns; i++){
	    		// prevent duplicate value
                function getUnique() {
                    let left_position = grid.get_random_divider(0, 100, settings.divider, grid_col);
                    if (Array.prototype.indexOf(left_position, grid_col) === -1) {
                        return left_position;
                    } else {
                        return getUnique();
                    }
                }
                let left_position;

                if(settings.random == true) {
                    left_position = getUnique();
                }
                else {
                	left_position = (100 /settings.columns) * i;
                }
                grid_col.push(left_position);
                // sort array by value
                grid_col.sort(function(a, b){return a - b});
	    	}

	    	let grid_length = grid_col.length;
	    	let css_code ='';
	    	for (i = 0; i < grid_length;  i++){

                num = i+ 1;
                let col_width;

                if ( num == grid_length) {
                    col_width = 100 - grid_col[i];
                }

                else {
                    col_width = grid_col[i+1] - grid_col[i];
                }

                if(grid_length == 1) {
                    col_width = 100 - grid_col[i];

                }
                // buld cols
                let col = document.createElement('span');
                col.className = "g-col g-col-" + num;
                col.style.position = "fixed";
                col.style.display = "block";
                col.style.left = grid_col[i]+ settings.unit;
                col.style.width = col_width - settings.gutter + settings.unit;
                col.style.height = '100%';
                // col.style.borderLeft = '1px solid red';
                col.style.backgroundColor = 'red';
                col.style.opacity = 0.25;
                container.appendChild(col);
                // push data to get full array of values
                grid_data.push([grid_col[i]+ settings.unit, col_width - 0.5+ settings.unit])
                // build css code
                css_code +=  '.g-col-'+ num  +' { <br/>' +
                        'left : ' + grid_col[i] + '%; <br/>' +
                        'width : ' + col_width + '%; <br/>' +
                '}<br/>' ;
            }
            document.querySelector('.t-code').innerHTML = css_code;
            console.log(JSON.stringify(grid_data))
    	}
    },
    get_random_divider:function(min, max, inc, grid_col){
    	min = min || 0;
        inc = inc || 1;
        if(!max) { return new Error('need to define a max');}

        let unique_value = Math.round(Math.floor(Math.random() * (max - min) / inc) * inc + min);

        if(Array.prototype.indexOf(unique_value, grid_col) !== -1) {
            // regenerate if duplicate
            unique_value = Math.round(Math.floor(Math.random() * (max - min) / inc) * inc + min);
            return unique_value;
        }

        else {
            return unique_value;
        } 
    },
    key_event:function(){
    	let show_grid = false;
    	let show_code = false;
		document.body.onkeydown = function(e) {
		  if (e.key == "g") {
		  	if(show_grid == false) {
		  		document.querySelectorAll('.t-grid')[0].style.display = 'block';
		  		show_grid = true;
		  	}
		  	else {
		  		document.querySelectorAll('.t-grid')[0].style.display = 'none';
		  		show_grid = false;
		  	}
		  }
		  if (e.key == "c") {
		  	if(show_code == false) {
		  		document.querySelectorAll('.t-code')[0].style.display = 'block';
		  		show_code = true;
		  	}
		  	else {
		  		document.querySelectorAll('.t-code')[0].style.display = 'none';
		  		show_code = false;
		  	}
		  }
		  e.preventDefault();
		};
    }
}

//////////////

// init 

//  const predefined_grid = [
// 	['11.11111111111111%','10.61111111111111%'],
// 	['22.22222222222222%','10.611111111111107%'],
// 	['33.33333333333333%','10.611111111111114%'],
// 	['44.44444444444444%','10.611111111111114%'],
// 	['55.55555555555556%','10.6111111111111%'],
// 	['66.66666666666666%','10.611111111111114%'],
// 	['77.77777777777777%','10.611111111111114%'],
// 	['88.88888888888889%','10.611111111111114%']
// ]

// const predefined_grid = [];
// const options = {
// 	"unit" : '%', // % px
// 	"width" : "100%",
// 	"columns" : 12,
// 	"gutter" : 1, // based on unit
// 	"random" : false,
// 	"divider" : 1, // if random = true : random division by multiple
// 	"predefined" : predefined_grid,
// }
// grid.init(options);

//////////////

// usage 

// press g to view grid
// press c to viex code