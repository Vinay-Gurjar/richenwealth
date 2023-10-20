class HourlyReport < ApplicationRecord
  belongs_to :call_center
  belongs_to :user
  belongs_to :updated_by, class_name: 'User', optional: true
  belongs_to :report_time, class_name: 'ShiftWiseTime'
  validates :report_time, presence: true
end
