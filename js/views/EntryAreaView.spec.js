define([
    'js/views/EntryAreaView',
    'js/models/EntryAreaModel',
    'js/models/PrettyXmlsModel',
    ], function(EntryAreaView, EntryAreaModel, PrettyXmlsModel) {

    var oldBody;

    beforeAll(function () { oldBody = $('body').clone(); });

    afterAll(function () { $('body').replaceWith(oldBody); });

    describe('EntryAreaView tests', function() {

        describe('new views', function() {

            it('without model should throw error', function() {
                expect(function() {
                    new EntryAreaView();
                }).toThrow();
            });

            it('should be defined', function() {
                var model = new EntryAreaModel();
                var listModel = new PrettyXmlsModel();
                var view = new EntryAreaView({el: '#entryAreaContainer', model: model, listModel: listModel});
                expect(view).toBeDefined();
            });

        });

        it('should be renderable', function() {
            var model = new EntryAreaModel();
            var listModel = new PrettyXmlsModel();
            var view = new EntryAreaView({el: '#entryAreaContainer', model: model, listModel: listModel});
            expect(function() {
                view.render();
            }).not.toThrow();
        });

        it('should listen to click on indentType checks and update model', function() {
            var model = new EntryAreaModel();
            var listModel = new PrettyXmlsModel();
            var view = new EntryAreaView({el: '#entryAreaContainer', model: model, listModel: listModel});
            expect(model.get('indentType')).toBe(0);
            $('#indentType').children()[2].click();
            expect(model.get('indentType')).toBe(1);
        });

    });

});