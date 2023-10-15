class AgentTeamLeadMapping < ApplicationRecord
  belongs_to :team_leader, class_name: 'User'
  belongs_to :team_member, class_name: 'User'
end
