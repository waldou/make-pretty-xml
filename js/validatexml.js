define(function(require) {

	var checkXML = function(node) {
		var txt = "";
		var nodeName = node.nodeName;
		if(nodeName == "h3")
			return "";
		if(nodeName == "#text") {
			txt += node.nodeValue.trim() + " ";
		}
		if(node.childNodes != undefined) {
			var len = node.childNodes.length;
			for (i=0; i<len; i++) {
				txt += checkXML(node.childNodes[i]);
			}
		}
		return txt;
	}

	var ValidateXml = {
		validate: function(xml) {
			if(xml == "") {
				return "No errors found";
			}
			// For IE < 11
			if (window.ActiveXObject) {
				var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async = false;
				xmlDoc.loadXML(xml);
				if(xmlDoc.parseError.errorCode != 0) {
					return xmlDoc.parseError.reason + " - Line " + xmlDoc.parseError.line;
				} else {
					return "No errors found";
				}
			} else if (window.document.implementation.createDocument) {
				try {
					var parser = new DOMParser();
					var xmlDoc = parser.parseFromString(xml, "application/xml");
				} catch(e) {
					return "Invalid XML";
				}
				if (xmlDoc == undefined) {
					return "Invalid XML";
				} else if(xmlDoc.getElementsByTagName("parsererror").length > 0) {
					return checkXML(xmlDoc.getElementsByTagName("parsererror")[0]);
				} else {
					return "No errors found";
				}
			} else {
				return "Your browser cannot handle XML validation";
			}
		}
	};
	
    return ValidateXml;
});