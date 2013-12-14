class Disaster < ActiveRecord::Base
	validates :name, presence: true
end