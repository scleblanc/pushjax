# pushjax

A simple example of pushState and Ajax.

## Usage

`pushjax('id', [renderFunction])`

`id` is the id of the element to inject content into, and to pull content from on ajax requests.

`renderFunction` is an optional parameter for passing in a custom rendering method.

It takes three parameters, `content`, `$elem`, and `callback`.

`content` will be the content retrieved from an ajax request.

`$elem` will be a jQuery object representing the container element.

`callback` will be the function that re-registers the hover/click events.

The default render function is:

```
renderFunction = function (content, $elem, callback)
{	
	$elem.fadeOut(function(){
		$(this).empty().append(content).fadeIn(function(){
			callback();
		});
	})
}
```

Targeted anchors should have the `data-prefetch` property. 

## Example
```
$(function(){
	render = function(content, $elem, callback){ $elem.empty().append(content);callback(); }
	pushjax('main', render);
})
```
