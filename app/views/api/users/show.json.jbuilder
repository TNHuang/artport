json.extract! @user, :id, :username, :email, :created_at, :updated_at

if @user == current_user
	json.session_id current_session.id
end
