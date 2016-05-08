<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="description" content="Unlike conventional macaron bakeries, The Macaron Man 
is dedicated to producing in-house, high end, and premium quality macarons using world renowned ingredients.">
<meta name="keywords" content="macaron shop, patisserie, all-natural, premium, treats">
<?php
print <<<HERE
<link rel="icon" type="image/x-icon" href="multimedia/beardedManIcon.ico"/>
<link rel="shortcut icon" type="image/x-icon" href="multimedia/beardedManIcon.ico"/>
<link href="css/confirmation/main.css" type="text/css" rel="stylesheet">
<link href="css/reset.css" type="text/css" rel="stylesheet">
<link href="css/body-header-and-footer-basics.css" type="text/css" rel="stylesheet">
HERE;
?>
<title>ORDER STATUS CONFIRMATION</title>
</head>
<body>
<div id="wrapper">
<header>
<nav>
	<ul>
		<li><a href="http://www.themacaronman.co/the-story">the story</a></li>
		<li><a href="http://www.themacaronman.co/the-flavours">the flavours</a></li>
		<li><a href="http://www.themacaronman.co/contact">contact</a></li>
		<li><a href="http://www.themacaronman.co/online-ordering">online ordering</a></li>
	</ul>
</nav>
<h1>ORDER STATUS CONFIRMATION</h1>
</header>

<?php
$name=filter_input(INPUT_POST,"name");
$emailAddress=filter_input(INPUT_POST,"emailAddress");

$formData=filter_input_array(INPUT_POST);
$flavour=$formData["flavour"];
$quantity=$formData["quantity"];

