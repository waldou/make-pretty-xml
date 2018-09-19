define(['js/models/PrettyXmlModel'], function(PrettyXmlModel) {

    describe('PrettyXmlModel tests', function() {

        describe('new models', function() {

            var model = new PrettyXmlModel();

            it('should have validationError property', function() {
                expect(model.get('validationError')).toBeDefined();
            });
            
            it('should have viewType property', function() {
                expect(model.get('viewType')).toBeDefined();
            });
            
            it('should have isValidXml property', function() {
                expect(model.get('isValidXml')).toBeDefined();
            });
            
            it('without params are not valid', function() {
                expect(model.isValid()).toBe(false);
            });
            
            it('with xml and xmlRaw params are valid', function() {
                var model = new PrettyXmlModel({ xml: '<a></a>', xmlRaw: '<a></a>' });
                expect(model.isValid()).toBe(true);
            });
        
        });

    });

});