class RemoveColumnNameFromHourlyReport < ActiveRecord::Migration[7.0]
  def change
    remove_column :hourly_reports, :candidate_id, :string
  end
end
