(function (){
	var currentTime=new Date();
	var currentYear=currentTime.getFullYear()+60;
	
	var serverDataRequest=new XMLHttpRequest();
	serverDataRequest.open('GET', 'data/exchangeRates.json', true);        
	serverDataRequest.send(null);                                 

	serverDataRequest.onload=function(){
		if (serverDataRequest.status===200){
			var serverDataRequestParsed=JSON.parse(serverDataRequest.responseText); //Convert into a JavaScript object.
			
			var getSectionElement=document.getElementsByTagName('section')[0]; 
			/*
			-Get the section element that will be the parent of these HTML elements for exchange rates.
			-Use a for-loop to create the HTML elements to hold currency exchange rate information.
			-The end result, as seen in the web page, will be as follows:
			<section><p></p><p></p><div><span></span></div><div><span></span></div></section>
			
			-2 div elements: one for each foreign currency.
			*/
			for (var i=0;i<serverDataRequestParsed.exchangeRates.length;i++){
				var createDivContainer=document.createElement('div'); 
				getSectionElement.appendChild(createDivContainer);
				
				var createFlagElement=document.createElement('img');
				createFlagElement.setAttribute('width', '16px');
				createFlagElement.setAttribute('height', '16px');
				createFlagElement.setAttribute('src', serverDataRequestParsed.exchangeRates[i].flag);
				createFlagElement.setAttribute('alt', 'THE FLAG COULD NOT BE DISPLAYED.');
				createDivContainer.appendChild(createFlagElement);
				
				var createCountryLabel=document.createElement('span');
				var CountryLabelTextNode=document.createTextNode(serverDataRequestParsed.exchangeRates[i].country);
				createCountryLabel.appendChild(CountryLabelTextNode);
				createDivContainer.appendChild(createCountryLabel);
				
				var createUnitLabel=document.createElement('span');
				var UnitLabelTextNode=document.createTextNode(serverDataRequestParsed.exchangeRates[i].unit);
				createUnitLabel.appendChild(UnitLabelTextNode);
				createDivContainer.appendChild(createUnitLabel);

				var createRateLabel=document.createElement('span');
				var RateLabelTextNode=document.createTextNode(serverDataRequestParsed.exchangeRates[i].rate);
				createRateLabel.appendChild(RateLabelTextNode);
				createDivContainer.appendChild(createRateLabel);
			}
		} 
		if (serverDataRequest.status===404){
			var createParagraphElement=document.createElement('p');
			var ParagraphElementTextNode=document.createTextNode('THE REQUESTED DATA WAS NOT FOUND ON THE SERVER.');
			createParagraphElement.appendChild(ParagraphElementTextNode);
			
			getSectionElement.appendChild(createParagraphElement);
		}
	}
	
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
	var idConverted=Number(e.target.id);
	
	if (idConverted>=0 && idConverted<=13 ){ 		
		var popOut=document.createElement('div');
		
		var varieteGenerator='variete'+idConverted; //In this context, variete is French for 'type'.
		var flavourSelector='flavour'+idConverted;

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