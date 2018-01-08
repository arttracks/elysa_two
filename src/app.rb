# Ruby Standard Library
require "json"

# Sinatra & Extensions
require 'sinatra/base'
require "sinatra/reloader" 
require "sinatra/json"
require "sinatra/content_for"
require "sinatra/namespace"

require "cultural_dates"

# Application Libraries and Helpers
Dir.glob('./src/ruby/**/*.rb') { |file| require file}


#-------------------------------------------------------------------------------
class ElysaTwo < Sinatra::Base
  
  # Register extensions
  #------------------------------------
  register Sinatra::Namespace

  # Load helpers
  #------------------------------------
  helpers Sinatra::ContentFor
  helpers HeaderHelper

  # Configuration 
  #------------------------------------
  configure do 

    # Server configuration
    set :erb, layout: 'layouts/layout'.to_sym
    set :bind, '0.0.0.0'
    enable :logging

  end

  # Development environment configuration
  #------------------------------------
  configure :development do
    register Sinatra::Reloader
    Dir.glob('./ruby/**/*.rb') { |file| also_reload file}
  end


  #----------------------------------------------------------------------------#
  #   ROUTES BELOW                                                             #
  #----------------------------------------------------------------------------#

  
  #------------------------------------
  get "/" do
    erb :index
  end

  get "/parse_interval" do
    return 500 unless interval_string = params["date"]
    interval = CulturalDates::CulturalInterval.new(interval_string)
    return interval.to_json
  end
end























