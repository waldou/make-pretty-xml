define(['js/models/EntryAreaModel'], function(EntryAreaModel) {

    describe('EntryAreaModel tests', function() {

        it('new models should have indentType property', function() {
			var model = new EntryAreaModel();
			expect(model.get('indentType')).toBeDefined();
		});
		
        it('new models should have indents property', function() {
			var model = new EntryAreaModel();
			expect(model.get('indents')).toBeDefined();
		});

		it('new models without params are valid', function() {
			var model = new EntryAreaModel();
			expect(model.isValid()).toBe(true);
        });

    });

});