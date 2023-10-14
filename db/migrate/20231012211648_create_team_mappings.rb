class CreateTeamMappings < ActiveRecord::Migration[7.0]
  def change
    create_table :team_mappings do |t|
      t.references :mapping_with, polymorphic: true, null: false
      t.references :mapping_type, polymorphic: true, null: false

      t.timestamps
    end
  end
end
