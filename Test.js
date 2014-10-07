var test$ = function() {
window.answerList = {
  A: $("div"),
  B: $("img.some_class"),
  C: $("#some_id"),
  D: $(".some_class"),
  E: $("input#some_id"),
  F: $("div#some_id.some_class"),
  G: $("div.some_class#some_id")
}

var expectedResult = {
  A: {
    DIV: 2
  },
  B: {
    IMG: 1
  },
  C: {
    DIV: 1
  },
  D: {
    DIV: 1,
    IMG: 1
  },
  E: {
  },
  F: {
    DIV: 1
  },
  G: {
    DIV: 1
  },
  questions: 7
}


var computeString = function(result) {
  var returnArray = [];

  var divs = result["DIV"] || 0;
  var imgs =  result["IMG"] || 0;

  if (divs === 1) returnArray.push(divs + " DIV");
  else returnArray.push(divs + " DIVs");

  if (imgs === 1) returnArray.push(imgs + " IMGs");
  else returnArray.push(imgs + " IMGs");

  return returnArray.join(", ");
}

var testsPassed = 0;

for (answerName in answerList){
  var answer = answerList[answerName], i = 0, ii = answer.length, tagList = {};

  for (; i < ii; i++) {
    var answerTag = answer[i].tagName;
    if (tagList[answerTag]) tagList[answerTag]++;
    else tagList[answerTag] = 1;
  }

  var expected = computeString(expectedResult[answerName]);
  var found = computeString(tagList);
  var result = (expected === found) ? "Yes" : "No";
  if (result === "Yes") testsPassed++;

  console.log("\n------------------------\n\nAnswer", answerName);
  console.log("Expected:", expected);
  console.log("Found:", found);
  console.log("Correct:", result);

}

console.log("\n------------------------\n\nTests Passed:", testsPassed, "of", expectedResult.questions ); 
}