Artcircle.Views.FrontPageInfo = Backbone.CompositeView.extend({
	template: JST["root/info"],
	className: "container info-container",

	initialize: function(params){
		this.params = params;
		this.params["title"] = this.params["title"] || "Lorem ipsum dolor";
		this.params["info"] = this.params["info"] || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
		this.params["logo_img_url"] = this.params["logo_img_url"] || "http://i.imgur.com/0LKksN0.jpg";

		if (this.params['dir'] === "left") {
			this.params["article_dir"] = "left";
			this.params["logo_dir"] = "right";
		}else{
			this.params["article_dir"] = "right";
			this.params["logo_dir"] = "left";
		}
		this.render();
	},
})