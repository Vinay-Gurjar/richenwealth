class RemoveReportTimeFromHourlyReport < ActiveRecord::Migration[7.0]
  def change
    remove_column :hourly_reports, :report_time, :string
  end
end
