(function (){
	var currentTime=new Date();
	var currentYear=currentTime.getFullYear()+60;
			
	var footer=document.getElementsByTagName('footer')[0];
	var parentElement=document.getElementById('wrapper');
	var copyright=document.createElement('p');
		
	copyright.innerHTML='&copy;'+currentYear+' THE MACARON MAN. ALL RIGHTS RESERVED.';
	footer.insertBefore(copyright,footer.childNodes[0]);	
})();

function showContent(e){			
	var eventTarget=e.target;
	var panelContent=document.getElementsByTagName('section')[1].lastElementChild;

	var historyTabContent='In the 2050s, in the midst of the civil war, drought, and lost family members and relatives, 23-year Roman Alamilla left his native'; 
		historyTabContent+=' hometown Puerto del Sol to start a new beginning and restore dignity to his life. Back home, he was well-known for his passion, ';
		historyTabContent+='skill, experience, and background in the field of pastry arts. Roman was especially known for what neighbours, friends, relatives ';
		historyTabContent+='called gourmet creations, especially cakes. Recognizing that his abilities and talent lay in these "gourmet creations", Roman Alamilla, '; 
		historyTabContent+='upon arrival in Fuentes in his adopted homeland of Bonaventura, worked tirelessly to create his distinct brand of macarons that he felt ';
		historyTabContent+='would fill the void in Bonaventura. THE MACARON MAN is the result of his creations.';
	
	var inspirationTabContent='Roman\'s cakes always had a distinct aroma that could be attributed to his use of natural flavours derived from various prized foods, such as';
		inspirationTabContent+='taro root, pistachio, bananas, etc. Therefore, he decided to set up a dedicated macaron patisserie producing macarons using such ingredients. In'; 
		inspirationTabContent+='Bonaventura, known globally as a quality tropical breadbasket with its diverse geography and climate zones, it is never a problem sourcing locally';
		inspirationTabContent+='available quality ingredients.';
	
	panelContent.textContent='';

	if (eventTarget===historyTab){
		eventTarget.innerHTML='<img src="multimedia/pointingFingerIcon.png" height="20px" width="20px" alt="CORRUPTED FILE">THE HISTORY';
		eventTarget.style.fontSize='90%';
		eventTarget.firstElementChild.style.marginLeft='5px';
		inspirationTab.innerHTML='THE INSPIRATION';
		panelContent.textContent=historyTabContent;
	} else {
		eventTarget.innerHTML='<img src="multimedia/pointingFingerIcon.png" height="20px" width="20px" alt="CORRUPTED FILE">THE INSPIRATION';
		eventTarget.style.fontSize='90%';
		eventTarget.style.marginLeft='40px';
		historyTab.innerHTML='THE HISTORY';
		panelContent.textContent=inspirationTabContent;	
	}		
}

var historyTab=document.getElementsByTagName('h1')[1];
var inspirationTab=document.getElementsByTagName('h1')[2];
historyTab.addEventListener('click',showContent,false);
inspirationTab.addEventListener('click',showContent,false);
