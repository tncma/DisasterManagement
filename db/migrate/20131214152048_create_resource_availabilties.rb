class CreateResourceAvailabilties < ActiveRecord::Migration
  def change
    create_table :resource_availabilties do |t|
      t.integer :resource_id
      t.integer :municipality_id
      t.integer :availability

      t.timestamps
    end
  end
end
