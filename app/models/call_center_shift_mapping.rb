class CallCenterShiftMapping < ApplicationRecord
  belongs_to :call_center
  belongs_to :shift_time
end
