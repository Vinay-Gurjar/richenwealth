class Api::UsersController <  Api::ApplicationController
  before_action :authenticate_request!
  include ApplicationHelper
  include UsersHelper


end




