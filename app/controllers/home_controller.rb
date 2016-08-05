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
    begin
      @vote = Vote.find params['govtrack_id']
      @missed = @vote['missed']
      @eligible = @vote['eligible']

      if (@leg['position']=='sen')
        pos = 'Senator'
      elsif (@leg['position']=='rep')
        pos = 'Representative'
      else 
        pos = 'Government Official'
      end 

      erb :results, locals: {pos: pos}
    rescue ActiveRecord::RecordNotFound
      {status: 'error no such legislator and or vote', message: 'no legislator found by id'}.to_json 
    end
  end 


  get '/?' do
    erb :home
  end



  post '/?' do 
    @leg_list = []
    Legislator.all.each do |leg|
      if leg['state'] === params['state']
         @leg_list.push(["#{leg['first_name']} #{leg['last_name']}", leg['state'], leg['govtrack_id']])
      elsif leg['first_name'] + leg['last_name'] === params['data']
        @leg_list.push(["#{leg['first_name']} #{leg['last_name']}", leg['state'], leg['govtrack_id']])
      end
    end
    puts @leg_list
    content_type :json 
    @leg_list.to_json
  end

end
