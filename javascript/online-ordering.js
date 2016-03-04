(function (){
	var currentTime=new Date();
	var currentYear=currentTime.getFullYear()+60;
	
	var footer=document.getElementsByTagName('footer')[0];
	var parentElement=document.getElementById('wrapper');
	var copyright=document.createElement('p');
	copyright.className='footer';
	copyright.innerHTML='&copy;'+currentYear+' THE MACARON MAN. ALL RIGHTS RESERVED.';
	footer.insertBefore(copyright,footer.childNodes[0]);
})();

function addMoreflavours(){
	var i=0; //Count how many nodes have been duplicated.
	var addFlavourField=document.getElementsByTagName('input')[0];
	var numberOfFlavoursToAdd=Number(addFlavourField.value); //.value returns a string and so Number() is used to convert the value to an integer.
	
	if (numberOfFlavoursToAdd>0 && numberOfFlavoursToAdd<11){
		while (i<numberOfFlavoursToAdd){ 
			/*
			While-loop to add additional fields based on the default setup for inputting macaron flavour
			and corresponding quantity.
			1. The flavour fields were cloned separately from the quantity fields because the latter is later 
			   selected to calculate the client's total bill.
			2. If cloned together with the flavour fields, then this wouldn't be possible.
			3. The "quantity" label is further cloned separately from the quantity input field because the 
			   quantity input field needs to be selected to calculate total bill as .value is a property that 
			   is later selected to compute total quantity ordered.
			*/
			var flavour=[];
			var quantity=[];
			
			var orderDetails=document.getElementsByTagName('section')[1];
			
			var flavourLabel=document.createElement('label');
			var flavourLabel_text=document.createTextNode('Flavour');
			flavourLabel.setAttribute('class','flavourLabel');
			flavourLabel.appendChild(flavourLabel_text);
			orderDetails.appendChild(flavourLabel);
			
			var flavourInput=document.createElement('input');
			flavourInput.setAttribute('type','text');
			flavourInput.setAttribute('class','flavour');
			orderDetails.appendChild(flavourInput);
			
			var quantityLabel=document.createElement('label');
			var quantityLabel_text=document.createTextNode('Quantity');
			quantityLabel.setAttribute('class','QuantityLabel');
			quantityLabel.appendChild(quantityLabel_text);
			orderDetails.appendChild(quantityLabel);
			
			var quantityInputField=document.createElement('input');
			quantityInputField.setAttribute('type','text');
			quantityInputField.setAttribute('class','quantity');
			orderDetails.appendChild(quantityInputField);
			
			if (window.innerHeight<500){
				//Reduce current height by 15%; the equivalent is taking 85% of the current height.
				var displayHeight=(document.getElementsByTagName('body')[0].clientHeight)*.85;  
				document.getElementsByTagName('body')[0].style.height=displayHeight+'px';      
			} else {
				var wrapperElementHeight=(document.getElementById('wrapper').clientHeight)+40;
				document.getElementById('wrapper').style.height=wrapperElementHeight+'px';
			}
						
			i++;
		}
	} else {
		var parentElement=document.getElementById('wrapper');
		var outOfRangeWarning=document.createElement('div');
		outOfRangeWarning.id='outofRangeWarning';
		var htmlMarkup='<span id="closeOutOfRangeWarning">X</span><p id="total">Invalid input. Enter a value greater than 0 but less than 11. A maximum of 10 flavours can be ordered online at once.</p>';
		outOfRangeWarning.innerHTML=htmlMarkup;
		parentElement.appendChild(outOfRangeWarning);
	
		function closeBox(){
			parentElement.removeChild(outOfRangeWarning);
		}
		document.getElementById('closeOutOfRangeWarning').addEventListener('click',closeBox,false);	
	}
}

function captureRemoveValue(){
	var remove=document.getElementsByTagName('input')[1];	
	remove.focus();
}

