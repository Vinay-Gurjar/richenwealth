class Api::UsersController <  Api::ApplicationController
  before_action :authenticate_request!
  include ApplicationHelper
  include UsersHelper

  def call_center_users
    begin
      if current_user.has_role?(:admin) || current_user.has_role?(:super_admin)
        users = User.joins(:roles, :team_leader).where(roles: { name: ['agent', 'team_lead'] }).where(call_center_id: params[:cc_id])
      else
        users = User.joins(:roles, :team_leader).where(roles: { name: ['agent', 'team_lead'] }).where(call_center_id: current_user&.call_center_id)
      end

      date = Date.parse(params[:start_date])
      raise StandardError.new("Date is not present") if date.blank?
      headers = generate_headers(date)
      users = users.includes(:attendances)
                   .select("users.id, users.doj, roles.name as designation, users.name as user_name, users.gender, users.email, team_leaders_users.name as team_leader_name, users.status, users.is_inactive_date")
      users_with_attendance = users.map do |user|
        user_data = {
          id: user.id,
          doj: user.doj,
          designation: user.designation,
          user_name: user.user_name,
          gender: user.gender,
          email: user.email,
          team_leader_name: user.team_leader_name,
          status: user.status,
          is_inactive_date: user.is_inactive_date,
          attendance: [user.get_user_attendance(params[:start_date], user.id)]
        }
        user_data
      end
      render json: { data: users_with_attendance, message: 'Call Center Employee Details',headers:headers }, status: :ok
    rescue StandardError => e
      render json: { success: false, error: "An error occurred: #{e.message}" }
    end
  end

  def update_attendance
    begin
      user = User.find_by(id: params[:user_id])
      day = params[:day]
      a_type = params[:a_type]
      if user.present?
        a = Attendance.where(user: user, day: day).first_or_create!
        a.attendance_type = a_type
        a.updated_by_id = current_user&.id
        a.save
        render json: { message: 'Attendance Updated', status: true }, status: :ok
      else
        render json: { message: 'Invalid User', status: true }, status: :ok
      end
    rescue StandardError => e
      render json: { success: false, error: "An error occurred: #{e.message}" }
    end
  end

  def call_center_shifts
    begin
      cc_id  = params[:cc_id]
      query = cc_id.present? ? cc_id: current_user&.call_center&.id
      shifts = ShiftTime.joins(:call_center_shift_mappings).where(call_center_shift_mappings: { call_center_id: query })
      shifts = shifts.sort()
      render json: { data: shifts }, status: :ok
    rescue StandardError => e
      render json: { success: false, error: "An error occurred: #{e.message}" }
    end
  end

  def shift_wise_timing
    begin
      timing = ShiftWiseTime.where(shift_time_id: params[:shift_id]).select(:id, :time)
      timing = timing.sort()
      render json: { data: timing }, status: :ok
    rescue StandardError => e
      render json: { success: false, error: "An error occurred: #{e.message}" }
    end
  end

  def team_leaders_list
    begin
      date = params[:date] ? params[:date] : Date.today
      team_leaders = User.with_role(:team_lead).where(call_center: current_user.call_center).select(:id, :name)
      render json: { data: team_leaders, center_details: "Hourly Report #{current_user.call_center&.name} Date:- #{date.strftime("%d %b")}" }, status: :ok
    rescue StandardError => e
      render json: { success: false, error: "An error occurred: #{e.message}" }
    end
  end

  def team_leader_agents
    begin
      tl_id = params[:tl_id]

      # Check if the 'tl_id' parameter is provided and not blank
      if tl_id.blank?
        raise StandardError.new("Invalid Team Leader ID")
      end

      # Find the agents under the specified team leader
      agents = User.find_by(id: tl_id).agents
      agents = format_agents(agents)
      # Render the list of agents and a message in JSON format
      render json: { data: agents, message: "Team Leader Agents" }, status: :ok
    rescue StandardError => e
      render json: { success: false, error: "An error occurred: #{e.message}" }
    end
  end

  def get_states
    begin
      states = State.order(:name).select(:id, :name)
      render json: { data: states, message: "State List" }, status: :ok
    rescue StandardError => e
      render json: { success: false, error: "An error occurred: #{e.message}" }
    end
  end

  def get_call_centers
    begin
      state_id = params[:state_id].present? ? params[:state_id] : current_user.call_center.state_id
      cc = CallCenter.where(state_id: state_id).select(:id, :name)
      render json: { data: cc, message: "Call Center's List" }, status: :ok
    rescue StandardError => e
      render json: { success: false, error: "An error occurred: #{e.message}" }
    end
  end

  def get_shifts
    begin
      shifts = ShiftTime.select(:id, :name, :time)
      render json: { data: shifts, message: "Shifts List" }, status: :ok
    rescue StandardError => e
      render json: { success: false, error: "An error occurred: #{e.message}" }
    end
  end

  def create_user
    begin
      is_new_cc = params[:is_new_cc]
      state_id = params[:state_id].present? ? params[:state_id] : current_user.call_center&.state_id
      user = User.new
      user.name = params[:name]
      user.phone_number = params[:phone_number]
      user.email = params[:email]
      user.gender = params[:gender]
      user.doj = params[:doj]
      user.shift_time_id = params[:shift_time_id]
      user.call_center_id = params[:cc_id]
      if is_new_cc == 'true'
        cc = CallCenter.where(name: params[:cc_name], state_id: state_id).first_or_create!
        CallCenterShiftMapping.where(call_center: cc, shift_time_id: params[:shift_time_id])
        user.call_center = cc
      end
      user.add_role(params[:role].to_sym)
      user.save
      render json: { data: user, message: "User successfully created" }, status: :ok
    rescue StandardError => e
      render json: { success: false, error: "An error occurred: #{e.message}" }
    end
  end
end




