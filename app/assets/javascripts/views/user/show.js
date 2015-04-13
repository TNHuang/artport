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
		"click .expand-btn": "toggleNavbarBtns",
		"submit form.search-bar": "searchProjects"
	},

	render: function(){
		var content = this.template({user: this.user});
		this.$el.html(content);

		this.navbarview = this.navbarview || new Artcircle.Views.Navbar({parentview: this, user: this.user});
		this.profileview = this.profileview || new Artcircle.Views.ProfileView({user: this.user});
		this.editprofileview = this.editprofileview || new Artcircle.Views.ProfileEdit();
		this.collectionView = this.collectionView || new Artcircle.Views.ProjectsCollection({user: this.user, collection: this.user.projects()});
		
		this.addSubview(".navbar-container", this.navbarview);
		this.addSubview(".main-container", this.profileview);
		this.addSubview(".main-container", this.editprofileview);
		this.addSubview(".main-container", this.collectionView);
		return this;
	},

	toggleProfileView: function(){
		this.undisplay(".edit-view-container");
		this.undisplay(".update-btn");
		this.undisplay(".follow-btn");
		this.$(".profile-view-container").removeClass("hidden");
	},

	toggleEditView: function(){
		Backbone.history.navigate("users/" + Artcircle.current_user.id, { trigger: true});
		this.undisplay(".profile-view-container");
		this.undisplay(".follow-btn");
		this.$(".edit-view-container").removeClass("hidden");
		this.$(".update-btn").removeClass("hidden");
	},

	toggleNavbarBtns: function(){
		this.$(".log-out").toggleClass("hidden");
		this.$(".log-out-all").toggleClass("hidden");
		this.$(".edit-profile-view").toggleClass("hidden");
		this.$(".profile-view").toggleClass("hidden");
	},

	updateProfile: function(event){
		var profileParams = $("form.edit-view-container").serializeJSON();
		this.user.save(profileParams["users"], {
			success: function(model, response){
				console.log(response.message)
			}.bind(this), 
			error: function(model, error){
				console.log(error.responseJSON.error);
			}
		})
	},

	searchProjects: function(event){
		event.preventDefault();
		var searchParams = $(event.currentTarget).serializeJSON();
		console.log(searchParams)
	}

})