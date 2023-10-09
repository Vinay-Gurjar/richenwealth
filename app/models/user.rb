class User < ApplicationRecord
  rolify
  has_many :call_centers
  



end