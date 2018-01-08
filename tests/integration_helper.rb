# encoding: utf-8

require_relative "unit_helper.rb"
require_relative "../src/app.rb"
require 'capybara/minitest'


require 'capybara'
require 'capybara/dsl'
require 'capybara/poltergeist'
require 'capybara_minitest_spec'

Capybara.app = VocabWebServiceApp
Capybara.default_driver = :poltergeist

class MiniTest::Spec
  include Capybara::DSL
  include Capybara::Minitest::Assertions

end

class Capybara::Session
  def params
    Hash[*URI.parse(current_url).query.split(/\?|=|&/)]
  end
end

Capybara.threadsafe = true

Capybara.register_driver :poltergeist do |app|
  options = {}
  Capybara::Poltergeist::Driver.new(app, options)
end