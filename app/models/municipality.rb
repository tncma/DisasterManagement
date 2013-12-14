class Municipality < ActiveRecord::Base
	belongs_to :district

	validates :name, :district , presence: true
	validates_associated :district
end