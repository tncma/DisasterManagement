class ResourceAvailabilty < ActiveRecord::Base
	belongs_to :municipality
	belongs_to :resource

	validates :resource, :availability, :resource, :municipality, presence: true
	validates_associated :resource
  validates_associated :municipality
end