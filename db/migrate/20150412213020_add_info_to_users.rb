class AddInfoToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :first_name, :string
  	add_column :users, :last_name, :string
  	add_column :users, :profession, :string
  	add_column :users, :city, :string
  	add_column :users, :country_state, :string
  	add_column :users, :bio, :text
  	add_index :users, :first_name
  	add_index :users, :last_name
  	add_index :users, :city
  end
end
