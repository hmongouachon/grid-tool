
# Grid tool

Small useful tool that allows you to integrate a predefined or generated grid into your front-end development environment.


## Tool installation

- include grid.js or minified version 

```
<script src="js/grid.js"></script>

```
```
<script src="js/grid.min.js"></script>
```


- init plugin : check example in demo index

```
<script>
    const predefined_grid = [];
	const options = {
		"unit" : '%', // % px
		"width" : "100%",
		"columns" : 12,
		"gutter" : 1, // based on unit
		"random" : false,
		"divider" : 1, // if random = true : random division by multiple
		"predefined" : predefined_grid,
	}
	grid.init(options);
</script>
```


## Tool features

- Generate uniform grid
- Generate non uniforms grid based on divider (ex : multiple of 3, 5, golden ratio etc)
- Generate grid from custom data
- Ability to show / hide grid by pressing "g" key
- Ability to show / hide css generated code by pressing "c" key

## Plugin parameters
```
[unit] : string 
Set unit value. Ex : '%' or 'px' 
```

```
[width] : string 
Set container width. Ex : '100%' or '1920px'
```

```
[columns] : number
Total columns length. Ex : 12  
```

```
[gutter] : number
Gutter width. Ex : 1
```

```
[random] : boolean
If enabled, grid will be generated randomly by specified divider.  Ex : 'false' 
```

```
[divider] : number
Value use when generated random grid. Each grid position will be a multiple of this value. Ex : 5 
```

```
[predefined] : array
Used to generate a grid based on predefined values : [ [leftPosition, width], [leftPosition, width], ...]
Ex : [ [2%, 10%], [13%, 20%], ...] 

Note : When you generate a new random or classic grid, just check the console if you want to grab and copy position and width data. Then just pass the new array to predefined array.
```

## Codepen demo
* Grid tool : [https://codepen.io/hmongouachon/pen/abLYMPW]



