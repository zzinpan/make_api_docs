//$(function ready(){
//	
//	var api = new (function API(){
//		
//		function add( _items, _function, _description, _parameters, _returns, _example ){
//			this._items = _items;
//			this._function = _function;
//			this._description = _description;
//			this._parameters = _parameters;
//			this._returns = _returns;
//			this._example = _example;
//		}
//		
//	})();
//	
//	api.add( "Smart" )
//	
//});

$(function(){
	var api = new API( "javascript" );
	
	api.add( 
			"SmartGeoKit_cadViewer", 
			"SmartGeoKit_cadViewer sgkCadv = SmartGeoKit_cadViewer( String main )",
			"SmartGeoKit_cadViewer 객체 생성자 함수",
			{
				"*main": "화면을 표시할 DOM Element 아이디"
			},
			{
				"sgkCadv": "SmartGeoKit_cadViewer 인스턴스 객체"
			},
			"var sgkCadv = new SmartGeoKit_cadViewer( 'viewer' );"
		);
	
	api.add( 
			"SmartGeoKit_cadViewer.prototype.reset", 
			"SmartGeoKit_cadViewer.prototype.reset(  )",
			"SmartGeoKit_cadViewer 객체 초기화 및 메모리 정리 함수",
			null,
			null,
			"sgkCadv.reset();"
		);
	
	api.add( 
			"SmartGeoKit_cadViewer.prototype.init", 
			"SmartGeoKit_cadViewer.prototype.init(  )",
			"화면에 렌더링하기 위한 초기 실행 함수",
			null,
			null,
			"sgkCadv.init();"
		);
	
	var $apiSearch = $("#api_search_input");
	function apiSearch(){
		api.search( $apiSearch.val() );
	}
	
	$apiSearch.keypress( function( e ){
		if( e.keyCode === 13 ){
			apiSearch();
		}
	} );
	$("#api_search_btn").click( apiSearch );
})

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
	
	$apiItems.on("click", ".api_item", function(){
		var $this = $(this);
		$(".api_item").removeClass("focus");
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
	});
	
	var Code = {
		start: "```"+ _language +"\n",
		end: "\n```",
		parse: function( code ){
			var markdown = this.start + code + this.end;
			return converter.makeHtml( markdown );
		}
	};
	
	function add( _item, _function, _description, _parameters, _return, _example ){
		var $item = $("<h5 class='api_item'></h5>").html( _item );
		
		var paramTextArr = [];
		for( var param in _parameters ){
			paramTextArr.push( param + ": " + _parameters[ param ] );
		}
		var returnText = "";
		for( var key in _return ){
			returnText = key + ": " + _return[ key ];
			break;
		}
		
		$item.data({
			_item: _item,
			_function: Code.parse( _function ),
			_description: Code.parse( _description ),
			_parameters: Code.parse( paramTextArr.join("") ),
			_return: Code.parse( returnText ),
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
		
	}
	
	return {
		__proto__: API.prototype,
		add: add,
		search: search
	}
	
}
