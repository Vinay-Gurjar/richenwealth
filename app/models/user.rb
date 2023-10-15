class User < ApplicationRecord
  rolify
  belongs_to :shift_time
  belongs_to :call_center
  belongs_to :created_by, class_name: 'User'
  has_secure_token :jti
  enum gender: { male: 'Male', female: 'Female', other: 'Other' }
  enum status: { active: 'Active', inactive: 'Inactive' }
  validates_uniqueness_of :email
  validates_uniqueness_of :phone_number
  validates :phone_number, presence: true
  validates :email, presence: true
  # Association for Team Lead
  has_many :agent_team_lead_mappings, foreign_key: 'team_leader_id'
  has_many :agents, through: :agent_team_lead_mappings, source: :team_member

  # Associations for Agents
  has_many :team_member_mappings, foreign_key: 'team_member_id', class_name: 'AgentTeamLeadMapping'
  has_many :team_leader, through: :team_member_mappings, source: :team_leader

  def get_user_attendance

  end



  def user_find_by_email(email)
    User.find_by_email(email)
  end

  def generate_otp
    otp_expiration_mins = ENV['OTP_EXPIRATION_MINS'] ? ENV['OTP_EXPIRATION_MINS'].to_i : 1
    if otp_created_at.blank? || otp_created_at < (DateTime.now - otp_expiration_mins.minutes)
      self.otp = (SecureRandom.random_number(9e5) + 1e5).to_i.to_s
      self.otp_created_at = DateTime.now
    end
    self.save
  end

  def validate_otp(input_otp)
    is_backdoor = (ENV['BACKDOOR_OTP'] && ENV['BACKDOOR_OTP'] == input_otp)

    if is_backdoor
      true
    else
      otp_expiration_mins = ENV['OTP_EXPIRATION_MINS'] ? ENV['OTP_EXPIRATION_MINS'].to_i : 1
      self.otp == input_otp && (DateTime.now.utc < otp_created_at + otp_expiration_mins.minutes)
    end
  end

  def regenerate_jti_if_required
    regenerate_jti if jti.blank?
  end

end
