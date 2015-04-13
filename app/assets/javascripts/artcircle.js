window.Artcircle = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	var users = Artcircle.users = new Artcircle.Collections.Users();

  	var current_user_id = parseInt( $("#current-user-id").data("current-user-id") );
	if (Artcircle.current_user === undefined){
		if (current_user_id) {
			Artcircle.current_user = users.getOrFetch(current_user_id);
		} else {
			Artcircle.current_user = new Artcircle.Models.User();
		}
	}

    new Artcircle.Routers.Router({ $main: $("body") });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Artcircle.initialize();
});
