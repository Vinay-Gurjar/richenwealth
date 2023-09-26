class CreateHourlyReports < ActiveRecord::Migration[7.0]
  def change
    create_table :hourly_reports do |t|
      t.references :call_center, null: false, foreign_key: true
      t.references :candidate, null: false, foreign_key: true
      t.string :attendance
      t.datetime :first_login
      t.datetime :last_logout_time
      t.string :data_process
      t.string :calls_attempted
      t.string :total_talktime_minutes
      t.string :calls_completed
      t.string :calls_connected

      t.timestamps
    end
  end
end
