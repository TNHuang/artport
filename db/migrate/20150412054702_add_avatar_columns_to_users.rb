class AddAvatarColumnsToUsers < ActiveRecord::Migration
	include Paperclip::Schema
  def self.up
    add_attachment :users, :avatar
  end

  def self.down
    remove_attachment :users, :avatar
  end
end
