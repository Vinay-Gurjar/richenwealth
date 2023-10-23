class HourlyReport < ApplicationRecord
  belongs_to :call_center
  belongs_to :user
  belongs_to :updated_by, class_name: 'User', optional: true
  belongs_to :report_time, class_name: 'ShiftWiseTime'
  validates :report_time, presence: true
  validates :call_center_id, uniqueness: { scope: [:user_id, :date, :report_time_id], message: "An hourly report already exists for this combination." }
end
