# encoding: UTF-8
$VERBOSE=nil

require 'bundler'

Bundler.setup
Bundler.require

require 'minitest/pride'
require 'minitest/autorun'
require 'minitest/spec'
require 'rack/test'

Dir.glob('./src/libs/**/*.rb') { |file| require file}

class MiniTest::Spec
  include Rack::Test::Methods
end