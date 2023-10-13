class CreateAttendances < ActiveRecord::Migration[7.0]
  def change
    create_table :attendances do |t|
      t.references :user, null: false, foreign_key: true
      t.string :attendance_type
      t.string :day

      t.timestamps
    end
  end
end
