if (page !== '') {

    if (page === 'login' || page === 'register' || page === 'complete_signup'){

        $(function() {
            $('.button-checkbox').each(function() {
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
                $button.on('click', function() {
                    $checkbox.prop('checked', !$checkbox.is(':checked'));
                    $checkbox.triggerHandler('change');
                    updateDisplay();
                });
                $checkbox.on('change', function() {
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
        });

    } 
    
    if (page === 'profile') {

        function showBannerSelect() {
            $('#imageModal').modal({
                onVisible: function () {
                    $("select").imagepicker();
                }
            }).modal('show');
        }

        if (loggedIn == 1) {

            function deletePost(post) {
                if (confirm(confirmDelete)) {
                    document.getElementById("delete" + post).submit();
                }
            }

            function deleteReply(post) {
                if (confirm(confirmDelete)) {
                    document.getElementById("deleteReply" + post).submit();
                }
            }

        }
        
        $(function() {
            var postId = window.location.hash.replace('#post-', '');
            var postElem = '#post-id-' + postId;
            setTimeout(function() {
                $('html, body').animate({ scrollTop: $(postElem).offset().top - 15 }, 800);
            }, 100);
        });

    } else if (page === 'status') {

        $(document).ready(function() {
            $(".server-card").each(function() {
                let serverId = $(this).data("id");
                let serverBungee = $(this).data("bungee");
                let serverBedrock = $(this).data("bedrock");
                let serverPlayerList = $(this).data("players");
                const paramChar = URLBuild('').includes('?') ? '&' : '?';
                $.getJSON(URLBuild('queries/server/' + paramChar + 'id=' + serverId), function(data) {
                    var html = "";
                    if (data.status_value == 1) {
                        $("#server-status" + serverId).html("<span class='badge badge-success'>" + online + "</span>");
                        html = data.player_count + "/" + data.player_count_max + "<br />";
                        if (serverBungee == 1) {
                            html += bungeeInstance;
                        } else if (serverBedrock === 1) {
                            
                        } else {
                            if (serverPlayerList == 1) {
								if (data.player_count > 0 && data.player_list.length <= 0) {
									// Weird edge case where player list is empty but the player count is > 0
									if (data.player_count > 1) {
										players += xPlayersOnline.replace('{{count}}', data.player_count);
									} else {
										players += onePlayerOnline;
									}
								} else if (data.player_list.length > 0) {
                                    for (var i = 0; i < data.player_list.length; i++) {
                                        html += "<a href='" + URLBuild('profile/' + data.player_list[i].name) + "' \><img style=\"margin-bottom:3px;max-width:32px;max-height:32px;\" data-toggle=\"tooltip\" title=\"" + data.player_list[i].name + "\" src=\"" + avatarSource.replace("{identifier}", data.player_list[i].id).replace("{size}", 64) + "\" class=\"avatar-img\" alt=\"" + data.player_list[i].name + "\"></a> ";
                                    }
                                    if (data.player_list.length < data.player_count) {
                                        let andXMore = andMoreX;
                                        html += "<span class=\"badge badge-secondary\">" + andXMore.replace("{{count}}", (data.player_count - data.player_list.length)) + "</span>";
                                    }
                                } else {
                                    html += noPlayersOnline;
                                }
                            }
                        }
                    } else {
                        $("#server-status" + serverId).html("<span class='badge badge-danger'>" + offline + "</span>");
                        html = "0/0";
                    }
                    $("#content" + serverId).html(html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            });
        });

    } else if (route.indexOf("/forum/topic/") != -1) {

        $(function() {
            var postId = window.location.hash.replace('#post-', '');
            var postElem = '#post-' + postId;
            setTimeout(function() {
                $('html, body').animate({ scrollTop: $(postElem).offset().top - 15 }, 800);
            }, 100);
        });

    } else if (route.indexOf("/resources/new") != -1) {

        $(document).ready(function() {
            $('#priceFormGroup').hide();
        });
        $('#inputType').change(function() {
            if ($('#inputType').val() === "premium") {
                $('#priceFormGroup').show();
            } else {
                $('#priceFormGroup').hide();
            }
        });

    }

}