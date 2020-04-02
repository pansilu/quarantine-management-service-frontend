$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("menuDisplyed");
});

$(".sidebar-nav li").on("click", function () {
    $(".sidebar-nav li").removeClass("active");
    // $(".sidebar-nav li div").removeClass("in").addClass("collapse").attr("aria-expanded","false");

    $(this).addClass("active");
});