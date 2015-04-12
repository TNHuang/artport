Artcircle.Views.FrontPage = Backbone.CompositeView.extend({
	template: JST["root/frontpage"],
	className: "frontpage",

	events: {
		"click .toggle-log-in": "toggleLoginViews",
		"click .toggle-modal": "toggleModal",
		"submit form.log-in-container": "login",
		"submit .modal-window > form": "createProtfolio",
	},

	render: function(){
		var content = this.template(this.params);
		this.$el.html(content);

		this.addSubviews(".info-list", [
				new Artcircle.Views.FrontPageInfo({ dir: "left"}),
				new Artcircle.Views.FrontPageInfo({ dir: "right"}),
				new Artcircle.Views.FrontPageInfo({ dir: "left"})
			]);

		return this;
	},
	
	toggleLoginViews: function(){
		this.toggleViewPair(".log-in", ".log-in-container");
		$(".company-title").toggleClass('hidden');

		//reset log error
		$(".log-in-username").removeClass("error-highlight").attr("placeholder", "username");
	},

	toggleModal: function(){
		$(".modal-window").toggleClass("hidden");
		$(".header > .sign-up").toggleClass("hidden");
		$("html, body").animate({ scrollTop: 0 });

		//input message reset
		$(".sign-up-username").removeClass("error-highlight").attr("placeholder", "username");
		$(".sign-up-email").removeClass("error-highlight").attr("placeholder", "email");
		$(".sign-up-password").removeClass("error-highlight").attr("placeholder", "password");
		$(".sign-up-password-confirmation").removeClass("error-highlight").attr("placeholder", "repeat passowrd");
	},

	login: function(event){
		event.preventDefault();
		var sessionParams = $(event.currentTarget).serializeJSON();

		//sign in sessions then assign current user
		$.ajax({
			type: "POST",
			url: "api/sessions",
			data: sessionParams,
			dataType: "json",
			success: function(response){
				Artcircle.current_user = 
					Artcircle.users.getOrFetch(response.id);
				Backbone.history.navigate("users/" + response.id, {trigger: true});
			}.bind(this),
			error: function(response){
                this.putErrorStyling(".log-in-username", response.responseJSON.error);
            }.bind(this)
		});
	},

	createProtfolio: function(event){
		event.preventDefault();

		var userParams = $(event.currentTarget).serializeJSON();
		var newUser = new Artcircle.Models.User(userParams);

		newUser.save({},{
			success: function(response){
				Artcircle.users.add(newUser);
				Artcircle.current_user = 
					Artcircle.users.getOrFetch(response.id);
				Backbone.history.navigate("users/" + response.id, {trigger: true});
			},
			error: function(model, error){
				var view = this;
				
				var errors = error.responseJSON.error;
				errors.forEach(function(e){
					var selector = ".sign-up-" + /\b[^ ]*\b/.exec(e)[0].toLowerCase();
					view.putErrorStyling(selector, e);
				})
            }.bind(this)
		})
		
	},

})