Artcircle.Views.UserShow = Backbone.CompositeView.extend({
	template: JST["user/show"],
	className: "usershow",

	initialize: function(options){
		this.user = options.user;
		this.listenTo(this.user, "sync change", this.render);

		if (this.user.id === Artcircle.current_user.id){
			$(".update-btn").removeClass("hidden");
		}
	},

	events: {
		"click .profile-view": "toggleProfileView",
		"click .edit-profile-view": "toggleEditView",
		"click .update-btn": "updateProfile",
	},

	render: function(){
		var content = this.template({user: this.user});
		this.$el.html(content);

		this.navbarview = this.navbarview || new Artcircle.Views.Navbar({parentview: this, user: this.user});
		this.profileview = this.profileview || new Artcircle.Views.ProfileView({user: this.user});
		this.editprofileview = this.editprofileview || new Artcircle.Views.ProfileEdit({user: this.user});
		
		this.addSubview(".navbar-container", this.navbarview);
		this.addSubview(".main-container", this.profileview);
		this.addSubview(".main-container", this.editprofileview);
		return this;
	},

	toggleProfileView: function(){
		this.undisplay(".edit-view-container");
		this.undisplay(".update-btn");
		this.undisplay(".follow-btn");
		this.$(".profile-view-container").removeClass("hidden");
	},

	toggleEditView: function(){
		this.undisplay(".profile-view-container");
		this.undisplay(".follow-btn");
		this.$(".edit-view-container").removeClass("hidden");
		this.$(".update-btn").removeClass("hidden");
	},

	updateProfile: function(event){
		var profileParams = $("form.edit-view-container").serializeJSON();
		console.log(profileParams);
	}

})