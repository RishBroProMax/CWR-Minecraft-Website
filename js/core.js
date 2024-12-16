function URLBuild(path, full = false) {
    return (full ? fullSiteURL : siteURL) + path;
}

if (loggedIn == 0) {

    if (page !== 'login' && page !== 'register' && page !== 'maintenance') {

        $('a[href="' + siteURL + 'login/"]').click(function (e) {
            e.preventDefault();
            login();
        });

        $('a[href="' + siteURL + 'register/"]').click(function (e) {
            e.preventDefault();
            register();
        });

    }

} 

if (ds_box == "yes") {

    if (window.screen.width >= ds_breakpoint) {

        $(window).on("load", function () {

            let serverStatusIp = mc_server;
            $.ajax({
                url: "https://api.mcsrvstat.us/2/" + serverStatusIp,
                success: function (data) {
                    if (data.online) {
                        let online = data.online;
                        let playerCurrentCount = data.players.online;
                        updateStatus(online, playerCurrentCount);
                    } else {
                        let online = null;
                        updateStatus(online);
                    }
                },
                error: function () {
                    $.ajax({
                        url: "https://mcapi.us/server/status?ip=" + serverStatusIp,
                        success: function (data) {
                            if (data.online) {
                                let online = data.online;
                                let playerCurrentCount = data.players.now;
                                updateStatus(online, playerCurrentCount);
                            } else {
                                let online = null;
                                updateStatus(online);
                            }
                        },
                    });
                },
                timeout: 300000,
            });

            function updateStatus(online, current) {
                let statusStatusDiv = $(".server-status");
                if (online) {
                    statusStatusDiv.empty();
                    if ((current > 1) || (current < 1)) {
                        statusStatusDiv.html("<span class='status-number'>" + current + "</span> " + players_online);
                    } else {
                        statusStatusDiv.html("<span class='status-number'>" + current + "</span> " + player_online);
                    }
                } else {
                    statusStatusDiv.empty();
                    statusStatusDiv.text(server_offline);
                }
            }

            let discordStatusID = discord_server;
            $.ajax({
                url: "https://discord.com/api/guilds/" + discordStatusID + "/embed.json",
                success: function (data) {
                    let presence_count = data.presence_count;
                    updateDiscordStatus(presence_count);
                },
                error: function () {},
                timeout: 300000,
            });

            function updateDiscordStatus(presence_count) {
                let discordStatusDiv = $(".discord-status");
                discordStatusDiv.empty();
                if ((presence_count > 1) || (presence_count < 1)) {
                    discordStatusDiv.html("<span class='status-number'>" + presence_count + "</span> " + users_online);
                } else {
                    discordStatusDiv.html("<span class='status-number'>" + presence_count + "</span> " + user_online);
                }
            }

        });

    }

}

$('.navbar-toggler').click(function () {
    $('.coldfire-navbar-menu').addClass("active");
    $('.overlay').addClass("active");
});
$('#nav-header-close').click(function () {
    $('.coldfire-navbar-menu').removeClass("active");
    $('.overlay').removeClass("active");
});

if (winter == "yes") {
    tsParticles.load("#html", {
        particles: {
            number: {
                "value": 20
            },
            shape: {
                type: "character",
                character: {
                    "value": "\uf2dc",
                    "font": "Font Awesome 5 Free",
                    "weight": "500"
                }
            },
            color: {
                "value": "#ffffff"
            },
            opacity: {
                "value": 0.6,
                "random": false
            },
            size: {
                "value": 7,
                "random": false,
            },
        },
        preset: "snow"
    });
} else {
    if ((particles == "yes") && ($("#header-pjs").length)) {
        $(window).on("load", function () {
            tsParticles.loadJSON("header-pjs", pjsPath);
        });
    }
}

if (loadingTime) {
    $('#page_load_tooltip').attr('title', loadingTime).tooltip();
}

$.fn.tooltip.Constructor.Default.whiteList["span"].push("style");
$.fn.tooltip.Constructor.Default.whiteList["a"].push("style");

