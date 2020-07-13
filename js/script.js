$(document).ready(function () {

    const firestickPrice = 170;
    const boxPrice = 120;
    const pricesIntPkg = [0,5,6,7,8]; //none, 1month, 3month, 6month, 1yr
    const pricesLatPkg = [0,1,2,3,4]; //none, 1month, 3month, 6month, 1yr

    let pkg = "pkg1";
    let devPrice = 170;    
    let additionalPrice = 0;
    let additionalIndex = 0;

    $("#firestickPrice").text(`$${firestickPrice}`);
    $("#boxPrice").text(`$${boxPrice}`);

    priceUpdate();

    $("#dev1").on('click', function(){
        $("#radioDev1").prop("checked", true);
    });
    $("#dev2").on('click', function(){
        $("#radioDev2").prop("checked", true);
    });

    $('#renew').on('click', function () {
        $("#renewForm").submit();
    });

    $("#pkgView").on("click", function () {        
        displayPkg(intPackage);
    });

    $("#pkgChoose").on("change", function () {
        const val = $("#pkgChoose option:selected").text();        
        val === 'USA/Latino Package' ? displayPkg(latinoPackage) : displayPkg(intPackage);                
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

    $("#addBtn").on('click', function(){        
        console.log("Buy now");               
    });

    $('input[name="deviceOptions"]').on("change", function () {
        const device = $('input[name="deviceOptions"]:checked').val();
        device === 'device2' ? devPrice = boxPrice : devPrice = firestickPrice;
        priceUpdate();        
    });
    $('input[name="packageOptions"]').on("change", function () {
        pkg = $('input[name="packageOptions"]:checked').val();
        modPricePkg();
    });
    
    $('input[name="extraService"]').on("change", function () {        
        additionalIndex = $('input[name="extraService"]').index($('input[name="extraService"]:checked'));        
        modPricePkg();        
    });

    function modPricePkg(){               
        pkg === 'pkg1' ? additionalPrice = pricesIntPkg[additionalIndex] : additionalPrice = pricesLatPkg[additionalIndex];
        priceUpdate();
    }

    function priceUpdate () {
        $('#dollarVal').text(devPrice+additionalPrice);
    }

});