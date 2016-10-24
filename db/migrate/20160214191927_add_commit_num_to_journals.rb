class AddCommitNumToJournals < ActiveRecord::Migration
  def change
    add_column :journals, :commit_num, :integer
  end
end
