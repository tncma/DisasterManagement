class ResourcesController < ApplicationController
	def for_disaster_and_district
		resources = Resource.includes(:resource_allocation, :resource_availabilty)
		.joins(resource_allocation: [:disaster, :district], resource_availabilty: [municipality: [:district]])
		.where("disasters.name" => params[:disaster], "districts.name" => params[:district])
		
		result = resources.map do |resource|
			{ 
				:name => resource.name,
				:quantity => resource.resource_allocation.inject(0){|quantity, resource_allocation| quantity + resource_allocation.quantity },
				:available => resource.resource_availabilty.inject(0) {|available, resource_availabilty| available + resource_availabilty.availability }
			}
		end
		render json: result.uniq
	end
end