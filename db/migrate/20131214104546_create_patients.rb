class CreatePatients < ActiveRecord::Migration
  def change
    create_table :patients do |t|
      t.string :name
      t.string :gender
      t.string :phone_number
      t.integer :pulse
      t.boolean :conscious

      t.timestamps
    end
  end
end
