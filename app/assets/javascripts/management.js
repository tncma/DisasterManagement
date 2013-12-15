$(function() {
    var district, disaster;
    getDistrict();
    getDisasters();

    $("#district_id").change( function(){
        var option = this.options[this.selectedIndex];
        district = option.text;
        districtChosen = district;
    });

    $("#disaster_id").change( function(){
        var option = this.options[this.selectedIndex];
        disaster = option.text;
        getAvailabilityFor(district, disaster);
    });
});

var districtChosen;
var resourcesNeeded, quantityNeeded, quantityAskedFor = [];

var sortByKey = function (array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];

        if (typeof x == "string")
        {
            x = x.toLowerCase();
            y = y.toLowerCase();
        }

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

var getDistrict = function() {
    $.get('/admin/districts.json', function(data) {
        var districts = [];
        sortByKey(data, 'name');
        $.each(data, function(i, district) {

            districts.push('<option>'+ district.name + '</option>');

        });
        $("#district_id").append( districts.join('') );
    });
}

var getDisasters = function() {
    $.get('/admin/disasters.json', function(data) {
        var disasters = [];
        sortByKey(data, 'name');
        $.each(data, function(i, district) {

            disasters.push('<option>'+ district.name + '</option>');

        });
        $("#disaster_id").append( disasters.join('') );
    });
}

var getAvailabilityFor = function(district, disaster) {
    $.get('/resources/' + disaster +'/' + district, function(data) {
        resourcesNeeded = data;
        var rows = [];
        var needed, available, buttonString, inHouseStyle;
        for(var i=0; i<resourcesNeeded.length; i++){
            needed = parseInt(resourcesNeeded[i].quantity);
            available = parseInt(resourcesNeeded[i].availability);
            resourcesNeeded[i].excessNeeded = (needed - available);
            buttonString = '<button id="res_' + i +'" class="btn btn-primary" onclick="getDetailOfResource(this);">Allocate</button>';
            inHouseStyle = '<td><span class="text-danger" style="font-weight: bold;">' + resourcesNeeded[i].availability + '</span></td>'

            if((needed - available) < 0){
                resourcesNeeded[i].excessNeeded = 'N/A';
                buttonString = 'N/A';
                inHouseStyle = '<td><span class="text-success" style="font-weight: bold;"> ' + resourcesNeeded[i].availability + '</span></td>'
            }

            var row = '<tr><td>' + resourcesNeeded[i].name + '</td><td>' + resourcesNeeded[i].quantity + '</td>'+ inHouseStyle +'<td>'+ resourcesNeeded[i].excessNeeded +'</td><td>' + buttonString + '</td></tr>';
            rows.push(row);
        }
        $('#availabilit_table_id').empty();
        $('#availabilit_table_id').append(rows.join(' '));
        $('#resource_id').css('visibility','visible');
    });
}

var getDetailOfResource = function(e) {
    $('#selected_resource_id').text(resourcesNeeded[parseInt(e.id.substring(4))].name);

    $.get('/availability/' + resourcesNeeded[parseInt(e.id.substring(4))].name + '/' + districtChosen, function(data) {
        var rows = [];
        renderMap(data);
        data = data['availability'];
        for(var i=0; i<data.length; i++) {
            var district = data[i].district;
            var municipality = data[i].municipality;
            var available = data[i].availability;
            var distance;
            if(data[i].distance){
                distance = Math.ceil(parseInt(data[i].distance));
            }else {
                distance = parseInt('0');
            }
            var row = '<tr><td>' + district + '</td><td>' + municipality + '</td><td>' + available + '</td><td>' + distance + '</td><td>' + '<input type="text" id="qty_' + i + '" onchange="addQty(this);"></input>' + '</td></tr>'
            rows.push(row);
        }
        quantityNeeded = resourcesNeeded[parseInt(e.id.substring(4))].excessNeeded;
        $('#total_qty_needed').empty();
        $('#total_qty_needed').text(resourcesNeeded[parseInt(e.id.substring(4))].excessNeeded);
        $('#distance_id').empty();
        $('#distance_id').append('Distance From ' + districtChosen);
        $('#item_details_id').empty();
        $('#item_details_id').append(rows.join(' '));
        $('#item_needed_table').css('visibility', 'visible');
    });

    $('#item_row_id').css('visibility', 'visible');
}

var addQty = function(element) {
    var id = '#' + element.id;
    var qtyAsked = $(id).val();
    quantityAskedFor[parseInt(element.id.substring(4))] = qtyAsked;
    var remainingNeeded = calculateNeededQty();
    if(remainingNeeded <= 0) {
        $('#remaining_needed').removeClass('label-danger');
        $('#remaining_needed').addClass('label-success');
    }else{
        $('#remaining_needed').removeClass('label-success');
        $('#remaining_needed').addClass('label-danger');
    }
    $('#remaining_needed').empty();
    $('#remaining_needed').text(remainingNeeded);
}

var calculateNeededQty = function() {
    var totalQtyAskedSoFar = 0;
    for(var i=0; i<quantityAskedFor.length; i++){
        if(isNaN(parseInt(quantityAskedFor[i]))){
            quantityAskedFor[i] = 0;
        }else{
            totalQtyAskedSoFar += parseInt(quantityAskedFor[i]);
        }
    }
    return parseInt(quantityNeeded) - totalQtyAskedSoFar;
}

var map;

var renderMap = function(data) {
    if (map) {
        map.remove();
    }
    map = L.map('map').setView([data.district.lat, data.district.lng], 8);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    $.each(data.availability, function(index, municipality) {
        if (municipality.lat && municipality.lng) {
            var container = $("<div />");
            $("<div />").html("Municipality: " + municipality.municipality).appendTo(container);
            $("<div />").html("District: " + municipality.district).appendTo(container);
            $("<div />").html("Availability: " + municipality.availability).appendTo(container);
            $("<div />").html("Distance: " + municipality.distance + "kms").appendTo(container);
            L.marker([municipality.lat, municipality.lng]).addTo(map).bindPopup(container.html()).openPopup();
        }
    });

    $('#map_id').css('visibility', 'visible');
};

