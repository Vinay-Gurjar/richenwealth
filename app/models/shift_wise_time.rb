class ShiftWiseTime < ApplicationRecord
  belongs_to :shift_time
  has_many :hourly_reports
end
