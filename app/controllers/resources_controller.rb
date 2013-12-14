class ResourcesController < ApplicationController
	def for_disaster_and_district
		resource_allocations = ResourceAllocation.includes(:resource).joins(:disaster, :district, :resource).where("disasters.name" => "Cyclone", "districts.name" => "Kancheepuram")
		resource_availablity = ResourceAvailabilty.includes(:resource).joins(municipality: [:district], resource: []).where("districts.name" => "Kancheepuram").group_by { |x| x.resource.name }

		result = resource_allocations.map do |allocation|
			resource_name = allocation.resource.name
			availability = resource_availablity[resource_name].inject(0) {|sum, availability| sum + availability.availability }
			{name: resource_name, availability: availability, quantity: allocation.quantity }
		end

		render :json => result
	end
end