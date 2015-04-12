Artcircle.Views.ProfileEdit = Backbone.CompositeView.extend({
	template: JST["user/edit"],
	className: "edit-view-container container hidden",
	tagName: "form",

	initialize: function(options){
		this.user = options.user;
		this.listenTo(this.user, "sync change", this.render);
	},

	render: function(){
		var content = this.template({user: this.user});
		this.$el.html(content);
		return this;
	},
})