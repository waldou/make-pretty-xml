define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');

	var PretyXmlView = Backbone.View.extend({
		initialize: function(options){
			console.log("Initializing new PretyXmlView...");
			if (!(options && options.model))
				throw new Error("Model is not specified!");
			this.model.on("change", this.render, this);
		},
		events: {
			"click #deleteBtn": "onClickDelete",
			"click #downloadBtn": "onClickDownload",
			"click #copyToClipBtn": "onClickCopyToClip"
		},
		onClickDelete: function() {
			console.log("Item " + this.model.get("id") + " removed from list...");
			this.model.trigger('destroy', this.model);
			this.$el.hide("fast", function() {
				this.remove();
			});
		},
		onClickDownload: function() {
			try {
				var filename = "prettyXml" + this.model.get("id") + ".txt";
				console.log("Downloading file " + filename + "...");
				var document = this.$el.prop("ownerDocument");
				var text = this.model.get("xml");
				var element = document.createElement('a');
				element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
				element.setAttribute('download', filename);
				element.style.display = 'none';
				document.body.appendChild(element);
				element.click();
				document.body.removeChild(element);
			} catch(e) {
				console.log("Failed to generate file for download!");
			}
		},
		onClickCopyToClip: function() {
			var document = this.$el.prop("ownerDocument");
			var text = this.$el.find(".prettyXmlText").text();
			var success = true, range = document.createRange(), selection;
			if (window.clipboardData) {
				// For IE
				window.clipboardData.setData("Text", text);
			} else {
				var tmpElem = $('<pre>');
					tmpElem.css({
					position: "absolute",
					left:     "-1000px",
					top:      "-1000px",
				});
				tmpElem.text(text);
				$("body").append(tmpElem);
				range.selectNodeContents(tmpElem.get(0));
				selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(range);
				try {
					success = document.execCommand ("copy", false, null);
				} catch (e) {
					alert('Failed to copy.');
				}
				if (success) {
					tmpElem.remove();
				}
			}
			if (success) {
				console.log("Text was copied to clipboard...");
			}
		},
		render: function() {
			var template = _.template($("#prettyXmlTemplate").html());
			var html = template(this.model.toJSON());
			$obj = $(html);
			$obj.find(".prettyXmlText").text(this.model.get("xml"));
			this.$el.append($obj.prop('outerHTML'));
			return this;
		},
	});
	
    return PretyXmlView;
});