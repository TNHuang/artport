json.array! @users.each do |user|
	json.extract! user, :id, :username, :email, :first_name, :last_name, :profession, :city, :country_state, :bio, :created_at, :updated_at
end