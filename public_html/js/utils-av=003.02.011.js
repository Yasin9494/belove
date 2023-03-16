function displayErrorDiv(title, componentId) {
	var inputItem = document.getElementById(componentId);
	if (inputItem.className.indexOf("validation-error") < 0) {
		return;
	}

	var errorDiv = document.getElementById("error-container");

	var inputCoords = getPosition(inputItem);

	errorDiv.getElementsByTagName("div")[2].innerHTML = title;
	errorDiv.style.width = 209 + 'px';
	errorDiv.style.textAlign = 'left';
	errorDiv.style.display = 'block';

	var pointer = errorDiv.getElementsByTagName("div")[0];
	pointer.style.width = '13px';
	pointer.style.height = errorDiv.clientHeight + 'px';

	var xFix = inputItem.nextSibling ? 203 : 220;
	var yFix = errorDiv.clientHeight / 2 - 9;

	errorDiv.style.left = inputCoords[0] + inputItem.offsetWidth - xFix + 'px';
	errorDiv.style.top = inputCoords[1] - yFix + 'px';
}
function hideErrorDiv(componentId) {
	document.getElementById("error-container").style.display = 'none';
}
function getPosition(obj){
	var coords = [0, 0];

    while(obj){
		coords[0] += obj.offsetLeft;
		coords[1] += obj.offsetTop;
		obj = obj.offsetParent;
    }

	return coords;
}

function test(){
	var firstCitizenship = document.getElementById('form_citizenship');
	var aCitizenship = document.getElementById('acitizenship');
	var secondCitizenship = $('form_citizenship2');
	var thirdCitizenship = $('form_citizenship3');

	var fv = firstCitizenship.value;
	//if (fv == 'W_Лицо без гражданства') {
	//	fv = '';
	//}
	if (fv != 'W_Лицо без гражданства') {
		aCitizenship.style.display = '';
	} else {
		aCitizenship.style.display = 'none';
	}

	//if (secondCitizenship.value != '') {
	//	enableInput(thirdCitizenship, false);
	//} else {
	//	disableInput(thirdCitizenship);
	//}
}

function displayOn(name1, name2) {
	for (var i = 0; i < 5; i++) {
		var block = document.getElementById(name1 + i);

		if (block.style.display == 'none') {
			block.style.display = '';

			if (i == 4) {
				var a = document.getElementById(name2);

				a.style.display = 'none';
			}

			return;
		}
	}
}

function displayRow(object, name) {
	var tableBody = document.getElementById(name + '_tbody');
	var trs = tableBody.getElementsByTagName("tr");
	for (var i = 0; i < trs.length; i++) {
		if (trs[i].style.display == 'none') {
			trs[i].style.display = '';

			return;
		}
	}

	object.className = 'row-button disabled-button';
	object.onclick = null;
}

function emptyRow(row) {
	var inputs = row.getElementsByTagName("INPUT");
	if (!checkElementsRow(inputs)) {
		return false;
	}

	var textareas = row.getElementsByTagName("TEXTAREA");
	if (!checkElementsRow(textareas)) {
		return false;
	}

	var selects = row.getElementsByTagName("SELECT");
	return checkElementsRow(selects);
}

function checkElementsRow(elements) {
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].value != "") {
			return false;
		}
	}

	return true;
}

function setMonth(object, name) {
	var yearField = document.forms['form'].elements[name + "_YEAR"];
	var resultField = document.forms['form'].elements[name + "_RQ"];
	if (yearField.value != '' && object.value != '') {
		resultField.value = object.value + "." + yearField.value;
	}
}

function setYear(object, name) {
	var monthField = document.forms['form'].elements[name + "_MONTH"];
	var resultField = document.forms['form'].elements[name + "_RQ"];
	if (monthField) {
		if (monthField.value != '' && object.value != '') {
			resultField.value = monthField.value + "." + object.value;
		}
	} else if (object.value != '') {
		resultField.value = object.value;
	}
}

