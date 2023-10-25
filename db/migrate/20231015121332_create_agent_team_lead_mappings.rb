class CreateAgentTeamLeadMappings < ActiveRecord::Migration[7.0]
  def change
    create_table :agent_team_lead_mappings do |t|

      t.timestamps
    end
  end
end
