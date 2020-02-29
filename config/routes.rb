Rails.application.routes.draw do
  get 'home/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :case_files, only: [:new, :create]
  post '/upload_image' => 'case_files#upload_image'
  root 'case_files#new'
end