function initializeQuestion(name) {
	var cmpName = name;

	var dictionaryField = document.forms['form'].elements[name + "_DICTIONARY"];
	if (dictionaryField) {
		dictionaryField.onchange = function() {
			updateQuestionModel(cmpName);
		};
	} else {
		document.forms['form'].elements[name + "_SELECTOR"].onchange = function() {
			updateQuestionModel(cmpName);
		};
	}

	updateQuestionModel(cmpName);
}

function updateQuestionModel(name) {
	var selector = document.forms['form'].elements[name + "_SELECTOR"];

	var value;
	if (!selector) {
		selector = document.forms['form'].elements[name + "_DICTIONARY"];
		value = selector.value.charAt(2);
	} else {
		value = selector.value;
	}

	var textField = document.forms['form'].elements[name + "_TEXTVALUE"];
	var extraField = document.forms['form'].elements[name + "_EXTRA"];

	var textClassName = getOriginalClassname(textField.className);
	if (extraField) {
		var extraClassName = getOriginalClassname(extraField.className);
	}

	if (value == 'N' || value == 'Нет' || value == '') {
		disableInput(textField);
		if (isInputText(textClassName)) {
			textField.VKI_attached = false;
			textField.parentNode.removeChild(textField.nextSibling);
		}

		if (extraField) {
			disableInput(extraField);
			if (isInputText(extraClassName)) {
				extraField.VKI_attached = false;
				extraField.parentNode.removeChild(extraField.nextSibling);
			}
		}
	} else {
		enableInput(textField, true);
		if (isInputText(textClassName)) {
			try {
				VKI_attach(textField);
			} catch (e) {
				if (textField.className.indexOf("keyboardInput") < 0) {
					textField.className += " keyboardInput";
				}
			}
		}

		if (extraField) {
			enableInput(extraField, false);
			if (isInputText(extraClassName)) {
				try {
					VKI_attach(extraField);
				} catch (e) {
					if (extraField.className.indexOf("keyboardInput") < 0) {
						extraField.className += " keyboardInput";
					}
				}
			}
		}
	}
}

function isInputText(className) {
	return className.indexOf("-input") > -1;
}

function initializePassport(name, rusValidation) {
	var cmpName = name;
	var rv = rusValidation == 'true';

	var listField = $("form_" + name + "_LISTVALUE");
	if (listField) {
		listField.onchange = function() {
			setPassportModel(cmpName, false);
		};
	}

	$("form_" + name + "_SERIE").onblur = function() {
		updatePassport(cmpName, rv);
	};
	$("form_" + name + "_NUMBER").onblur = function() {
		updatePassport(cmpName, rv);
	};
	$("form_" + name + "_DATE").onblur = function() {
		updatePassport(cmpName, rv);
	};

	if ($("form_" + name + "_BY")) {
		$("form_" + name + "_BY").onblur = function() {
			updatePassport(cmpName, rv);
		};
	}

	setPassportModel(cmpName, rv);
}

function setPassportModel(name, rusValidation) {
	var serie = document.forms['form'].elements[name + "_SERIE"];
	var number = document.forms['form'].elements[name + "_NUMBER"];

	var listField = document.forms['form'].elements[name + "_LISTVALUE"];
	var code;
	if (rusValidation) {
		code = '01';
	} else {
		code = listField ? listField.value.substring(0, 2) : '00';
	}

	switch (code) {
		case '01': case '05':
			setObjectProperties(serie, 4, "цифры (пример: 1234)");
			setObjectProperties(number, 6, "цифры (пример: 123456)");
			setDateByHints(name);
			switchPassportInputs(name, false);

			break;
		case '02':
			setObjectProperties(serie, 9, "латинские и русские символы, тире; (пример: XXXIII-АГ)");
			setObjectProperties(number, 6, "цифры (пример: 123456)");
			setDateByHints(name);
			switchPassportInputs(name, false);

			break;
		case '03': case 'Y_':
			setObjectProperties(serie, 2, "цифры (пример: 12)");
			setObjectProperties(number, 7, "цифры (пример: 1234567)");
			setDateByHints(name);
			switchPassportInputs(name, false);

			break;
		case '04':
			setObjectProperties(serie, 9, "латинские и русские символы, тире; (пример: XXXIII-АГ)");
			setObjectProperties(number, 6, "цифры (пример: 123456)");
			setDateByHints(name);
			switchPassportInputs(name, false);

			break;
		case 'N_':
			switchPassportInputs(name, true);

			break;
		case '00': case '': default:
			setObjectProperties(serie, 10, "Введите серию документа.");
			setObjectProperties(number, 15, "Введите номер документа.");
			setDateByHints(name);
	}

	updatePassport(name, rusValidation);
}
function setDateByHints(name) {
	$("form_" + name + "_DATE").title = "Введите дату выдачи документа.";

	var by = $("form_" + name + "_BY");
	if (by) {
		by.title = "Введите, кем был выдан документ.";
	}
}

