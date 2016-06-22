(function ($, factory) {
    factory($)
})($, function ($) {
    $._ajax = function (option) {
        option = option || {};
        option.dataType = option.dataType || "json";
        return $.ajax(option).fail(function (err) {
            if (err.status == 400) {
                window.location = "404.html";
            } else if (err.status == 500) {
                window.location = "500.html";
            }
        });
    }
    $.alt = function (option) {
        //{type: [warning, info, success, danger], msg: string, el: element selector string}
        option = option || {
            type: "warning",
            msg: "错了",
            el: "body"
        };
        var typeMsg = {
            "warning": "警告",
            "info": "提示",
            "success": "成功",
            "danger": "错误"
        };
        var domStr = '<div class="alert alert-' + option.type + ' alert-dismissable" style="display: none;">' +
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
            '<strong>' + typeMsg[option.type] + '</strong>&nbsp;&nbsp;' + option.msg +
            '</div>'
        $(option.el).append(domStr).find(".alert").show("normal").delay(2000).hide("normal", function () {
            $(this).remove();
        });
    }

    $.vaildate = {
        isEmail: function (str) {
            return /^([\w-\.]+)@([\w-\.]+)\.([\w-\.]+)$/.test(str);
        },
        isEmpty: function (str) {
            return /\S/.test(str);
        },
        isWord: function (str) {
            return /[\w-\.]/.test(str);
        }
    }

    $.getCookie = function (key) {
        var cookie = decodeURIComponent(document.cookie);
        var start = cookie.indexOf(key);
        if (start == -1) {
            return "";
        } else {
            var end = cookie.indexOf(";", start);
            if (end == -1) {
                return cookie.slice(start + key.length + 1);
            } else {
                return cookie.slice(start + key.length + 1, end);
            }
        }
    }
});