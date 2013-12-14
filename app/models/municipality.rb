class Municipality < ActiveRecord::Base
	belongs_to :district

	validates :name, :district_id , presence: true
	validates_associated :district
end