function switchPassportInputs(name, disableFields) {
	var serie = document.forms['form'].elements[name + "_SERIE"];
	var number = document.forms['form'].elements[name + "_NUMBER"];
	var date = document.forms['form'].elements[name + "_DATE"];
	var by = document.forms['form'].elements[name + "_BY"];

	if (disableFields) {
		disableInput(serie);
		disableInput(number);
		disableInput(date);
		disableInput(by);
	} else {
		enableInput(serie, false);
		enableInput(number, false);
		enableInput(date, false);
		enableInput(by, false);
	}
}

function updatePassport(name, rusValidation) {
	var listField = document.forms['form'].elements[name + "_LISTVALUE"];
	var code;
	if (rusValidation) {
		code = '01';
	} else {
		code = listField != null && listField.className != 'gService-input' ? listField.value.substring(0, 2) : '00';
	}

	var serieField = document.forms['form'].elements[name + "_SERIE"];
	var numberField = document.forms['form'].elements[name + "_NUMBER"];
	var dateField = document.forms['form'].elements[name + "_DATE"];
	var byField = document.forms['form'].elements[name + "_BY"];
	var codeField = document.forms['form'].elements[name + "_CODE"];

	if (code == 'N_') {
		disableInput(serieField);
		disableInput(numberField);
		disableInput(dateField);
		disableInput(byField);

		removePassportKBs(name);
	} else {
		if (codeField) {
			if (code == '00') {
				disableInput(codeField);
				removeVK(codeField);
			} else {
				enableInput(codeField, false);
			}
		}

		attachPassportKBs(name);
	}
}

function attachPassportKBs(name) {
	var serieInput = document.forms['form'].elements[name + "_SERIE"];
	var numberInput = document.forms['form'].elements[name + "_NUMBER"];
	var byInput = document.forms['form'].elements[name + "_BY"];
	var codeInput = document.forms['form'].elements[name + "_CODE"];
	try {
		VKI_attach(serieInput);
		VKI_attach(numberInput);
		if (byInput) {
			VKI_attach(byInput);
		}
		if (codeInput && !codeInput.disabled) {
			VKI_attach(codeInput);
		}
	} catch(e) {
		serieInput.className = serieInput.className + " keyboardInput";
		numberInput.className = numberInput.className + " keyboardInput";
		if (byInput) {
			byInput.className = byInput.className + " keyboardInput";
		}
		if (codeInput && !codeInput.disabled) {
			codeInput.className = codeInput.className + " keyboardInput";
		}
	}
}
function removePassportKBs(name) {
	removeVK(document.forms['form'].elements[name + "_SERIE"]);
	removeVK(document.forms['form'].elements[name + "_NUMBER"]);
	removeVK(document.forms['form'].elements[name + "_BY"]);
}

function removeVK(object) {
	if (!object) {
		return;
	}

	try {
		object.VKI_attached = false;
		if (object.nextSibling && object.nextSibling.className == 'keyboardInputInitiator') {
			object.parentNode.removeChild(object.nextSibling);
		}
	} catch (e) {
	}
}

function hideRequiredMark(object) {
    var required = object.parent().parent().first('.required');
    if (required) {
        required.hide();
    }
}

function showRequiredMark(object) {
    var required = object.parent().parent().first('.required');
    if (required) {
        required.show();
    }
}

