require 'sidekiq/web'
require 'sidekiq/cron/web'
Rails.application.routes.draw do
  root "home#index"
  # Define your application modules per the DSL in https://guides.rubyonrails.org/routing.html

  mount Sidekiq::Web => "/sidekiq"

  namespace :api do
    get 'user/call_center/shift' => 'users#call_center_shifts'
    get 'user/call_center/all_shifts' => 'users#get_shifts'
    get 'user/call_center/shift/timing' => 'users#shift_wise_timing'
    post 'users/import_file' => 'file_import#import_file'
    get 'call_center/employees' => 'users#call_center_users'
    post 'call_center/employee/update_attendance' => 'users#update_attendance'
    get 'reports/agents/hourly_report' => 'report#hourly_report'
    get 'reports/agent/all_day_report' => 'report#get_agent_report'
    get 'reports/agents/minimum_calls_connected' => 'report#minimum_calls_connected'
    get 'reports/team_leader/agents_attendance_report' => 'report#team_lead_wise_agents_left'
    get 'user/call_center/team_leaders' => 'users#team_leaders_list'
    get 'user/call_center/call_centers_list' => 'users#get_call_centers'
    get 'user/call_center/states_list' => 'users#get_states'
    get 'user/call_center/team_leader/agents' => 'users#team_leader_agents'
    post 'user/call_center/create_user' => 'users#create_user'

    namespace :auth do
      post '/user/login' => 'sessions#send_otp'
      post '/user/submit_otp' =>'sessions#submit_otp'
    end
  end




  #noinspection RailsParamDefResolve
  match '*path', to: 'home#index', via: :all, constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
