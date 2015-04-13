Artcircle.Views.ProjectsCollection = Backbone.CompositeView.extend({
	template: JST['project/collection'],
	className: "projects-collection container",
	initialize: function(options){
		this.collection = options.collection;
		this.user = options.user;
		this.listenTo(this.user, "sync change", this.render);
		this.listenTo(this.collection, "add", this.addProjectView)
	},

	events: {
		"submit form.project-creation": "createProject"
	},

	render: function(){
		var view = this;

		var content = view.template({ user: view.user});
		view.$el.html(content);
		view.collection.models.forEach( view.addProjectView.bind(this) );

		return view;
	},

	addProjectView: function(project){
		this.addSubview(".projects-collection-container" 
			, new Artcircle.Views.ProjectShow({project: project})
			, "prepend");
	},

	createProject: function(event){
		event.preventDefault();
		var projectParams = $(event.currentTarget).serializeJSON();

		var newProject = new Artcircle.Models.Project(projectParams["projects"]);
		newProject.save({sort: false}, {
			success: function(response){
				this.collection.add(newProject);
				this.$("form.project-creation > input:first-child").val("");
				console.log("project added success");
			}.bind(this), 
			error: function(model, error){
				console.log(error);
			}
		})
	}

})