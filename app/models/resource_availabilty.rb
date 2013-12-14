class ResourceAvailabilty < ActiveRecord::Base
	belongs_to :muncipality
	belongs_to :resource
end
