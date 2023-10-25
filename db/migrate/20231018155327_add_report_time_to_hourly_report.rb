class AddReportTimeToHourlyReport < ActiveRecord::Migration[7.0]
  def change
    add_column :hourly_reports, :report_time, :datetime
  end
end
