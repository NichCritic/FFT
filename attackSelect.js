import {showSelect, hideSelect} from "./tileSelect.js"






function attackSelect(k, character, initiative) {

	let initiativeStateChange = function(state){
		if(state == initiative.states.ATTACK_SELECT){
			if(character.hasInitiative){
				character.att_elems = showAttackSelect(k, initiative, character);
			}
		}else{
			hideSelect(k, character.att_elems ? character.att_elems : []);
		}

	}

	initiative.addObserver(initiativeStateChange);

}





function showAttackSelect(k, init, character){
	let x = character.tilePos().x;
	let y = character.tilePos().y;
	let size = character.attackRange;
	let onClick = (b) => {
		let character = b.ch;
		let select = b.sel;
		for(let i = 0; i < init.characters.length; i++){
			let enemy = init.characters[i];
			if(enemy.tilePos().x === select.tpos.x && enemy.tilePos().y === select.tpos.y){
				let delta = character.tilePos().sub(select.tpos)
				if(delta.x == -1 && delta.y == 0){
					character.play("attackne", false)
				}
				if(delta.x == 1 && delta.y == 0){
					character.play("attacksw", false)
				}
				if(delta.x == 0 && delta.y == -1){
					
					character.play("attackse", false)
					
				}
				if(delta.x == 0 && delta.y == 1){
					
					character.play("attacknw", false)
					
				}
				init.state = init.states.ATTACKING
				break;
			}
		}

	}
	let sprite = "attackselector";
	return showSelect(k, init, character, x, y, size, onClick, sprite)
}



export {attackSelect}