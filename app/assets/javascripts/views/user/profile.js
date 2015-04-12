Artcircle.Views.ProfileView = Backbone.CompositeView.extend({
	template: JST["user/profile"],
	className: "profile-view-container",
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