(function (){
	var currentTime=new Date();
	var currentYear=currentTime.getFullYear()+60;
	
	var footer=document.getElementsByTagName('footer')[0];
	var parentElement=document.getElementById('wrapper');
	var copyright=document.createElement('p');
		
	copyright.innerHTML='&copy;'+currentYear+' THE MACARON MAN. ALL RIGHTS RESERVED.';
	footer.insertBefore(copyright,footer.childNodes[0]);
})();

function popOut(e){
	var three_berry_description='Made from the finest naturally grown raspberries, blueberries, and blackberries.';
	
	var tropical_paradise_description='Crushed, dried, & naturally grown mangoes and pineapples from the Philippines are used.';
	
	var dark_chocolate_description='The filling is entirely composed of chocolate produced by La Maison du Chocolat.';
	
	var vanilla_description='Made using certified vanilla beans from Madagascar, long renowned for the world\'s best vanilla.';
	
	var espresso_description='Jamaica\'s famed Blue Mountains are the source of the coffee beans used to make the espresso filling.';
	
	var green_tea_description='Flavour sourced from China\'s renowned, original Dragon Well Tea.';
	
	var cinnamon_description='This macaron features exclusive use of Sri Lanka\'s Ceylon cinnamon, which, unlike Cassia cinnamon, '; 
	cinnamon_description+='has negligible amounts of coumarin (potentially toxic in high amounts).';

	var taro_description='Taro is a nutritional superfood, offering low Glycemic Index (GI) levels, high levels of fiber,';
	taro_description+='Vitamin A, Vitamin C, and so on; crushed organic taro root, rather than artificial flavours, is used'; 
	taro_description+=' for the macaron filling.';
	
	var earl_grey_description='The earl grey tea leaves used in producing this macaron\'s flavour contain authentic oil';
	earl_grey_description+='from Bergamot trees grown in Calabria, Italy.';

	var hazelnut_description='Hazelnut cultivated from the Greek island Aegina are used to produce both macaron shells and its filling,';
	hazelnut_description+=' giving it an all-around pistachio flavour.';

	var pistachio_description='Pistachio cultivated from the Greek island Aegina are used to produce both macaron shells and its filling,';
	pistachio_description+=' giving it an all-around pistachio flavour.';

	var honey_description='World-class acacia honey is used to create the honey consistency in the filling.';
		
	var mint_description='Filling ingredients vary between spearmint & peppermint.';

	var milk_chocolate_description='Only the finest Belgian Callebaut milk chocolate is used.';

	var text_description=[three_berry_description,
						  tropical_paradise_description,
						  dark_chocolate_description,
						  vanilla_description,
						  espresso_description,
						  green_tea_description,
						  cinnamon_description,
						  taro_description,
						  earl_grey_description,
						  hazelnut_description,
						  pistachio_description,
						  honey_description,
						  mint_description,
						  milk_chocolate_description
	];
						  
	var event_target=e.target;
	var event_target_id=e.target.id;
	var id_converted=parseInt(event_target_id);
	
	if (id_converted>=0 && id_converted<=13 ){ 		
		var popOut=document.createElement('div');
		
		var varieteGenerator='variete'+event_target_id; //In this context, variete is French for 'type'.
		var flavourSelector='flavour'+event_target_id;

		if (id_converted>=0 && id_converted<=5 || id_converted>=11 && id_converted<=13 ){ 
			popOut.classList.add('specifications1');
		} else if (id_converted===7 ){ 
			popOut.classList.add('exception');
		} else {
			popOut.classList.add('specifications2');
		}
		
		popOut.id=varieteGenerator;
		
		popOut.innerHTML='<span id="'+flavourSelector+'">X</span><p class="paragraph">'+text_description[id_converted]+'</p>';
		/*Having a unique ID attribute value for the <span> tag holding the 'X' mark is necessary as using the class attribute
		  means that the specific nth <span> element would need to be selected. This nth element's index position is never known for sure
		  because the web user can open up whichever flavour in whichever order the web user desires. 
		  More importantly, this allows for several flavour boxes to be opened and closed at any given time.
		*/
		var parentElement=document.getElementById('wrapper');
		parentElement.appendChild(popOut);
		
		function closeBox(){
			parentElement.removeChild(popOut);
		}
		
		var closeMark=document.getElementById(flavourSelector);
		closeMark.addEventListener('click',closeBox,false);
	}
}
	/*1. The if-statement ensures that the event's target element are only affected by CSS rule changes 
	  when it is one of the <li> elements. 
	  2. Otherwise, 'click' events firing on anything else except for <li> elements creates undefined results 
	  as the corresponding target element don't have ID attribute values.
	  3. This renders the remaining code meaningless in the absence of the target element ID.
    */	
var list=document.getElementsByTagName('ul')[1];
list.addEventListener('click',popOut,false);