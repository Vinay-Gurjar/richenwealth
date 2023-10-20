class Api::ReportController <  Api::ApplicationController
  include ReportHelper

  def hourly_report
    # Define the table header
    report_header = ['Name', 'Email', 'Total Attempted', 'Total Connected', 'Total Completed', 'Data Process', 'Connectivity %',
                     'Hourly Attempted Calls', 'Talk Time', 'Hourly Completed Calls', 'Hourly Connected Calls', 'Connectivity %']

    # Parse parameters
    date = Date.parse(params[:date])
    rt_id = params[:rt_id]
    team_leader = User.find_by(id: params[:tl_id])

    # Check for presence of required parameters
    if rt_id.blank?
      raise StandardError.new("Time is not present")
    end
    if date.blank?
      raise StandardError.new("Date is not present")
    end

    # Retrieve the first report time
    first_report_time = ShiftWiseTime.find_by(id: rt_id)
    report_times = first_report_time.shift_time.shift_wise_times

    # Define the list of fields to select from the database
    generic_select = "users.id as user_id, users.name as name, users.email as email, data_processed, calls_attempted, total_talktime, calls_completed, calls_connected"

    # Retrieve the first report
    first_report = hour_report(first_report_time.id, date, team_leader.agents.select(:id)).select(generic_select)

    # Initialize the second report as nil
    second_report = nil

    # Check if there is a second report available
    if first_report_time.order_id > 1
      second_report_time = report_times.where(order_id: first_report_time.order_id - 1).first
      second_report = hour_report(second_report_time.id, date, team_leader.agents.select(:id)).select(generic_select)
    end

    # Generate the hourly report and agent details
    report, agents_on_call, agents_on_de = make_hourly_report(first_report, second_report)

    # Render the data as JSON
    render json: {
      report_header: report_header,
      agents_on_call: agents_on_call,
      agents_on_de: agents_on_de,
      data: report,
      center_details: "Hourly Report #{team_leader.call_center&.name} Date:- #{date.strftime("%d %b")}"
    }
  end


  def minimum_calls_connected
    # Define the table header
    minimum_connected_calls_header = ['S No', 'Agent Name', 'Agent Email', 'Team Leader', 'Calls Attempted', 'Calls Connected', 'Connectivity']

    # Parse parameters
    date = Date.parse(params[:date])
    rt_id = params[:rt_id]

    # Check for presence of required parameters
    if rt_id.blank?
      raise StandardError.new("Time is not present")
    end
    if date.blank?
      raise StandardError.new("Date is not present")
    end

    # Define the list of fields to select from the database
    generic_select = "users.id as user_id, users.name as name, users.email as email, calls_attempted, calls_connected"

    # Fetch agent users based on roles and call center
    agents = User.with_role(:agent).where(call_center: current_user.call_center)

    # Retrieve hourly report data
    hour_report = hour_report(rt_id, date, agents.select(:id)).select(generic_select)

    # Process the report data to get the connected report
    report_data = make_connected_report(hour_report)

    # Sort the data by the last column (Connectivity)
    report_data = report_data.sort_by { |row| row.last }

    # Select the top 15 rows
    data = report_data[0..14]

    # Add S No into rows
    data.each_with_index do |sub_array, index|
      sub_array.insert(0, index+1)
    end

    # Render the data as JSON
    render json: { data: data, message: "Minimum Calls Connected", headers: minimum_connected_calls_header }, status: :ok
  end

  def get_agent_report
    user_id = params[:agent_id]
    date = Date.parse(params[:date])

    # Check if the 'user_id' parameter is provided and not blank
    if user_id.blank?
      raise StandardError.new("Agent ID is not present")
    end

    # Check if the 'date' parameter is provided and not blank
    if date.blank?
      raise StandardError.new("Date is not present")
    end

    # Retrieve all-day reports for the specified agent and date
    all_day_reports = HourlyReport.where(user_id: user_id, date: date)

    # Format the reports and render them in a JSON response
    reports = make_report_format(all_day_reports)
    render json: { data: reports, message: "Agent All Day Report" }, status: :ok
  end

end