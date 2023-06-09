$(document).ready(function () {
    //click to Approved Tab
    $("#approved-tab").click(function () {
        $(this).addClass('active-tab');
        $("#approved").addClass('active-tab-border');
        $("#approved").removeClass('inactive-tab-border');

        $("#rejected-tab").removeClass('active-tab');
        $("#pending-tab").removeClass('active-tab');

        $("#rejected").removeClass('active-tab-border');
        $("#pending_").removeClass('active-tab-border');
        $("#rejected").addClass('inactive-tab-border');
        $("#pending_").addClass('inactive-tab-border');
    });

    //click to Approved Tab
    $("#rejected-tab").click(function () {
        $(this).addClass('active-tab');
        $("#rejected").addClass('active-tab-border');
        $("#rejected").removeClass('inactive-tab-border');

        $("#approved-tab").removeClass('active-tab');
        $("#pending-tab").removeClass('active-tab');

        $("#approved").removeClass('active-tab-border');
        $("#pending_").removeClass('active-tab-border');

        $("#approved").addClass('inactive-tab-border');
        $("#pending_").addClass('inactive-tab-border');

    });

    //click to Pending Tab
    $("#pending-tab").click(function () {
        $(this).addClass('active-tab');
        $("#pending_").addClass('active-tab-border');
        $("#pending_").removeClass('inactive-tab-border');

        $("#approved-tab").removeClass('active-tab');
        $("#rejected-tab").removeClass('active-tab');

        $("#approved").removeClass('active-tab-border');
        $("#rejected").removeClass('active-tab-border');

        $("#approved").addClass('inactive-tab-border');
        $("#rejected").addClass('inactive-tab-border');

    });

});