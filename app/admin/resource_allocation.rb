ActiveAdmin.register ResourceAllocation do
  permit_params :quantity, :disaster_id, :resource_id, :district_id
end