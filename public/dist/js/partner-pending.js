$(document).ready(function () {
  const dtUrl = $('#dt-table').attr('link');
  console.log('url:', dtUrl);
  $('#dt-table').DataTable({
    serverSide: true,
    stateSave: false,

    ajax: {
      url: dtUrl,
      data: function (d) {},
    },
    columns: [
      {
        name: 'view',
        data: 'view',
        orderable: false,
        searchable: false,
      },

      {
        name: '_id',
        data: '_id',
        orderable: false,
        searchable: false,
      },
      {
        name: 'firstName',
        data: 'firstName',
      },
      {
        name: 'lastName',
        data: 'lastName',
      },
      {
        name: 'phoneNumber',
        data: 'phoneNumber',
        orderable: false,
        searchable: false,
      },

      {
        name: 'email',
        data: 'email',
        orderable: false,
        searchable: false,
      },
      {
        name: 'licenseType',
        data: 'licenseType',
        orderable: false,
        searchable: false,
      },

      {
        name: 'action',
        data: 'action',
        orderable: false,
      },
    ],
    // order: [0, 'desc'],
    // drawCallback: function (settings, json) {
    //     $('[rel="tooltip"]').tooltip();
    // },
  });

  // dbTble();
  // deleteDbTableData("#category-table");
  // changeStatus("#category-table");

  // $("#type").change(function () {
  //     var type = $(this).val();
  //     db_table.destroy();
  //     db_table.ajax.reload();
  //     dbTble(type);
  //     $('[rel="tooltip"]').tooltip('hide');

  // })

  $('.submitbtn').click(function () {
    const status = $(this)
      .parent()
      .find('.reject-approve-status :selected')
      .val();
    var id = $(this).attr('value');
    var uRL = $(this).attr('link');
    $.confirm({
      title: 'Status',
      content: 'Do you want to change status ?',
      buttons: {
        Yes: {
          btnClass: 'btn btn-danger',
          action: function (e) {
            $.ajax({
              url: uRL,
              method: 'post',
              data: { status: status, id: id },
              success: function (res) {
                console.log('Response :', res);
              },
            });
          },
        },
        No: {
          btnClass: 'btn btn-secondary',
          action: function (e) {},
        },
      },
    });
  });
});
