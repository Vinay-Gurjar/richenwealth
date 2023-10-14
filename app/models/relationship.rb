class Relationship < ApplicationRecord
  belongs_to :mapping, polymorphic: true
  belongs_to :with, polymorphic: true
end
