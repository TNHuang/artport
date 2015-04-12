Artcircle.Routers.Router = Backbone.Router.extend({
	initialize: function(options){
		this.$main = options.$main;
	},

	routes: {
		"": "frontpage",
		"users/:id": "usershow"
	},

	frontpage: function(){
		var view = new Artcircle.Views.FrontPage();
		this._swapView(view);
	},

	usershow: function(id){
		var user = Artcircle.users.getOrFetch(id);
		var view = new Artcircle.Views.UserShow({user: user});
		this._swapView(view);
	},

	_swapView: function(view){
		this.currentView && this.currentView.remove();
		this.currentView = view;
		this.$main.html(view.render().$el);
	}


})