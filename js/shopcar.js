"use strict";jQuery.fn.extend({check:function(e,c){var i=this;this.click(function(){e.prop("checked",this.checked)}),c&&c.click(function(){e.each(function(){this.checked=!this.checked}),n()}),e.click(function(){n()});var n=function(){var c=!0;e.each(function(){1!=this.checked&&(c=!1)}),i.prop("checked",c)}}});