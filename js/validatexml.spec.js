require(['js/validatexml'], function(ValidateXml) {

    describe('validatexml tests', function() {

        it('without params should throw error', function() {
            expect(function() { ValidateXml.validate() }).toThrow();
        });

        it('returns an isValid parameter', function() {
            var validation = ValidateXml.validate('<a><a>');
            expect(validation.isValid).toBeDefined();
        });

        it('returns an validationError parameter', function() {
            var validation = ValidateXml.validate('<a><a>');
            expect(validation.validationError).toBeDefined();
        });

        it('with an invalid xml returns an invalid xml response', function() {
            var validation = ValidateXml.validate('<a><b></b><a>');
            expect(validation.isValid).toBe(false);
            expect(validation.validationError).not.toBe('No errors found');
        });

        it('with a valid xml returns a valid xml response', function() {
            var validation = ValidateXml.validate('<a><b></b></a>');
            expect(validation.isValid).toBe(true);
            expect(validation.validationError).toBe('No errors found');
        });

    });

});