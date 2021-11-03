$(document).ready(function () {

    $(".magin-conteiner").on("click", "button", function (event) {
        console.log(event.delegateTarget);
        $(event.delegateTarget).fadeIn();
    })
});

