Rails.application.routes.draw do

root 'mains#top'
get 'add_main' => 'adds#main'
get 'customer_main' => 'customers#main'
post 'customer_main' => 'customers#search', as:"csearch"
get 'journal_main' => 'journals#main'
get 'register_main' => 'registers#main'
resources :registers ,:only => [:main] do
  collection do
    post :ifind
    post :cfind
    post :commit
  end
end
# post 'register_main' => 'registers#ifind' ,as:"ifind"
# post 'register_main' => 'registers#cfind' ,as:"cfind"
get 'main_top' => 'mains#top'
get 'search_main' => 'searchs#main'
post 'search_main' => 'searchs#search' ,as:"search"
post 'add_main' => 'adds#add', as:"add"
get 'cadd_main' => 'c_adds#main'
post 'cadd_main' => 'c_adds#add', as:"cadd"
get 'search_main/:id' => 'searchs#info', as:"info"
end
