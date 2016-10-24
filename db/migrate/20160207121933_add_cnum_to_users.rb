class AddCnumToUsers < ActiveRecord::Migration
  def change
    add_column :users, :cnum, :integer
  end
end