function deleteFlavours(){
	var remove=document.getElementsByTagName('input')[1];
	remove.focus();

	var numberOfAddedFields=Number(document.getElementsByClassName('flavour').length);
	var deleteValue=Number(remove.value);
	var i=0; //Tracker variable for the while-loop used to keep track of how many times an element has been removed.
	
	var j=deleteValue-1;  
	//This variable serves as an array index tracker.
	//Array-like index position assignments mean that the first one is occupies the 0th spot.
	//Ex. Removing 3 elements would mean removing the 0th, 1st, and 2nd elements with class attribute value "flavour".
	if (numberOfAddedFields>=deleteValue){
		while (i<deleteValue){	
			var breakdown=document.getElementsByTagName('section')[1];
			
			//Select the current Jth element created by the "add" button; these have class attribute value of "flavour".
			var removeFlavourLabel=document.getElementsByClassName('flavourLabel')[j]; 
			breakdown.removeChild(removeFlavourLabel);
			
			var removeFlavourInputField=document.getElementsByClassName('flavour')[j]; 
			breakdown.removeChild(removeFlavourInputField);

			var removeQuantityLabel=document.getElementsByClassName('QuantityLabel')[j]; 
			breakdown.removeChild(removeQuantityLabel);

			var removeQuantityInputField=document.getElementsByClassName('quantity')[j]; 
			breakdown.removeChild(removeQuantityInputField);
			
			var currentHeight=document.getElementsByTagName('section')[1].clientHeight;
			var revised=currentHeight-40;
			document.getElementsByTagName('section')[1].style.height=revised+'px';
			
			if (window.innerHeight<500){
				var displayHeight=(document.getElementsByTagName('body')[0].clientHeight)*.85;
				document.getElementsByTagName('body')[0].style.height=displayHeight+'px';
			} else {
				var wrapperElementHeight=(document.getElementById('wrapper').clientHeight)-40;
				document.getElementById('wrapper').style.height=wrapperElementHeight+'px';
			}
			
			j--;			
			i++;
		}
	} else {		
		var parentElement=document.getElementById('wrapper');
		var invalidRemoveInput=document.createElement('div');
		invalidRemoveInput.id='invalidRemoveInput';
		var htmlMarkup='<span id="closeInvalidRemoveInput">X</span><p>The number of fields to be removed cannot exceed the number of existing fields.</p>';
		invalidRemoveInput.innerHTML=htmlMarkup;
		parentElement.appendChild(invalidRemoveInput);
	
		function closeBox(){
			parentElement.removeChild(invalidRemoveInput);
		}
		document.getElementById('closeInvalidRemoveInput').addEventListener('click',closeBox,false);	
	}
}

function clearAll(){
	var inputFields=document.getElementsByTagName('input');
	for (i=0;i<inputFields.length;i++){
		inputFields[i].value='';
	}
}

function eraseInputField(e){
	var addFlavourField=document.getElementsByTagName('input')[0];
	var removeFlavourField=document.getElementsByTagName('input')[1];
	var addFieldClearButton=document.getElementsByTagName('button')[1];

	var eventTarget=e.target;
	if (eventTarget===addFieldClearButton){
		addFlavourField.value='';
	} else {
		removeFlavourField.value='';
	}
}