$(".pop").popover({
        trigger: "manual",
        html: "true",
        placement: "top"
    })
    .on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover('hide');
            }
        }, 300);
    });

$('.more-dropdown').hover(
    function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(25).fadeIn("fast");
    },
    function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(25).fadeOut("fast");
    }
);
$('.more-dropdown-menu').hover(
    function () {
        $(this).stop(true, true);
    },
    function () {
        $(this).stop(true, true).delay(25).fadeOut("fast");
    }
);

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});
$(function () {
    $('[rel="tooltip"]').tooltip()
});

$('[data-toggle="popover"]').popover({
    trigger: "manual",
    html: true,
    animation: false
}).on("mouseenter", function () {
    var _this = this;
    $(this).popover("show");
    $(".popover").on("mouseleave", function () {
        $(_this).popover('hide');
    });
}).on("mouseleave", function () {
    var _this = this;
    setTimeout(function () {
        if (!$(".popover:hover").length) {
            $(_this).popover("hide");
        }
    }, 300);
});

$(document).ready(function () {
    if($('#logo-link').length) {
        $("#logo-link").attr("href", siteURL);
    }
});

$(document).ready(function () {
    var cachedUsers = {};
    var timeoutId;
    $('*[data-poload]').mouseenter(function () {
        var elem = this;
        if (!timeoutId) {
            timeoutId = window.setTimeout(function () {
                timeoutId = null;
                if (!($(elem).data('poload') in cachedUsers)) {
                    $(elem).popover({
                        trigger: "manual",
                        animation: false,
                        content: loading
                    }).popover("show");
                    $.get($(elem).data('poload'), function (d) {
                        (debugging && debugging == '1' ? console.log(d) : '');
                        var data = JSON.parse(d);
                        cachedUsers[$(elem).data('poload')] = data;
                        $(elem).popover("dispose").popover({
                            trigger: "manual",
                            animation: false,
                            html: true,
                            content: data.html
                        }).popover("show");
                        $('.popover').mouseleave(function () {
                            if (!$(".popover:hover").length) {
                                $(this).popover("hide");
                            }
                        });
                    });
                } else {
                    var data = cachedUsers[$(elem).data('poload')];
                    $(elem).popover({
                        trigger: "manual",
                        animation: false,
                        content: data.html
                    }).popover("show");
                    $('.popover').mouseleave(function () {
                        if (!$(".popover:hover").length) {
                            $(this).popover("hide");
                        }
                    });
                }
            }, 1000);
        }
    }).mouseleave(function () {
        var elem = this;
        if (timeoutId) {
            window.clearTimeout(timeoutId);
            timeoutId = null;
        } else {
            setTimeout(function () {
                if (!$(".popover:hover").length) {
                    $(elem).popover("hide");
                }
            }, 200);
        }
    });

    var timezone = document.getElementById('timezone');
    if (timezone) {
        const timezoneValue = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezoneValue) {
          timezone.value = timezoneValue;
        }
    }
});

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();

    Swal.fire({
        title: "IP " + copied,
        text: swal_server_copy,
        icon: "success",
        confirmButtonText: close
    });
}

var announcements = document.querySelectorAll('[id^="announcement"]');
announcements.forEach((announcement) => {
    var closeButton = announcement.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            document.cookie = announcement.id + '=true; path=/';
        });
    }
});

