module FileImport
  extend ActiveSupport::Concern

  def create_agents(row, type)
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

    team_lead = User.find_by(email: user_details.tl_email)
    cc_shift_id = ShiftTime.find_by(name: user_details.shift_time.humanize)&.id
    is_user_invalid = is_invalid_user(user_details.email, team_lead, cc_shift_id, user_details.designation)
    if is_user_invalid
      not_created_user = {email: user_details.email, reason: is_user_invalid}
    else
      user = User.new
      user.name = user_details.name
      user.email = user_details.email
      user.phone_number = user_details.phone_number
      user.call_center_id = current_user&.call_center_id
      user.gender = user_details.gender
      user.doj = user_details.doj
      user.status = user_details.status
      user.shift_time_id = cc_shift_id
      user.save
      query = user_details == 'agent'  ? {mapping_type: team_lead&.roles&.name, mapping_id: team_lead&.id}
                : {mapping_type: current_user&.roles&.name, mapping_id: current_user.id}
      Relationship.where(with_type: user).where(query).first_or_create!
    end

    not_created_user
  end


  def create_reports(row,time)
    not_create_entry = ''
    user_id = user_find_by_email(row[2])
    if user_id.present?
      hr = HourlyReport.new
      hr.call_center_id = current_user&.call_center&.id
      hr.user_id = user_find_by_email(row[2])
      hr.login_time = Date.strptime(row[5], '%d-%m-%Y')
      hr.logout_time = Date.strptime(row[6], '%d-%m-%Y')
      hr.data_processed = row[7].to_i
      hr.calls_attempted = row[8].to_i
      hr.total_talktime = row[9].to_i
      hr.calls_completed = row[10].to_i
      hr.calls_connected = row[11].to_i
      hr.save!
    else
      not_create_entry =  { user_name: row[1], reason: 'User Not Present' }
    end
    not_create_entry
  end


  def is_invalid_user(email, team_lead, cc_shift_time_id, designation)
    error_msg = ''
    error_msg = 'User Already exist' if User.exists?(email: email)
    error_msg += ' Team Leader not present in our data base' unless team_lead && designation != 'team leader'
    error_msg += ' Call center shift not present' unless cc_shift_time_id
    error_msg
  end




end