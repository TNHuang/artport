Artcircle.Models.User = Backbone.Model.extend({
	urlRoot: "/api/users",
	// email_regex: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/,
	// defaults: {
	// 	'email': '',
	// 	'username': '',
	// 	'password': '',
	// 	'password_confirmation': ''
	// },

	// validate: function(attrs){
	// 	if (!attrs.email){
	// 		return 'Email cannot be blank.';
	// 	}
	// 	if (this.email_regex.exec(attrs.email)){
	// 		return 'Invaid Email format';
	// 	}
	// 	if (!attrs.username){
	// 		return 'Username cannot be blank.';
	// 	}
	// 	if (!attrs.password){
	// 		return 'Password cannot be blank.';
	// 	}
	// 	if (!attrs.password_confirmation){
	// 		return ''
	// 	}
	// }

});