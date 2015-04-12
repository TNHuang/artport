Artcircle.Views.Navbar = Backbone.CompositeView.extend({
	template: JST["layout/navbar"],
	className: "navbar",
	initialize: function(options){
		this.user = Artcircle.current_user;
		this.parentview = options.parentview;
		this.render();
		this.listenTo(this.user, "sync change", this.render);
	},

	events: {
		"submit form.search-bar": "search",
		"click .log-out": "logOut",
		"click .log-out-all": "logOutAllSessions"
	},

	render: function(){
		var content = this.template({user: this.user});
		this.$el.html(content);
		return this;
	},

	search: function(event){
		event.preventDefault();
		
	},

	logOut: function(){
		$.ajax({
			type: "DELETE",
			url: "api/sessions/" + this.user.session_id,
			success: function(){
				Backbone.history.navigate("/", {trigger: true});
			}.bind(this)
		});
	},

	logOutAllSessions: function(){
		$.ajax({
			type: "DELETE",
			url: "api/sessions/sign_out_all",
			success: function() {
				Backbone.history.navigate("/", {trigger: true})
			}.bind(this)
		});
	},




})