<!DOCTYPE html>
<html lang="en-CA">
<head>
<meta charset="UTF-8">
<meta name="description" content="Unlike conventional macaron bakeries, The Macaron Man 
is dedicated to producing in-house, high end, and premium quality macarons using world renowned ingredients.">
<meta name="keywords" content="macaron shop, patisserie, all-natural, premium, treats">
<link rel="icon" type="image/x-icon" href="multimedia/beardedManIcon.ico"/>
<link rel="shortcut icon" type="image/x-icon" href="multimedia/beardedManIcon.ico"/>
<link href="http://localhost/themacaronman2/css/thank-you/main.css" rel="stylesheet">
<title>THANK YOU!</title>
</head>
<body>
<div id="wrapper">
<header>
	<nav>
		<ul>
			<li><a href="the-story.html">the story</a></li>
			<li><a href="the-flavours.html">the flavours</a></li>
			<li><a href="contact.html">contact</a></li>
			<li><a href="online-ordering.html">online ordering</a></li>
		</ul>
	</nav>

<h1>THANK YOU FOR YOUR FEEDBACK!</h1>
</header>
<?php
$name=filter_input(INPUT_POST,"name");
$capitalizedName=strtoupper($name);
$emailAddress=filter_input(INPUT_POST,"emailAddress");
$contactNumber=filter_input(INPUT_POST,"contactNumber");
$feedback=filter_input(INPUT_POST,"feedback");

#Call the PHPMailer package available for download on GitHub and set up the necessary details to send a SMTP email to the shop's email account.
require "phpmailer/PHPMailerAutoload.php";

$mail = new PHPMailer();
$mail->IsSMTP();                                      	// Use SMTP
$mail->Host = "";  										// Use your email provider's SMTP host. 
$mail->SMTPAuth = true;                               	// SMTP authentication
$mail->Username = "";          							// Use your own email account details to test this function
$mail->Password = "";                       			// Password removed for security reasons.
$mail->SMTPSecure = "";                            	
$mail->Port = ;                                    		// Look up SMTP settings for your email provider.
$mail->setFrom("from@example.com");
$mail->addAddress("themacaronman@hotmail.com");     	// The shop is the recipient.
$mail->isHTML(true);                                  	// Send a HTML email.

$mail->Subject="RECEIPT OF FEEDBACK FROM $capitalizedName (EMAIL ADDRESS: $emailAddress)";

//In my PHP.ini file, I set the default timezone to 'Europe/London'.
$date=new DateTime();
$currentDayOfTheWeek=$date->format("l");
$currentMonth=$date->format("F");
$currentDayOfTheMonth=$date->format("j");
$currentYear=$date->format("Y")+60; //I added 60 to the current year to get 2076, in line with the fictional year used in the website.
$currentHour=$date->format("G"); //24-hour time format.
$currentMinute=$date->format("i");

$mail->Body="<p style=\"font-weight:bold; text-transform:uppercase;\">$name (email address: <span style=\"text-transform:lowercase;\">$emailAddress</span>";
$mail->Body.=" ; contact number: $contactNumber) sent the following feedback to the macaron man on";
$mail->Body.=" $currentDayOfTheWeek, $currentMonth $currentDayOfTheMonth, $currentYear at $currentHour:$currentMinute.</p>";
$mail->Body.="<p style=\"border-top: 3px solid rgb(0,0,0);\"></p>";
$mail->Body.="<p style=\"font-weight:bold; text-transform:lowercase;\">$feedback</p>";
$mail->Body.="<p style=\"border-top: 3px solid rgb(0,0,0)\";></p>";

if(!$mail->send()) {
    print <<<HERE
	<section> 
			<p>Sorry, your feedback was not received via email by THE MACARON MAN.</p>
			<p>The following error occurred: <span>$mail->ErrorInfo</span></p>
			<p>Please report this to the webmaster as soon as possible.</p>
	</section>
HERE;
} else {
	print <<<HERE
	<section>
			<p>Your feedback was successfully received via email by THE MACARON MAN on <span> $currentDayOfTheWeek, $currentMonth $currentDayOfTheMonth, 
			$currentYear at $currentHour:$currentMinute.</span></p>
			<p>Please print the following feedback submitted for your own records:</p>
			<section id="contents">
					<p>NAME:</p> 
					<p>$capitalizedName</p>
					<p>EMAIL ADDRESS:</p> 
					<p>$emailAddress</p>
					<p>MESSAGE:</p>
					<p>$feedback</p>
			</section>
	</section>
HERE;
}

//Dynamically generated year display.
print <<<HERE
<section>
		<p>THANK YOU FOR YOUR FEEDBACK!</p>
		<p>GIVEN THE HIGH VOLUME OF EMAILS RECEIVED, IT MAY TAKE AS LONG AS <span>THREE (3) BUSINESS DAYS</span> TO RECEIVE A RESPONSE FROM THE MACARON MAN.</p>
</section>
<footer> 
&copy; $currentYear. THE MACARON MAN. ALL RIGHTS RESERVED.
		<p id="inside">CONTACT THE WEBMASTER AT <span>WEBMASTER@THEMACARONMAN.COM</span> TO REPORT ANY WEB BROWSING PROBLEMS AND SUGGESTIONS.</p>
</footer>
HERE;
?>
</div>
</body>
</html>