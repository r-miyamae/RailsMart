class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.text :cname
      t.integer :points
      t.timestamps null: false
    end
  end
end
