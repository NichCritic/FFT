var fighter = {
	hitDice: "1d10",
	proficiencies: ["Armor", "Shields", "Simple Weapons", "Martial Weapons"],
	skill_proficiencies: ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"]
	savingThrows: ["stength", "constitution"], //Constants?
	levelAbilities:[
		/*0*/[{name:"Skill proficiencies", qty:2}, {name:"Maximize hit dice"}, {name:"Ability Score Improvement or feat"}], //Abilities if chosen as first class
		/*1*/[{name:"Fighting style"}, {name:"Second Wind"}],
		/*2*/[{name:"Action Surge", uses:1}],
		/*3*/[{name:"Martial Archetype"}],
		/*4*/[{name:"Ability Score improvement or feat"}],
		/*5*/[{name:"Extra Attack" attacks:1}],
		/*6*/[{name:"Ability Score improvement or feat"}],
		/*7*/[/*{name:"Martial Archetype Feature"}*/], //Archetype ability feature is redundant with the definition for the actual feature. Specifying different levels for the archetype gives more flexibility
		/*8*/[{name:"Ability Score improvement or feat"}],
		/*9*/[{name:"Indomitable", uses:1}],
	   /*10*/[/*{name:"Martial Archetype Feature"}*/],
	   /*11*/[{name:"Extra Attack" attacks:1}],
	   /*12*/[{name:"Ability Score improvement or feat"}],
	   /*13*/[{name:"Indomitable", uses:1}],
	   /*14*/[{name:"Ability Score improvement or feat"}],
	   /*15*/[/*{name:"Martial Archetype Feature"}*/],
	   /*16*/[{name:"Ability Score improvement or feat"}],
	   /*17*/[{name:"Action Surge", uses:1}, {name:"Indomitable", uses:1}],
	   /*18*/[/*{name:"Martial Archetype Feature"}*/],
	   /*19*/[{name:"Ability Score improvement or feat"}],
	   /*20*/[{name:"Extra Attack" attacks:1}],
	]
}

var champion = {
	levelAbilities:{
		"3":[{name:"Improved Critical"}],
		"7":[{name:"Remarkable Athlete"}],
		"10":[{name:"Fighting Style"}],
		"15":[{name:"Superior Critical"}],
		"18":[{name:"Survivor"}]
	}

}