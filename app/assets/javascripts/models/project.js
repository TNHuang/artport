Artcircle.Models.Project = Backbone.Model.extend({
	urlRoot: function(){
		return "api/users/" + this.escape('author_id') + "/projects";
	},
	defaults: {
		tags:""
	}
})