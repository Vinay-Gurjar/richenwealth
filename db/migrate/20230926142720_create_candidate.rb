class CreateCandidate < ActiveRecord::Migration[7.0]
  def change
    create_table :candidates do |t|
      t.string :name
      t.string :email
      t.string :phone_number
      t.string :gender
      t.date :doj
      t.string :status
      t.date :is_inactive_date
      t.string :candidate_type
      t.references :call_center, null: false, foreign_key: true

      t.timestamps
    end
  end
end
