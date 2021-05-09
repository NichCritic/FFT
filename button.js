var noop = ()=>{};

function initialize_button(k) {
	k.action("button", (b)=>{
		if (b.isHovered()){
			b.use(b.hovercolor);
		}
		else {
			b.use(b.basecolor);
		}
		if(!b.enabled){
			b.use(b.hovercolor);
		}
		if(b.isClicked() && !b.hidden && b.enabled){
			b.onClick(b);
		}
	})
}

function Button(k, args) {
	let layer = args.layer? args.layer : "ui";
	let onClick = args.onClick? args.onClick : noop;

	let bg = k.add([
		k.layer(layer),
  		k.rect(52, 20),
  		k.color(1, 1, 1),
  		k.pos(args.pos.x, args.pos.y),
  		"button",
  		{
  			basecolor: k.color(1, 1, 1),
  			hovercolor:k.color(0.7, 0.7, 0.7),
  			onClick: onClick,
  			enabled:true
  		}
	]);

	let text = k.add([
		k.layer(layer),
		k.text(args.text),
		k.pos(args.textpos.x, args.textpos.y),
		k.color(0, 0, 0)
	]);

	var b = {bg:bg, text:text}

	b.visible = function(visible){
		this.bg.hidden = !visible;
		this.text.hidden = !visible;
	}.bind(b);
	return b;


}

export {Button, initialize_button};

