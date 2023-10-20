module UsersHelper
  include ApplicationHelper

  def format_agents(agents)
    data = []

    # Check if the 'agents' array is not empty or nil
    if agents.present?
      agents.each do |agent|
        # Create a hash for each agent with 'id' and 'name' attributes
        data << {
          id: agent.id,
          name: "#{agent.name} - #{agent.email}"
        }
      end
    end

    data
  end
end
