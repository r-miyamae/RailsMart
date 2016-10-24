class ChangePointsToUsers < ActiveRecord::Migration
  def change
    change_column :users, :points, :integer
  end
end
