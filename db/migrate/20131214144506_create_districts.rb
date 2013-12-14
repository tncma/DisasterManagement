class CreateDistricts < ActiveRecord::Migration
  def change
    create_table :districts do |t|
      t.string :name
      t.decimal :lat, :precision => 10, :scale => 6, :default => 0
      t.decimal :lng, :precision => 10, :scale => 6, :default => 0
      
      t.timestamps
    end
  end
end
