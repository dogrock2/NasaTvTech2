$(document).ready(function () {

    $('#renew').on('click', function () {        
        $("#renewForm").submit();
    });

    // Displays the information from the international package in the modal.
    $("#intPkgLink").on("click", function () {
        $("#modalTitle").html(`<div class="font-weight-bold">${intPackage.title}</div>`);
        $("#modalTitle").append(`<div class="font-italic">${intPackage.price}</div>`);
        $("#modalBodyScroll").empty();
        intPackage.content.forEach(function (val) {
            $("#modalBodyScroll").append(`${val}<br>`);
        });
        $("#channelsModal").modal("show");
    });

    // Displays the information from the latino package in the modal.
    $("#latinoPkgLink").on("click", function () {
        $("#modalTitle").html(`<div class="font-weight-bold">${latinoPackage.title}</div>`);
        $("#modalTitle").append(`<div class="font-italic">${latinoPackage.price}</div>`);
        $("#modalBodyScroll").empty();
        latinoPackage.content.forEach(function (val) {
            $("#modalBodyScroll").append(`${val}<br>`);
        });
        $("#channelsModal").modal("show");
    });

});