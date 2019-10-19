//RequestHeader for get,post,update,delete
var requestHeader = {
  getHeader: {
    'headers': {
      'accept': 'application/json;odata=verbose'
    }
  },
  postHeader: {
    'headers': {
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      'content-type': 'application/json;odata=verbose',
      'accept': 'application/json;odata=verbose'
    }
  },
  deleteHeader: {
    'headers': {
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      'content-type': 'application/json;odata=verbose',
      "IF-MATCH": "*"
    }
  },
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

var data = {
  //To Get __metadata->'type' value for the list, go to
  //https://<site>/_api/web/lists/getbytitle('<List Name>')?$select=ListItemEntityTypeFullName
  //from the xml, get the value inside <d:ListItemEntityTypeFullName> element
  __metadata: {
    'type': 'SP.Data.MonthlyBusinessReviewListItem'
  },
  Title: title,
  CheckinDate: checkinDate
};

createListItem = function (data, listName) {
  var url = _siteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items";
  return _CreateListData(url, data).then(function (d) {
      return d;
  });
}

createListItem(data, title);