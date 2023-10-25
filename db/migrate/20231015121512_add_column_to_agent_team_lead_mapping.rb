class AddColumnToAgentTeamLeadMapping < ActiveRecord::Migration[7.0]
  def change
    add_reference :agent_team_lead_mappings, :team_leader, index: true, foreign_key: { to_table: :users }
    add_reference :agent_team_lead_mappings, :agent, index: true, foreign_key: { to_table: :users }
  end
end
