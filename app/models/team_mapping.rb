class TeamMapping < ApplicationRecord
  belongs_to :mapping_with, polymorphic: true
  belongs_to :mapping_type, polymorphic: true
end
