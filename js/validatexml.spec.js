define(['js/validatexml'], function(ValidateXml) {

    describe('validatexml tests', function() {

        it('calling validate without params should throw error', function() {
            expect(function() { ValidateXml.validate() }).toThrow();
        });

    });

});