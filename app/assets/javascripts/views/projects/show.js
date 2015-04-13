Artcircle.Views.ProjectShow = Backbone.CompositeView.extend({
	template: JST["project/show"],
	className: "project-show container left",
	initialize: function(options){
		this.project = options.project;
		this.render();
		this.listenTo(this.project, "sync change", this.render);
	},
	render: function(){
		var content = this.template({project: this.project});
		this.$el.html(content);
		return this;
	},

	events: {
		"click .delete-project-btn": "deleteProject",
		"submit form.add-tag": "addTags"
	},

	addTags: function(event){
		event.preventDefault();
		var view = this;
		var url = "api/users/" 
					+ view.project.escape('author_id')
					+ "/projects/" + view.project.id 
					+ "/add_tag";
		var tagParams = $(event.currentTarget).serializeJSON();
		console.log(tagParams);
		$.ajax({
			url: url,
			type: "POST",
			data: tagParams,
			success: function(response){
				view.project.set(response);
				console.log("tag added")
			},
			error: function(model, response){
				console.log(response.responseJSON.error);
			}
		})

	},
	deleteProject: function(){
		var view = this;
		var url = "api/users/" 
					+ view.project.escape('author_id')
					+ "/projects/" + view.project.id;
		$.ajax({
			url: url,
			type: "DELETE",
			success: function(response){
				console.log("delete success");
				view.remove();
			}
		})
	}
})