function pushjax(
			container,
			renderFunction = function (content, $elem)
								{	
									$elem.fadeOut(function(){
										$(this).empty().append(content).fadeIn();
									})
								}

			){

	_container = '#'+container;

	function registerEvents()
	{
		$('a[data-prefetch]').off('click mouseenter touchstart mouseup touchend');

		$('a[data-prefetch]').on('click', function(e){
			e.preventDefault();
		});

		$('a[data-prefetch]').on('mouseenter touchstart', function(){
			ajax = true;
			url = $(this).attr('href');
			$.ajax({
				url: url,
				type: 'get',
				success: function(result){
					prefetch = $(result).filter(_container);
					ajax = false;
				}
			});
		});

		$('a[data-prefetch]').on('mouseup touchend', function(e){
			var $a = $(this);

			if (e.which == 1){
				if (!ajax) {
					var url = $a.attr('href');
					loadIn(prefetch, url);
				} else {
					$(document).ajaxStop(function(){
						var url = $a.attr('href');
						loadIn(prefetch, url);
						$(this).off('ajaxStop');
					});
				}
			}
		});

		console.log('events registered');
	}

	function loadIn(content, url, replace = 0) 
	{
		if (replace) {
			history.replaceState({'url':url}, null, url);
		} else {
			history.pushState({'url':url}, null, url);
		}
		console.log(history.state);
		renderFunction(content, $(_container));
	}

	var prefetch = '';
	var ajax = false;
	registerEvents();
	var basename = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
	history.replaceState({'url':window.location.pathname}, null, window.location.pathname)
	console.log(history.state);

	window.onpopstate = function(event) {
		$.ajax({
			url: event.state.url,
			type: 'get',
			success: function(result){
				result = $(result).filter(_container)
				ajax = false;
				loadIn(result, event.state.url, 1);
			}
		});
	};
}

$(function(){
	render = function(content, $elem){ $elem.empty().append(content) }
	pushjax('main', render);
})