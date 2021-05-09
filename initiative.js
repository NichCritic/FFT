
import {Button} from "./button.js";
import {observable} from "./observable.js"



function initialize_initiative(k, characters){
	var initiative = k.add([
		"initiative",
		observable(),
		{
			characters : characters,
			turnindex: 0,
			state: "IDLE",
			prev_state: null,
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
				for(let i = 0; i < ini.characters.length; i++){
					if(i == ini.turnindex){
						ini.characters[i].hasInitiative = true;
						continue
					}
					ini.characters[i].hasInitiative = false;
				}
				//CenterCameraOnActivePlayer
				ini.state = ini.states.IDLE;
				break;
			case "IDLE":
				
				//showOptions(k, ini, ini.characters[ini.turnindex]);
				break;
			case "MOVE_SELECT":
				
				
				break;
			case "MOVING":
				
				break;
			case "ATTACK_SELECT":
				//hideAllOpenOptions();
				//showAttackSelect()
				break;
			case "ATTACKING":
				break;
			case "TURN_END":
				ini.turnindex = (ini.turnindex + 1) % ini.characters.length;
				ini.state = ini.states.TURN_START;
				break;

		}
		if(ini.state !== ini.prev_state){
			ini.notifyObservers(ini.state);
		}
		ini.prev_state = ini.state;



	})

	initiative.on("movement_ended", ()=>{
		initiative.state = initiative.states.IDLE;
	});

	

	

	return initiative;

}






export {initialize_initiative}