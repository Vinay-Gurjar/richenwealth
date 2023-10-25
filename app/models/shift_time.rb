class ShiftTime < ApplicationRecord
  has_many :shift_wise_times
  has_many :users, dependent: :delete_all
  has_many :call_center_shift_mappings

  time_arr = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM']

end
