require 'rack'
require 'rack/cache'
require "rack/contrib"
require "rack/cors"
require 'logger'

$logger = Logger.new(STDOUT)
$logger.level = Logger::DEBUG

use Rack::Cors do
  allow do
    origins '*'
    resource '*', :headers => :any, :methods => [:get, :options, :head], expose: ['ETag', "Link"]
  end
end

require './src/app'

run ElysaTwo