if (isset($name) && isset($emailAddress) && isset($flavour) && isset($quantity)){
	$i=0;
	$k=0;

	//Initialize a variable to hold the table rows that will contain order details.
	$details="";

	while ($i<count($flavour) && $k<count($quantity)){
		$plural="";
		if ($quantity[$k]>1){
			$plural="S";
		}
		
		$price=3;
		$subtotal=$quantity[$k]*3;
		$formattedPrice=number_format($price,2);
		$formattedSubtotal=number_format($subtotal,2);
		$tdStyle="border: 3px solid rgb(0,0,0); padding: 5px; text-transform: uppercase;";
		$details.="<tr style=\"border:3px solid rgb(0,0,0);\"><td style=\"$tdStyle\">$quantity[$k] $flavour[$i] MACARON$plural</td><td style=\"$tdStyle\">&euro;$formattedPrice x $quantity[$k]</td><td style=\"$tdStyle\">&euro;$formattedSubtotal</td></tr>";
		
		$i++;
		$k++;
	}

	//compute the total number of macarons ordered.
	$total=0;
	for ($i=0;$i<count($quantity);$i++){
		$total+=$quantity[$i];
	} 

	$amount=$total*3;
	$formattedAmount=number_format($amount,2);

	if ($total>=10){
		$tdStyle="border: 3px solid rgb(0,0,0); padding: 5px;";

		$details.="<tr><td colspan=\"3\" style=\"$tdStyle\">VAT EXEMPT (10 OR MORE MACARONS ORDERED)</td></tr>";
		$details.="<tr><td colspan=\"2\" style=\"$tdStyle\">TOTAL:</td><td style=\"$tdStyle\">&euro;$formattedAmount</td></tr>";
	} else {
		$totalVAT=$amount*.10;
		$formattedTotalVAT=number_format($totalVAT,2);
		$afterTaxAmount=$amount*1.10;
		$formattedAfterTaxAmount=number_format($afterTaxAmount,2);
		
		$tdStyle="border: 3px solid rgb(0,0,0); padding: 5px;";
		$details.="<tr><td style=\"$tdStyle\">10% VAT</td><td style=\"$tdStyle\">&euro;$formattedAmount x .10</td><td style=\"$tdStyle\">&euro;$formattedTotalVAT</td></tr>";
		$details.="<tr><td colspan=\"2\" style=\"$tdStyle\">TOTAL:</td><td style=\"$tdStyle\">&euro;$formattedAfterTaxAmount</td></tr>";
	}

	//Gather the rows formed by the loop into the table.
	$thStyle="border: 3px solid rgb(0,0,0); padding: 5px;";
	$table="<table style=\"border:3px solid rgb(0,0,0); border-collapse:collapse; color:rgb(0,0,0); font-size: 80%; font-weight:bold; margin-left: 12.5%; text-align:center; width: 70%;\"><tr><th style=\"$thStyle\">DESCRIPTION</th><th style=\"$thStyle\">DETAILS</th><th style=\"$thStyle\">AMOUNT</th></tr>$details</table>";

	#Call the PHPMailer package available for download on GitHub and set up the necessary details to send a SMTP email to the shop's email account.
	require "phpmailer/PHPMailerAutoload.php";
	
	$mail = new PHPMailer();
	$mail->IsSMTP();                                      	
	$mail->Host = "server179.web-hosting.com";  						
	$mail->SMTPAuth = true;                               				
	$mail->Username = "products@themacaronman.co";          
	$mail->Password = "";                       		
	$mail->SMTPSecure = "ssl";                            	
	$mail->Port = "465";                                    		
	$mail->setFrom("products@themacaronman.co");
	$mail->addAddress("products@themacaronman.co");     
	$mail->isHTML(true); 
	
	$mail->Subject="ONLINE ORDER BREAKDOWN DETAILS";

	//In this project, I have set the timezone used in this PHP script to 'America/Vancouver'.
	date_default_timezone_set('America/Vancouver');

	//Create a date & time object so that the current time can be displayed in both the PHP page and the email.
	//The date and time should be as accurate as possible, so DateTime is initialized only prior to finalizing the body of the email.
	$date=new DateTime();
	$currentDayOfTheWeek=$date->format("l");
	$currentMonth=$date->format("F");
	$currentDayOfTheMonth=$date->format("j");
	$currentYear=$date->format("Y")+60; //I added 60 to the current year to get 2076, in line with the fictional year used in the website.
	$currentHour=$date->format("G"); //24-hour time format.
	$currentMinute=$date->format("i");

	$firstPart="<section><p style=\"font-weight:bold; text-transform: uppercase;\">$name (email address: <span style=\"text-transform:lowercase;\">";
	$firstPart.="$emailAddress</span>) has submitted the following order on $currentDayOfTheWeek, $currentMonth $currentDayOfTheMonth,";
	$firstPart.="$currentYear at $currentHour:$currentMinute.</p>";
	$secondPart="$table</section>";
	$mail->Body=$firstPart.$secondPart;

	if(!$mail->send()) {
		print <<<HERE
		<section> 
				<p>Sorry, your order was not received via email by THE MACARON MAN.</p>
				<p>The following error occurred: $mail->ErrorInfo</p>
				<p>Please report this to the webmaster as soon as possible.</p>
		</section>
HERE;
	} else {
		print <<<HERE
		<section>
			<p>Your order was successfully received via email by THE MACARON MAN on <span>$currentDayOfTheWeek, $currentMonth $currentDayOfTheMonth, 
			$currentYear at $currentHour:$currentMinute</span>.</p>
			<p>Please print the following order breakdown (receipt) for your own records:</p>
			$table
			<p>Thanks for your patronage!</p>
		</section>
HERE;
	}
} else {
	print <<<HERE
		<p>No information was received from <span>online-ordering.html</span></p>
		<p>Therefore, no order could be processed.</p>
HERE;
}

$date=new DateTime();
$currentYear=$date->format("Y")+60;
print <<<HERE
<footer>
	<p>&copy; $currentYear. ALL RIGHTS RESERVED.</p>
	<p>FLAGSHIP STORE ADDRESS: 888 AVENIDA DE LA REP&Uacute;BLICA POPULAR FUENTES, BONAVENTURA.</p>
	<p>CONTACT THE WEBMASTER AT <span id="bottom">WEBMASTER@THEMACARONMAN.CO</span> TO REPORT ANY WEB BROWSING PROBLEMS AND SUGGESTIONS.</p>
</footer>
HERE;
?>
</div>
</body>
</html>