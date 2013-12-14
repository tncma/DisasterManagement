# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)
require 'csv'

DisasterManagement::Application.load_tasks

namespace :bootstrap do
	options = {:headers =>  false,
            :converters =>  [ :numeric ]}

	desc "Import districts"
	task :district => :environment do
		CSV.open(File.expand_path('../data/district.csv', __FILE__), "r", options) do |csv|
			csv.find_all do |row|
				District.create(:name => row[0])
			end
		end
	end

	desc "Import Municipalities"
	task :municipalities => :environment do
		CSV.open(File.expand_path('../data/municipalities.csv', __FILE__), "r", options) do |csv|
			csv.find_all do |row|
				Municipality.create(:name => row[0], :district => District.find_by_name(row[1]))
			end
		end
	end

	desc "Import Disaster"
	task :disaster => :environment do
		CSV.open(File.expand_path('../data/disaster.csv', __FILE__), "r", options) do |csv|
			csv.find_all do |row|
				Disaster.create(:name => row[0])
			end
		end
	end

	desc "Import Resources"
	task :resources => :environment do
		CSV.open(File.expand_path('../data/resources.csv', __FILE__), "r", options) do |csv|
			csv.find_all do |row|
				Resource.create(:name => row[0])
			end
		end
	end

	desc "Import all"
	task :all => :environment do
		Rake::Task['bootstrap:district'].execute
		Rake::Task['bootstrap:municipalities'].execute
		Rake::Task['bootstrap:disaster'].execute
		Rake::Task['bootstrap:resources'].execute
	end
end