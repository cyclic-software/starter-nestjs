$(document).ready(function () {
    var pending = $("#pending").hasClass('active');
    if (pending) {
        $("#partner-collapse").removeClass('collapsed');
        $("#partner-collapse").attr('true');
        $("#dropdown-lvl2").addClass('show');
        $("#partner-collapse").addClass('inactivebtn');
        $("#partner-collapse").removeClass('active');

        

    }else{
        $("#partner-collapse").addClass('collapsed');
        $("#partner-collapse").attr('false');
        $("#dropdown-lvl2").removeClass('show');
        $("#partner-collapse").removeClass('inactivebtn');
        $("#partner-collapse").addClass('active');


    }
});