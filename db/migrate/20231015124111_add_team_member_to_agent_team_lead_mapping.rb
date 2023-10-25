class AddTeamMemberToAgentTeamLeadMapping < ActiveRecord::Migration[7.0]
  def change
    add_reference :agent_team_lead_mappings, :team_member, index: true, foreign_key: { to_table: :users }
  end
end
