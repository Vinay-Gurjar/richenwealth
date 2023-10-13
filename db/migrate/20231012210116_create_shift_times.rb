class CreateShiftTimes < ActiveRecord::Migration[7.0]
  def change
    create_table :shift_times do |t|
      t.string :name
      t.string :time

      t.timestamps
    end
  end
end
