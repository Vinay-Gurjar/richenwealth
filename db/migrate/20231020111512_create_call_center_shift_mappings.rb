class CreateCallCenterShiftMappings < ActiveRecord::Migration[7.0]
  def change
    create_table :call_center_shift_mappings do |t|
      t.references :call_center, null: false, foreign_key: true
      t.references :shift_time, null: false, foreign_key: true

      t.timestamps
    end
  end
end
