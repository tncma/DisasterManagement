ActiveAdmin.register Municipality do
  permit_params :name, :lat, :lng, :district_id
end