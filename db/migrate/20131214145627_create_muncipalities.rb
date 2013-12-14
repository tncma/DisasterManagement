class CreateMuncipalities < ActiveRecord::Migration
  def change
    create_table :muncipalities do |t|
      t.string :name
      t.decimal :lat, :precision => 10, :scale => 6, :default => 0
      t.decimal :lng, :precision => 10, :scale => 6, :default => 0
      t.integer :district_id

      t.timestamps
    end
  end
end
