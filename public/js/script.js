$(document).ready(function () {

    const firestickPrice = 170;
    const boxPrice = 120;
    const pricesIntPkg = [0, 19.99, 34.99, 64.99, 119.99]; 
    const pricesLatPkg = [0, 19.99, 34.99, 64.99, 119.99]; 

    let pkg = "pkg1";
    let devPrice = 170;
    let additionalPrice = 0;
    let additionalIndex = 0;
    let subtotal = 0;
    let cartPrice = 0;
    let cartData = "";
    device = "device1";

    getPriceFromDB();

    $("#firestickPrice").text(`$${firestickPrice}`);
    $("#boxPrice").text(`$${boxPrice}`);

    priceUpdate();

    $("#dev1").on('click', function () {
        $("#radioDev1").prop("checked", true);
        devRadioChng();
    });
    $("#dev2").on('click', function () {
        $("#radioDev2").prop("checked", true);
        devRadioChng();
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

    $("#addBtn").on('click', async function () {

        orderInfo = {
            device,
            pkg,
            addService: additionalIndex,
            price: subtotal
        }

        const res = await $.post('/addCart', orderInfo);

        if (res.verifiedPrice) {
            cartPrice = 0;
            getPriceFromDB();
        } else {
            $("#cartVal").text("error");
        }
    });

    async function getPriceFromDB() {
        cartData = await $.get('/getCartData');
        cartPrice = 0;
        cartData.forEach(function (val) {
            const parsedVal = JSON.parse(val);
            cartPrice = parseFloat(cartPrice) + parseFloat(parsedVal.price);            
        });
        $("#cartVal").text(cartPrice);
    }

    $('input[name="deviceOptions"]').on("change", function () {
        devRadioChng();
    });

    function devRadioChng() {
        device = $('input[name="deviceOptions"]:checked').val();
        device === 'device2' ? devPrice = boxPrice : devPrice = firestickPrice;
        priceUpdate();
    }

    $('input[name="packageOptions"]').on("change", function () {
        pkg = $('input[name="packageOptions"]:checked').val();
        modPricePkg();
    });

    $('input[name="extraService"]').on("change", function () {
        additionalIndex = $('input[name="extraService"]').index($('input[name="extraService"]:checked'));
        modPricePkg();
    });

    function modPricePkg() {
        pkg === 'pkg1' ? additionalPrice = pricesIntPkg[additionalIndex] : additionalPrice = pricesLatPkg[additionalIndex];
        priceUpdate();
    }

    function priceUpdate() {
        subtotal = devPrice + additionalPrice;
        $('#dollarVal').text(subtotal);
    }

    function clearForm() {
        $("#frmName").val("");
        $("#frmEmail").val("");
        $("#frmPhone").val("");
        $("#frmComment").val("");
        $('#frmErrMsg').text("");
    }

    $('#contactFrm').on('submit', async function (e) {
        e.preventDefault();
        const frmData = {
            name: $("#frmName").val(),
            email: $("#frmEmail").val(),
            phone: $("#frmPhone").val(),
            comment: $("#frmComment").val(),
            date: dateFns.format(new Date(), 'YYYY-MM-DD')
        }
        if (!frmData.email && !frmData.phone) {
            $('#frmErrMsg').text("Please provide atleast one method of contact.");
        } else {
            const res = await $.post('/sendMail', { frmData });
            if (res.msg === "ok") {
                clearForm();
                $("#msgModal").modal("show");
            } else
                $('#frmErrMsg').text("ERROR: Please try again.");
        }
    });

    $('#cartLink').on('click', async function () {
        callCartModal();
    });

    async function callCartModal(){

        const pkgs = ['International', 'USA/Latino'];
        const devs = ['Firestick','Set-Top Box'];
        const servs = ["None", "1m", '3m', '6m', '1yr'];
        cartData = await $.get('/getCartData');
        $("#cartModal").modal("show");
        $("#cartModalBody").empty();
        $("#cartModalBody").append(`
            <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th scope="col"><i class="fas fa-times"></i></th>
                    <th scope="col">product</th>
                    <th scope="col">package</th>
                    <th scope="col">length</th>
                    <th scope="col">price</th>
                </tr>
                </thead>
                <tbody id="tableBody"></tbody>
            </table>
        `);
        cartData.forEach(function (val, i) {            
            cartPrice = 0;
            const parsedVal = JSON.parse(val);
            cartPrice = parseFloat(cartPrice) + parseFloat(parsedVal.price);
            const chosenDevice = parsedVal.device === "device1" ? devs[0] : devs[1]; 
            const chosenPkg = parsedVal.pkg === "pkg1" ? pkgs[0] : pkgs[1];             

            $("#tableBody").append(`
                <tr>
                    <th scope="row"><a href="#" class="linker" id=${i}><i class="far fa-trash-alt text-danger"></i></a></th>
                    <td>${chosenDevice}</td>
                    <td>${chosenPkg}</td>
                    <td>${servs[parsedVal.addService]}</td>
                    <td>${parsedVal.price}</td>
                </tr>
            `);
        });
        $("#totalAtModal").text($("#cartVal").text());
    }

    $("#cartModalBody").on("click","#tableBody .linker", async function(){
        const res = await $.post("deleteFromCart", {id:this.id});
        if(res.stat === "ok"){
            getPriceFromDB();
            callCartModal();
        }
    });

});
