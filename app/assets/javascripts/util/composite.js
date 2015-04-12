Backbone.CompositeView = Backbone.View.extend({
	initialize: function(params){
		this.params = params || {};
		this.render();
	},

	render: function(){
		var content = this.template(this.params);
		this.$el.html(content);
		return this;
	},

	switchView: function(selector, oldview, newview, location){
		var location = location || "append";

		this.removeSubview(selector, oldview);
		this.addSubview(selector, newview);
	},

	addSubview: function(selector, subview, loc){
		
		var location = loc || "append";
		this.getSubviews(selector).push(subview);
		if (location === "prepend"){
			this.$(selector).prepend(subview.$el);

		} else if (location === "append"){
			this.$(selector).append(subview.$el);
		}
		subview.delegateEvents();
	},

	addSubviews: function(selector, subviews){
		var view = this;
		var _subviews = this.getSubviews(selector);

		_.each(subviews, function(subview){
			_subviews.push(subview);
			view.$(selector).append(subview.$el);
		});
	},

	removeSubview: function(selector, subview){
		//remove subview from both the subviews hash and remove the actual subview
		subview.remove();
		var subviews = this.getSubviews(selector);
		subviews.splice(subviews.indexOf(subview), 1);
	},

	remove: function(){
		Backbone.View.prototype.remove.call(this);
		_(this.getSubviews).each(function(subviews, selector){
			_(subviews).each(function(subview){
				subview.remove();
			});
		});
	},

	getSubviews: function (selector) {
		//can either return a specific subview or all the subview
		this.subviews = this.subviews || {};

		if (selector) {
		  this.subviews[selector] = this.subviews[selector] || [];
		  return this.subviews[selector];
		} else {
		  return this.subviews;
		}
  	},

  	toggleViewPair: function(selector, other_selector){
  		$(selector).toggleClass("hidden");
  		$(other_selector).toggleClass("hidden");
  	},

  	putErrorStyling: function(selector, msg){
		//mark input with validation message
		var selected = this.$(selector);
		if (!selected.hasClass("error-highlight")){
			selected.addClass("error-highlight");
		}
		selected.attr("placeholder", msg).val("").focus().blur();
	},

	undisplay: function(selector){
		var selected = this.$(selector);
		if (!selected.hasClass('hidden')){
			selected.toggleClass('hidden');
		}
	},
});