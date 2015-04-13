json.extract! @user, :id, :username, :email, :first_name, :last_name, :profession, :city, :country_state, :bio, :created_at, :updated_at

if @user == current_user
	json.session_id current_session.id
end

json.projects @user.projects.each do |project|
	json.extract! project, :id, :author_id, :project_name, :project_type, :project_url, :created_at, :updated_at
	json.tags project.tag_list.join(", ")
end