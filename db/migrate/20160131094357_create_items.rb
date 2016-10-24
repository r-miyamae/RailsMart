class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.text :iname
      t.integer :price

      t.timestamps null: false
    end
  end
end
