class AddDateToHourlyReport < ActiveRecord::Migration[7.0]
  def change
    add_column :hourly_reports, :date, :date
  end
end
