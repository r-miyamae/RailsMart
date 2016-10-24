class AddInumToItems < ActiveRecord::Migration
  def change
    add_column :items, :inum, :integer
  end
end
