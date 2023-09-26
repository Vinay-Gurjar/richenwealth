class CreateTeamMapping < ActiveRecord::Migration[7.0]
  def change
    create_table :team_mappings do |t|
      t.references :team_leader, null: false, foreign_key: true
      t.references :user_id, null: false, foreign_key: true

      t.timestamps
    end
  end
end
