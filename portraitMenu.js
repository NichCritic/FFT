import {Button} from "./button.js"

//Hack to make portraits appear next to each other. Replace with UI List
let i = 1;

function displayPortrait(k, character, initiative){

	var ch = character;
	let pos = k.vec2(k.width() - ((52+10) * i) -10, k.height() - 64)


	let portraitElem = k.add([
		k.layer('ui'),
		k.sprite(ch.portrait),
		k.pos(pos.x, pos.y),
		{
			buttons: [
				Button(k, 
				{
					text: "Move",
					//Hack, need to get this from layout
					pos: pos.add(0, -45),
					textpos:pos.add(10, -35),
					onClick: () => {
						initiative.state = initiative.states.MOVE_SELECT;
					}
				}),
				Button(k, {
					text: "Pass",
					//Hack, need to get this from layout
					pos: pos.add(0, -25),
					textpos:pos.add(10, -15),
					onClick: () => {
						initiative.state = initiative.states.TURN_END;
					}
				})
			],
			onInitiativeStateChange(state) {
				if(state == initiative.states.IDLE && character.hasInitiative){
					for(let i = 0; i < this.buttons.length; i++){
						let button = this.buttons[i];
						button.visible(true);
					}
				}
				else{
					for(let i = 0; i < this.buttons.length; i++){
						let button = this.buttons[i];
						button.visible(false);
					}
				}

			}
		}
	]);


	initiative.addObserver(portraitElem.onInitiativeStateChange.bind(portraitElem))
	portraitElem.onInitiativeStateChange(initiative.state);


	i++

	return portraitElem

}



export {displayPortrait}