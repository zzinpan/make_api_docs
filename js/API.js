$(function API(){
	
	var converter = new showdown.Converter();
	converter.setFlavor('github');

	var language = 'javascript';
	
	// html
	var $apiItems = $("#api_items");
	var $treeItems = $('#tree_items');
	var $descFunction = $("#desc_function");
	var $descDescription = $("#desc_description");
	var $descParameters = $("#desc_parameters");
	var $descReturn = $("#desc_return");
	var $descExample = $("#desc_example");
	var $apiSearchInp = $("#api_search_input");
	var $apiSearchBtn = $("#api_search_btn");
	var $treeList = $("#tree_list");
	var $window = $(window);
	var $contentList = $("#content_list");
	var $cover = $("#cover");
	var $tabBtn = $(".tab_btn");
	
	/**
	 * Tree관련 객체
	 */
	var Tree = {
		
			// 목록
			list: [],
		
			add: function( fullName ){
				var names = fullName.split(".");
				
					function findChildren( children, text ){
						for( var i=0; i<children.length; ++i ){
							if( children[i].text === text ){
								return children[i];
							}
						}
						var newTree = { text: text, children: [] };
						children.push( newTree );
						return newTree;
					}
				
				var tree = { children: Tree.list };
				for( var j=0; j<names.length; ++j ){
					tree = findChildren( tree.children, names[ j ] );
				}
				
				tree.id = fullName;
				
				var returnTree = $treeItems.jstree(true);
				returnTree.settings.core.data = Tree.list;
				returnTree.refresh();
				
			}
		
	};
	
	$treeItems.jstree({ core: { data : Tree.list } });
	
	
	var Code = {
		start: "```"+ language +"\n",
		end: "\n```",
		parse: function( code ){
			var markdown = Code.start + code + Code.end;
			return converter.makeHtml( markdown );
		}
	};
	
	
	function add( _id, _function, _description, _parameters, _return, _example ){
		
		_function = "**" + _function + "**";
		
		var $item = $("<h5 class='api_item'></h5>").html( _id );
		
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
			_id: _id,
			_function: converter.makeHtml( _function ),
			_description: converter.makeHtml( _description ),
			_parameters: converter.makeHtml( paramTextArr.join("") ),
			_return: converter.makeHtml( returnTextArr.join("") ),
			_example: Code.parse( _example )
		});
		
		$apiItems.append( $item );

		// 정렬
		var $apiItem = $apiItems.find(".api_item");
	
		$apiItem.sort(function(a,b){
			var an = a.innerText,
				bn = b.innerText;
	
			if(an > bn) {
				return 1;
			}
			if(an < bn) {
				return -1;
			}
			return 0;
		});
		$apiItem.detach().appendTo($apiItems);
		// 정렬 - end
		
		Tree.add( _id );

	}
	
	function search( keyword ){
		
		keyword = keyword.toUpperCase();
		$.each( $(".api_item"), function( idx, apiItem ){
			var $apiItem = $( apiItem );
			var itemText = $apiItem.data("_id");
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
	
	function setLanguage( _language ){
		language = _language;
	}
	
	function apiSearch(){
		search( $apiSearch.val() );
	}
	
	
	/**
	 * 이벤트
	 */
	
	$apiSearchInp.keypress( function( e ){
		if( e.keyCode === 13 ){
			search( $apiSearchInp.val() );
		}
	} );
	
	$apiSearchBtn.click( search.bind( search, $apiSearchInp.val() ) );
	
	$window.resize(function(){
		var h = $window.height() - 155;
		$.each( $apiItems, function( idx, apiItem ){
			$(apiItem).height( h );
		} );
	}).trigger("resize");
	
	$cover.click( function(){
		$cover.fadeOut( 500, function(){
			$("body").css("overflow", "auto");
		} );
	} );
	
	$tabBtn.click( function(){
	
		var $this = $(this);
		var $other = $tabBtn.not( $this );
	
		$this.addClass("focus");
		$other.removeClass("focus");
		
		var $thisImg = $this.find("img");
		var $otherImg = $other.find("img");

		$thisImg.attr("src", $thisImg.attr("focus-src"));
		$otherImg.attr("src", $otherImg.attr("basic-src"));
		
		$this.closest(".api_list").addClass("focus");
		$other.closest(".api_list").removeClass("focus");
		
		if( $treeList.hasClass("focus") ){
			$(".api_focused_item").hide();
		}else{
			$(".api_focused_item").show();
		}
	} );
	
	$treeItems.on("changed.jstree", function (e, res) {

		if( res.action === "select_node" ){
			$.each( $apiItems.find(".api_item"), function( idx, apiItem ){
				var $apiItem = $(apiItem);
				if( $apiItem.data("_id") === res.node.id ){
					$apiItem.trigger("click", true);
					return false;
				}
			} );
		}
	});
	
	$apiItems.on("click", ".api_item", function( e, isClickFromTrees ){

		var $this = $(this);
		$(".api_item").removeClass("focus");
		$(".api_focused_item").remove();
		$this.addClass("focus");
		var data = $this.data();
		
		// 트리를 클릭한 트리거가 아니라면? -> 트리 폴더를 오픈
		if( isClickFromTrees !== true ){
			var jsTreeReturn = $treeItems.jstree(true);
			jsTreeReturn.deselect_all();
			jsTreeReturn.close_all();
			jsTreeReturn.select_node( data._id, "신명철" );
		}
		
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
		
		if( $treeList.hasClass("focus") ){
			$clone.hide();
		}
		
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
	// 이벤트 - END
	
	window.API = {
		add: add,
		setLanguage: setLanguage
	};
	
});