define(function(require) {
 var $=require('jquery'),
 _=require('underscore'),
 Backbone=require('backbone'),
 Moment=require('moment'),
 MakePrettyXml=require('makeprettyxml'),
 ValidateXml=require('validatexml'),
 PrettyXmlModel=require('models/prettyxml');

 var EntryAreaView=Backbone.View.extend({
 initialize: function(options){
 console.log("Initializing new EntryAreaView...");
 if (!(options && options.model))
 throw new Error("Model is not specified!");
 if (!(options.listModel))
 throw new Error("listModel is not specified!");
 this.listModel=options.listModel; 
 },
 events: {
 "click #indentType": "onClickIndentType",
 "click #makeItPrettyBtn": "onClickSubmit",
 "keyup #txtArea": "onKeyUpTxtArea"
 },
 onClickIndentType: function() {
 var indentType=this.$("#indentType").children('input:checked').val();
 this.model.set("indentType", parseInt(indentType));
 },
 onClickSubmit: function() {
 var $text=this.$("#txtArea");
 if($text) {
 var xml=$text.val().trim();
 if(xml != '') {
 var indentType=this.model.get("indentType");
 var indent=this.model.get("indents")[indentType];
 var result=MakePrettyXml.pretty(xml, indent);
 var resultValidate=ValidateXml.validate(result.prettyRawXml);
 var prettyXmlModel=new PrettyXmlModel({
 xml: result.prettyColoredXml,
 xmlRaw: result.prettyRawXml,
 isValidXml: resultValidate.isValid,
 validationError: resultValidate.validationError
 });
 this.listModel.add(prettyXmlModel);
 $text.val("");
 this.$("#status").text("No errors found");
 }
 }
 },
 onKeyUpTxtArea: function() {
 var xml=this.$("#txtArea").val();
 var $status=this.$("#status");
 $status.text(ValidateXml.validate(xml).validationError);
 },
 render: function() {
 var template=_.template($("#entryAreaTemplate").html());
 var html=template(this.model.toJSON());
 this.$el.append(html);
 return this;
 }
 });
 
 return EntryAreaView;
});