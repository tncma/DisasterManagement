var renderMap = function(data) {
	var map = L.map('map').setView([data.district.lat, data.district.lng], 9);
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
	$.each(data.availability, function(index, municipality) {
		if (municipality.lat && municipality.lng) {
			var message = municipality.municipality + "," + municipality.district + "( " + municipality.availability + " )";
			L.marker([municipality.lat, municipality.lng]).addTo(map).bindPopup(message).openPopup();
		}
	})
};

$(function() {
	$.ajax({
		url: "/availability/Blankets/Kancheepuram",
		success: renderMap
	});
});