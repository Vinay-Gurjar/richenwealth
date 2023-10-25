class RemoveTotalTalktimeFromHourlyReport < ActiveRecord::Migration[7.0]
  def change
    remove_column :hourly_reports, :total_talktime, :string
  end
end
