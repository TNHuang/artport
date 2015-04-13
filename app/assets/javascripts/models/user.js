Artcircle.Models.User = Backbone.Model.extend({
	urlRoot: "/api/users",
	defaults: {
		first_name: "",
		last_name: "",
		profession: "",
		city: "",
		country_state: "",
		bio: "",
	},

	projects: function () {
		if(!this._projects) {
			this._projects = new Artcircle.Collections.Projects([], { user: this });
		}
		return this._projects;
	},

	parse: function (response) {
		if(response.projects) {
			this.projects().set(response.projects, { parse: true });
			delete response.projects;
		}
		return response;
	},
});