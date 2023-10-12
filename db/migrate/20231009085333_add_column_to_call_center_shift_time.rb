class AddColumnToCallCenterShiftTime < ActiveRecord::Migration[7.0]
  def change
    add_column :call_center_shift_times, :type, :string
  end
end
