class ResourceAvailabilty < ActiveRecord::Base
	belongs_to :municipality
	belongs_to :resource

	validates :availability, :resource_id, :municipality_id, presence: true
end