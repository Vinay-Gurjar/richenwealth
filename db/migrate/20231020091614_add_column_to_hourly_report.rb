class AddColumnToHourlyReport < ActiveRecord::Migration[7.0]
  def change
    add_reference :hourly_reports, :report_time, index: true, foreign_key: { to_table: :users }
  end
end
