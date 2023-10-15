class Api::ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session


  # Authorizing user request
  def authenticate_request!
    if request.headers['Authorization'].present?
      token  = request.headers['Authorization'].split(' ').last
      jwt_payload = JWT.decode(token, Rails.application.credentials.secret_key_base).first
      @current_user = User.find(jwt_payload['user_id'])
      if @current_user
        @current_user
      else
        @current_user = nil
        raise StandardError.new "Invalid user."
      end
    else
      response = SessionResponce.error('Authentication token not available')
      render json: {message: 'Authentication token not available', status: false}, status: :ok

    end
  rescue JWT::VerificationError, JWT::DecodeError => e
    response = SessionResponce.error("Access denied!. Token invalid. #{e.message}")
    render json: {message: "Access denied!. Token invalid. #{e.message}", status: false}, status: :bad_request
  end
end