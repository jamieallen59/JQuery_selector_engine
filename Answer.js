var $ = function (selector) {
  var elements = [];

//Establish the selector type, then use the 
//appropriate getElementBy method to pull out the element

//To extract a class name from a selector
var extractClassNameFrom = function(selector) {
		className = selector.substr(selector.indexOf('.') + 1);
		return className
};

//To extract an id name from a selector
var extractIdNameFrom = function(selector) {
		var initialName = selector.substr(selector.indexOf('#') + 1);
		//and remove any class associated with that string
		idName = initialName.split('.')[0]
		return idName
};

//To extract a tag name from a selector
var extractTagNameFrom = function(selector, character) {
		tagName = selector.substr(0, selector.lastIndexOf(character));
		return tagName
};

//getElementBy methods return a nodelist so I
//convert this to a normal array.
var nodeListConverter = function(nodelist) {
		elementArray = [].slice.call(nodelist);
		return elementArray
};

//Plain tag or class matches return an array which
//must be pushed into the elements array
var pushIntoElements = function(array) {
	elements = [].concat.apply([], array);
};

//To match an extracted class with DOM and return an array
var matchClassWithDOM = function() {
		extractClassNameFrom(selector);
		var classMatch = document.getElementsByClassName(className);
		nodeListConverter(classMatch);
};

//To match an extracted tag with DOM and return an array
var matchTagWithDOM = function(tag_character) {
		extractTagNameFrom(selector, tag_character);
		var tagMatch = document.getElementsByTagName(tagName);
		nodeListConverter(tagMatch);

};

/**To match an extracted id with DOM
*
*  var matchIdWithDOM = function() {
*		extractIdNameFrom(selector);
* 		var idMatch = document.getElementById(idName);
* 		return idMatch
* };
*  This function returns undefined
*/

//To locate an element from a narrowed down array
var getElementByLocalName = function(array, matcher) {
	var l = array.length;
	//loop through the remaining list to find the element
	for (var i = 0; i < l; i++) {
		if (array[i].localName === matcher) {
		elements.push(array[i]);
		};
	};
};

/**This function will establish exactly what type of selector
*  has been given and return the DOM element associated with
*  that selector, from the Test.html document
*/
var selectorType = function(selector) {
	var tagMatcher = /^[A-z]/
	//Find out if the selector starts with a TAG
	if (tagMatcher.test(selector)) {
		//find out if it ALSO has a class selector
		if (selector.indexOf('.') > 0) {
			//find out if it ALSO has an id selector
			if (selector.indexOf('#') > 0) {
				//now, find by id as id's are unique
				extractIdNameFrom(selector);
				//match id with DOM elements
				var idMatch = document.getElementById(idName);
				//push the element into our array 
				elements.push(idMatch);
			}
			//It must have a tag and a class:
			else {
				matchClassWithDOM();
				extractTagNameFrom(selector, '.');
				getElementByLocalName(elementArray, tagName)
			};
		}
		//It must have a TAG and an ID:
		else if (selector.indexOf('#') >= 0) {
			matchTagWithDOM('#');
			extractIdNameFrom(selector);

			var l = elementArray.length;
			for (var i = 0; i < l; i++) {
				if ((elementArray[i].id) == idName) {
				elements.push(elementArray[i]);
				}; 
			};
		}
		//it must just be a tag
		else {
			matchTagWithDOM(selector.charAt(selector.length))
			pushIntoElements(elementArray);
		};
	}
	//it must be just a class
	else if (selector.indexOf('.') >= 0) {
		matchClassWithDOM();
		pushIntoElements(elementArray);
	} 
	//it must be just an id
	else if (selector.indexOf('#') >= 0) {
		extractIdNameFrom(selector);
		var idMatch = document.getElementById(idName);
		
		elements.push(idMatch);
	};
};

	selectorType(selector);
  return elements;
};
