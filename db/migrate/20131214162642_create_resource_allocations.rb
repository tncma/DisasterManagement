class CreateResourceAllocations < ActiveRecord::Migration
  def change
    create_table :resource_allocations do |t|
      t.integer :disaster_id
      t.integer :resource_id
      t.integer :district_id
      t.integer :quantity

      t.timestamps
    end
  end
end
