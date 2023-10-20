class AddTotalTalktimeToHourlyReport < ActiveRecord::Migration[7.0]
  def change
    add_column :hourly_reports, :total_talktime, :float
  end
end
