class AddColumnToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :gender, :string
    add_column :users, :doj, :date
    add_column :users, :status, :string
    add_column :users, :is_inactive, :date
    add_reference :users, :call_center_shift_time, null: false, foreign_key: true
  end
end
