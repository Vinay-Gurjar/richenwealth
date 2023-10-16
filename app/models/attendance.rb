class Attendance < ApplicationRecord
  belongs_to :user
  belongs_to :updated_by, class_name: 'User', optional: true
  # enum attendance_type: { present: 'Present', absent: 'Absent', half_day: 'Half Day', on_leave: 'On Leave', late: 'Late' }
end
