
module ReportHelper
  include ApplicationHelper


  def hour_report(time_id, date, agents_id)
    data = ''
    HourlyReport.joins(:user).where(date: date, user_id: agents_id, report_time_id: time_id)
  end



  def make_hourly_report(first_report, second_report)
    differences = []
    agents_on_de = 0
    agents_on_call = 0

    if second_report.nil?
      differences, agents_on_call, agents_on_de = center_first_hour_report(first_report)
    end

    unless second_report.nil?
    first_report_hash = first_report.group_by(&:user_id).map { |user_id, records| [user_id, records.first] }.to_h
    second_report.each do |record,index|
      user_id = record.user_id
      first_record = first_report_hash[user_id]
      if first_record
        difference = [
          first_report_hash[user_id].name,
          first_report_hash[user_id].email,
          record.calls_attempted,
          record.calls_connected,
          record.calls_completed,
          record.data_processed - first_record.data_processed,
          get_percent((record.calls_attempted || 0), (first_record.calls_connected || 0)),
          (record.calls_attempted || 0) - (first_record.calls_attempted || 0),
          (record.total_talktime.to_i || 0) - (first_record.total_talktime.to_i || 0),
          (record.calls_completed || 0) - (first_record.calls_completed || 0),
          (record.calls_connected || 0) - (first_record.calls_connected || 0),
          get_percent((record.calls_attempted - first_record.calls_attempted || 0), (record.calls_connected - first_record.calls_connected || 0)),
        ]
        if difference[7] > 0
          agents_on_call += 1
        end
        if difference[5] > 0
          agents_on_de += 1
        end
        differences << difference
      end
    end
    end


    [differences, agents_on_call, agents_on_de]
  end

  def get_percent(attempt, connect)
    if  attempt > 0 && connect > 0
      decimal_number = (connect.to_f / attempt) * 100
      sprintf("%.2f%%", decimal_number)
    else
      "-"
    end
  end

  def center_first_hour_report(first_report)
    differences = []
    agents_on_de = 0
    agents_on_call = 0
    first_report_hash = first_report.group_by(&:user_id).map { |user_id, records| [user_id, records.first] }.to_h
    first_report.each do |record|
      user_id = record.user_id
      first_record = first_report_hash[user_id]
      if first_record
        difference = [
          first_report_hash[user_id].name,
          first_report_hash[user_id].email,
          record.calls_attempted,
          record.calls_connected,
          record.calls_completed,
          record.data_processed,
          get_percent((record.calls_attempted || 0), (first_record.calls_connected || 0)),
          (record.calls_attempted || 0),
          (record.total_talktime.to_i || 0),
          (record.calls_completed || 0),
          (record.calls_connected || 0),
          get_percent((record.calls_attempted|| 0), (record.calls_connected || 0)),
        ]
        if difference[7] > 0
          agents_on_call += 1
        end
        if difference[5] > 0
          agents_on_de += 1
        end
        differences << difference
      end
    end

    [differences, agents_on_call, agents_on_de]
  end

end
