
import {Button} from "./button.js";
import {showOptions} from "./portraitMenu.js"

const TILEW = 16;
const TILEH = 8;

function initialize_initiative(k, characters){
	var initiative = k.add([
		"initiative",
		{
			characters : characters,
			turnindex: 0,
			state: "IDLE",
			optionsShowing: false,
			moveSelectShowing: false,
			ui_elems:[],
			states:{
				TURN_START:"TURN_START",
				IDLE:"IDLE",
				MOVE_SELECT:"MOVE_SELECT",
				MOVING:"MOVING",
				ATTACK_SELECT:"ATTACK_SELECT",
				ATTACKING:"ATTACKING",
				TURN_END: "TURN_END"
			}
		}
	])
	

	k.action("initiative", (ini)=>{
		switch(ini.state){
			case "TURN_START":
				//CenterCameraOnActivePlayer
				break;
			case "IDLE":
				
				showOptions(k, ini, ini.characters[ini.turnindex]);
				break;
			case "MOVE_SELECT":
				
				showMoveSelect(k, ini, ini.characters[ini.turnindex]);
				break;
			case "MOVING":
				clearInitElems(k, ini);
				break;
			case "ATTACK_SELECT":
				//hideAllOpenOptions();
				//showAttackSelect()
				break;
			case "ATTACKING":
				break;
			case "TURN_END":
				ini.turnindex = (ini.turnindex + 1) % ini.characters.length;
				ini.state = ini.states.IDLE;
				break;

		}


	})

	initiative.on("movement_ended", ()=>{
		initiative.state = initiative.states.TURN_END;
	});

	k.action("clickArea", (b)=>{
		if(b.isClicked()){
			let character = b.ch;
			let select = b.sel;
			let delta = character.tilePos().sub(select.tpos)
			if(Math.abs(delta.x) + Math.abs(delta.y) <= character.moveSpeed){
				character.moveToTile(select.tpos);
				b.init.state = b.init.states.MOVING;
			}
		}
	})

	

	return initiative;

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

function showMoveSelect(k, init, character){
	if(!init.moveSelectShowing){
		clearInitElems(k, init);
		let tiles = drawTileSpread(k, character.tilePos().x, character.tilePos().y, character.moveSpeed)
		init.ui_elems.push(...tiles);
		init.moveSelectShowing = true;



		var select = k.add([
			k.sprite("select"),
			k.pos(0, 0),
			{
				spriteoffset:{x:0, y:0}
			},
			k.layer("selector"),
			"select"
		])

		init.ui_elems.push(select);

		let clickArea = k.add([
			k.area(k.vec2(-1000, -1000), k.vec2(k.width()+1000, k.height()+1000)),
			"clickArea",
			{
				//Some real bullshit right here
				ch:character,
			 	sel:select,
			 	init:init
			 }

		])
		init.ui_elems.push(clickArea);
		

	}


}

function clearInitElems(k, init){
	for(let i = 0; i < init.ui_elems.length; i++){
		k.destroy(init.ui_elems[i]);
	}
	init.ui_elems = [];
	init.optionsShowing = false;
	init.moveSelectShowing = false;
}



export {initialize_initiative, clearInitElems}