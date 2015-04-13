class Project < ActiveRecord::Base

	belongs_to :author,
	class_name: "User",
	foreign_key: "author_id"

	validates :author_id, :project_url, presence: true
	acts_as_taggable
	acts_as_taggable_on :project_name,
	scope :by_join_date, order("created_at DESC")
end