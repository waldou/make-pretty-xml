define([
    'js/views/PrettyXmlView',
    'js/models/PrettyXmlModel'
    ], function(PrettyXmlView, PrettyXmlModel) {

    var oldBody;

    beforeAll(function () { oldBody = $('body').clone(); });

    afterAll(function () { $('body').replaceWith(oldBody); });

    describe('PrettyXmlView tests', function() {

        describe('new views', function() {

            it('without model should throw error', function() {
                expect(function() {
                    new PrettyXmlView();
                }).toThrow();
            });

            it('should be defined', function() {
                var model = new PrettyXmlModel({id: 1, xml: 'a', xmlRaw: 'a'});
                var view = new PrettyXmlView({ model: model });
                expect(view).toBeDefined();
            });

        });

        it('should be renderable', function() {
            var model = new PrettyXmlModel({id: 1, xml: 'a', xmlRaw: 'a'});
            var view = new PrettyXmlView({ model: model });
            expect(function() {
                view.render();
            }).not.toThrow();
        });

    });

});