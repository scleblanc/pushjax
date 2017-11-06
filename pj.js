function pushjax(
		container,
		renderFunction = function (content, $elem, callback)
		{	
			$elem.fadeOut(function(){
				$(this).empty().append(content).fadeIn(function(){
					callback();
				});
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
					prefetch = $(result).filter(_container).html();
					if (prefetch == undefined) {
						prefetch = $(result).find(_container).html();
					}
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
		renderFunction(content, $(_container), registerEvents);
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
				fetched = $(result).filter(_container).html();
				if (fetched == undefined) {
					fetched = $(result).find(_container).html();
				}
				console.log(fetched);
				ajax = false;
				loadIn(fetched, event.state.url, 1);
			}
		});
	};
}

$(function(){

	// default
	pushjax('main');

	// simple render
	//render = function(content, $elem, callback){ $elem.empty().append(content);callback(); }
	//pushjax('main', render);

	// fancy render
	// render = function(content, $elem, callback){ 
	// 	$elem
	// 	.addClass('out')
	// 	.delay(300) 
	// 	.queue(function(next){
	// 		$(this).empty().append(content);
	// 		$(this).removeClass('out');
	// 		callback();
	// 		next();
	// 	})
	// }
	// $('#main').css('transition', '600ms all');
	// pushjax('main', render);
})
