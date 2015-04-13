json.array! @projects.each do |project|
	json.extract! project, :id, :author_id, :project_name, :project_type, :project_url, :created_at, :updated_at
	json.tags project.tag_list.join(", ")
end