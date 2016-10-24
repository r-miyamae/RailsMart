class CreateJournals < ActiveRecord::Migration
  def change
    create_table :journals do |t|
      t.integer :item_id
      t.integer :volume
      t.integer :customer_id
      t.integer :generation
      t.integer :used_points
      t.timestamps null: false
    end
  end
end
