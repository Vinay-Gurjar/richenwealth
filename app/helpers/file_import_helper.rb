
module FileImportHelper
  include ApplicationHelper
  def create_user(row)
    not_created_user = ''
    user_details = {
      doj: row[0],
      designation: row[1],
      name: row[2],
      gender: row[3],
      email: row[4],
      phone_number: row[5],
      status: row[6],
      tl_email: row[7],
      shift_time: row[8]
    }
    users = user_details[:designation].gsub('_', ' ').downcase == 'team leader' ? User.with_role(:call_center_manager) : User.with_role(:team_lead)
    team_lead =  users.where(email: user_details[:tl_email]).first
    cc_shift_id = ShiftTime.find_by(name: user_details[:shift_time].humanize)&.id
    is_user_invalid = is_invalid_user(user_details[:email], team_lead, cc_shift_id)
    if is_user_invalid.present?
      not_created_user = {email: user_details[:email], reason: is_user_invalid}
    else
      user = User.new
      user.name = user_details[:name]
      user.email = user_details[:email]
      user.phone_number = user_details[:phone_number]
      user.call_center_id = current_user&.call_center_id
      user.gender = user_details[:gender]
      user.doj = user_details[:doj]
      user.status = user_details[:status].humanize
      user.shift_time_id = cc_shift_id
      user.created_by = current_user
      user.save
      user_details[:designation].gsub('_', ' ').downcase == 'team leader' ? user.add_role(:team_lead) : user.add_role(:agent)
      m = AgentTeamLeadMapping.new
      m.team_leader = team_lead
      m.team_member = user
      m.save
    end

    not_created_user
  end


  def create_reports(row)
    not_created_entry = { user_name: row[1], reason: '' }

    user = user_by_email(row[2]) # Find the user by email from the data.

    # Find shift-wise time based on the provided ID.
    shift_wise_time = ShiftWiseTime.find_by(id: params[:rt_id])

    # Check if the user's presnt or not.
    unless user.present?
      not_created_entry[:reason] = 'Invalid User Not Present' # Set the reason if the user is not found.
      return not_created_entry
    end

    # Check if the user's presnt or not.
    unless user&.call_center_id == current_user&.call_center&.id
      not_created_entry[:reason] = 'User Not belongs to your call center' # Set the reason if the user is not found.
      return not_created_entry
    end

    # Check if the user's shift matches the provided shift-wise time.
    unless user&.shift_time&.id == shift_wise_time&.shift_time&.id
      not_created_entry[:reason] = "Agent are not belongs to selected time" # Set the reason if agent ID doesn't match.
      return not_created_entry
    end

      if user.has_role?(:agent) # Check if the user has the 'agent' role.
        hr = HourlyReport.where(report_time: shift_wise_time, date: Date.parse(params[:date])).first
        hr = HourlyReport.new unless hr.present?
        hr.call_center_id = current_user&.call_center&.id
        hr.user_id = user.id
        hr.login_time = row[5].present? ? DateTime.parse(row[5]) : nil # Parse login time if present.
        hr.logout_time = row[6].present? ? DateTime.parse(row[6]) : nil # Parse logout time if present.
        hr.data_processed = row[7].to_i
        hr.calls_attempted = row[8].to_i
        hr.total_talktime = row[9].to_i
        hr.calls_completed = row[10].to_i
        hr.calls_connected = row[11].to_i
        hr.updated_by = current_user
        hr.report_time = shift_wise_time
        hr.date = Date.parse(params[:date])
        hr.save! # Save the hourly report.
      else
        not_created_entry[:reason] = 'This is not a caller in our database' # Set the reason if the user is not an agent.
      end

    not_created_entry[:reason].present? ? not_created_entry : ''
  end


  def is_invalid_user(email, team_lead, cc_shift_time_id)
    error_msg = ''
    error_msg = 'User Already exist' if User.exists?(email: email)
    error_msg += ' Team Leader not present in our data base' unless team_lead.present?  && team_lead.has_role?("team_lead")
    error_msg += ' Call center shift not present' unless cc_shift_time_id
    error_msg
  end

  def user_by_email(email)
    User.find_by_email(email)
  end

end
