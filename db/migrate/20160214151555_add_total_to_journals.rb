class AddTotalToJournals < ActiveRecord::Migration
  def change
    add_column :journals, :total, :integer
  end
end
