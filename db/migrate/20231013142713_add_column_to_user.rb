class AddColumnToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :otp, :string
    add_column :users, :jti, :string
    add_column :users, :otp_created_at, :datetime
  end
end
