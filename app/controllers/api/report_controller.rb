class Api::ReportController <  Api::ApplicationController
  include ReportHelper

  def hourly_report
    report_header = ['Name','Email','Total Attempted','Total Connected','Total Completed','Data Process','Connectivity %','hourly attempted calls','Talk Time','hourly completed calls','hourly connected calls', 'Connectivity %']
    date = Date.parse(params[:date])
    rt_id = params[:rt_id]
    team_leader = User.find_by(id: params[:tl_id])
    if rt_id.blank?
      raise StandardError.new "Time is not present"
    end
    if date.blank?
      raise StandardError.new "Date is not present"
    end
    first_report_time = ShiftWiseTime.find_by(id:rt_id)
    report_times = first_report_time.shift_time.shift_wise_times
    generic_select ="users.id as user_id, users.name as name, users.email as email, data_processed, calls_attempted, total_talktime, calls_completed, calls_connected"
    first_report =  hour_report(first_report_time.id, date, team_leader.agents.select(:id)).select(generic_select)
    second_report = nil
    if first_report_time.order_id > 1
      second_report_time = report_times.where(order_id: first_report_time.order_id - 1).first
      second_report = hour_report(second_report_time.id, date, team_leader.agents.select(:id)).select(generic_select)
    end
    report, agents_on_call, agents_on_de, = make_hourly_report(first_report, second_report)
    render json: {report_header: report_header, agents_on_call: agents_on_call, agents_on_de: agents_on_de, data:report,
                  center_details: "Hourly Report #{team_leader.call_center&.name} Date:- #{date.strftime("%d %b")}"}
  end
end