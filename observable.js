
function observable(){
	let observers = [];

	return {
		addObserver(cb){
			observers.push(cb)
		},
		notifyObservers(message){
			for(var i = 0; i < observers.length; i++){
				let o = observers[i];
				o(message);
			}
			
		}	
	};

}

export {observable};