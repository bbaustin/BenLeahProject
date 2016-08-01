class HomeController < ApplicationController

  get '/api' do
    @legislators = Legislator.all
    @legislators.to_json
  end

  get '/?' do
    erb :home
  end

  post '/?' do 

  end

end
