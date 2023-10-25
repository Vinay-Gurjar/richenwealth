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

  def generate_headers(date)
    headers = ["DOJ", "Designation", "Candidate Name", "Gender", "Email", "Team Leader", "Status", "Inactive Date"]

    # Get the first and last day of the month
    first_day = date.beginning_of_month
    last_day = date.end_of_month

    (first_day..last_day).each do |day|
      headers << day.strftime("%b %d")
    end

    headers
  end
end
