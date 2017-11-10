json.array! @initiatives do |place|
  json.(place,
      :id, :name, :city, :address, :latitude, :longitude,
      :description, :type, :updated_at)
  json.ownerships do |ownerships|
    ownerships.array!(place.ownerships) do |ownership|
      json.(ownership, :user_id, :name, :contact_by_phone, :contact_by_email)
      json.(ownership, :email, :phone) if ownership.place.authorized? current_user
    end
  end
end


