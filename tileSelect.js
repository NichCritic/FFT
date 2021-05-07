const TILEW = 16;
const TILEH = 8;
let ui_sprite = "movementselector";
let ui_elems = [];

function initialize_tileSelect(k){
	k.action("clickArea", (b)=>{
		if(b.isClicked()){
			b.onClick(b);
		}
	})
	
}

function select(k, character, initiative, cb) {

	initiative.addObserver(cb);

}



function drawTileSpread(k, startX, startY, depth){
	let tiles = [];

	for(var j = -depth; j <= depth; j++){
		for(var i = -depth; i <= depth; i++){
			if(Math.abs(i) + Math.abs(j) <= depth){
				let x = startX+i;
				let y = startY+j;
				let tile = k.add([
					k.sprite("movementselector"),
					k.pos((x*TILEW+y*TILEW), y*TILEH-x*TILEH-4),
					k.layer("moveselector")],
				);
				tiles.push(tile);
			}
		}
	}
	return tiles;

}

function showSelect(k, init, character, x, y, size, onClick, sprite){
	
	let tiles = drawTileSpread(k, x, y, size)
	ui_elems.push(...tiles);

	var select = k.add([
		k.sprite(sprite),
		k.pos(0, 0),
		{
			spriteoffset:{x:0, y:0}
		},
		k.layer("selector"),
		"select"
	])

	ui_elems.push(select);

	let clickArea = k.add([
		k.area(k.vec2(-1000, -1000), k.vec2(k.width()+1000, k.height()+1000)),
		"clickArea",
		{
			//Some real bullshit right here
			ch:character,
		 	sel:select,
		 	init:init,
		 	onClick: onClick
		 }

	])
	ui_elems.push(clickArea);

}

function clearElems(k){
	for(let i = 0; i < ui_elems.length; i++){
		k.destroy(ui_elems[i]);
	}
}

export {select, initialize_tileSelect}