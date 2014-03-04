(function(factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as anonymous module.
        define(["jquery"], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function($) {

    "use strict";

    var $document = $(document),
        Completer = function(element, options) {
            options = $.isPlainObject(options) ? options : {};
            this.$element = $(element);
            this.defaults = $.extend({}, Completer.defaults, this.$element.data(), options);
            this.init();
            // console.log(this);
        };

    Completer.prototype = {
        construstor: Completer,
        
        init: function() {
            var data = Completer.fn.toArray(this.defaults.source);
            
            if (data.length > 0) {
                this.data = data;
                this.$completer = $(this.defaults.template);
                this.$completer.hide().appendTo("body");
                this.place();
                
                this.$element.on({
                    focus: $.proxy(this.enable, this),
                    blur: $.proxy(this.disable, this)
                });

                if (this.$element.is(":focus")) {
                    this.enable();
                }
            }
        },

        enable: function() {
            if (!this.active) {
                this.active = true;
                this.$element.on({
                    keydown: $.proxy(this.keydown, this),
                    keyup: $.proxy(this.keyup, this)
                });
                this.$completer.on({
                    mousedown: $.proxy(this.mousedown, this),
                    mouseover: $.proxy(this.mouseover, this)
                });
            }
        },

        disable: function() {
            if (this.active) {
                this.active = false;
                this.$element.off({
                    keydown: this.keydown,
                    keyup: this.keyup
                });
                this.$completer.off({
                    mousedown: this.mousedown,
                    mouseover: this.mouseover
                });
            }
        },

        attach: function(val) {
            var separator = this.defaults.separator,
                position = separator ? val.indexOf(separator) : -1,
                data = [],
                part = "",
                that = this,
                reg,
                item;

            if (position !== -1) {
                part = val.substring(position);
                val = val.replace(part, "");
                reg = new RegExp("^" + part, "img");
            }

            $.each(this.data, function(i, n) {
                n = separator + n;
                item = that.template(val + n);
                
                if (reg && reg.test(n)) {
                    data.unshift(item);
                } else {
                    data.push(item);
                }
            });

            this.fill(data.join(""));
        },

        suggest: function(val) {
            var that = this,
                data = [];

            $.each(this.data, function(i, n) {
                if (n.indexOf(val) !== -1) {
                    data.push(that.template(n));
                }
            });

            this.fill(data.join(""));
        },

        template: function(text) {
            var tag = this.defaults.itemTag;

            return ("<" + tag + ">" + text + "</" + tag + ">");
        },

        fill: function(html) {
            if (html) {
                this.$completer.empty().html(html);
                this.$completer.children(":first").addClass(this.defaults.selectedClass);
                this.show();
            }
        },

        complete: function() {
            var defaults = this.defaults,
                val = defaults.filter(this.$element.val());

            if (val === "") {
                this.hide();
                return;
            }

            if (defaults.suggest) {
                this.suggest(val);
            } else {
                this.attach(val);
            }
        },

        keydown: function(e) {
            if (e.keyCode === 13) {
                e.stopPropagation();
                e.preventDefault();
            }
        },

        keyup: function(e) {
            var keyCode = e.keyCode;
            
            if (keyCode === 13 || keyCode === 38 || keyCode === 40) {
                this.toggle(keyCode);
            } else {
                this.complete();
            }
        },

        mouseover: function(e) {
            var defaults = this.defaults,
                selectedClass = defaults.selectedClass,
                $target = $(e.target);
            
            if ($target.is(defaults.itemTag)) {
                $target.addClass(selectedClass).siblings().removeClass(selectedClass);
            }
        },

        mousedown: function(e) {
            e.stopPropagation();
            e.preventDefault();
            this.setValue($(e.target).text());
        },

        setValue: function(val) {
            this.$element.val(val);
            this.defaults.complete();
            this.hide();
        },

        toggle: function(keyCode) {
            var selectedClass = this.defaults.selectedClass,
                $selected = this.$completer.find("." + selectedClass);

            switch (keyCode) {
                
                // Down
                case 40:
                    $selected.removeClass(selectedClass);
                    $selected = $selected.next();
                    break;

                // Up
                case 38:
                    $selected.removeClass(selectedClass);
                    $selected = $selected.prev();
                    break;

                // Enter
                case 13:
                    this.setValue($selected.text());
                    break;

                // No default
            }

            if ($selected.length === 0) {
                $selected = this.$completer.children(keyCode === 40 ? ":first" : ":last");
            }

            $selected.addClass(selectedClass);
        },

        place: function() {
            var $element = this.$element,
                offset = $element.offset(),
                left = offset.left,
                top = offset.top,
                height = $element.outerHeight(),
                width = $element.outerWidth();

            if (this.defaults.position === "right") {
                left += width;
            } else {
                top += height;
            }

            this.$completer.css({
                left: left,
                minWidth: width,
                top: top,
                zIndex: this.defaults.zIndex
            });
        },

        show: function() {
            this.$completer.show();
            $document.on("mousedown", $.proxy(this.hide, this));
        },
        
        hide: function() {
            this.$completer.hide();
            $document.off("mousedown", this.hide);
        }
    };

    Completer.fn = {
        toArray: function(s) {
            if (typeof s === "string") {
                s = s.replace(/[\{\}\[\]"']+/g, "").split(/[\,\|\/]+/);
                s = $.map(s, function(n) {
                    return $.trim(n);
                });
            }

            return s;
        }
    };

    Completer.defaults = {
        complete: function() {
            // Do something when complete
        },

        itemTag: "li",

        filter: function(val) {
            return val;
        },

        position: "bottom", // or "right"
        source: [],
        selectedClass: "completer-selected",
        separator: "",
        suggest: false,
        template: "<ul class=\"completer-container\"></ul>",
        zIndex: 1
    };

    Completer.setDefaults = function(options) {
        $.extend(Completer.defaults, options);
    };

    // Register as jQuery plugin
    $.fn.completer = function(options) {
        return this.each(function() {
            $(this).data("completer", new Completer(this, options));
        });
    };

    $.fn.completer.Constructor = Completer;
    $.fn.completer.setDefaults = Completer.setDefaults;

    $(function() {
        $("[completer]").completer();
    });
}));