function updateAddressModel(object, name) {
	var locationInput = document.forms['form'].elements[name + "_CITY"];

	var regionCode = substringBefore(object.value, '_');
	var regionName = substringAfter(object.value, '_');

	if (regionCode == '77' || regionCode == '78') {
		locationInput.value = regionName;
	}
}

function getOriginalClassname(className) {
	return substringBefore(className, ' ');
}

function substringBefore(string, divider) {
	var ind = string.indexOf(divider);
	return ind == -1 ? string : string.substring(0, ind);
}

function substringAfter(string, divider) {
	var ind = string.indexOf(divider);
	return ind == -1 ? string : string.substring(ind + 1, string.length);
}

function setObjectProperties(object, maxLenght, title) {
	object.maxLength = maxLenght;
	object.title = title;
	object.value = object.value.substring(0, maxLenght);
}

function switchSelect(object, name) {
	updateQuestionModel(name);
	var inputText = document.forms['form'].elements[name + '_TEXTVALUE'];

	if (object.value == 'Y') {
		enableInput(inputText, true);
	} else {
		disableInput(inputText);
	}
}

function switchOtherCitizenship(object, name) {
	updateQuestionModel(name);
	var inputSelect = document.forms['form'].elements[name + '_TEXTVALUE'];

	if (object.value == 'Да') {
		enableInput(inputSelect, true);
	} else {
		disableInput(inputSelect);
	}
}
function attachInputVK(object) {
	try {
		VKI_attach(object);
	} catch(e) {
		object.className = object.className + " keyboardInput";
	}
}
function switchForeignCitizenship(object, name) {
	var otherCountryInput = document.forms['form'].elements[name + '_OTHER'];
	var reasonInput = document.forms['form'].elements[name + '_REASON'];

	switch (object.value) {
		case 'N_Нет': case '': case 'W_Лицо без гражданства':
			if (reasonInput) {
				disableInput(reasonInput);
				removeVK(reasonInput);
			}
			disableInput(otherCountryInput);
			removeVK(otherCountryInput);

			break;
		case 'O_Иное':
			if (reasonInput) {
				enableInput(reasonInput, false);
				attachInputVK(reasonInput);
			}
			enableInput(otherCountryInput, false);
			attachInputVK(otherCountryInput);

			break;
		default:
			if (reasonInput) {
				enableInput(reasonInput, false);
				attachInputVK(reasonInput);
			}
			disableInput(otherCountryInput);
			removeVK(otherCountryInput);
	}
}

function hideInput(objectSel, object) {
	$(objectSel).hide();
	var activeItems = $(objectSel).find('div.select-holder > div.active');
	if (activeItems.length > 0) {
		var selectedInput = $(objectSel).find('div.select-input');
		$(selectedInput).empty();
		$(activeItems).removeClass('active');
		$(objectSel).find('.f-full').removeClass('f-full');
	}



	//if (!object) {
	//	return;
	//}
	//
	//object.value = '';
	//object.disabled = true;
	//
	//if (object.className) {
	//	if (object.className.indexOf("disabled") == -1) {
	//		object.className += " disabled";
	//	}
	//} else {
	//	object.className = "disabled";
	//}
}

function showInput(object, setFocus) {
	$(object).show();

	//if (!object) {
	//	return;
	//}
	//
	//object.readOnly = false;
	//object.disabled = false;
	//
	//if (object.className == "disabled") {
	//	object.className = null;
	//} else {
	//	object.className = object.className.replace(" disabled", "");
	//}
	//
	//if (setFocus) {
	//	object.focus();
	//}
}

function disableInput(object) {
	if (!object) {
		return;
	}

	object.value = '';
	object.disabled = true;

	if (object.className) {
		if (object.className.indexOf("disabled") == -1) {
			object.className += " disabled";
		}
	} else {
		object.className = "disabled";
	}
}
function enableInput(object, setFocus) {
	if (!object) {
		return;
	}

	object.readOnly = false;
	object.disabled = false;

	if (object.className == "disabled") {
		object.className = null;
	} else {
		object.className = object.className.replace(" disabled", "");
	}

	if (setFocus) {
		object.focus();
	}
}

