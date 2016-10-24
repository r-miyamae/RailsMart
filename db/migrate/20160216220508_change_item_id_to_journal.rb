class ChangeItemIdToJournal < ActiveRecord::Migration
  def up
  change_column :journals, :item_id, :text
  end

#変更前の型
  def down
    change_column :journals, :item_id, :intger
  end
end
