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
                    window.location = "/login.html";
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
        url: "/addAdminPage/:id",
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

    var goodstype = {
        url: "/goodstype",
        className: "animated",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/goodstype",
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
                    url: "/admin/delselectedgoodstype",
                    type: "delete",
                    data: { ids: ids.join(",") }
                }).done(function (data) {
                    if (data.success) {
                        router.go("/goodstype");
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
    var addGoodstypePage = {
        url: "/addGoodstypePage/:id",
        className: "animated",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/addgoodstypepage",
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
            $("#addGoodstypeForm").submit(function () {
                var typename = $("#typename").val(),
                    pid = $("#pid").val();
                if (!$.vaildate.isEmpty(typename)) {
                    $.alt({
                        type: "warning",
                        msg: "分类名称不能为空",
                        el: ".message"
                    });
                    $("#typename").focus();
                    return false;
                }
                $(".circle").show();
                var data = { id: $("#id").val(), typename: typename, pid: pid };
                $._ajax({
                    url: "/admin/addgoodstype",
                    type: "post",
                    data: data
                }).done(function (data) {
                    if (data.success) {
                        router.go("/goodstype");
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
    var delgoodstype = {
        url: "/delgoodstype/:id",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/delgoodstype",
                type: "delete",
                data: { id: this.params.id }
            }).done(function (data) {
                if (data.success) {
                    router.go("/goodstype");
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

    var goods = {
        url: "/goods",
        className: "animated",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/goods",
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
                    url: "/admin/delselectedgoods",
                    type: "delete",
                    data: { ids: ids.join(",") }
                }).done(function (data) {
                    if (data.success) {
                        router.go("/goods");
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
    var addGoodsPage = {
        url: "/addGoodsPage/:id",
        className: "animated",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/addgoodspage",
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
            $("#addGoodsForm").submit(function () {
                var gname = $("#gname").val(),
                    price = $("#price").val(),
                    strock = $("#strock").val(),
                    file = $("#img").get(0).files[0];
                if (!$.vaildate.isEmpty(gname)) {
                    $.alt({
                        type: "warning",
                        msg: "商品名称不能为空",
                        el: ".message"
                    });
                    $("#gname").focus();
                    return false;
                }
                if (!$.vaildate.isEmpty(price) || !$.vaildate.isEmpty(strock)) {
                    $.alt({
                        type: "warning",
                        msg: "价格/库存不能为空",
                        el: ".message"
                    });
                    $("#price").focus();
                    return false;
                }
                if (!$.vaildate.isNumber(price) || !$.vaildate.isNumber(strock)) {
                    $.alt({
                        type: "warning",
                        msg: "价格/库存不合法",
                        el: ".message"
                    });
                    $("#gname").focus();
                    return false;
                }
                if (file !== undefined && !$.vaildate.isImage(file.type)) {
                    $.alt({
                        type: "warning",
                        msg: "只能上传图片",
                        el: ".message"
                    });
                    return false;
                }
                if (file !== undefined && !$.vaildate.imageSizeLimit(file.size)) {
                    $.alt({
                        type: "warning",
                        msg: "图片太大",
                        el: ".message"
                    });
                    return false;
                }
                $(".circle").show();
                var data = new FormData();
                file = (file === undefined ? null : file);
                data.append("gname", gname);
                data.append("price", price);
                data.append("strock", strock);
                data.append("img", file);
                data.append("type", $("#type").val());
                data.append("info", $("#info").val());
                data.append("admin", $("#admin").val());
                data.append("id", $("#id").val());
                $._ajax({
                    url: "/admin/addgoods",
                    type: "post",
                    data: data,
                    cache: false,
                    processData: false,
                    contentType: false
                }).done(function (data) {
                    if (data.success) {
                        router.go("/goods");
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

            $("#img").change(function () {
                var fr = new FileReader();
                var file = $(this).get(0).files[0];
                if (file === undefined) {
                    $("#preview").attr("src", "");
                } else {
                    fr.readAsDataURL(file);
                }
                fr.onload = function () {
                    if ($.vaildate.isImage(file.type)) {
                        $("#preview").attr("src", this.result);
                    } else {
                        $("#preview").attr("src", "");
                    }
                }
            });
        }
    }
    var delgoods = {
        url: "/delgoods/:id",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/delgoods",
                type: "delete",
                data: { id: this.params.id }
            }).done(function (data) {
                if (data.success) {
                    router.go("/goods");
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
    var addNewsPage = {
        url: "/addNewsPage/:id",
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
            var mditor = new Mditor("#content", {
                height: 300,
                fixedHeight: true
            });
            $("#addNewsForm").submit(function () {
                var title = $("#title").val(),
                    content = $("#content").val();
                if (!$.vaildate.isEmpty(title)) {
                    $.alt({
                        type: "warning",
                        msg: "标题不能为空",
                        el: ".message"
                    });
                    $("#content").focus();
                    return false;
                }
                $(".circle").show();
                var data = {id: $("#id").val(), title: title, content: content }
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
    var preview = {
        url: "/preview/:id",
        render: function () {
            $(".circle").show();
            var def = $.Deferred();
            $._ajax({
                url: "/admin/preview/" + this.params.id,
                dataType: "html"
            }).done(function (html) {
                var p = new Parser();
                def.resolve(p.parse(html));
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
        .push(goodstype).push(addGoodstypePage).push(delgoodstype)
        .push(goods).push(addGoodsPage).push(delgoods)
        .push(news).push(addNewsPage).push(delnews).push(preview)
        .setDefault("/").init();
});