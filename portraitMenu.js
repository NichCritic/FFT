import {Button} from "./button.js"
import {clearInitElems} from "./initiative.js"


function displayPortraits(k, characters){

	for(var i = 0; i < characters.length; i++){
		var ch = characters[i];

		ch.portraitElem = k.add([
			k.layer('ui'),
			k.sprite(ch.portrait),
			k.pos(k.width() - (52+10) * (i+1) -10, k.height() - 64)
		]);
	}

}

function showOptions(k, init, ch) {
	if(!init.optionsShowing){
		clearInitElems(k, init);
		let por = ch.portraitElem;

		let button = Button(k, 
		{
			text: "Move",
			pos: k.vec2(ch.portraitElem.pos.x, ch.portraitElem.pos.y - 25),
			textpos:k.vec2(ch.portraitElem.pos.x+10, ch.portraitElem.pos.y - 15),
			onClick: () => {
				init.state = init.states.MOVE_SELECT;
			}
		})

		
		init.ui_elems.push(button.bg);
		init.ui_elems.push(button.text);
		init.optionsShowing = true;
	}

}

export {displayPortraits, showOptions}