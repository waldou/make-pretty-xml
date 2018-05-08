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
		}
	};
	
    return MakePretty;
});