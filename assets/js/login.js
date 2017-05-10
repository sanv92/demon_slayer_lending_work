var login_url = "/p/ws/";
var login_error = "Ошибка входа в систему";
var miss_email = "Незаполнен адрес электронной почты";
var miss_pwd = "Незаполнен пароль";
var wrong_email = "Неправильный адрес электронной почты";
var wrong_pwd = "Ввод пароля неправильный";
var pwd_ne_cpwd = "Повторный ввод пароля неправильный";
var register_error = "Регистрация не удалась";
var account_exists = "Данный счет уже существует";
var no_check = "Вы не согласны с соглашением о регистрации";

var tips = {
    txr_email: "Укажите адрес электронной почты",
    txr_password1: "Только буквы / цифры (мин. 6 символов)",
    txr_cpassword1: "Введите пароль еще раз"
};

function showTips(obj, isOk) {
    var wrongImg = $('<img src="/v1/images/index/dialog/register/icon-error.png" alt="" />');
    var rightImg = $('<img src="/v1/images/index/dialog/register/icon-pass.png" alt="" />');
    obj.parent().find('img').remove();
    if (isOk) {
        rightImg.appendTo(obj.parent());
    } else {
        wrongImg.appendTo(obj.parent());
    }
}

function doRegister() {
    var emailObj = $("#txr_email");
    var passwordObj = $("#txr_password");
    var cpasswordObj = $("#txr_cpassword");

    var email = emailObj.val();
    var password = passwordObj.val();
    var cpassword = cpasswordObj.val();
    if (!email)
    {
        if (!$('.error').length) {
            alert(miss_email);
            return false;
        }
        $('.error').empty().append(miss_email);
        emailObj.focus();
        showTips(emailObj);
        return false;
    }
    if (!password)
    {
        if (!$('.error').length) {
            alert(miss_pwd);
            return false;
        }
        $('.error').empty().append(miss_pwd);
        passwordObj.focus();
        showTips(passwordObj);
        return false;
    }
    if (!cpassword)
    {
        if (!$('.error').length) {
            alert(miss_pwd);
            return false;
        }
        $('.error').empty().append(miss_pwd);
        cpasswordObj.focus();
        showTips(cpasswordObj);
        return false;
    }
    var patrn = /^(\w){6,14}$/;
    if (!patrn.exec(password.value)) {
        if (!$('.error').length) {
            alert(wrong_pwd);
            return false;
        }
        $('.error').empty().append(wrong_pwd);
        showTips(passwordObj);
        return false;
    }

    if (cpassword != password) {
        if (!$('.error').length) {
            alert(pwd_ne_cpwd);
            return false;
        }
        $('.error').empty().append(pwd_ne_cpwd);
        cpasswordObj.focus();
        showTips(cpasswordObj);
        return false;
    }

    if (checkEmail(email) != 0) {
        if (!$('.error').length) {
            alert(wrong_email);
            return false;
        }
        $('.error').empty().append(wrong_email);
        showTips(emailObj);
        return false;
    }

    if ($('#agree').length && !$('#agree').attr("checked")) {
        $('.error').empty().append(no_check);
        $('#dialog-account').find('img').remove();
        return false;
    }

    var data1 = "email=" + email + "&password=" + password + "&cpassword=" + cpassword;
    jQuery.post(login_url + "eregister", data1, function(data) {
        switch (data.result.status)
        {
            case 1:
                $.ajax({
                    type: "POST",
                    url: "process.php",
                    data: "act=register&email=" + email,
                    dataType: "json",
                    timeout: 5,
                    async: false,
                    success: function(msg) {
                        window.location.href = $('#ad_url').val();
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        window.location.href = $('#ad_url').val();
                    }
                });
                return;
            case -6:
            case -2:
                showTips(emailObj);
                if (!$('.error').length) {
                    alert(account_exists);
                    break;
                }
                $('.error').empty().append(account_exists);
                break;
            default:
                if (!$('.error').length) {
                    alert(register_error);
                    break;
                }
                $('.error').empty().append(register_error);
                break;
        }
    }, "json");
    return false;
}

