class HomeController < ApplicationController

  get '/api' do
    @legislators = Legislator.all
    @legislators.to_json
  end

  get '/vote-api' do
    @votes = Vote.all 
    @votes.to_json
  end


  get '/:govtrack_id' do |govtrack_id|
   #  returns individual legislator
   @leg = Legislator.find params['govtrack_id']
   if @leg
    # @leg.to_json
    puts @leg

    erb :results
    else
    {status: 'error no such legislator', message: 'no legislator found by id'}.to_json 
   end
  end 


  get '/?' do
    erb :home
  end



  post '/?' do 
    @leg_list = []
    Legislator.all.each do |leg|
      #puts leg['last_name']  <-- gives all last note. note to self -BA
      if leg['state'] === params['state']
         @leg_list.push(["#{leg['first_name']} #{leg['last_name']}", leg['state'], leg['govtrack_id']])
      end
    end
    puts @leg_list
    content_type :json 
    @leg_list.to_json
  end

end
