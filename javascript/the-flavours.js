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
	var threeBerryDescription='Made from the finest naturally grown raspberries, blueberries, and blackberries.';
	
	var tropicalParadiseDescription='Crushed, dried, & naturally grown mangoes and pineapples from the Philippines are used.';
	
	var darkChocolateDescription='The filling is entirely composed of chocolate produced by La Maison du Chocolat.';
	
	var vanillaDescription='Made using certified vanilla beans from Madagascar, long renowned for the world\'s best vanilla.';
	
	var espressoDescription='Jamaica\'s famed Blue Mountains are the source of the coffee beans used to make the espresso filling.';
	
	var greenTeaDescription='Flavour sourced from China\'s renowned, original Dragon Well Tea.';
	
	var cinnamonDescription='This macaron features exclusive use of Sri Lanka\'s Ceylon cinnamon, which, unlike Cassia cinnamon, '; 
	cinnamonDescription+='has negligible amounts of coumarin (potentially toxic in high amounts).';

	var taroDescription='Taro is a nutritional superfood, offering low Glycemic Index (GI) levels, high levels of fiber,';
	taroDescription+='Vitamin A, Vitamin C, and so on; crushed organic taro root, rather than artificial flavours, is used'; 
	taroDescription+=' for the macaron filling.';
	
	var earlGreyDescription='The earl grey tea leaves used in producing this macaron\'s flavour contain authentic oil';
	earlGreyDescription+='from Bergamot trees grown in Calabria, Italy.';

	var hazelnutDescription='Hazelnut cultivated from the Greek island Aegina are used to produce both macaron shells and its filling,';
	hazelnutDescription+=' giving it an all-around pistachio flavour.';

	var pistachioDescription='Pistachio cultivated from the Greek island Aegina are used to produce both macaron shells and its filling,';
	pistachioDescription+=' giving it an all-around pistachio flavour.';

	var honeyDescription='World-class acacia honey is used to create the honey consistency in the filling.';
		
	var mintDescription='Filling ingredients vary between spearmint & peppermint.';

	var milkChocolateDescription='Only the finest Belgian Callebaut milk chocolate is used.';

	var textDescription=[threeBerryDescription,
						 tropicalParadiseDescription,
						 darkChocolateDescription,
						 vanillaDescription,
						 espressoDescription,
						 greenTeaDescription,
						 cinnamonDescription,
						 taroDescription,
						 earlGreyDescription,
						 hazelnutDescription,
						 pistachioDescription,
						 honeyDescription,
						 mintDescription,
						 milkChocolateDescription
	];
						  
	var eventTarget=e.target;
	var eventTargetId=e.target.id;
	var idConverted=parseInt(eventTargetId);
	
	if (idConverted>=0 && idConverted<=13 ){ 		
		var popOut=document.createElement('div');
		
		var varieteGenerator='variete'+eventTargetId; //In this context, variete is French for 'type'.
		var flavourSelector='flavour'+eventTargetId;

		if (idConverted>=0 && idConverted<=5 || idConverted>=11 && idConverted<=13 ){ 
			popOut.classList.add('specifications1');
		} else if (idConverted===7 ){ 
			popOut.classList.add('exception');
		} else {
			popOut.classList.add('specifications2');
		}
		
		popOut.id=varieteGenerator;
		
		popOut.innerHTML='<span id="'+flavourSelector+'">X</span><p class="paragraph">'+textDescription[idConverted]+'</p>';
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
		document.getElementById(flavourSelector).addEventListener('click',closeBox,false);
	}
}
	/*1. The if-statement ensures that the event's target element are only affected by CSS rule changes 
	  when it is one of the <li> elements. 
	  2. Otherwise, 'click' events firing on anything else except for <li> elements creates undefined results 
	  as the corresponding target element don't have ID attribute values.
	  3. This renders the remaining code meaningless in the absence of the target element ID.
    */	
(function(){
	document.getElementsByTagName('ul')[1].addEventListener('click',popOut,false);
})();