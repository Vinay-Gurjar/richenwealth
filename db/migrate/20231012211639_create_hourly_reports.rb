class CreateHourlyReports < ActiveRecord::Migration[7.0]
  def change
    create_table :hourly_reports do |t|
      t.references :call_center, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.datetime :login_time
      t.datetime :logout_time
      t.integer :data_processed
      t.integer :calls_attempted
      t.integer :total_talktime
      t.integer :calls_completed
      t.integer :calls_connected

      t.timestamps
    end
  end
end
