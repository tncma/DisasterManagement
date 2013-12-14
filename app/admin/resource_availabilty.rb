ActiveAdmin.register ResourceAvailabilty do
  permit_params :availability, :resource_id, :municipality_id
end