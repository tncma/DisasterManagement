class ResourcesController < ApplicationController
	def for_disaster_and_district
		resource_allocations = ResourceAllocation.includes(:resource).joins(:disaster, :district, :resource).where("disasters.name" => params[:disaster], "districts.name" => params[:district])
		resource_availablity = ResourceAvailabilty.includes(:resource).joins(municipality: [:district], resource: []).where("districts.name" => params[:district]).group_by { |x| x.resource.name }

		result = resource_allocations.map do |allocation|
			resource_name = allocation.resource.name
			availability = resource_availablity[resource_name].inject(0) {|sum, availability| sum + availability.availability }
			{name: resource_name, availability: availability, quantity: allocation.quantity }
		end

		render :json => result
	end

	def availability
		district = District.find_by_name(params[:district])
		resource_availablity = ResourceAvailabilty.includes(municipality: [:district]).joins(municipality: [:district], resource: []).where("resources.name" => params[:resource]).where.not("districts.name" => district.name)

		result = resource_availablity.map do |availability|
			municipality = availability.municipality	
			distance = Geocoder::Calculations.distance_between([district.lat, district.lng], [municipality.lat, municipality.lng], :units => :km)
			{ :municipality => municipality.name, :district => municipality.district.name, :availability => availability.availability, :distance => distance }
		end
		
		render :json => result
	end
end