function imgBg(block, img) {
	var srcImg = $(img).attr('src');
	$(block).css({'background-image': 'url('+srcImg+')'});
}

var $grid = $('.grid');
function isotopInit() {
	$grid.isotope({
		// options
		itemSelector: '.grid-item',
		layoutMode: 'fitRows'
	});
}

function ajaxRequest(search) {
	$.ajax({
		url: 'https://pixabay.com/api/?key=2759134-506c7acc2acce58e7989ad63e&q='+search+'&image_type=photo&per_page=7',

	  // url: 'http://api.pixplorer.co.uk/image?word='+search+'&amount=5&size=tb',
	  success: function(data) {
	  	console.log(data);

	    for (var i = 0; i < data.hits.length; i++) {
	    	var listItem = '<div class="grid-item">'+
                '<img src="'+data.hits[i].userImageURL+'">'+
                    '<div class="grid-name"><span>'+data.hits[i].tags+'</span></div>'+
            '</div>';
	    	// console.log(data.images[i]);
	    	$('.js-grid').append(listItem);
	    }
    	isotopInit();
	  }
	});
}

(function($){
	$(function(){

		imgBg('.js-headerBg', '.js-headerImg');

		$('.fade').slick({
		dots: false,
		// arrows: false,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear'
		});
		
		ajaxRequest('yellow+snow');

		$('body').on('click', '.search__button', function(e){
			e.preventDefault();
			$grid.isotope('destroy');
			var valueSearch = $('.search__input').val().replace(" ","+");
			$('.grid').find('.grid-item').remove();
			ajaxRequest(valueSearch);
		});
	});
})(jQuery);






