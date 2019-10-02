//RequestHeader for get,post,update,delete
var requestHeader = {
  updateHeader: {
    'headers': {
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      'content-type': 'application/json;odata=verbose',
      'accept': 'application/json;odata=verbose',
      "IF-MATCH": "*",
      "X-HTTP-Method": "MERGE"
    }
  }
};


function getItems(listName, odata) {
  var endPoint = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/getbytitle('" + listName + "')/items" + odata;
  currentUrl = endPoint;
  return $.ajax({
    url: endPoint,
    type: "GET",
    headers: {
      "accept": "application/json;odata=verbose"
    }
  });
}//End of GetList Items 

function createItem(listName, data) {
  var endPoint = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/getbytitle('" + listName + "')/items";
  currentUrl = endPoint;
  return $.ajax({
    url: endPoint,
    type: "POST",
    headers: {
      "accept": "application/json;odata=verbose",
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      "content-type": "application/json;odata=verbose"
    },
    data: JSON.stringify(data)
  });
}

function submitData() {
  var formData = {};
  formData.FullNameId = _spPageContextInfo.userId;
  formData.Title = 'Sample data';
  formData.StreetAddress = $('#inputAddress').val();
  formData.Address2 = $('#inputAddress2').val();
  formData.StateId = $('#inputState').val();
  formData.City = $('#inputCity').val();
  console.log(JSON.stringify(formData));
  var data = {
    //To Get __metadata->'type' value for the list, go to
    //https://<site>/_api/web/lists/getbytitle('<List Name>')?$select=ListItemEntityTypeFullName
    //from the xml, get the value inside <d:ListItemEntityTypeFullName> element
    __metadata: {
      'type': 'SP.Data.PurchaseDetailListItem'
    },
    ...formData
  };

  createItem('PurchaseDetail',data).then(function(success){
    console.log('Successfully created item', success);
  },function(error){console.log('Oops error',error);})
}



$(document).ready(function () {
  $('#idEmail').val(_spPageContextInfo.userEmail);
  $('#idFullName').val(_spPageContextInfo.userDisplayName);
  $("#inputState").change(function () {
    var state = this.value;
    if (state) {
      getItems('City', '?$filter=StateId eq ' + state).then(function (response) {
        var cities = response.d.results;
        var cityHtml = '<option value="" selected>Choose City...</option>';
        for (var index in cities) {
          cityHtml += '<option value="' + cities[index].Title + '">' + cities[index].Title + '</option>'
        }
        $('#inputCity').html(cityHtml);
      }, function (error) { console.log('Oops error occurred', error) })
      $('#inputCity')[0].disabled = false;

    } else {
      $('#inputCity')[0].disabled = true;
    }
  });
  getItems('State', '?$orderby=Title asc').then(function (response) {
    var states = response.d.results;
    var stateHtml = '<option value="" selected>Choose State...</option>';
    for (var index in states) {
      stateHtml += '<option value="' + states[index].Id + '">' + states[index].Title + '</option>'
    }
    $('#inputState').html(stateHtml);
  }, function (error) { console.log('Oops error occurred', error) });

});