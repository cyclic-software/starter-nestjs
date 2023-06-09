$(document).ready(function () {
    //click to all Tab
    $("#all-tab").click(function () {
        $(this).addClass('active-tab');
        $("#all").addClass('all-active-tab');
        $("#all").removeClass('all-inactive-tab');

        $("#paid-tab").removeClass('active-tab');
        $("#pending-tab").removeClass('active-tab');

        $("#paid").removeClass('paid-active-tab');
        $("#pending_").removeClass('active-tab-border');
        $("#paid").addClass('paid-inactive-tab');
        $("#pending_").addClass('inactive-tab-border');
    });

    //click to Paid Tab
    $("#paid-tab").click(function () {
        $(this).addClass('active-tab');
        $("#paid").addClass('paid-active-tab');
        $("#paid").removeClass('paid-inactive-tab');

        $("#all-tab").removeClass('active-tab');
        $("#pending-tab").removeClass('active-tab');

        $("#all").removeClass('all-active-tab');
        $("#pending_").removeClass('active-tab-border');

        $("#all").addClass('all-inactive-tab');
        $("#pending_").addClass('inactive-tab-border');

    });

    //click to Pending Tab
    $("#pending-tab").click(function () {
        $(this).addClass('active-tab');
        $("#pending_").addClass('active-tab-border');
        $("#pending_").removeClass('inactive-tab-border');

        $("#all-tab").removeClass('active-tab');
        $("#paid-tab").removeClass('active-tab');

        $("#all").removeClass('all-active-tab');
        $("#paid").removeClass('paid-active-tab');

        $("#all").addClass('all-inactive-tab');
        $("#paid").addClass('paid-inactive-tab');

    });

});