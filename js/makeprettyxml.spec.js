define(['js/makeprettyxml'], function(MakePretty) {

    const TABCHAR = '  ';

    describe('makeprettyxml tests', function() {

        it('calling pretty without tabchar should throw error', function() {
            const xml = '<a><b></b></a>';
            expect(function() { MakePretty.pretty(xml) }).toThrow();
        });

        it('pretty method response should contain prettyRawXml', function() {
            const xml = '<a><b></b></a>';
            const prettyXml = MakePretty.pretty(xml, TABCHAR);
            expect(prettyXml.prettyRawXml).toBeDefined();
        });

        it('pretty method response should contain prettyColoredXml', function() {
            const xml = '<a><b></b></a>';
            const prettyXml = MakePretty.pretty(xml, TABCHAR);
            expect(prettyXml.prettyColoredXml).toBeDefined();
        });

        it('pretty method should prettyfy xml', function() {
            const xml = '<a><b></b><c><d></d></c></a>';
            const prettyRawXml = 
                `<a>\r\n` +
                    `${TABCHAR}<b>\r\n${TABCHAR}</b>\r\n` +
                    `${TABCHAR}<c>\r\n` +
                        `${TABCHAR}${TABCHAR}<d>\r\n` +
                        `${TABCHAR}${TABCHAR}</d>\r\n` +
                    `${TABCHAR}</c>\r\n` +
                `</a>`;
            expect(MakePretty.pretty(xml, TABCHAR).prettyRawXml).toBe(prettyRawXml);
        });

    });

});