define(['js/models/EntryAreaModel'], function(EntryAreaModel) {

    describe('EntryAreaModel tests', function() {

		describe('new models', function() {

			var model = new EntryAreaModel();

			it('should have indentType property', function() {
				expect(model.get('indentType')).toBeDefined();
			});
			
			it('should have indents property', function() {
				expect(model.get('indents')).toBeDefined();
			});
	
			it('without params are valid', function() {
				expect(model.isValid()).toBe(true);
			});

		});

    });

});