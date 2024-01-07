module ApplicationHelper

  def current_user
    User.find_by_id(1)
  end

end
