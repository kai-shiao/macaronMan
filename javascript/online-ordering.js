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
	var NumberofFlavoursToAdd=parseInt(add.value); //.value returns a string and so parseInt() is used to convert the value to an integer.
	var added_fields=0;
	
	if (NumberofFlavoursToAdd>0 && NumberofFlavoursToAdd<11){
		while (i<NumberofFlavoursToAdd){ 
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
			
			if (Window.innerHeight<500){
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
		var outofRangeWarning=document.createElement('div');
		outofRangeWarning.id='outofRangeWarning';
		var htmlMarkup='<span id="closeOutOfRangeWarning">X</span><p id="total">Invalid input. Enter a value greater than 0 but less than 11. A maximum of 10 flavours can be ordered online at once.</p>';
		outofRangeWarning.innerHTML=htmlMarkup;
		parentElement.appendChild(outofRangeWarning);
	
		function closeBox(){
			parentElement.removeChild(outofRangeWarning);
		}
		var xMark=document.getElementById('closeOutOfRangeWarning');
		xMark.addEventListener('click',closeBox,false);	
	}
}

function captureRemoveValue(){
	remove.focus();
}

function deleteFlavours(){
	remove.focus();

	var number_of_added_fields=document.getElementsByClassName('flavour').length;
	var DeleteValue=parseInt(remove.value);
	var i=0; //Tracker variable for the while-loop used to keep track of how many times an element has been removed.
	
	var j=DeleteValue-1;  
	//This variable serves as an array index tracker.
	//Array-like index position assignments mean that the first one is occupies the 0th spot.
	//Ex. Removing 3 elements would mean removing the 0th, 1st, and 2nd elements with class attribute value "flavour".
	if (number_of_added_fields>=DeleteValue){
		while (i<DeleteValue){	
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
			
			if (Window.innerHeight<500){
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
		var xMark=document.getElementById('closeInvalidRemoveInput');
		xMark.addEventListener('click',closeBox,false);	
	}
}

function clearAll(){
	var input_fields=document.getElementsByTagName('input');
	for (i=0;i<input_fields.length;i++){
		input_fields[i].value='';
	}
}

function eraseInputField(e){
	var event_target=e.target;
	if (event_target===add_clear){
		add.value='';
	} else {
		remove.value='';
	}
}

function processOrder(){
	var flavour_fields=document.getElementsByClassName('flavour');
	var quantity_fields=document.getElementsByClassName('quantity');
	
	var Sum=0; 
	
	var Flavours=[], Quantity=[];
	for (var i=0;i<flavour_fields.length;i++){
		Flavours.push(flavour_fields[i].value);
	}
	
	var blankFields=0;
	for (var i=0;i<quantity_fields.length;i++){
		if (quantity_fields[i].value===''){
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
		var closeMark=document.getElementById('closeEmptyFieldNotice');
		closeMark.addEventListener('click',closeWarning,false);	
	} else {
		for (var i=0;i<quantity_fields.length;i++){
			Quantity.push(parseInt(quantity_fields[i].value)); 
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
		
		while (j<flavour_fields.length && k<flavour_fields.length){
			var part1='flavour['+k;
			var part2=']';
			var flavourFieldNameAttributeValue=part1.concat(part2);
			flavour_fields[j].setAttribute('name',flavourFieldNameAttributeValue);
			j++;
			k++;
		}
		
		var h=0;
		var i=0;
		
		while (h<quantity_fields.length && i<quantity_fields.length){
			var part1='quantity['+i;
			var part2=']';
			var quantityFieldNameAttributeValue=part1.concat(part2);
			quantity_fields[h].setAttribute('name',quantityFieldNameAttributeValue);
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
		var xMark=document.getElementById('closeTotalCount');
		xMark.addEventListener('click',closeBox,false);	
		
		var giftBoxcharge;
		var macaron_subtotal=Sum*3;
		var macaron_subtotal_rounded=macaron_subtotal.toFixed(2);
		var multiplicative_factor;
		if (Sum<10){
			var multiplicative_factor=1.1; //This variable is set at 1.10 and only re-set to 1 if the order size is 10 macarons or more.
		} else {
			multiplicative_factor=1;
		}
		
		var Bill=macaron_subtotal*multiplicative_factor;
		var Bill_rounded=Bill.toFixed(2);		
		
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
			var TaxPaid=macaron_subtotal*.10;
			var TaxPaid_rounded=TaxPaid.toFixed(2);
			invoice.innerHTML+='<tr><td>10% VAT</td><td>'+' '+'&#8364;'+macaron_subtotal_rounded+' &times; .10</td><td>'+'&#8364;'+TaxPaid_rounded+'</td></tr>';
			invoice.innerHTML+='<tr><td colspan="2">TOTAL</td><td>'+'&#8364;'+Bill_rounded+'</td></tr>';
		}

		if (Sum>=10){
			invoice.innerHTML+='<tr><td colspan="3">VAT EXEMPT (10 OR MORE MACARONS ORDERED)</td></tr>';
			invoice.innerHTML+='<tr><td colspan="2">TOTAL</td><td>'+'&#8364;'+Bill_rounded+'</td></tr>';
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
		var closeMark=document.getElementById('closeOrderRestrictionNotice');
		closeMark.addEventListener('click',closeWarning,false);	
	} 
}
 
var add=document.getElementsByTagName('input')[0];
add.addEventListener('dblclick',addMoreflavours,false);

var remove=document.getElementsByTagName('input')[1];
remove.addEventListener('click',captureRemoveValue,false);
remove.addEventListener('dblclick',deleteFlavours,false);

var clear_all_fields=document.getElementsByTagName('button')[0];
clear_all_fields.addEventListener('click',clearAll,false);

var add_clear=document.getElementsByTagName('button')[1];
add_clear.addEventListener('click',eraseInputField,false);

var remove_clear=document.getElementsByTagName('button')[2];
remove_clear.addEventListener('click',eraseInputField,false);

var saveButton=document.getElementsByTagName('button')[3];
saveButton.addEventListener('click',processOrder,false);