class Api::UsersController < ApplicationController
  require 'csv'

  def import_file
    begin
      file = params[:csv_file]
      file_type = [:file_type]
      if file.present? && file.original_filename.ends_with?(".csv")
        # Read the CSV file and process its data
        data = []
        not_created_user = []

        CSV.foreach(file.path, headers: true) do |row|

          if file_type == 'apr'

          else
            not_created_user << create_agents(row, file_type) if not_created_user
          end




        end

        render json: { success: true, data: data, not_created_user: not_created_user }
      else
        render json: { success: false, error: 'Please select a valid CSV file.' }
      end
    rescue StandardError => e
      render json: { success: false, error: "An error occurred: #{e.message}" }
    end
  end



  def create_agents(row, type)
    not_created_user = []
    user_details = {
      doj: row[0],
      designation: row[1],
      name: row[2],
      gender: row[3],
      email: row[4],
      phone_number: row[5],
      status: row[6],
      tl_email: row[7],
      shift_time_id: row[8]
    }

    team_lead = User.find_by(email: user_details.tl_email)
    cc_shift_id = ShiftTime.find_by(name: user_details.call_center_shift_time.humanize)&.id
    is_user_valid = is_invalid_user(user_details.email, team_lead, cc_shift_id, user_details.designation)
    if is_user_valid
      not_created_user << {email: user_details.email, error_msg:is_user_valid}
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

  def create_reports

  end

  def is_invalid_user(email, team_lead, cc_shift_time_id, designation)
    error_msg = ''
    error_msg = 'User Already exist' if User.exists?(email: email)
    error_msg += ' Team Leader not present in our data base' unless team_lead && designation != 'team leader'
    error_msg += ' Call center shift not present' unless cc_shift_time_id

    error_msg
  end
end



