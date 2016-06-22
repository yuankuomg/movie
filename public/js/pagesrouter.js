$(function () {
    var router = new Router({
        container: "#content"
    });

    var home = {
        url: "/index",
        render: function () {
            var def = $.Deferred();

            $._ajax({
                url: "/index",
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            });
            return def.promise();
        },
        bind: function () {
            var btn = $(".btn-watch-trailer");
            $(window).on("resize", function () {
                if ($(this).width() <= 530) {
                    btn.attr({
                        "data-toggle": "",
                        "data-target": ""
                    });
                } else {
                    btn.attr({
                        "data-toggle": "modal",
                        "data-target": "#trailerModal"
                    });
                }
            }).trigger("resize");
            $("#indexSlide").slick({
                swipeToSlide: true,
                pauseOnFocus: true,
                pauseOnHover: true,
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                //		cssEase: 'linear',
                asNavFor: '#indexSubSlide'

            });
            $("#indexSubSlide").slick({
                autoplay: true,
                swipeToSlide: true,
                pauseOnFocus: false,
                pauseOnHover: false,
                arrows: false,
                dots: false,
                centerMode: true,
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: '#indexSlide',
                //		cssEase: 'linear',
                responsive: [{
                    breakpoint: 1081,
                    settings: {
                        slidesToShow: 4
                    }

                },
                    {
                        breakpoint: 906,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 724,
                        settings: {
                            slidesToShow: 2
                        }
                    }]
            });

            $("#indexSubSlide .subslide-thumb").on("click", function () {
                $('#indexSubSlide').slick('slickGoTo', parseInt($(this).attr("data-slick-index")), false);
            });
        }
    }
    var trailer = {
        url: "/trailer",
        render: function () {
            var def = $.Deferred();

            $._ajax({
                url: "/trailer",
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            });
            return def.promise();
        }
    }
    var list = {
        url: "/list",
        render: function () {
            var def = $.Deferred();

            $._ajax({
                url: "/list",
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            });
            return def.promise();
        }
    }
    var news = {
        url: "/news",
        render: function () {
            var def = $.Deferred();

            $._ajax({
                url: "/news",
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            });
            return def.promise();
        }
    }
    var info = {
        url: "/info",
        render: function () {
            var def = $.Deferred();

            $._ajax({
                url: "/info",
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            });
            return def.promise();
        }
    }
    var detail_new = {
        url: "/detail-new",
        render: function () {
            var def = $.Deferred();

            $._ajax({
                url: "/detail-new",
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            });
            return def.promise();
        }
    }
    var logout = {
        url: "/logout",
        render: function () {
            $(".circle").show();
            $._ajax({
                url: "/login/logout"
            }).done(function (resData) {
                if (resData.success) {
                    window.location = "/login.html";
                }
            }).always(function () {
                $(".circle").hide();
            });
        }
    }
    var admin = {
        url: "/admin",
        render: function () {
            $(".circle").show();
            $._ajax({
                url: "/admin/admin",
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function () {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });

            return def.promise();
        }
    }
    var addAdminPage = {
        url: "/addAdminPage",
        render: function () {
            $(".circle").show();
            $._ajax({
                url: "/admin/addadminpage",
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function () {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });
            return def.promise();
        },
        bind: function () {
            $("#addAdminForm").submit(function () {
                var uname = $("#username").val(),
                    pwd = $("#password").val(),
                    repwd = $("#repassword").val();
                if (!$.vaildate.isEmpty(uname)) {
                    $.alt({
                        type: "warning",
                        msg: "邮箱不能为空",
                        el: ".message"
                    });
                    $("#username").focus();
                    return false;
                }
                if (!$.vaildate.isEmpty(pwd)) {
                    $.alt({
                        type: "warning",
                        msg: "密码不能为空",
                        el: ".message"
                    });
                    $("#password").focus();
                    return false;
                }
                if (!$.vaildate.isEmail(uname) || !$.vaildate.isWord(pwd)) {
                    $.alt({
                        type: "warning",
                        msg: "账号或密码格式不正确",
                        el: ".message"
                    });
                    return false;
                }
                if (pwd != repwd) {
                    $.alt({
                        type: "warning",
                        msg: "密码输入不一致",
                        el: ".message"
                    });
                    return false;
                }
                $(".circle").show();
                var data = { username: uname, password: pwd };
                $._ajax({
                    url: "/admin/addadmin",
                    type: "post",
                    data: data
                }).done(function (data) {
                    if (data.success) {
                        router.go("/admin");
                    } else {
                        $.alt({
                            type: "danger",
                            msg: "添加失败",
                            el: ".message"
                        });
                    }
                }).always(function () {
                    $(".circle").hide();
                });
                return false;
            });
        }
    }

    router.push(home).push(trailer).push(list).push(news).push(info).push(detail_new)
        .setDefault("/index").init();
    // .push(logout).push(admin).push(addAdminPage)

});