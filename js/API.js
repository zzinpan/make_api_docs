function API( _language ){
	
	var converter = new showdown.Converter();
	converter.setFlavor('github');
	
	// html
	var $apiItems = $("#api_items");
	var $descFunction = $("#desc_function");
	var $descDescription = $("#desc_description");
	var $descParameters = $("#desc_parameters");
	var $descReturn = $("#desc_return");
	var $descExample = $("#desc_example");
	var $apiSearchInp = $("#api_search_input");
	var $apiSearchBtn = $("#api_search_btn");
	var $window = $(window);
	
	$apiItems.on("click", ".api_item", function(){
		var $this = $(this);
		$(".api_item").removeClass("focus");
		$(".api_focused_item").remove();
		$this.addClass("focus");
		var data = $this.data();
		$descFunction.html( data._function );
		$descFunction.hide();
		$descFunction.fadeIn( 500 );
		$descDescription.html( data._description );
		$descDescription.hide();
		$descDescription.fadeIn( 500 );
		$descParameters.html( data._parameters );
		$descParameters.hide();
		$descParameters.fadeIn( 500 );
		$descReturn.html( data._return );
		$descReturn.hide();
		$descReturn.fadeIn( 500 );
		$descExample.html( data._example );
		$descExample.hide();
		$descExample.fadeIn( 500 );
		var $clone = $this.clone();
		$clone.css({
			top: $this.offset().top - $window.scrollTop(),
			left: $this.offset().left
		}).attr({
			class: "api_focused_item api_clicked_item"
		}).data({
			$ref: $this
		});
		$("body").append( $clone );
	}).on("mouseenter", ".api_item", function(e){
		e.stopImmediatePropagation();
		$(".api_focused_item:not(.api_clicked_item)").remove();
		var $this = $(this);
		var $clone = $this.clone();
		$clone.css({
			top: $this.offset().top - $window.scrollTop(),
			left: $this.offset().left
		}).attr({
			class: "api_focused_item"
		}).data({
			$ref: $this
		});
		$("body").append( $clone );
	});
	
	$apiItems.on("mouseout", function(){
		$(".api_focused_item:not(.api_clicked_item)").remove();
	}).on("scroll", function( e ){
//		e.originalEvent.wheelDeltaY
		e.stopPropagation();
		
		var $api_clicked_item = $(".api_clicked_item");
		if( $api_clicked_item.length === 0 ){
			return;
		}
		var $ref = $api_clicked_item.data("$ref");
		
		var top = $ref.offset().top - $window.scrollTop();
		if( $apiItems.offset().top - $window.scrollTop() > top ){
			$api_clicked_item.hide();
		}else{
			$api_clicked_item.show();
		}
		
		$api_clicked_item.css({
			top: top
		});
	});
	
	var Code = {
		start: "```"+ _language +"\n",
		end: "\n```",
		parse: function( code ){
			var markdown = Code.start + code + Code.end;
			return converter.makeHtml( markdown );
		}
	};
	
	
	function add( _item, _function, _description, _parameters, _return, _example ){
		
		_function = "**" + _function + "**";
		
		var $item = $("<h5 class='api_item'></h5>").html( _item );
		
		var paramTextArr = [];
		for( var key in _parameters ){
			paramTextArr.push( "`" );
			paramTextArr.push( key );
			paramTextArr.push( "`" );
			paramTextArr.push( ": " );
			paramTextArr.push( _parameters[ key ] );
			paramTextArr.push( "<br>" );
		}
		paramTextArr.pop();
		
		var returnTextArr = [];
		for( var key in _return ){
			returnTextArr.push( "`" );
			returnTextArr.push( key );
			returnTextArr.push( "`" );
			returnTextArr.push( ": " );
			returnTextArr.push( _return[ key ] );
			break;
		}
		
		$item.data({
			_item: _item,
			_function: converter.makeHtml( _function ),
			_description: converter.makeHtml( _description ),
			_parameters: converter.makeHtml( paramTextArr.join("") ),
			_return: converter.makeHtml( returnTextArr.join("") ),
			_example: Code.parse( _example )
		});
		$apiItems.append( $item );
	}
	
	
	function search( keyword ){
		
		keyword = keyword.toUpperCase();
		$.each( $(".api_item"), function( idx, apiItem ){
			var $apiItem = $( apiItem );
			var itemText = $apiItem.data("_item");
			if( -1 < itemText.toUpperCase().indexOf( keyword ) ){
				$apiItem.show();
			}else{
				$apiItem.hide();
			}
		} );
		
		var $api_clicked_item = $(".api_clicked_item");
		if( $api_clicked_item.length === 0 ){
			return;
		}
		var $ref = $api_clicked_item.data("$ref");
		
		if( $ref.is(":visible") === false ){
			$api_clicked_item.hide();
		}else{
			$api_clicked_item.show();
		}
		
		var top = $ref.offset().top;
		if( $apiItems.offset().top > top ){
			$api_clicked_item.hide();
		}else{
			$api_clicked_item.show();
		}
		
		$api_clicked_item.css({
			top: top
		});
		
	}
	
	
	function apiSearch(){
		search( $apiSearch.val() );
	}
	
	
	$apiSearchInp.keypress( function( e ){
		if( e.keyCode === 13 ){
			search( $apiSearchInp.val() );
		}
	} );
	
	
	$apiSearchBtn.click( search.bind( search, $apiSearchInp.val() ) );
	
	
	return {
		__proto__: API.prototype,
		add: add,
		search: search
	}
	
}