function processOrder(){
	var flavourFields=document.getElementsByClassName('flavour');
	var quantityFields=document.getElementsByClassName('quantity');
	
	var Sum=0; 
	
	var Flavours=[], Quantity=[];
	for (var i=0;i<flavourFields.length;i++){
		Flavours.push(flavourFields[i].value);
	}
	
	var blankFields=0;
	for (var i=0;i<quantityFields.length;i++){
		if (quantityFields[i].value===''){
			blankFields++;
		}
	}
	
	if (blankFields>0){
		var parentElement=document.getElementById('wrapper');
		var emptyFieldNotice=document.createElement('div');
		emptyFieldNotice.id='emptyFieldNotice';
		emptyFieldNotice.innerHTML='<span id="closeEmptyFieldNotice">X</span><p>There is at least one empty quantity field.</p>';
		parentElement.appendChild(emptyFieldNotice);
	
		function closeWarning(){
			parentElement.removeChild(emptyFieldNotice);
		}
		document.getElementById('closeEmptyFieldNotice').addEventListener('click',closeWarning,false);	
	} else {
		for (var i=0;i<quantityFields.length;i++){
			Quantity.push(parseInt(quantityFields[i].value)); 
		} /*
			Create an array that will be populated by inputted quantity values formatted as integers so that they can be used in calculations later.
			Keep in mind that .value is a property that returns string output.
		*/
		
		for (var i=0;i<Quantity.length;i++){
			Sum+=Quantity[i];		
		}
	}
	
	if (Sum>0 && Sum<201){ //The minimum total order amount is 1 and the maximum total order amount is 200.
		var j=0; 
		var k=0;
		
		while (j<flavourFields.length && k<flavourFields.length){
			var part1='flavour['+k;
			var part2=']';
			var flavourFieldNameAttributeValue=part1.concat(part2);
			flavourFields[j].setAttribute('name',flavourFieldNameAttributeValue);
			j++;
			k++;
		}
		
		var h=0;
		var i=0;
		
		while (h<quantityFields.length && i<quantityFields.length){
			var part1='quantity['+i;
			var part2=']';
			var quantityFieldNameAttributeValue=part1.concat(part2);
			quantityFields[h].setAttribute('name',quantityFieldNameAttributeValue);
			h++;
			i++;
		}
		
		var parentElement=document.getElementById('wrapper');
		var totalCount=document.createElement('div');
		totalCount.id='totalCount';
		totalCount.innerHTML='<span id="closeTotalCount">X</span><p id="total">TOTAL: '+Sum+'</p>';
		parentElement.appendChild(totalCount);
	
		function closeBox(){
			parentElement.removeChild(totalCount);
		}
		document.getElementById('closeTotalCount').addEventListener('click',closeBox,false);	
		
		var macaronSubtotal=Sum*3;
		var macaronSubtotalRounded=macaronSubtotal.toFixed(2);
		var multiplicativeFactor;
		if (Sum<10){
			var multiplicativeFactor=1.1; //This variable is set at 1.10 and only re-set to 1 if the order size is 10 macarons or more.
		} else {
			multiplicativeFactor=1;
		}
		
		var bill=macaronSubtotal*multiplicativeFactor;
		var billRounded=bill.toFixed(2);		
		
		var invoice=document.getElementsByTagName('table')[0];
		invoice.innerHTML='<tr><th>DESCRIPTION</th><th>DETAILS</th><th>AMOUNT</th></tr>';

		var i=0, j=0; 		
		while (i<Flavours.length && j<Quantity.length){ 
			var unrefined=3*Quantity[j];
			var charge=unrefined.toFixed(2);
			var plural='';
			if (Quantity[j]>1){
				plural='S';
			}
			
			invoice.innerHTML+='<tr><td>'+Quantity[j]+' '+Flavours[i]+' MACARON'+plural+'</td>'+'<td>&#8364;3.00 &times; '
			+Quantity[j]+'</td><td>'+'&#8364;'+charge+'</td></tr>';
			
			i++; 
			j++;
		}
		
		if (Sum<10){
			var taxPaid=macaronSubtotal*.10;
			var taxPaidRounded=TaxPaid.toFixed(2);
			invoice.innerHTML+='<tr><td>10% VAT</td><td>'+' '+'&#8364;'+macaronSubtotalRounded+' &times; .10</td><td>'+'&#8364;'+taxPaidRounded+'</td></tr>';
			invoice.innerHTML+='<tr><td colspan="2">TOTAL</td><td>'+'&#8364;'+billRounded+'</td></tr>';
		}

		if (Sum>=10){
			invoice.innerHTML+='<tr><td colspan="3">VAT EXEMPT (10 OR MORE MACARONS ORDERED)</td></tr>';
			invoice.innerHTML+='<tr><td colspan="2">TOTAL</td><td>'+'&#8364;'+billRounded+'</td></tr>';
		}
		
		var currentHeight=document.getElementById('wrapper').clientHeight;
		var revised=currentHeight+40;
		document.getElementById('wrapper').style.height=revised+'px';
	} else {
		var parentElement=document.getElementById('wrapper');
		var orderRestrictionNotice=document.createElement('div');
		orderRestrictionNotice.id='orderRestrictionNotice';
		orderRestrictionNotice.innerHTML='<span id="closeOrderRestrictionNotice">X</span><p>See note above. Total amount ordered must be at least one and cannot exceed 200 macarons.</p>';
		parentElement.appendChild(orderRestrictionNotice);
	
		function closeWarning(){
			parentElement.removeChild(orderRestrictionNotice);
		}
		document.getElementById('closeOrderRestrictionNotice').addEventListener('click',closeWarning,false);	
	} 
}

(function(){
	document.getElementsByTagName('input')[0].addEventListener('dblclick',addMoreflavours,false);

	document.getElementsByTagName('input')[1].addEventListener('click',captureRemoveValue,false);
	document.getElementsByTagName('input')[1].addEventListener('dblclick',deleteFlavours,false);

	document.getElementsByTagName('button')[0].addEventListener('click',clearAll,false);

	document.getElementsByTagName('button')[1].addEventListener('click',eraseInputField,false);

	document.getElementsByTagName('button')[2].addEventListener('click',eraseInputField,false);

	document.getElementsByTagName('button')[3].addEventListener('click',processOrder,false);
})(); 