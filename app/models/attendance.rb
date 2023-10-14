class Attendance < ApplicationRecord
  belongs_to :user
  enum attendance_type: { present: 'Present', absent: 'Absent', half_day: 'Half Day', on_leave: 'On Leave', late: 'Late' }

end
