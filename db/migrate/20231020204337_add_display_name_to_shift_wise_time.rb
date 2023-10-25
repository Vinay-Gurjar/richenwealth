class AddDisplayNameToShiftWiseTime < ActiveRecord::Migration[7.0]
  def change
    add_column :shift_wise_times, :display_name, :string
  end
end
