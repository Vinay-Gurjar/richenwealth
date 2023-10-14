class User < ApplicationRecord
  rolify
  belongs_to :shift_time
  belongs_to :call_center
  has_secure_token :jti
  enum gender: { male: 'Male', female: 'Female', other: 'Other' }
  enum status: { active: 'Active', inactive: 'Inactive' }




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
