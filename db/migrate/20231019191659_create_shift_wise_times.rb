class CreateShiftWiseTimes < ActiveRecord::Migration[7.0]
  def change
    create_table :shift_wise_times do |t|
      t.string :time
      t.references :shift_time, null: false, foreign_key: true

      t.timestamps
    end
  end
end
