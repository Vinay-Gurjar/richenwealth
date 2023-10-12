class CreateCallCenterShiftTime < ActiveRecord::Migration[7.0]
  def change
    create_table :call_center_shift_times do |t|
      t.string :name

      t.timestamps
    end
  end
end
