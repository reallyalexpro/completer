# [Completer](https://github.com/fengyuanchen/completer)

A jQuery auto complete plugin.

- [Documentation](http://fengyuanchen.github.io/completer)



# Getting started



## Quick start

Four quick start options are available:

- [Download the latest release](https://github.com/fengyuanchen/completer/archive/master.zip).
- Clone the repository: `git clone https://github.com/fengyuanchen/completer.git`.
- Install with [NPM](http://npmjs.org): `npm install completer`.
- Install with [Bower](http://bower.io): `bower install completer`.



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

- Type: `Function`
- Default: `function() {}`

Will be run when complete.


#### itemTag

- Type: `String`
- Default: `"li"`

The element tag of list item.


#### filter

- Type: `Function`
- Default: `function(val) { return val; }`

The function will be passed the input value and run before show the list.


#### position

- Type: `String`
* options: "top", "right", "bottom", "left"
- Default: `"bottom"`

The position of the container.


#### source

- Type: `Array`
- Default: `[]`

The source data for complete or suggest.


#### selectedClass

- Type: `String`
- Default: `"completer-selected"`

A jQuery selector string, highlight the item when it's selected.


#### separator

- Type: `String`
- Default: `""`

This will be added between the value and attachment.


#### suggest

- Type: `Boolean`
- Default: `false`

Set it `true` to start the suggestion mode.


#### template

- Type: `String`
- Default: `<ul class="completer-container"></ul>`

The container of the completer.


#### zIndex

- Type: `Number`
- Default: `1`

The css `z-index` property for the container.



## Methods

#### destroy()

Destroy the completer instance.



## Browser Support

- IE 6+
- Chrome 33+
- Firefox 27+
- Safari 5.1+
- Opera 19+

As a jQuery plugin, you can reference to the [jQuery Browser Support](http://jquery.com/browser-support/).



## [License](https://github.com/fengyuanchen/completer/blob/master/LICENSE.md)

Released under the [MIT](http://opensource.org/licenses/mit-license.html) license.
