class Patient < ActiveRecord::Base
  validates :name, presence: true
  attr_accessible :name, :gender, :phone_number, :pulse, :conscious 
end
