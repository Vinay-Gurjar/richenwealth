class HourlyReport < ApplicationRecord
  belongs_to :call_center
  belongs_to :user
end