function disableButton(object) {
	object.style.display = 'none';

	var button = document.createElement("input");
	button.className = object.className;
	button.type = object.type;
	button.value = object.value;
	button.disabled = true;
	
	if (object.style.width) {
		button.style.width = object.style.width;
	}
	if (object.style.height) {
		button.style.height = object.style.height;
	}

	if (object.nextSibling) {
		object.parentNode.insertBefore(button, object.nextSibling);
	} else {
		object.parentNode.appendChild(button);
	}
}

function initializeErrorBox(boxId, controllerType) {
	var divBox = document.getElementById(boxId);
	var errors = divBox.getElementsByTagName("li");

	var showBlock = document.getElementById('error_show_block');
	var hideBlock = document.getElementById('error_hide_block');
	if (errors.length < 1) {
		showBlock.style.display = 'none';
		hideBlock.style.display = 'none';
		return;
	}

	document.getElementById('errors_count').innerHTML = errors.length;

	hideBlock.onclick = function() {
		hideErrors(errors);
		return false;
	};
	showBlock.onclick = function() {
		showErrors(errors);
		return false;
	};

	if (controllerType == 'login' || controllerType == 'menu') {
		showErrors(errors);
		if (controllerType == 'menu') {
			var naviBar = $('navigation_bar');
			naviBar.insertBefore(divBox, $('navigationForm'));
		}
	} else {
		hideErrors(errors);
	}
}
function showErrors(errors) {
	errors[0].parentNode.style.display = 'block';

	document.getElementById('error_show_block').style.display = 'none';
	document.getElementById('error_hide_block').style.display = 'block';
}
function hideErrors(errors) {
	errors[0].parentNode.style.display = 'none';

	document.getElementById('error_hide_block').style.display = 'none';
	document.getElementById('error_show_block').style.display = 'block';
}

function getRelativePeriod(yearsForward, selectedDate) {
	var updatedDate = new Date(selectedDate);
	updatedDate.setHours(0, 0, 0, 0);
	updatedDate.setSeconds(updatedDate.getSeconds() -1);
	updatedDate.setFullYear(updatedDate.getFullYear() + parseInt(yearsForward));

	return updatedDate;
}
function getFirstCalendarNameBySecond(name) {
	return Calendar.list[name.replace("_TO", "_FROM")];
}

function updateCVCitizenshipModel() {
	var firstCitizenship = document.getElementById('form_citizenship');
	var secondCitizenship = document.getElementById('form_citizenship2');
	var thirdCitizenship = document.getElementById('form_citizenship3');

	//var firstCitizenshipSel = document.getElementById('selectcitizenship');
	var secondCitizenshipSel = document.getElementById('selectcitizenship2');
	var thirdCitizenshipSel = document.getElementById('selectcitizenship3');


	var fv = firstCitizenship.value;

	if ((fv == 'W_Лицо без гражданства') || (fv == '')) {
		fv = '';
	}

	if (fv != '') {
		showInput(secondCitizenshipSel, false);
	} else {
		hideInput(secondCitizenshipSel, secondCitizenship);
	}

	var activeItems = $(secondCitizenshipSel).find('div.select-holder > div.active');
	console.log(activeItems);
	console.log(activeItems.length);
	if (activeItems.length > 0) {
		showInput(thirdCitizenshipSel, false);
	} else {
		hideInput(thirdCitizenshipSel, thirdCitizenship);
	}
}

/**
 * TEXTAREA-related functions.
 */
function textAreaInputHandler() {
    var maxLength = determineMaxlength(this);
    if (this.value.length > maxLength) {
        this.value = this.value.substr(0, maxLength);

        return false;
    } else {
        textAreaDisplayBoxRefresher(this);
    }

    return true;
}
function textAreaDisplayBoxRefresher(textArea) {
    var displayBox = $(textArea.id + "_display");
    displayBox.innerHTML = textArea.value.length + "/" + determineMaxlength(textArea);
}
function determineMaxlength(textArea) {
    if (textArea.getAttribute("maxlength") != null) {
        return parseInt(textArea.getAttribute("maxlength"), 10);
    } else {
        return 100;
    }
}

