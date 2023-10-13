class User < ApplicationRecord
  rolify
  belongs_to :shift_time
  belongs_to :call_center
  enum gender: { male: 'Male', female: 'Female', other: 'Other' }
  enum status: { active: 'Active', inactive: 'Inactive' }

end
