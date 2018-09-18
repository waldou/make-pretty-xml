define(['js/models/PrettyXmlsModel', 'js/models/PrettyXmlModel'], function(PrettyXmlsModel, PrettyXmlModel) {

    describe('PrettyXmlsModel tests', function() {

        it('new models should have starting nextId', function() {
            var model = new PrettyXmlsModel();
			expect(model.nextId).toBeDefined();
        });

        it('models should autoincrement item ids', function() {
            var model = new PrettyXmlsModel();
            expect(model.nextId).toBe(1);
            model.add(new PrettyXmlModel({ xml: 'a', xmlRaw: 'a' }));
            model.add(new PrettyXmlModel({ xml: 'b', xmlRaw: 'b' }));
            expect(model.get(1).get('id')).toBe(1);
            expect(model.get(2).get('id')).toBe(2);
            expect(model.nextId).toBe(3);
        });

    });

});