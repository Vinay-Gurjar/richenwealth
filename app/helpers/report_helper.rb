
module ReportHelper
  include ApplicationHelper


  def hour_report(time_id, date, agents_id)
    HourlyReport.joins(:user).where(date: date, user_id: agents_id, report_time_id: time_id)
  end


  def make_hourly_report(first_report, second_report)
    differences = [] # Store the calculated differences
    agents_on_de = 0 # Counter for agents on de
    agents_on_call = 0 # Counter for agents on call

    if second_report.nil?
      # Calculate the report if second_report is not available
      differences, agents_on_call, agents_on_de = center_first_hour_report(first_report)
    end

    unless second_report.nil?
      first_report_hash = first_report.index_by(&:user_id)

      second_report.each do |record|
        user_id = record.user_id
        first_record = first_report_hash[user_id]

        if first_record
          difference = build_difference_hourly_report(record, first_record)

          if difference[7] > 0
            agents_on_call += 1 # Increment the agents on call counter if calls_attempted > 0
          end

          if difference[5] > 0
            agents_on_de += 1 # Increment the agents on de counter if data_processed > 0
          end

          differences << difference # Add the calculated difference to the differences array
        end
      end
    end

    [differences, agents_on_call, agents_on_de] # Return the results
  end

  # Helper method to calculate the difference between two records
  def build_difference_hourly_report(record, first_record)
    [
      first_record.name,
      first_record.email,
      record.calls_attempted,
      record.calls_connected,
      record.calls_completed,
      record.data_processed - first_record.data_processed,
      get_percent(record.calls_attempted || 0, first_record.calls_connected || 0),
      (record.calls_attempted || 0) - (first_record.calls_attempted || 0),
      (record.total_talktime.to_i || 0) - (first_record.total_talktime.to_i || 0),
      (record.calls_completed || 0) - (first_record.calls_completed || 0),
      (record.calls_connected || 0) - (first_record.calls_connected || 0),
      get_percent((record.calls_attempted - first_record.calls_attempted || 0), (record.calls_connected - first_record.calls_connected || 0)),
    ]
  end


  def get_percent(attempt, connect)
    if attempt > 0 && connect > 0
      # Calculate the decimal percentage value
      decimal_number = (connect.to_f / attempt) * 100

      # Format the decimal percentage to two decimal places with a percentage sign
      formatted_percentage = sprintf("%.2f%%", decimal_number)

       formatted_percentage
    else
       "-" # Return "-" if either attempts or connections are not greater than 0
    end
  end

  def center_first_hour_report(first_report)
    differences = [] # Store the calculated differences
    agents_on_de = 0 # Counter for agents on de
    agents_on_call = 0 # Counter for agents on call

    first_report_hash = first_report.index_by(&:user_id) # Create a hash for quick user record lookup

    first_report.each do |record|
      user_id = record.user_id
      first_record = first_report_hash[user_id] # Look up the first record for the same user

      next unless first_record # Skip if there's no matching first record

      difference = build_difference_first_hour(record, first_record) # Calculate the difference

      if difference[7] > 0
        agents_on_call += 1 # Increment the agents on call counter if calls_attempted > 0
      end
      if difference[5] > 0
        agents_on_de += 1 # Increment the agents on de counter if data_processed > 0
      end

      differences << difference # Add the calculated difference to the differences array
    end

    [differences, agents_on_call, agents_on_de] # Return the results
  end

  # Helper method to calculate the difference between two records
  def build_difference_first_hour(record, first_record)
    [
      first_record.name,
      first_record.email,
      record.calls_attempted,
      record.calls_connected,
      record.calls_completed,
      record.data_processed,
      get_percent(record.calls_attempted || 0, first_record.calls_connected || 0),
      record.calls_attempted || 0,
      record.total_talktime.to_i || 0,
      record.calls_completed || 0,
      record.calls_connected || 0,
      get_percent(record.calls_attempted || 0, record.calls_connected || 0),
    ]
  end

  def make_connected_report(hour_report)
    report_data = []

    hour_report.each do |hr|
      next unless hr.calls_attempted > 0

      data = [
        hr.name,
        hr.email,
        get_team_lead(hr.user_id)&.name,
        hr.calls_attempted,
        hr.calls_connected,
        get_percent(hr.calls_attempted, hr.calls_connected || 0),
      ]

      report_data << data
    end

    report_data
  end

  def get_team_lead(user_id)
    user = User.find_by(id: user_id)

    if user
      user.team_leader
    else
      nil
    end
  end

  def make_agent_left_header(shift_id)
    initial_header = ['Team Leader','Present','Absent','Half Day','OGT']
    shift_times = ShiftTime.find_by(id: shift_id).shift_wise_times
    shift_times.each do |st|
      initial_header << st.time
    end
    initial_header
  end

  def make_report_format(all_day_reports)
    formatted_data = []
    report_header = ['Agent Name', 'Hourly attempted calls', 'Talk Time', 'Hourly completed calls', 'Hourly connected calls', 'Connectivity']

    # Check if the 'all_day_reports' array is not empty or nil
    if all_day_reports.present?
      all_day_reports.each do |day_report|
        # Create a hash for each daily report with desired attributes
        formatted_data << {
          report_time: day_report&.report_time&.display_name, # Format date as 'DD Mon YYYY'
          report_header: report_header,
          report_value: build_hourly_report_for_agent(day_report)
        }
      end
    end

    formatted_data
  end

  def build_hourly_report_for_agent(day_report)
    [
      day_report.user.name,
      day_report.calls_attempted || 0,
      day_report.total_talktime.to_i || 0,
      day_report.calls_completed || 0,
      day_report.calls_completed || 0,
      get_percent(day_report.calls_attempted || 0 || 0, day_report.calls_completed || 0),
    ]
  end


  def generate_tl_specific_attendance_report(cc_team_leaders, date)
    formatted_data = []
    unless cc_team_leaders.blank?
      cc_team_leaders.each_with_index do |tl|
        data  = [
          tl.name,
          generate_tl_attendance_report(tl.agents, date),
          generate_hourly_working_agents(tl, date)
        ]
        formatted_data <<  data.flatten(3)
      end
    end
    formatted_data
  end

  def generate_tl_attendance_report(agents,date)
    p = 0
    a = 0
    hd = 0
    ogt = 0
    if agents.present?
      agents.each do |agent|
        att = Attendance.where(users: agent.id, day: date).first
        p += 1 if att&.attendance_type === 'P'
        a += 1 if att&.attendance_type === 'A'
        hd += 1 if att&.attendance_type === '1/2P'
        ogt += 1 if att&.attendance_type === 'OGT'
      end
    end
      [p, a, hd, ogt]
  end

  def generate_hourly_working_agents(tl,date)
    sw_time =  tl.shift_time.shift_wise_times
    s_w_data = []
    pre_hr_ids = []
    sw_time.each do |st|
      present_report = HourlyReport.where(report_time_id: st,date: date).where.not(calls_attempted:0).where.not(user_id: pre_hr_ids)
      absent_report = HourlyReport.where(report_time_id: st,date: date).where(calls_attempted:0).where(user_id: pre_hr_ids)
      pre_hr_ids = present_report.pluck(:user_id)
      s_w_data << format_left_join_details(present_report.count, absent_report.count)
    end
    s_w_data
  end

  def format_left_join_details(present, absent)
    format = '0'
    if present > 0 && absent > 0
      if absent > present
        format = "-#{absent}/#{present}"
      else
        format = "#{present}/-#{absent}"
      end
    elsif present > 0 && absent == 0
      format = "#{present}"
    elsif absent > 0 && present == 0
      format = "-#{absent}"
    end
    format
  end

end
