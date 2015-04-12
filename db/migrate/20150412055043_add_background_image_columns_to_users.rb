class AddBackgroundImageColumnsToUsers < ActiveRecord::Migration
	include Paperclip::Schema
  def self.up
  	add_attachment :users, :background_image_url
  end

  def self.down
  	remove_attachment :users, :background_image_url
  end
end
