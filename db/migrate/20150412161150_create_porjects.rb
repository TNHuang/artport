class CreatePorjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
    	t.integer :author_id, null: false
    	t.string :project_name
    	t.string :project_type
    	t.text :project_url, null: false

    	t.timestamps
    end

    add_index :projects, :author_id
    add_index :projects, :project_name
    add_index :projects, :project_type
  end
end
