class Resource < ActiveRecord::Base
	validates :name, presence: true
	has_many :resource_allocation
	has_many :resource_availabilty
end