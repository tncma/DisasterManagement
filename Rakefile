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
				lat, lng = Geocoder.coordinates("#{row[0]},#{row[1]}")
				Municipality.create(:name => row[0], :district => District.find_by_name(row[1]), :lat => lat, :lng => lng)
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

	desc "Import Resource Allocation"
	task :allocation => :environment do
		ResourceAllocation.destroy_all
		CSV.open(File.expand_path('../data/resource_allocation.csv', __FILE__), "r", options) do |csv|
			csv.find_all do |row|
				ResourceAllocation.create(:disaster => Disaster.find_by_name(row[0]), :resource => Resource.find_by_name(row[1]), :district => District.find_by_name(row[2]), :quantity => row[3])
			end
		end
	end

	desc "Import Resource Availability"
	task :availability => :environment do
		ResourceAvailabilty.destroy_all
		CSV.open(File.expand_path('../data/resource_availability.csv', __FILE__), "r", options) do |csv|
			csv.find_all do |row|
				ResourceAvailabilty.create(:municipality => Municipality.find_by_name(row[0]), :resource => Resource.find_by_name(row[1]), :availability => row[2])
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