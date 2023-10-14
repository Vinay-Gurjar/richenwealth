module ApplicationHelper
  def current_user
    User.find_by_id(1)
  end

  def send_sms(message, phone_number, ct_id = '1007440753033109730')
    # Send OTP via SMS
    message = CGI.escape(message)

    sender = ENV['SMS_SENDER'] || 'BJPSRL'

    response = HTTParty.get("http://halfcircles.org/api/pushsms?user=bjptrans&authkey=92Ag0psKSz86&sender=#{sender}&mobile=#{phone_number}&text=#{message}&entityid=1001597039713555006&templateid=#{ct_id}&rpt=1&type=1")
    print "\n-------\nSent Message: #{message}\nResponse code is #{response&.code&.to_s}\n"
  end
end
