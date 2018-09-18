define(function(require) {

	var MakePretty = {
		pretty: function(originalXml, tabchar) {
			if(originalXml === undefined || tabchar === undefined) {
				throw new Error("invalid parameters");
			}

			console.log("Making a pretty XML...");
		
			var prettyRawXml = '';
			var prettyColoredXml = '';
			var prettyColoredLine = '<span class="prettyLine"><font>';
			var insideQuotes = false;
			var insideIneq = false;

			// Some cleaning
			originalXml = originalXml.replace(/\>\s+\</g, "><");

			var tabs = 0;
			for(i=0; i<originalXml.length; i++) {
				var doLineBreak = false;
				
				// Check if a line break is needed
				// or if we should change the tabs number
				if(i+2 <= originalXml.length) {
					if(originalXml.charAt(i) == '>' && originalXml.charAt(i+1) == '<') {
						doLineBreak = true;
						tabs++;
					}
					if(	originalXml.charAt(i) == '<' && originalXml.charAt(i+1) == '/' ||
						originalXml.charAt(i) == '>' && originalXml.charAt(i+1) == '<' && originalXml.charAt(i+2) == '/') {
						tabs--;
					}
					if(i>0 && originalXml.charAt(i) == '>' && originalXml.charAt(i-1) == '/') {
						tabs--;
					}
				}

				// Add current character
				prettyRawXml += originalXml.charAt(i);

				// Add characters with paint
				if(originalXml.charAt(i) == '"') {
					if(insideQuotes)
						prettyColoredLine += '</font>';
					prettyColoredLine += '<font class="prettyXmlSymbol">' + originalXml.charAt(i) + '</font>';
					insideQuotes = insideQuotes ? false : true;
					if(insideQuotes)
						prettyColoredLine += '<font class="prettyXmlQuotedText">';
				} else if(originalXml.charAt(i) == '<' || originalXml.charAt(i) == '>') {
					prettyColoredLine += '</font>';
					prettyColoredLine += '<font class="prettyXmlSymbol">' + originalXml.charAt(i) + '</font>';
					insideIneq = insideIneq ? false : true;
					if(!insideIneq)
						prettyColoredLine += '<font class="prettyXmlValue">';
					else
						prettyColoredLine += '<font class="prettyXmlTagText">';
				} else {
					prettyColoredLine += originalXml.charAt(i);
				}
				
				// Add line break and tabs if any
				if(doLineBreak) {
					prettyRawXml += "\r\n";
					prettyColoredXml += prettyColoredLine + "</span><br />";
					prettyColoredLine = '';
					if(originalXml.charAt(i) == '>' && tabs > 0) {
						var strTabs = "";
						for(var j=0; j<tabs; j++) {
							strTabs += tabchar;
						}
						if(strTabs != "") {
							prettyRawXml += strTabs;
							prettyColoredXml += '<span class="prettyLine">' + strTabs;
						}
					}
				}
			}

			if(prettyColoredLine != '') {
				prettyColoredXml += '<span class="prettyLine">' + prettyColoredLine + '</span>';
			}

			return { prettyRawXml: prettyRawXml, prettyColoredXml: prettyColoredXml };
		}
	};
	
    return MakePretty;
});