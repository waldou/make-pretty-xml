define(['js/models/PrettyXmlModel'], function(PrettyXmlModel) {

    describe('PrettyXmlModel tests', function() {

        it('new models should have validationError property', function() {
			var model = new PrettyXmlModel();
			expect(model.get('validationError')).toBeDefined();
        });
        
        it('new models should have viewType property', function() {
			var model = new PrettyXmlModel();
			expect(model.get('viewType')).toBeDefined();
        });
        
        it('new models should have isValidXml property', function() {
			var model = new PrettyXmlModel();
			expect(model.get('isValidXml')).toBeDefined();
        });
        
        it('new models without params are not valid', function() {
			var model = new PrettyXmlModel();
			expect(model.isValid()).toBe(false);
        });
        
        it('new models with xml and xmlRaw params are valid', function() {
            var model = new PrettyXmlModel({ xml: '<a></a>', xmlRaw: '<a></a>' });
			expect(model.isValid()).toBe(true);
		});

    });

});