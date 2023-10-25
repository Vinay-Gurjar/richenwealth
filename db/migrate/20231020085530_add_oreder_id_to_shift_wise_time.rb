class AddOrederIdToShiftWiseTime < ActiveRecord::Migration[7.0]
  def change
    add_column :shift_wise_times, :order_id, :integer
  end
end
