define(function(require) {

	var MakePretty = {
		pretty: function(originalXml, tabchar) {
			console.log("Making a pretty XML...");
		
			var prettyxml = '';

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
				prettyxml += originalXml.charAt(i);
				
				// Add line break and tabs if any
				if(doLineBreak) {
					prettyxml += "\r\n";
					if(originalXml.charAt(i) == '>' && tabs > 0) {
						var strTabs = "";
						for(var j=0; j<tabs; j++) {
							strTabs += tabchar;
						}
						prettyxml += strTabs;
					}
				}
			}		

			return prettyxml;
		},
		prettyPaint: function(originalXml, tabchar) {
			console.log("Making a pretty XML with colors...");

			var prettyxml = '';
			var prettyLine = '<span class="prettyLine"><font>';
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

				// Add characters with paint
				if(originalXml.charAt(i) == '"') {
					if(insideQuotes)
						prettyLine += '</font>';
					prettyLine += '<font class="prettyXmlSymbol">' + originalXml.charAt(i) + '</font>';
					insideQuotes = insideQuotes ? false : true;
					if(insideQuotes)
						prettyLine += '<font class="prettyXmlQuotedText">';
				} else if(originalXml.charAt(i) == '<' || originalXml.charAt(i) == '>') {
					prettyLine += '</font>';
					prettyLine += '<font class="prettyXmlSymbol">' + originalXml.charAt(i) + '</font>';
					insideIneq = insideIneq ? false : true;
					if(!insideIneq)
						prettyLine += '<font class="prettyXmlValue">';
					else
						prettyLine += '<font class="prettyXmlTagText">';
				} else {
					prettyLine += originalXml.charAt(i);
				}

				// Add line break and tabs if any
				if(doLineBreak) {
					prettyxml += prettyLine + "</span><br />";
					prettyLine = '';
					if(originalXml.charAt(i) == '>' && tabs > 0) {
						var strTabs = "";
						for(var j=0; j<tabs; j++) {
							strTabs += tabchar;
						}
						if(strTabs != "")
							prettyxml += '<span class="prettyLine">' + strTabs;
					}
				}
			}

			if(prettyLine != '') {
				prettyxml += '<span class="prettyLine">' + prettyLine + '</span>';
			}

			return prettyxml;
		}
	};
	
    return MakePretty;
});