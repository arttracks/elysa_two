require 'rake/testtask'
%w{ rubygems bundler find rake/testtask}.each { |lib| require lib }

task :default => :all

Rake::TestTask.new(:all) do |t|
  t.test_files = FileList['tests/*/*_test.rb']
end

Rake::TestTask.new(:unit_test) do |t|
  t.test_files = FileList['tests/unit/*_test.rb']
end

Rake::TestTask.new(:integration_test) do |t|
  t.test_files = FileList['tests/integration/*_test.rb']
end