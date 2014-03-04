# [Completer](http://fengyuanchen.github.io/completer)

A jQuery auto complete plugin.


## Getting started

### Installation

Include files:

```html
<script src="/path/to/jquery.js"></script><!-- jQuery is required -->
<link rel="stylesheet" href="/path/to/completer.css">
<script src="/path/to/completer.js"></script>
```

### Usage

Initialize with `$.fn.completer` method.

```html
<input class="completer" type="text">
```

```javascript
$(".completer").completer({
    itemTag: "li",
    filter: function(val) {
        return val;
    },
    source: [],
    selectedClass: "completer-selected",
    separator: "",
    template: "<ul class=\"completer-container\"></ul>",
    suggest: false,
    zIndex: 1
});
```

### Options

Setup with `$("#target").completer(options)`, or global setup with `$.fn.completer.setDefaults(options)`.

#### complete

* type: function
* default:

```javascript
function() {}
```

Will bu run when complete.

#### itemTag

* type: string
* default: "li"

#### filter

* type: function
* default:

```javascript
function(val) {
    return val;
}
```

The function will be passed the input value and run before show the list.

#### position

* type: string
* options: "bottom", "right"
* default: "bottom"

The position of the container.

#### source

* type: array
* default: []

The source data to attach or suggest.

#### selectedClass

* type: string
* default: "completer-selected"

A jQuery selector string, highlight the item when it's selectd.

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
* default: "<ul class=\"completer-container\"></ul>"

The container of the completer.

#### zIndex

* type: number
* default: 1

The css `z-index` property for the container.