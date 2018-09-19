define([
    'js/views/PrettyXmlsView',
    'js/models/PrettyXmlsModel',
    'js/models/PrettyXmlModel',
    ], function(PrettyXmlsView, PrettyXmlsModel, PrettyXmlModel) {

    var oldBody;

    beforeAll(function () { oldBody = $('body').clone(); });

    afterAll(function () { $('body').replaceWith(oldBody); });

    describe('PrettyXmlsView tests', function() {

        describe('new views', function() {

            it('without model should throw error', function() {
                expect(function() {
                    new PrettyXmlsView();
                }).toThrow();
            });

            it('should be defined', function() {
                var model = new PrettyXmlsModel();
                var view = new PrettyXmlsView({el: '#prettyXmlsContainer', model: model});
                expect(view).toBeDefined();
            });

        });

        it('should be renderable', function() {
            var model = new PrettyXmlsModel();
            var view = new PrettyXmlsView({el: '#prettyXmlsContainer', model: model});
            expect(function() {
                view.render();
            }).not.toThrow();
        });

        it('when adding new items to model should render new items', function() {
            var model = new PrettyXmlsModel();
            var view = new PrettyXmlsView({el: '#prettyXmlsContainer', model: model});
            var container = $('#prettyXmlsContainer');
            expect(container.children().length).toBe(0);
            model.add(new PrettyXmlModel({ xml: 'a', xmlRaw: 'a' }));
            expect(container.children().length).toBe(1);
            model.add(new PrettyXmlModel({ xml: 'b', xmlRaw: 'b' }));
            expect(container.children().length).toBe(2);
        });

    });

});