/**
 *
 */
function disableFormButtons(formId) {
    var formChildren = document.forms[formId].elements;
    for (var i = 0; i < formChildren.length; i++) {
        var element = formChildren[i];
        if (element.tagName.toLowerCase() == "input" && element.type.toLowerCase() == "submit") {
            element.disabled = true;
            if (element.className.indexOf("disabled") < 0) {
                element.className = element.className + " disabled";
            }
        }
    }
}

function ruleFits(value, operation, comparison) {
    switch (operation) {
        case 'EQUALS':
        default:
            return value == comparison;
        case 'NOT_EQUAL':
            return value != comparison;
        case 'LESS_THAN':
            return parseInt(value) < parseInt(comparison);
        case 'LESS_OR_EQUALS':
            return parseInt(value) <= parseInt(comparison);
        case 'GREATER_THAN':
            return parseInt(value) > parseInt(comparison);
        case 'GREATER_OR_EQUALS':
            return parseInt(value) >= parseInt(comparison);
        case 'IN':
            var inValues = comparison.split(",");
            for (var i = 0; i < inValues.length; i++) {
                if (inValues[i] && value == inValues[i].toLowerCase()) {
                    return true;
                }
            }
            return false;
        case 'NOT_IN':
            var notInValues = comparison.split(",");
            for (var j = 0; j < notInValues.length; j++) {
                if (notInValues[j] && value == notInValues[j].toLowerCase()) {
                    return false;
                }
            }
            return true;
        case 'LIKE':
            return value.toLowerCase().indexOf(comparison.toLowerCase()) > -1;
        case 'NOT_LIKE':
            return value.toLowerCase().indexOf(comparison.toLowerCase()) < 0;
    }
}

function applyRule(operation, target, text) {
    switch (operation) {
        case 'DISABLE':
        default:
            disableField(target);

            return;
        case 'UPDATE_REGEXP':
            applyRegexp(target, text)
    }
}

function killRule(operation, target) {
    switch (operation) {
        case 'DISABLE':
        default:
            enableField(target);

            return;
        case 'UPDATE_REGEXP':
            // nop.
    }
}

function disableField(object) {
    disableInput(object);
    removeVK(object);
    hideRequiredMark(object);
}

function enableField(object) {
    enableInput(object);
    attachInputVK(object);
    showRequiredMark(object);
}

function applyRegexp(object, regexpString) {
    var possibleSymbols = [];
    if (regexpString.indexOf("А-Я") > -1) {
        possibleSymbols.push("кириллица" + (regexpString.indexOf("а-я") < 0 ? " [заглавные]" : ""));
    }
    if (regexpString.indexOf("A-Z") > -1) {
        possibleSymbols.push("латиница" + (regexpString.indexOf("a-z") < 0 ? " [заглавные]" : ""));
    }
    if (regexpString.indexOf("0-9") > -1 || regexpString.indexOf("\d") > -1) {
        possibleSymbols.push("цифры");
    }

    var possibleSymbolsString = "";
    possibleSymbols.each(function(element) {
        if (!possibleSymbolsString.blank()) {
            possibleSymbolsString += ", "
        }
        possibleSymbolsString += element;
    });

    var amountString = "";
    var objective = regexpString.substring(regexpString.indexOf("{") + 1, regexpString.indexOf("}"));
    if (objective && !objective.blank()) {
        var amount = objective.split(",");
        if (amount && !amount.empty()) {
            if (amount.length > 1) {
                amountString += "от " + amount[0] + " до " + amount[1];
                appendMaxLength(object, parseInt(amount[1]));
            } else {
                amountString += amount[0];
                appendMaxLength(object, parseInt(amount[0]));
            }
        }
    }

    object.title = "Допустимые символы: "
        + possibleSymbolsString
        + (!amountString.blank() ? ". Количество: " + amountString : "");
}

function appendMaxLength(object, maxLength) {
    object.maxLength = parseInt(maxLength);
    if (object.value.length > maxLength) {
        object.value = object.value.substr(0, maxLength);
    }
}
