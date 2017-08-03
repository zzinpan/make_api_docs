# make_api_docs

<br>

#### API

***

###### API.setLanguage( `String` language )
```javascript

API.setLanguage( 'javascript' );

```
###### API.add( `String` listItemName, `String` function, `String` description, `Object` parameters, `Object` return, `String` example )
```javascript

API.add( 
			"document.getElementById", 
			"Element element = document.getElementById( String DOMId )",
			"Find the element in the DOM.",
			{
        "*DOMId": "Attribute value ID of the element."
			},
			{
        "element": "The element corresponding to ID is returned."
      },
			"var button = document.getElementById('button');"
		);

```

***

#### Dependency Library
- jquery
- bootstrap
- font-awesome
- jstree
- showdown

***

#### Sample
https://zzinpan.github.io/make_api_docs/index.html
