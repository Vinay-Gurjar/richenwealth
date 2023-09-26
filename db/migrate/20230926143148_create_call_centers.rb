class CreateCallCenters < ActiveRecord::Migration[7.0]
  def change
    create_table :call_centers do |t|
      t.string :call_center_name
      t.integer :country_state_id
      t.string :location_type
      t.integer :location_type_id
      t.string :shift_timings

      t.timestamps
    end
  end
end
