class RemoveColumnFromHourlyReport < ActiveRecord::Migration[7.0]
  def change
    remove_column :hourly_reports, :report_time_id, :integer
  end
end
