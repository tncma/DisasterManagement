class ResourceAllocation < ActiveRecord::Base
	belongs_to :disaster
	belongs_to :resource
	belongs_to :district


	validates :resource, :quantity, :disaster, :district, presence: true
	validates_associated :resource, :disaster, :district
end