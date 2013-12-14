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
var resourcesNeeded ;

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
            var row = '<tr><td>' + district + '</td><td>' + municipality + '</td><td>' + available + '</td><td>' + distance + '</td><td>' + '<input type="text"/>' + '</td></tr>'
            rows.push(row);
        }
        $('#distance_id').empty();
        $('#distance_id').append('Distance From ' + districtChosen);
        $('#item_details_id').empty();
        $('#item_details_id').append(rows.join(' '));
        $('#item_needed_table').css('visibility', 'visible');
    });

    $('#item_row_id').css('visibility', 'visible');
}

var District = function(data) {
    console.log(data);
    var self = this;
    self.name = data.name;
    self.quantity = data.quantity;
    self.availability = data.availability;
    self.borrow = parseInt(data.quantity) - parseInt(data.availability);
}

var DistrictDetails = function(data) {
    var self = this;
    self.districts = ko.observableArray([]);
    for(var i=0; i<data.length; i++){
        self.districts.push(new District(data[i]));
    }

}



