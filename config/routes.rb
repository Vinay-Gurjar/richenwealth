require 'sidekiq/web'
require 'sidekiq/cron/web'
Rails.application.routes.draw do
  root "home#index"
  # Define your application modules per the DSL in https://guides.rubyonrails.org/routing.html

  mount Sidekiq::Web => "/sidekiq"

  namespace :api do
    post 'users/import_users' => 'file_import#import_file'
    get '/call_center/employees' => 'users#call_center_users'
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
