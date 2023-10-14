module SessionResponce

  def self.success(message='', data)
    { status: true, message: message, data: data, code: :ok }
  end

  def self.error(message, error_code = 400, status_code = 400)
    { status: false, message: message, error_code: error_code, code: status_code }
  end
end