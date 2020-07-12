$(document).ready(function () {

    $('#renew').on('click', function () {
        $("#renewForm").submit();
    });

    $("#pkgView").on("click", function () {        
        displayPkg(intPackage);
    });

    $("#pkgChoose").on("change", function () {
        const val = $("#pkgChoose option:selected").text();        
        val === 'USA/Latino Package' ? displayPkg(latinoPackage) : displayPkg(intPackage);;        
    });

    const displayPkg = function (pkg) {
        $("#modalTitle").html(`<div class="font-weight-bold">${pkg.title}</div>`);
        $("#modalTitle").append(`<div class="font-italic">${pkg.price}</div>`);
        $("#modalBodyScroll").empty();
        pkg.content.forEach(function (val) {
            $("#modalBodyScroll").append(`${val}<br>`);
        });
        $("#channelsModal").modal("show");
    }
});