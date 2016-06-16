

function htmlEntities(str) {
    return String(str).replace(/\$/g, '&#36;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}


function isUseragentSafari(){

	// SEE:  
	// http://sixrevisions.com/javascript/browser-detection-javascript/
	// http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
	// https://jsfiddle.net/9atsffau/

	console.log('isUseragentSafari - navigator.userAgent: ' + navigator.userAgent);
	
	// return (navigator.userAgent.indexOf('Safari')!==-1)?true:false;

	return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;   // SEE:  https://jsfiddle.net/9atsffau/ 
}
console.log('isUseragentSafari: ' + isUseragentSafari());


function returnLastStudentSession() {
	window.osc = Object.create(objectStorageClass);
	osc.init('studentSession_3');
	osc.exist('jsonData');

	var TjsonData = osc.load('jsonData');
	console.log('returnLastStudentSession - TjsonData: ' + JSON.stringify(TjsonData));

	// IMPORTANT: 
	// In this exercise, the user has to download a word-document in the last step. This is not possible when using Safari - this is why this if-clause has been added.
	if ((isUseragentSafari()) && (typeof(safariUserHasAgreed) === 'undefined')){

		window.safariUserHasAgreed = false;

		UserMsgBox("body", '<h4>OBS</h4> <p>Du arbejder på en Mac og bruger browseren Safari. <br> Denne øvelse virker desværre ikke optimalt på Safari-platformen. Du vil ikke kunne downloade de udfyldte felter som wordfil til sidst i øvelsen.</p><br> <p>Brug i stedet <b>Chrome</b> (<a href="https://www.google.dk/chrome/browser/desktop/">Hent den her</a>) eller <b>Firefox</b>  (<a href="https://www.mozilla.org/da/firefox/new/">Hent den her</a>).</p><br> <p>Mvh <a href="https://www.vucdigital.dk">vucdigital.dk</a> </p>');
		
		$('#UserMsgBox').addClass('UserMsgBox_safari');
		$('.MsgBox_bgr').addClass('MsgBox_bgr_safari');

		$( document ).on('click', ".UserMsgBox_safari", function(event){
			$(".UserMsgBox_safari").fadeOut(200, function() {
	            $(this).remove();
	        });
			safariUserHasAgreed = true;
	        returnLastStudentSession();
		});

		$( document ).on('click', ".MsgBox_bgr_safari", function(event){
			$(".MsgBox_bgr_safari").fadeOut(200, function() {
	            $(this).remove();
	        });
	        safariUserHasAgreed = true;
	        returnLastStudentSession();
		});

		return 0;
	}
	
	if ((TjsonData !== null) && (typeof(TjsonData) !== 'undefined')){
		console.log('returnLastStudentSession - getTimeStamp: ' + osc.getTimeStamp());
	// if (TjsonData !== null){
		var HTML = '';
		HTML += '<h4>OBS</h4> Du har lavet denne øvelse før og indtastet data allerede.';
		HTML += '<div> <span id="objectStorageClass_yes" class="objectStorageClass btn btn-info">Jeg vil fortsætte, hvor jeg slap</span> <span id="objectStorageClass_no" class="objectStorageClass btn btn-info">Jeg vil starte forfra</span> </div>';
		UserMsgBox("body", HTML);

		$('.CloseClass').remove(); // <---- removes the "X" in the UserMsgBox.
		$('.container-fluid').hide();  // Hide all program-content.

	    $('#UserMsgBox').unbind('click');
	    $('.MsgBox_bgr').unbind('click');

	    $( document ).on('click', "#objectStorageClass_yes", function(event){
	        console.log("objectStorageClass.init - objectStorageClass_yes - CLICK" );
	        $(".MsgBox_bgr").fadeOut(200, function() {
	            $(this).remove();
	            $('.container-fluid').fadeIn('slow');  // Fade in all program-content.
	        });
	       
	        jsonData = TjsonData;
			// $('#DataInput').html(eval('step_'+TjsonData.currentStep+'_template()'));
			console.log('returnLastStudentSession - jsonData : ' + JSON.stringify(jsonData)); 
			template();
	
	    });

	    $( document ).on('click', "#objectStorageClass_no", function(event){
	    	// osc.stopAutoSave('test1');
	        console.log("objectStorageClass.init - objectStorageClass_no - CLICK" );
	        osc.delete(osc.localStorageObjName);
	        $(".MsgBox_bgr").fadeOut(200, function() {
	            $(this).remove();
	            $('.container-fluid').fadeIn('slow');  // Fade in all program-content.
	        });

	        // step_0_template();
	        template();
	    });
	} else {
		// step_0_template();
		template();
	}
}




function template() {

	// console.log('TEST: ' + JSON.stringify(Array(6).join('a b c;').split(';')));

	var titelIndex = 0;
	var titelLetter = ['A','B','C','D','E','F','G','H','I','j','K'];
	var HTML = '';

	console.log('template - jsonData 1: ' + JSON.stringify(jsonData)); 

	if (!jsonData.hasOwnProperty("templateData")){ 
		console.log('template - templateData - NOT FOUND ');

		jsonData.templateData = {theme: '', 
    							introduction: '', 
    							problemformulation: '', 
    							subQuestions: [
    								{subQuestion:'',answers:['']},
    								{subQuestion:'',answers:['']},
    								{subQuestion:'',answers:['']},
    								{subQuestion:'',answers:['']}
    							], 
    							conclusion: '',
    							bibliography: {
    								mandatory: [
    									{source:'' ,characterization:''},
    									{source:'' ,characterization:''},
    									{source:'' ,characterization:''},
    									{source:'' ,characterization:''},
    									{source:'' ,characterization:''}
    								],
    								optional: [
    									{source:'' ,characterization:''},
    									{source:'' ,characterization:''}
    								]
    							}
    						};
    }

    var obj = jsonData.templateData;

    console.log('template - jsonData 2: ' + JSON.stringify(jsonData)); 


	HTML += '<h1>'+jsonData.mainHeader+'</h1>';
	HTML += '<div class="col-xs-12 col-md-8">'+instruction(jsonData.instruction)+'</div><div class="clear"></div>';
	HTML += '<div class="row">';
	HTML += 	'<div class="col-xs-12 col-md-12">';
	HTML += 		'<h2>'+titelLetter[titelIndex]+'. Emne og indledning</h2>';
	// HTML += 		'<h2>Titel, indledning og problemformulering</h2>';
	HTML += 		'<div class="textindent">';
	HTML += 			'<h3>Emne</h3>';
	HTML += 			returnInputBoxes4(1, 'studentTheme studentInput', obj.theme, 'Skriv dit emne her...');
	HTML += 			'<h3>Indledning</h3>';
	HTML += 			'<textarea id="introduction" class="studentInput" value="'+obj.introduction+'" placeholder="Skriv din indledning her...">'+obj.introduction+'</textarea>';
	HTML += 		'</div>';

					++titelIndex;
	HTML += 		'<h2>'+titelLetter[titelIndex]+'. Problemformulering og underspørgsmål</h2>';
	HTML += 		'<div class="textindent">';
	HTML += 			'<h3>Problemformulering</h3>';
	HTML += 			'<textarea id="problemformulation" class="studentInput" value="'+obj.problemformulation+'" placeholder="Skriv din problemformulering her...">'+obj.problemformulation+'</textarea>';
	HTML += 			'<h3>Underspørgsmål</h3>';
	HTML += 			'<div class="subQuestionInput">';
							var savedValArr = [];
							var placeholderTextArr = [];
							for (var i in obj.subQuestions) {
								// titelIndex = parseInt(i)+2;
								// var answers = obj.subQuestions[i].answers;
								// var numOfAns = answers.length;
								savedValArr.push(obj.subQuestions[i].subQuestion);
								placeholderTextArr = Array(savedValArr.length+1).join('Skriv dit ??? underspørgsmål her...;').split(';');
								placeholderTextArr.pop();
							}
							console.log('template 1 - i: '+i+', placeholderTextArr: ' + JSON.stringify(placeholderTextArr));
							for (var n in placeholderTextArr){
								placeholderTextArr[n] = replaceWildcard(placeholderTextArr[n], parseInt(n)+1);
							}
							console.log('template 2 - i: '+i+', placeholderTextArr: ' + JSON.stringify(placeholderTextArr) + ',\nsavedValArr: ' + JSON.stringify(savedValArr));
	HTML += 				returnInputBoxes4(savedValArr.length, 'subQuestion starMark studentInput', savedValArr, placeholderTextArr);
	HTML += 			'</div>';
	HTML += 			'<span id="addNewSubQuestion" class="btn btn-info"><span class="glyphicons glyphicons-plus"></span>Tilføj et underspørgsmål</span>';
	HTML += 		'</div>';

					++titelIndex;
	HTML += 		'<h2>'+titelLetter[titelIndex]+'. Besvarelse af underspørgsmål</h2>';
	HTML += 		'<div class="textindent">';
	HTML += 			'Du skal besvare dine underspørgsmål ved hjælp af viden fra de 3 fag og ved hjælp af inddragelse af bilagsmaterialet!';
	HTML += 		'</div>';

	HTML += 		'<div class="subQuestionWrapContainer">';
						var savedValArr = [];
						var placeholderTextArr = [];
						for (var i in obj.subQuestions) {
							// titelIndex = parseInt(i)+1;
							var answers = obj.subQuestions[i].answers;
							var numOfAns = answers.length;
							var subQuestion = obj.subQuestions[i].subQuestion;
							placeholderTextArr = Array(numOfAns+1).join('Skriv din besvarelse her...;').split(';');
							placeholderTextArr.pop();
							console.log('template - i: '+i+', subQuestion: ' + subQuestion+', placeholderTextArr: ' + JSON.stringify(placeholderTextArr)+', obj.subQuestions['+i+']: ' + JSON.stringify(obj.subQuestions[i]));
	HTML += 				answersToSubQuestions(parseInt(i)+1, 'subQuestionAnswer starMark studentInput', subQuestion, answers, placeholderTextArr);
						}
	HTML += 		'</div>';

					++titelIndex;
	HTML += 		'<h2>'+titelLetter[titelIndex]+'. Konklusion</h2>';
	// HTML += 		'<p>';
	// HTML += 			'Du skal skrive konklusionen som en sammenhængende tekst - ikke i stikordsform.';
	// HTML += 		'</p>';
	HTML += 		'<textarea id="conclusion" class="studentInput" value="'+obj.conclusion+'" placeholder="Besvar din problemformulering ved hjælp af en opsummering af dine svar på de enkelte underspørgsmål. Du skal skrive konklusionen som en sammenhængende tekst - ikke i stikordsform.">'+obj.conclusion+'</textarea>';

					++titelIndex;
	HTML += 		'<h2>'+titelLetter[titelIndex]+'. Oversigt over anvendt materiale</h2>';

	HTML += 		'<h3>Det udleverede bilagsmateriale</h3>';
	HTML += 		'<div class="bibMandatory">';
						for (var i in obj.bibliography.mandatory) {
	HTML += 				bibliography(parseInt(i)+1, obj.bibliography.mandatory[i]);
						};
	HTML += 		'</div>';
	HTML += 		'<span id="addNewBibMandatory" class="btn btn-info"><span class="glyphicons glyphicons-plus"></span>Tilføj kilde</span>';

	HTML += 		'<h3>De selvfundne bilag</h3>';
	HTML += 		'<div class="bibOptional">';
						for (var i in obj.bibliography.optional) {
	HTML += 				bibliography(parseInt(i)+1, obj.bibliography.optional[i]);
						};
	HTML += 		'</div>';
	HTML += 		'<span id="addNewBibOptional" class="btn btn-info"><span class="glyphicons glyphicons-plus"></span>Tilføj kilde</span>';

	HTML += 		'<div class="clear"></div>';

	HTML += 		'<span id="download" class="btn btn-lg btn-primary"><span class="glyphicons glyphicons-download-alt"></span> Download</span>';

	HTML += 	'</div>';
	HTML += '</div>';

	// HTML += 	returnInputBoxes4(5, 'XkeyThemesByStudent', [1,2,3,4,5], ['Saved val 1', 'Saved val 2', 'Saved val 3', 'Saved val 4', 'Saved val 5']);
	$('#DataInput').html(HTML);

	// $('.starMark').before('<span class="glyphLi glyphicon glyphicon-star"></span>');  
	$('.starMark').before('<span class="glyphLi glyphicon glyphicon-asterisk"></span>');
}


$( document ).on('click', "#addNewSubQuestion", function(event){
	var numOfSubQuestions = $('.subQuestion').length;
	console.log('addNewSubQuestion - numOfSubQuestions: ' + numOfSubQuestions);
	if (numOfSubQuestions < 10) {
		if (numOfSubQuestions > 4) {
			UserMsgBox("body", '<h4>OBS</h4> <p>En synopsis bør kun indeholde 3-5 underspørgsmål.</p>');
		}
		$('.subQuestionInput').append(returnInputBoxes4(1, 'subQuestion starMark studentInput', '', replaceWildcard('Skriv dit ??? underspørgsmål her...', numOfSubQuestions+1)));
		$('.subQuestionInput .starMark').last().before('<span class="glyphLi glyphicon glyphicon-asterisk"></span>');

		$('.subQuestionWrapContainer').append(answersToSubQuestions(numOfSubQuestions+1, 'subQuestionAnswer starMark studentInput', '', [''], ['Skriv din besvarelse her...']));
		$('.subQuestionWrapContainer .starMark').last().before('<span class="glyphLi glyphicon glyphicon-asterisk"></span>');
	} else {
		UserMsgBox("body", '<h4>OBS</h4> <p>Du kan ikke tilføje mere end 10 underspørgsmål!</p>');
	}
});


$( document ).on('click', "#addNewBibMandatory", function(event){
	$('.bibMandatory').append(bibliography($('.bibMandatory .bibliographyWrap').length+1, {source:'',characterization:''}));
});


$( document ).on('click', "#addNewBibOptional", function(event){
	$('.bibOptional').append(bibliography($('.bibOptional .bibliographyWrap').length+1, {source:'',characterization:''}));
});


function answersToSubQuestions(indexNo, classes, savedSubQuestion, savedValArr, placeholderTextArr) {
	var HTML = '';
	HTML += '<div class="subQuestionWrap">';
	// HTML += 	'<h2>Underspørgsmål '+indexNo+'</h2>';
	HTML += 	'<div class="textindent">';
	HTML += 		'<h3 class="subQuestionHeading">'+((savedSubQuestion.length > 0)?savedSubQuestion:'Underspørgsmål '+indexNo)+'</h3>';
	HTML += 		'<h4>Besvarelser</h4>';
	HTML += 		'<div class="answerWrapContainer">';
	HTML += 			returnInputBoxes4(savedValArr.length, classes, savedValArr, placeholderTextArr);
	HTML += 		'</div>';
	HTML += 		'<span class="addNewSubQuestionAnswer btn btn-info"><span class="glyphicons glyphicons-plus"></span>Tilføj en besvarelse</span>';
	HTML += 	'</div>';
	HTML += '</div>';
	return HTML;
}


$( document ).on('click', ".addNewSubQuestionAnswer", function(event){
	var parentObj = $(this).parent();
	$('.answerWrapContainer', parentObj).append(returnInputBoxes4(1, 'subQuestionAnswer starMark studentInput', [''], ['Skriv din besvarelse her...']));
	$('.answerWrapContainer .starMark', parentObj).last().before('<span class="glyphLi glyphicon glyphicon-asterisk"></span>');
});


// This keypress eventhandler listens for the press of the return-key. If a return-key event is encountered the 
// first empty input-field is found and focus is given to that field.
$( document ).on('keypress', ".subQuestionAnswer", function(event){
	console.log("keypress - keyThemesByStudent - PRESSED");
	if ( event.which == 13 ) {  // If a press on the return-key is encountered... (NOTE: "13" equals the "return" key)
		event.preventDefault(); // ...prevents the normal action of the return-key. 
		console.log("keypress - keyThemesByStudent - PRESSED RETURN");
		if ($(this).val().length > 0){
			// var parentObj = $(this).parent().parent().parent();             // <---- OK 
			// $( ".addNewSubQuestionAnswer", parentObj ).trigger( "click" );  // <---- OK 

			var parentObj = $(this).parent();
			$(parentObj).after(returnInputBoxes4(1, 'subQuestionAnswer starMark studentInput', [''], ['Skriv din besvarelse her...']));
			$(parentObj).next().prepend('<span class="glyphLi glyphicon glyphicon-asterisk"></span>');

			$('.subQuestionAnswer', $(this).parent().next()).focus();
		} else { // If the input-field is empty...
			console.log("keypress - keyThemesByStudent - PRESSED");
			$(this).focus(); // ...give the input-field focus...
		} 
	}
});



$( document ).on('keyup', ".subQuestion", function(event){  // "keyup" instead of "keypress" to detect the last keystroke.
	console.log("keyup - subQuestion" );
	var index = $(this).parent().index();
	var txt = $(this).val();
	console.log("keyup - subQuestion - index: " + index + ", txt: " + txt + ", $(this).parent().class: " + $(this).parent().attr('class'));
	if (txt.length > 0) {
		$('.subQuestionHeading').eq(index).text(txt);
	} else {
		$('.subQuestionHeading').eq(index).text('Underspørgsmål '+String(index+1));
	}
});



function bibliography(indexNo, bibObj) {
	var HTML = '';
	HTML += '<div class="bibliographyWrap">';
	HTML += 	'<div class="textindent">';
	HTML += 		'<h3>Kilde '+indexNo+'</h3>';
	HTML += 		returnInputBoxes4(1, 'source studentInput', bibObj.source, 'Skriv kildens titel, afsender, datering, genre og modtager...');
	// HTML += 		'<div class="clear"></div>';
	// HTML += 		'<h3>Karakteristik af materialet</h3>';
	HTML += 		'<textarea class="characterization" value="'+bibObj.characterization+'" placeholder="Skriv kildens vigtigste pointer/budskab i forhold til problemformuleringen - herunder eventuelle vigtige kildekritiske overvejelser">'+bibObj.characterization+'</textarea>';
	HTML += 	'</div>';
	HTML += '</div>';
	return HTML;
}


function returnInputBoxes4(numOfBoxes, Class, savedValues, placeholderText){  // "returnInputBoxes4" is the same as in "ks_problemformulering". 
	var HTML = '';
	for (var i = 0; i < numOfBoxes; i++) {
		HTML += '<span class="input-group">';
		// HTML += 	'<span class="input-group-addon" id="sizing-addon2">@</span>';
		if (typeof(placeholderText) == 'string')
			// HTML += 	'<input type="text" class="'+Class+' form-control" placeholder="'+placeholderText+'" aria-describedby="sizing-addon2">';                               // 16-02-2016        
			HTML += 	'<input type="text" class="'+Class+' form-control"'+((savedValues!=='')?' value="'+savedValues+'"':'')+' placeholder="'+placeholderText+'" aria-describedby="sizing-addon2">';   // 16-02-2016
		if ((Array.isArray(savedValues)) && (savedValues.length == numOfBoxes) && (Array.isArray(placeholderText)) && (placeholderText.length == numOfBoxes))
			HTML += 	'<input type="text" class="'+Class+' form-control"'+((savedValues[i]!=='')?' value="'+savedValues[i]+'"':'')+' placeholder="'+placeholderText[i]+'" aria-describedby="sizing-addon2">';
		HTML += '</span>';
	};
	return HTML;
}


function saveJsonData(){
	jsonData.templateData = {theme: $('.studentTheme').val(), introduction: $('#introduction').val(), problemformulation: $('#problemformulation').val(), subQuestions: [], conclusion: $('#conclusion').val(), bibliography:{mandatory:[], optional:[]}};
	$( ".subQuestionWrap" ).each(function( index1, element1 ) {
		// var subObj = {subQuestion: $('.subQuestion',element1).val(), answers: []};  // subQuestionHeading
		var subQuestionHeading = $('.subQuestionHeading',element1).text();
		var subQuestionTxt = (subQuestionHeading.indexOf('Underspørgsmål ') === -1)?subQuestionHeading:'';  // <---- Not a good way of testing - consider useing regex match
		var subObj = {subQuestion: subQuestionTxt, answers: []};
		$( ".subQuestionAnswer", element1 ).each(function( index2, element2 ) {
			subObj.answers.push($(element2).val());
		});
		jsonData.templateData.subQuestions.push(subObj);
	});

	$( ".bibMandatory .bibliographyWrap" ).each(function( index, element ) {
		jsonData.templateData.bibliography.mandatory.push({source: $('.source', element).val(), characterization:$('.characterization', element).val()});
	});

	$( ".bibOptional .bibliographyWrap" ).each(function( index, element ) {
		jsonData.templateData.bibliography.optional.push({source: $('.source', element).val(), characterization:$('.characterization', element).val()});
	});

	console.log('saveJsonData - jsonData.templateData: ' + JSON.stringify(jsonData.templateData)); 
}


$( document ).on('click', "#download", function(event){

	saveJsonData();

	var HTML = wordTemplate();

	var converted = htmlDocx.asBlob(HTML);
    console.log("download - converted: " + JSON.stringify(converted));
	saveAs(converted, 'Min synopsis.docx');
});


// This function replaces all "???" wildcards in strToReplace with the corrosponding "num" value translated into a string-word (between zero and twenty)
function replaceWildcard(strToReplace, num){
	// var numArray = ['nul','en','to','tre','fire','fem','seks','syv','otte','ni','ti','elleve','tolv','tretten','fjorten','femten','seksten','sytten','atten','nitten','tyve'];
	var numArray = ['nul','første','andet','tredje','fjerde','femte','sjette','syvende','ottende','niende','tiende', 'ellevte', 'tolvte', 'trettende', 'fjortende', 'femtende', 'sekstende', 'syttende', 'attende', 'nittende', 'tyvende'];
	var strArray = strToReplace.split(" ??? ");
	if (num > numArray.length-1) {
		return strArray.join(' '+String(num)+' ');
	} else {
		return strArray.join(' '+numArray[num]+' ');
	}
	return strToReplace;
}
console.log('replaceWildcard: ' + replaceWildcard('Du har ??? gode cykler tilrådighed, eller ??? dårlige?', 5)); 
console.log('replaceWildcard: ' + replaceWildcard('Du har ??? gode cykler tilrådighed, eller ??? dårlige?', 9)); 
console.log('replaceWildcard: ' + replaceWildcard('Du har ??? gode cykler tilrådighed, eller ??? dårlige?', 10));
console.log('replaceWildcard: ' + replaceWildcard('Du har ??? gode cykler tilrådighed, eller ??? dårlige?', 11)); 
console.log('replaceWildcard: ' + replaceWildcard('Du har ??? gode cykler tilrådighed, eller ??? dårlige?', 20)); 


function wordTemplate() {
	var obj = jsonData.templateData;
	var HTML = '';
	HTML += '<!DOCTYPE html>';
	HTML += '<html>';
	HTML += 	'<head>';
	HTML += 	'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';  // Fixes issue with danish characters on Internet Explore 
	HTML += 		'<style type="text/css">';
	HTML += 			'body {font-family: arial}';
	HTML += 			'h1 {}';
	HTML += 			'h2 {}';
	HTML += 			'h3 {color: #333}';
	HTML += 			'h4 {color: #56bfc5}';
	HTML += 			'h5 {}';
	HTML += 			'h6 {}';
	HTML += 			'.selected {color: #56bfc5; width: 25%}';
	HTML += 			'p {font-size: 1.2em; margin-bottom: 5px}';
	HTML += 			'table {width:95%; margin-left:12px}';
	HTML += 			'td {padding:10px 10px 10px 10px}';
	HTML += 			'ol {color: #000}';
	HTML += 			'.checkQuestion{background-color: #acefed; padding: 10px 10px 10px 10px; margin-bottom: 25px}';  // g2
	HTML += 			'.useMaterial{background-color: #d2d4ec; padding: 10px 10px 10px 10px; margin-bottom: 25px}';  // e2
	HTML += 			'.innerSpacer{margin: 10px}';
	HTML +=				'.spacer{}';
	HTML += 		'</style>';
	HTML += 	'</head>';
	HTML += 	'<body>'; 
	HTML += 		'<h1>'+obj.theme+'</h1>';

	HTML += 		'<h3>Indledning</h3>';
	HTML += 		'<p>'+obj.introduction+'</p>';

	HTML += 		'<h3>Problemformulering</h3>';
	HTML += 		'<p>'+obj.problemformulation+'</p>';

	HTML += 		'<h3>Underspørgsmål</h3>';
	HTML += 		'<ol>';
					for (var n in obj.subQuestions){
						var subQuestion = obj.subQuestions[n].subQuestion;
	HTML += 			(subQuestion.length > 0)? '<li>'+subQuestion+'</li>':'';
					}
	HTML += 		'</ol>';

	HTML += 		'<h3>Besvarelse af underspørgsmål</h3>';
					for (var n in obj.subQuestions){
						var subQuestion = obj.subQuestions[n].subQuestion;
						if (subQuestion.length > 0){
	HTML +=					String(parseInt(n)+1)+'. '+subQuestion;			
	HTML += 				'<ul>';
							for (var m in obj.subQuestions[n].answers){
								var answer = obj.subQuestions[n].answers[m];
								if (answer.length > 0) {
	HTML += 						(subQuestion.length > 0)? '<li>'+answer+'</li>':'';
								}
							}
	HTML += 				'</ul>';
						}
					}

	HTML += 		'<h3>Konklusion</h3>';
	HTML += 		'<p>'+obj.conclusion+'</p>';

					var count = 1;
	HTML += 		'<h3>Det udleverede bilagsmateriale</h3>';
					for (var n in obj.bibliography.mandatory){
						var bib = obj.bibliography.mandatory[n];
	HTML += 			(bib.source.length > 0)?'<b>Kilde '+count+': </b>'+bib.source+'<br>':'';
	HTML += 			(bib.characterization.length > 0)?'<b>Materialekarakteristik: </b>'+bib.characterization+'<br><br>':'';
						if (bib.source.length > 0) {
							++count
						};
					}

					count = 1;
	HTML += 		'<h3>De selvfundne bilag</h3>';
					for (var n in obj.bibliography.optional){
						var bib = obj.bibliography.optional[n];
	HTML += 			(bib.source.length > 0)?'<b>Kilde '+count+': </b>'+bib.source+'<br>':'';
	HTML += 			(bib.characterization.length > 0)?'<b>Materialekarakteristik: </b>'+bib.characterization+'<br><br>':'';
						if (bib.source.length > 0) {
							++count
						};
					}

	HTML += 		'<h3>Tjekspørgsmål til problemformuleringen:</h3> '; 
	HTML += 		'<table class="checkQuestion">';
	HTML += 			'<tr><td><p><b>Rød tråd:</b> Hænger hoved- og underspørgsmål sammen? Dvs. besvares hovedspørgsmålet med underspørgsmålene? Og er der en sammenhæng mellem underspørgsmålene?</p>';
	HTML += 			'<p><b>Taksonomi:</b> Lægger hovedspørgsmålet op til undersøgelse, diskussion og vurdering (ikke kun redegørelse)?</p>';
	HTML += 			'<p><b>Tværfaglighed:</b> Kan viden fra alle tre fag inddrages i besvarelsen af problemformuleringen?</p>';
	HTML += 			'<p><b>Anvendelse af materiale:</b> Lægger spørgsmålene op til at inddrage bilagene i besvarelsen?</p></td></tr>';
	HTML += 		'</table>';

	// HTML += 		'<div class="spacer">&nbsp;</div>'

	// HTML += 		'<table class="useMaterial">';
	// HTML += 			'<p><b>Anvendelse af materiale:</b> Til KS-eksamen er det vigtigt, at spørgsmålene også lægger op til at inddrage det udleverede materiale i besvarelsen!</p>';
	// HTML += 		'</table>';

	HTML += 	'</body>';
	HTML += '</html>';
	// document.write(HTML);
	return HTML;
}



$( document ).on('focusout', "textarea", function(event){ 
	saveJsonData();
	osc.save('jsonData', jsonData);
	console.log('focusout - textarea - jsonData: ' + JSON.stringify(jsonData));
});

$( document ).on('focusout', "input", function(event){
	saveJsonData();
	osc.save('jsonData', jsonData);
	console.log('focusout - input - jsonData: ' + JSON.stringify(jsonData));
});


$( window ).unload(function() {   // <---------------  This saves data if the page is closed or reloaded.
	saveJsonData();
	osc.save('jsonData', jsonData);
	console.log('unload - jsonData: ' + JSON.stringify(jsonData));
	// confirm('unload - jsonData: ' + JSON.stringify(jsonData));
});




$(window).on('resize', function() {
});


$(document).ready(function() {

	returnLastStudentSession();

	template();
	
});