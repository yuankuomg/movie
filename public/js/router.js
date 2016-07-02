$(function () {
    var router = new Router({
        container: "#content1",
        enter: "bounceIn",
        enterTimeout: 750
    });

    var home = {
        url: "/",
        className: "animated",
        render: function () {
            return "<h1>欢迎来到后台管理</h1>"
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
                    window.location = "/adminlogin.html";
                }
            }).always(function () {
                $(".circle").hide();
            });
        }
    }
    var admin = {
        url: "/admin",
        className: "animated",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/admin",
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });

            return def.promise();
        },
        bind: function () {
            $("#delSelected").click(function (event) {
                event.preventDefault();
                $(".circle").show();
                var ids = [];
                $("table input[type=checkbox]:checked").each(function (i, v) {
                    ids.push(v.value);
                });
                $._ajax({
                    url: "/admin/delselectedadmin",
                    type: "delete",
                    data: { ids: ids.join(",") }
                }).done(function (data) {
                    if (data.success) {
                        router.go("/admin");
                    } else {
                        $.alt({
                            type: "danger",
                            msg: data.message,
                            el: ".message"
                        });
                    }
                }).fail(function (err) {
                    def.reject(err);
                }).always(function () {
                    $(".circle").hide();
                });

            });
        }

    }
    var addAdminPage = {
        url: "/addadminpage/:id",
        className: "animated",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/addadminpage",
                type: "put",
                data: { id: this.params.id },
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
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
                        msg: "用户名不能为空",
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
                if (!$.vaildate.isWord(uname) || !$.vaildate.isWord(pwd)) {
                    $.alt({
                        type: "warning",
                        msg: "用户名或密码格式不正确",
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
                var data = { id: $("#aid").val(), username: uname, password: pwd };
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
                            msg: data.message,
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
    var delAdmin = {
        url: "/deladmin/:id",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/deladmin",
                type: "delete",
                data: { id: this.params.id }
            }).done(function (data) {
                if (data.success) {
                    router.go("/admin");
                } else {
                    $.alt({
                        type: "danger",
                        msg: data.message,
                        el: ".message"
                    });
                }
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });

            return def.promise();
        }
    }

    var user = {
        url: "/user",
        className: "animated",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/user",
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });

            return def.promise();
        },
        bind: function () {
            $("#delSelected").click(function (event) {
                event.preventDefault();
                $(".circle").show();
                var usernames = [];
                $("table input[type=checkbox]:checked").each(function (i, v) {
                    usernames.push(v.value);
                });
                $._ajax({
                    url: "/admin/delselecteduser",
                    type: "delete",
                    data: { usernames: usernames.join(",") }
                }).done(function (data) {
                    if (data.success) {
                        router.go("/user");
                    } else {
                        $.alt({
                            type: "danger",
                            msg: data.message,
                            el: ".message"
                        });
                    }
                }).fail(function (err) {
                    def.reject(err);
                }).always(function () {
                    $(".circle").hide();
                });

            });
        }
    }
    var addUserPage = {
        url: "/adduserpage/:username",
        className: "animated",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/adduserpage",
                type: "put",
                data: { username: this.params.username },
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });
            return def.promise();
        },
        bind: function () {
            $("#addUserForm").submit(function () {
                var username = $("#username").val(),
                    password = $("#password").val();
                if (!$.vaildate.isEmpty(username)) {
                    $.alt({
                        type: "warning",
                        msg: "用户名不能为空",
                        el: ".usermessage"
                    });
                    $("#username").focus();
                    return false;
                }
                if (!$.vaildate.isEmpty(password)) {
                    $.alt({
                        type: "warning",
                        msg: "密码不能为空",
                        el: ".usermessage"
                    });
                    $("#password").focus();
                    return false;
                }
                if (!$.vaildate.isWord(username) || !$.vaildate.isWord(password)) {
                    $.alt({
                        type: "warning",
                        msg: "用户名或密码格式不正确",
                        el: ".usermessage"
                    });
                    $("#password").focus();
                    return false;
                }
                $(".circle").show();
                var data = {
                    username: username,
                    password: password,
                    sex: $("input[type='radio']:checked").val(),
                    birthdate: $("#birthDate").val(),
                    sign: $("#sign").val(),
                    isadd: $("#isadd").val()
                };
                $._ajax({
                    url: "/admin/adduser",
                    type: "post",
                    data: data
                }).done(function (data) {
                    if (data.success) {
                        router.go("/user");
                    } else {
                        $.alt({
                            type: "danger",
                            msg: data.message,
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
    var deluser = {
        url: "/deluser/:username",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/deluser",
                type: "delete",
                data: { username: this.params.username }
            }).done(function (data) {
                if (data.success) {
                    router.go("/user");
                } else {
                    $.alt({
                        type: "danger",
                        msg: data.message,
                        el: ".message"
                    });
                }
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });

            return def.promise();
        }
    }

    var movie = {
        url: "/movie",
        className: "animated",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/movie",
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });

            return def.promise();
        },
        bind: function () {
            $("#delSelected").click(function (event) {
                event.preventDefault();
                $(".circle").show();
                var ids = [];
                $("table input[type=checkbox]:checked").each(function (i, v) {
                    ids.push(v.value);
                });
                $._ajax({
                    url: "/admin/delselectedmovie",
                    type: "delete",
                    data: { ids: ids.join(",") }
                }).done(function (data) {
                    if (data.success) {
                        router.go("/movie");
                    } else {
                        $.alt({
                            type: "danger",
                            msg: data.message,
                            el: ".message"
                        });
                    }
                }).fail(function (err) {
                    def.reject(err);
                }).always(function () {
                    $(".circle").hide();
                });
            });
        }
    }
    var addMoviePage = {
        url: "/addmoviepage/:id",
        className: "animated",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/addmoviepage",
                type: "put",
                data: { id: this.params.id },
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });
            return def.promise();
        },
        bind: function () {
            $("#addMovieForm").submit(function () {
                var name = $("#name").val(),
                    slideimg1 = $("#slideimg1").val(),
                    slideimg2 = $("#slideimg2").val(),
                    listimg1 = $("#listimg1").val(),
                    listimg2 = $("#listimg2").val(),
                    trailerimg = $("#trailerimg").val()
                if (!$.vaildate.isEmpty(name)) {
                    $.alt({
                        type: "warning",
                        msg: "名称不能为空",
                        el: ".message"
                    });
                    $("#name").focus();
                    return false;
                }
                if (!$.vaildate.isEmpty(slideimg1)) {
                    $.alt({
                        type: "warning",
                        msg: "主轮播图路径不能为空",
                        el: ".message"
                    });
                    $("#slideimg1").focus();
                    return false;
                }
                if (!$.vaildate.isEmpty(slideimg2)) {
                    $.alt({
                        type: "warning",
                        msg: "子轮播图路径不能为空",
                        el: ".message"
                    });
                    $("#slideimg2").focus();
                    return false;
                }
                if (!$.vaildate.isEmpty(listimg1)) {
                    $.alt({
                        type: "warning",
                        msg: "列表图标路径不能为空",
                        el: ".message"
                    });
                    $("#listimg1").focus();
                    return false;
                }
                if (!$.vaildate.isEmpty(listimg2)) {
                    $.alt({
                        type: "warning",
                        msg: "大列表图标路径不能为空",
                        el: ".message"
                    });
                    $("#listimg2").focus();
                    return false;
                }
                if (!$.vaildate.isEmpty(trailerimg)) {
                    $.alt({
                        type: "warning",
                        msg: "预告片图路径不能为空",
                        el: ".message"
                    });
                    $("#trailerimg").focus();
                    return false;
                }
                $(".circle").show();
                var data = {
                    id: $("#id").val(),
                    name: name,
                    rate: $("#rate").val(),
                    actor: $("#actor").val(),
                    director: $("#director").val(),
                    type: $("#type").val(),
                    time: $("#time").val(),
                    long: $("#long").val(),
                    describe: $("#describe").val(),
                    slideimg1: slideimg1,
                    slideimg2: slideimg2,
                    listimg1: listimg1,
                    listimg2: listimg2,
                    trailerimg: trailerimg,
                    bilisource: $("#bilisource").val()
                }
                $._ajax({
                    url: "/admin/addmovie",
                    type: "post",
                    data: data
                }).done(function (data) {
                    if (data.success) {
                        router.go("/movie");
                    } else {
                        $.alt({
                            type: "danger",
                            msg: data.message,
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
    var delmovie = {
        url: "/delmovie/:id",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/delmovie",
                type: "delete",
                data: { id: this.params.id }
            }).done(function (data) {
                if (data.success) {
                    router.go("/movie");
                } else {
                    $.alt({
                        type: "danger",
                        msg: data.message,
                        el: ".message"
                    });
                }
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });

            return def.promise();
        }
    }

    var news = {
        url: "/news",
        className: "animated",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/news",
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });

            return def.promise();
        },
        bind: function () {
            $("#delSelected").click(function (event) {
                event.preventDefault();
                $(".circle").show();
                var ids = [];
                $("table input[type=checkbox]:checked").each(function (i, v) {
                    ids.push(v.value);
                });
                $._ajax({
                    url: "/admin/delselectednews",
                    type: "delete",
                    data: { ids: ids.join(",") }
                }).done(function (data) {
                    if (data.success) {
                        router.go("/news");
                    } else {
                        $.alt({
                            type: "danger",
                            msg: data.message,
                            el: ".message"
                        });
                    }
                }).fail(function (err) {
                    def.reject(err);
                }).always(function () {
                    $(".circle").hide();
                });
            });
        }
    }
    var addnewspage = {
        url: "/addnewspage/:id",
        className: "animated",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/addnewspage",
                type: "put",
                data: { id: this.params.id },
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });
            return def.promise();
        },
        bind: function () {
            var mditor = new Mditor("#main", {
                height: 300,
                fixedHeight: true
            });
            $("#addNewsForm").submit(function () {
                var title = $("#title").val(),
                    main = $("#main").val(),
                    quotation = $("#quotation").val();
                if (!$.vaildate.isEmpty(title)) {
                    $.alt({
                        type: "warning",
                        msg: "标题不能为空",
                        el: ".message"
                    });
                    $("#title").focus();
                    return false;
                }
                if (!$.vaildate.isEmpty(main)) {
                    $.alt({
                        type: "warning",
                        msg: "内容不能为空",
                        el: ".message"
                    });
                    $("#main").focus();
                    return false;
                }
                if (!$.vaildate.isEmpty(quotation)) {
                    $.alt({
                        type: "warning",
                        msg: "引用不能为空",
                        el: ".message"
                    });
                    $("#quotation").focus();
                    return false;
                }
                $(".circle").show();
                var data = {
                    id: $("#id").val(),
                    title: title,
                    main: main,
                    quotation: quotation
                }
                $._ajax({
                    url: "/admin/addnews",
                    type: "post",
                    data: data
                }).done(function (data) {
                    if (data.success) {
                        router.go("/news");
                    } else {
                        $.alt({
                            type: "danger",
                            msg: data.message,
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
    var delnews = {
        url: "/delnews/:id",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/delnews",
                type: "delete",
                data: { id: this.params.id }
            }).done(function (data) {
                if (data.success) {
                    router.go("/news");
                } else {
                    $.alt({
                        type: "danger",
                        msg: data.message,
                        el: ".message"
                    });
                }
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });

            return def.promise();
        }
    }
    var newspreview = {
        url: "/newspreview/:id",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/newspreview/" + this.params.id,
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });

            return def.promise();
        }
    }

    var comment = {
        url: "/comment",
        className: "animated",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/comment",
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });

            return def.promise();
        },
        bind: function () {
            $("#delSelected").click(function (event) {
                event.preventDefault();
                $(".circle").show();
                var ids = [];
                $("table input[type=checkbox]:checked").each(function (i, v) {
                    ids.push(v.value);
                });
                $._ajax({
                    url: "/admin/delselectedcomment",
                    type: "delete",
                    data: { ids: ids.join(",") }
                }).done(function (data) {
                    if (data.success) {
                        router.go("/comment");
                    } else {
                        $.alt({
                            type: "danger",
                            msg: data.message,
                            el: ".message"
                        });
                    }
                }).fail(function (err) {
                    def.reject(err);
                }).always(function () {
                    $(".circle").hide();
                });
            });
        }
    }
    var addcommentpage = {
        url: "/addcommentpage/:id",
        className: "animated",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/addcommentpage",
                type: "put",
                data: { id: this.params.id },
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });
            return def.promise();
        },
        bind: function () {
            $("#addCommentForm").submit(function () {
                var main = $("#main").val();
                if (!$.vaildate.isEmpty(main)) {
                    $.alt({
                        type: "warning",
                        msg: "内容不能为空",
                        el: ".message"
                    });
                    $("#main").focus();
                    return false;
                }
                $(".circle").show();
                var data = {
                    id: $("#id").val(),
                    main: main,
                }
                $._ajax({
                    url: "/admin/addcomment",
                    type: "post",
                    data: data
                }).done(function (data) {
                    if (data.success) {
                        router.go("/comment");
                    } else {
                        $.alt({
                            type: "danger",
                            msg: data.message,
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
    var delcomment = {
        url: "/delcomment/:id",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/delcomment",
                type: "delete",
                data: { id: this.params.id }
            }).done(function (data) {
                if (data.success) {
                    router.go("/comment");
                } else {
                    $.alt({
                        type: "danger",
                        msg: data.message,
                        el: ".message"
                    });
                }
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });

            return def.promise();
        }
    }
    var article = {
        url: "/article",
        className: "animated",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/article",
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });

            return def.promise();
        },
        bind: function () {
            $("#delSelected").click(function (event) {
                event.preventDefault();
                $(".circle").show();
                var ids = [];
                $("table input[type=checkbox]:checked").each(function (i, v) {
                    ids.push(v.value);
                });
                $._ajax({
                    url: "/admin/delselectedarticle",
                    type: "delete",
                    data: { ids: ids.join(",") }
                }).done(function (data) {
                    if (data.success) {
                        router.go("/article");
                    } else {
                        $.alt({
                            type: "danger",
                            msg: data.message,
                            el: ".message"
                        });
                    }
                }).fail(function (err) {
                    def.reject(err);
                }).always(function () {
                    $(".circle").hide();
                });
            });
        }
    }
    var addarticlepage = {
        url: "/addarticlepage/:id",
        className: "animated",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/addarticlepage",
                type: "put",
                data: { id: this.params.id },
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });
            return def.promise();
        },
        bind: function () {
            var mditor = new Mditor("#main", {
                height: 300,
                fixedHeight: true
            });
            $("#addArticleForm").submit(function () {
                var title = $("#title").val(),
                    main = $("#main").val();
                if (!$.vaildate.isEmpty(title)) {
                    $.alt({
                        type: "warning",
                        msg: "标题不能为空",
                        el: ".message"
                    });
                    $("#title").focus();
                    return false;
                }
                if (!$.vaildate.isEmpty(main)) {
                    $.alt({
                        type: "warning",
                        msg: "内容不能为空",
                        el: ".message"
                    });
                    $("#main").focus();
                    return false;
                }
                $(".circle").show();
                var data = {
                    id: $("#id").val(),
                    title: title,
                    main: main
                }
                $._ajax({
                    url: "/admin/addarticle",
                    type: "post",
                    data: data
                }).done(function (data) {
                    if (data.success) {
                        router.go("/article");
                    } else {
                        $.alt({
                            type: "danger",
                            msg: data.message,
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
    var delarticle = {
        url: "/delarticle/:id",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/delarticle",
                type: "delete",
                data: { id: this.params.id }
            }).done(function (data) {
                if (data.success) {
                    router.go("/article");
                } else {
                    $.alt({
                        type: "danger",
                        msg: data.message,
                        el: ".message"
                    });
                }
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });

            return def.promise();
        }
    }
    var articlepreview = {
        url: "/articlepreview/:id",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/articlepreview/" + this.params.id,
                dataType: "html"
            }).done(function (html) {
                def.resolve(html);
            }).fail(function (err) {
                def.reject(err);
            }).always(function () {
                $(".circle").hide();
            });

            return def.promise();
        }
    }
    router.push(home).push(logout)
        .push(admin).push(addAdminPage).push(delAdmin)
        .push(user).push(addUserPage).push(deluser)
        .push(movie).push(addMoviePage).push(delmovie)
        .push(news).push(addarticlepage).push(delnews).push(newspreview)
        .push(comment).push(addcommentpage).push(delcomment)
        .push(article).push(delarticle).push(articlepreview)
        .setDefault("/").init();
});