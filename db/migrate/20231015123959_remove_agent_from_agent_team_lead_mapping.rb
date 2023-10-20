class RemoveAgentFromAgentTeamLeadMapping < ActiveRecord::Migration[7.0]
  def change
    remove_column :agent_team_lead_mappings, :agent_id, :string
  end
end
