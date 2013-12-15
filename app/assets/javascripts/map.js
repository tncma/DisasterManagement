//var renderMap = function(data) {
//	var map = L.map('map').setView([data.district.lat, data.district.lng], 9);
//	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//	  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//	}).addTo(map);
//	$.each(data.availability, function(index, municipality) {
//		if (municipality.lat && municipality.lng) {
//			var container = $("<div />");
//			$("<div />").html("Municipality: " + municipality.municipality).appendTo(container);
//			$("<div />").html("District: " + municipality.district).appendTo(container);
//			$("<div />").html("Availability: " + municipality.availability).appendTo(container);
//			$("<div />").html("Distance: " + municipality.distance + "kms").appendTo(container);
//			L.marker([municipality.lat, municipality.lng]).addTo(map).bindPopup(container.html()).openPopup();
//		}
//	})
//};
//
//$(function() {
//	$.ajax({
//		url: "/availability/Blankets/Kancheepuram",
//		success: renderMap
//	});
//});