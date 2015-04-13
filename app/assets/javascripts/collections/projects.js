Artcircle.Collections.Projects = Backbone.Collection.extend({
	model: Artcircle.Models.Project,
	url: function(){
		return "api/users/" + this.user.id + "/projects";
	},

	getOrFetch: function (id){
		var projects = this;
		var project = projects.get(id);
		if (!project){
			project = new Artcircle.Models.project({id: id, user: projects.user});
			project.fetch({
				success: function(){
					projects.add(project);
				}
			});
		} else{
			project.fetch();
		}
		return project;
	},
})