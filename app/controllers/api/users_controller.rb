class Api::UsersController <  Api::ApplicationController
  before_action :authenticate_request!
  include ApplicationHelper

  def call_center_users
    if current_user.has_role?(:admin)
    users = User.joins(:roles, :team_leader).where(roles: {name: ['agent', 'team_lead']}).where(call_center_id: params[:cc_id])
    else
      users = User.joins(:roles, :team_leader).where(roles: {name: ['agent', 'team_lead']}).where(call_center_id: current_user&.call_center_id)
    end
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
        attendance: [user.get_user_attendance(params[:start_date])]
      }
      user_data
    end
    render json: {data: users_with_attendance,message: 'Call Center Employee Details'}, status: :ok
  end

  def update_attendance
    user = User.find_by(id: params[:user_id])
    day = params[:day]
    a_type = params[:a_type]
    if user.present?
      a = Attendance.where(user: user,  day: day).first_or_create!
      a.attendance_type = a_type
      a.updated_by_id = current_user&.id
      a.save
      render json: {message: 'Attendance Updated', status: true}, status: :ok
    else
      render json: {message: 'Invalid User', status: true}, status: :ok
    end

  end

end




