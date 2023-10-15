class Api::UsersController <  Api::ApplicationController
  before_action :authenticate_request!

  def call_center_users
    cc_id = params[:cc_id]
    if current_user.has_role?(:admin)
    users = User.joins(:roles, :team_leader).where(roles: {name: ['agent', 'team_lead']}).where(call_center_id: cc_id)
    else
      users = User.joins(:roles, :team_leader).where(roles: {name: ['agent', 'team_lead']}).where(call_center_id: current_user&.call_center_id)
    end
    users = users.select("users.id, doj, roles.name as designation, users.name, gender, email, users.team_leader.name, status, is_inactive_date").as_json
    render json: {data: users,message: 'Call Center Employee Details'}, status: ok
  end

end




