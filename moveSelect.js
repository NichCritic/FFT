import {showSelect, hideSelect} from "./tileSelect.js"






function moveSelect(k, character, initiative) {

	let initiativeStateChange = function(state){
		
		if(state == initiative.states.MOVE_SELECT){
			if(character.hasInitiative){
				character.mv_elems = showMoveSelect(k, initiative, character);
			}
		}else{
			hideSelect(k, character.mv_elems ? character.mv_elems : []);
		}

	}

	initiative.addObserver(initiativeStateChange);

}





function showMoveSelect(k, init, character){
	let x = character.tilePos().x;
	let y = character.tilePos().y;
	let size = character.moveSpeed;
	let onClick = (b) => {
		let character = b.ch;
		let select = b.sel;
		let delta = character.tilePos().sub(select.tpos)
		if(Math.abs(delta.x) + Math.abs(delta.y) <= character.moveSpeed){
			character.moveToTile(select.tpos);
			b.init.state = b.init.states.MOVING;
		}
	}
	let sprite = "movementselector";
	return showSelect(k, init, character, x, y, size, onClick, sprite)
}



export {moveSelect}