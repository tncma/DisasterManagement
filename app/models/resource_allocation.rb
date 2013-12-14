class ResourceAllocation < ActiveRecord::Base
	belongs_to :disaster
	belongs_to :resource


	validates :resource, :quantity, :disaster, presence: true
	validates_associated :resource
  validates_associated :disaster
end