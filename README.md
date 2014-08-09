# [Completer](http://fengyuanchen.github.io/completer)

A jQuery auto complete plugin.

- [Documentation](http://fengyuanchen.github.io/completer)



## Getting started


## Installation

Include files:

```html
<script src="/path/to/jquery.js"></script><!-- jQuery is required -->
<link  href="/path/to/completer.css" rel="stylesheet">
<script src="/path/to/completer.js"></script>
```


## Usage

Initialize with `$.fn.completer` method.

```html
<input class="completer" type="email">
```

```javascript
$(".completer").completer({
    source: ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "aol.com"],
    separator: "@"
});
```


## Options

Setup with `$("#target").completer(options)`, or global setup with `$.fn.completer.setDefaults(options)`.


#### complete

* type: function
* default: `function() {}`

Will be run when complete.


#### itemTag

* type: string
* default: "li"

The element tag of list item.


#### filter

* type: function
* default: `function(val) { return val; }`

The function will be passed the input value and run before show the list.


#### position

* type: string
* options: "top", "right", "bottom", "left"
* default: "bottom"

The position of the container.


#### source

* type: array
* default: []

The source data for complete or suggest.


#### selectedClass

* type: string
* default: "completer-selected"

A jQuery selector string, highlight the item when it's selected.


#### separator

* type: string
* default: ""

This will be added between the value and attachment.


#### suggest

* type: boolean
* default: false

Set it `true` to start the suggestion mode.


#### template

* type: string
* default: `<ul class="completer-container"></ul>`

The container of the completer.


#### zIndex

* type: number
* default: 1

The css `z-index` property for the container.



## Browser Support

- IE 6+
- Chrome 33+
- Firefox 27+
- Safari 5.1+
- Opera 19+

As a jQuery plugin, you can reference to the [jQuery Browser Support](http://jquery.com/browser-support/).



## [License](https://github.com/fengyuanchen/completer/blob/master/LICENSE.md)

Released under the [MIT](http://opensource.org/licenses/mit-license.html) license.