function chngpwdTip() {
    //$('#pwdboxid1').css("display", "none");
    //$('#txt_pwd').css("display", "block").focus();
}

function char_test(chr)
{
    var i;
    var smallch = "abcdefghijklmnopqrstuvwxyz0123456789";
    var bigch = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (i = 0; i < 36; i++)
        if (chr == smallch.charAt(i) || chr == bigch.charAt(i))
            return(1);
    return(0);
}

function spchar_test(chr)
{
    var i;
    var spch = "_-.0123456789";
    for (i = 0; i < 13; i++)
        if (chr == spch.charAt(i))
            return(1);
    return(0);
}

function checkEmail(str)
{
    var i, flag = 0;
    var at_symbol = 0;
    var dot_symbol = 0;
    if (char_test(str.charAt(0)) == 0)
        return (1);

    for (i = 1; i < str.length; i++)
        if (str.charAt(i) == '@')
        {
            at_symbol = i;
            break;
        }

    if (at_symbol == str.length - 1 || at_symbol == 0)
        return(2);

    if (at_symbol < 3)
        return(3);

    if (at_symbol > 19)
        return(4);

    for (i = 1; i < at_symbol; i++)
        if (char_test(str.charAt(i)) == 0 && spchar_test(str.charAt(i)) == 0)
            return (5);
    for (i = at_symbol + 1; i < str.length; i++)
        if (char_test(str.charAt(i)) == 0 && spchar_test(str.charAt(i)) == 0)
            return (5);

    for (i = at_symbol + 1; i < str.length; i++)
        if (str.charAt(i) == '.')
            dot_symbol = i;
    for (i = at_symbol + 1; i < str.length; i++)
        if (dot_symbol == 0 || dot_symbol == str.length - 1)
            return (6);

    return (0);
}

function chngpwdTip(c) {
    if (c == 1) {
        $('#txr_password1').css("display", "none");
        $('#txr_password').toggle().focus();
    } else if (c == 2) {
        $('#txr_cpassword1').css("display", "none");
        $('#txr_cpassword').toggle().focus();
    } else if (c == 3) {
        $('#txt_password22').css("display", "none");
        $('#txt_password2').toggle().focus();
    }
}

function checkV(obj) {
    switch (obj.id) {
        case "txr_email":
            if (checkEmail($(obj).val()) != 0) {
                $('.error').empty().append(wrong_email);
                if ($(obj).val() == '') {
                    $(obj).val(tips.txr_email);
                }
                showTips($(obj));
            } else {
                showTips($(obj), true);
            }
            break;
        case "txr_password":
            var patrn = /^(\w){6,14}$/;
            if (!patrn.exec($(obj).val())) {
                $('.error').empty().append(wrong_pwd);
                if ($('#txr_password').val() == '') {
                    $('#txr_password').css('display', 'none');
                    $('#txr_password1').css('display', '');
                    $('#txr_password1').val(tips.txr_password1);
                }
                showTips($(obj));
            } else {
                showTips($(obj), true);
            }
            break;
        case "txr_cpassword":
            if ($(obj).val() == '' || $(obj).val() != $('#txr_password').val()) {
                $('.error').empty().append(pwd_ne_cpwd);
                if ($('#txr_cpassword').val() == '') {
                    $('#txr_cpassword').css('display', 'none');
                    $('#txr_cpassword1').css('display', '');
                    $('#txr_cpassword1').val(tips.txr_cpassword1);
                }
                showTips($(obj));
            } else {
                showTips($(obj), true);
            }
            break
        default:
            break;
    }
}

$(function() {
    if (window.href.indexOf('ds.infiplay.ru') === -1) {
        $.each(tips, function(key, value) {
            $('#' + key).val(value);
        });
    }
    document.onkeydown = function(e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            doRegister();
        }
    }
});

