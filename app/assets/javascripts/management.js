$(function() {
    var district, disaster;
    getDistrict();
    getDisasters();

    $("#district_id").change( function(){
        var option = this.options[this.selectedIndex];
        district = option.text;
    });

    $("#disaster_id").change( function(){
        var option = this.options[this.selectedIndex];
        disaster = option.text;
        getAvailabilityFor(district, disaster);
    });
});

var getDistrict = function() {
    $.get('/admin/districts.json', function(data) {
        var districts = [];
        $.each(data, function(i, district) {

            districts.push('<option>'+ district.name + '</option>');

        });
        $("#district_id").append( districts.join('') );
    });
}

var getDisasters = function() {
    $.get('/admin/disasters.json', function(data) {
        var disasters = [];
        $.each(data, function(i, district) {

            disasters.push('<option>'+ district.name + '</option>');

        });
        $("#disaster_id").append( disasters.join('') );
    });
}

var getAvailabilityFor = function(district, disaster) {
    $.get('/resources/' + disaster +'/' + district, function(data) {
        var rows = [];
        for(var i=0; i<data.length; i++){
            rows.push('<tr><td>' + i + '</td><td>' + data[i].name + '</td><td>' + data[i].quantity + '</td><td>' + data[i].available + '</td></tr>');
        }
        $('#availabilit_table_id').append(rows.join(' '));
        $('#resource_id').css('visibility','visible');
    });
}
