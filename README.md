JQuery selector engine
======================

![](jquery.png)

JQuery uses CSS selectors to pick certain elements out from the DOM and manipulate them using methods.

I have replicated the selector model here so that you can enter any of these combinations:

- $("div")
- $("img.some_class")
- $("#some_id")
- $(".some_class")
- $("input#some_id")
- $("div#some_id.some_class")
- $("div.some_class#some_id")

And it will pick the relevant DOM object out and put it into an array for you.

####Run the tests:
```sh
git clone git@github.com:jamieallen59/JQuery_selector_engine.git
cd JQuery_selector_engine
open Test.html
```
Right click and "Inspect Element" on that page, then go to Console.

####Have a look at the code
```sh
git clone git@github.com:jamieallen59/JQuery_selector_engine.git
cd JQuery_selector_engine
open Answer.js
```

Limitations
-----------
It might not work with longer variations of selectors, or with for example, two classes as a selector.