if (loggedIn == 0) {

    function login() {
        if (window.screen.width >= 767) {
            $('.load-wrapper').show();
        }
        $('.login-menu').load(fullSiteUrl + 'login .login-menu', function (response, status) {
            if (status == "error") {
                $('#loginRegisterError').modal();
                $('.load-wrapper').hide();
            } else {
                $('#form-login').attr('action', siteURL + "login");  
                checkbox();
                getCaptcha('login');
                if (window.screen.width >= 767) {
                    $('.load-wrapper').hide();
                }
                $('#loginModal').modal('show');
                $('a[href="' + siteURL + 'register/"]').click(function (e) {
                    e.preventDefault();
                    $('#loginModal').modal('hide');
                    register();
                });
            }
        });
    }

    function register() {
        if (window.screen.width >= 767) {
            $('.load-wrapper').show();
        }
        $('.register-menu').load(fullSiteUrl + 'register .register-menu', function (response, status) {
            if (status == "error") {
                $('#loginRegisterError').modal();
                $('.load-wrapper').hide();
            } else {
                $('#form-register').attr('action', siteURL + "register");
                checkbox();
                getCaptcha('register');
                if (window.screen.width >= 767) {
                    $('.load-wrapper').hide();
                }
                $('#registerModal').modal('show');
                $('a[href="' + siteURL + 'login/"]').click(function (e) {
                    e.preventDefault();
                    $('#registerModal').modal('hide');
                    login();
                });
            }
        });
    }

    function getCaptcha(page) {
        $.get(fullSiteUrl + page, function(data) {
            var captcha_script = document.createElement("script");
            var fetched_code = document.createElement("span");
            $(fetched_code).html(data);

            if (fetched_code.querySelector("script[src*='https://hcaptcha.com/1/api.js']")) {
                captcha_script.src = "https://hcaptcha.com/1/api.js";
                $("head").append(captcha_script);
            } else if (fetched_code.querySelector("script[src*='https://www.google.com/recaptcha/api.js']")) {
                captcha_script.src = fetched_code.querySelector("script[src*='https://www.google.com/recaptcha/api.js']").src;
                $("head").append(captcha_script);
                if (!$("#captcha").length) {
                    var captcha_token = captcha_script.src;
                    captcha_token = captcha_token.replace('https://www.google.com/recaptcha/api.js?render=', '');
                    $("#form-" + page).submit(function(e) {
                        e.preventDefault();
                        grecaptcha.ready(function() {
                            grecaptcha.execute(captcha_token, { action: "submit" }).then(function(token) {
                            $("#form-" + page).prepend("<input type=\"hidden\" name=\"recaptcha\" value=\"" + token + "\">");
                            $("#form-" + page).off("submit").submit();
                        });
                        });
                    });
                }
            }
        });
    }

    function checkbox() {
        (function () {
            $('.button-checkbox').each(function () {
                var $widget = $(this),
                    $button = $widget.find('button'),
                    $checkbox = $widget.find('input:checkbox'),
                    color = $button.data('color'),
                    settings = {
                        on: {
                            icon: 'fas fa-check-square'
                        },
                        off: {
                            icon: 'far fa-square'
                        }
                    };

                $button.unbind().click(function () {
                    $checkbox.prop('checked', !$checkbox.is(':checked'));
                    $checkbox.triggerHandler('change');
                    updateDisplay();
                });

                $checkbox.unbind().change(function () {
                    updateDisplay();
                });

                function updateDisplay() {
                    var isChecked = $checkbox.is(':checked');
                    $button.data('state', (isChecked) ? "on" : "off");
                    $button.find('.state-icon')
                        .removeClass()
                        .addClass('state-icon ' + settings[$button.data('state')].icon);
                    if (isChecked) {
                        $button
                            .removeClass('btn-secondary')
                            .addClass('btn-' + color + ' active');
                    } else {
                        $button
                            .removeClass('btn-' + color + ' active')
                            .addClass('btn-secondary');
                    }
                }

                function init() {
                    updateDisplay();
                    if ($button.find('.state-icon').length == 0) {
                        $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i>');
                    }
                }
                init();
            });
        })();
    }
}

$(document).ready(function () {
    $('[data-action="logout"]').click(function () {
        const url = $(this).data('link');
        $.post(url, {
            token: csrfToken
        }).done(function () {
            window.location.reload();
        });
    });
});

$(document).ready(function () {
    $('.load-wrapper').hide();
});

// Socialize fix
$(document).ready(function(){
    $('#newPost #file').change(function(){
        var files = $(this)[0].files;
        $("#socializeMediaNum").text(files.length)
    });
});