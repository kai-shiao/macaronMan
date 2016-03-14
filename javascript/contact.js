(function (){
	var currentTime=new Date();
	var currentYear=currentTime.getFullYear()+60;
	
	var footer=document.getElementsByTagName('footer')[0];
	var parentElement=document.getElementById('wrapper');
	var copyright=document.createElement('p');
	copyright.innerHTML='&copy;'+currentYear+' THE MACARON MAN. ALL RIGHTS RESERVED.';
	footer.insertBefore(copyright,footer.childNodes[0]);
})();

function addFocus(e){
	var eventTarget=e.target;
	eventTarget.focus();
}

function verification(){
	var contactNumber=document.getElementsByTagName('input')[2].value;
	var result=contactNumber.match(/\([0-9][0-9][0-9]\)[0-9][0-9][0-9]\-[0-9][0-9][0-9][0-9]/g);
	if (!result){
		var parentElement=document.getElementById('wrapper');
		var warning=document.createElement('div');
		warning.id='invalidTelephoneFormatWarning';
		warning.innerHTML='<span id="close">X</span><p class="notification">Invalid telephone number inputted. Must be in the following format: (###)###-####</p>';
		parentElement.appendChild(warning);
		
		function closeBox(){
			parentElement.removeChild(warning);
		}
		var closeMark=document.getElementById('close');
		closeMark.addEventListener('click',closeBox,false);
	}
}

function wordCounter(){
	var textInput=document.getElementsByTagName('textarea')[0];
	textInputValue=textInput.value;
	var wordCount=textInputValue.split(' ').length;
	var wordCountDisplay=document.getElementsByTagName('p')[1];
	var warningDisplay=document.getElementsByTagName('p')[2]
	
	if(wordCount===1){
		wordCountDisplay.textContent='word count: '+wordCount+' word.';
	} else if (wordCount>1 && wordCount<=299){
		wordCountDisplay.textContent='word count: '+wordCount+' words.';
	} else if (wordCount===300){
		wordCountDisplay.textContent='word count: '+wordCount+' words.';
		warningDisplay.textContent='you have reached the word limit.';
	} else {
		wordCountDisplay.textContent='word count: '+wordCount+' words.';					
		warningDisplay.textContent='you have exceeded the word limit!';
	}
	
	var footerElement=document.getElementsByTagName('footer')[0];
	footerElement.style.marginTop='10%';
}

function formCheck(e){
	var name=document.getElementsByTagName('input')[0];
	var emailAddress=document.getElementsByTagName('input')[1];
	var contactNumber=document.getElementsByTagName('input')[2];
	var textInput=document.getElementsByTagName('textarea')[0];

	var nameValue=name.value;
	var emailAddressValue=emailAddress.value;
	var contactNumberValue=contactNumber.value;
	var textInputValue=textInput.value;
	
	var inputFields=[nameValue, emailAddressValue, contactNumberValue, textInputValue];
	var blankFields=0;

	for (var i=0;i<inputFields.length;i++){
		if (inputFields[i]===''){
			blankFields++;	
		}
	}
	
	if (blankFields>0){
		e.preventDefault();

		var parentElement=document.getElementById('wrapper');
		var warning=document.createElement('div');
		warning.id='emptyFieldsWarning';
		warning.innerHTML='<span id="close">X</span><p class="notification">Please do not leave any fields blank.</p>';
		parentElement.appendChild(warning);
		
		function closeBox(){
			parentElement.removeChild(warning);
		}
		var closeMark=document.getElementById('close');
		closeMark.addEventListener('click',closeBox,false);
	}
}

(function(){
	var contactNumber=document.getElementsByTagName('input')[2];
	contactNumber.addEventListener('click',addFocus,false);
	contactNumber.addEventListener('blur',verification,false);

	var textInput=document.getElementsByTagName('textarea')[0];
	textInput.addEventListener('keydown',wordCounter,false);

	var sendInformation=document.getElementsByTagName('button')[0];
	sendInformation.addEventListener('click',formCheck,false);
})();