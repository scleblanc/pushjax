# pushjax

A simple example of pushState and Ajax.

## Usage

`pushjax('id', renderFunction)`

`id` is the id of the element to inject content into, and to pull content from on ajax requests.

`renderFunction` is an optional parameter for passing in a custom rendering method.

It takes two parameters, `content` and `$elem`.

The default render function is:

```
renderFunction = function (content, $elem)
{	
  $elem.fadeOut(function(){
    $(this).empty().append(content).fadeIn();
  })
}
```

Targeted anchors should have the `data-prefetch` property. 

## Example
```
$(function(){
	render = function(content, $elem){ $elem.empty().append(content) }
	pushjax('main', render);
})
```
