class CreateResourceAvailabilties < ActiveRecord::Migration
  def change
    create_table :resource_availabilties do |t|
      t.integer :resource_id
      t.integer :muncipality_id
      t.integer :availability

      t.timestamps
    end
  end
end
