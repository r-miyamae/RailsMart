class ChangeItemIdToJournals < ActiveRecord::Migration
  def change
    def up
    change_column :journals, :item_id, :text
    end

  end
end
