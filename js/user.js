if (!('Notification' in window))
	window.Notification = null;

if (loggedIn == 1) {

	if ($(".pms").length || $(".alerts").length) {
		$(document).ready(function () {
			if (Notification) {
				if (Notification.permission !== "granted")
					Notification.requestPermission();
			}

			$.getJSON(URLBuild('queries/pms'), function (data) {
				var pm_dropdown = $(".pms_dropdown");

				if (data.value > 0) {
					$(".pms").html('<div class="alert-msg-icon"><i class="fa fa-exclamation-circle custom-nav-exclaim"></i></div>');
						
					var new_pm_dropdown = '';
					for (i in data.pms) {
						new_pm_dropdown += '<a class="dropdown-item alert-msg-list" href="' + URLBuild('user/messaging?action=view&amp;message=' + data.pms[i].id) + '">' + data.pms[i].title + '</a>';
					}
					pm_dropdown.html(new_pm_dropdown);
					pm_dropdown.removeClass('dropdown-item');

				} else {
					pm_dropdown.html('<span>' + noMessages + '</span>');
					pm_dropdown.addClass('noclick');
				}
			});
			$.getJSON(URLBuild('queries/alerts'), function (data) {
				var alert_dropdown = $(".alerts_dropdown");

				if (data.value > 0) {
					$(".alerts").html('<div class="alert-msg-icon"><i class="fa fa-exclamation-circle custom-nav-exclaim"></i></div>');

					var new_alert_dropdown = '';

					for (i in data.alerts) {
						new_alert_dropdown += '<a class="dropdown-item alert-msg-list" href="' + URLBuild('user/alerts?view=' + data.alerts[i].id) + '">' + data.alerts[i].content_short + '</a>';
					}

					alert_dropdown.html(new_alert_dropdown);
					alert_dropdown.removeClass('dropdown-item');
					
				} else {
					alert_dropdown.html('<span>' + noAlerts + '</span>');
					alert_dropdown.addClass('noclick');
				}
			});

			window.setInterval(function () {
				$.getJSON(URLBuild('queries/pms'), function (data) {
					if (data.value > 0 && $('.pms').is(':empty')) {
						$(".pms").html('<div class="alert-msg-icon"><i class="fa fa-exclamation-circle custom-nav-exclaim"></i></div>');

						if (data.value !== 1) {
							var x_messages = newMessagesX;
						}

						var pm_dropdown = $(".pms_dropdown");

						var new_pm_dropdown = '';

						for (i in data.pms) {
							new_pm_dropdown += '<a class="dropdown-item alert-msg-list" href="' + URLBuild('user/messaging?action=view&amp;message=' + data.pms[i].id) + '">' + data.pms[i].title + '</a>';
						}

						pm_dropdown.html(new_pm_dropdown);

						pm_dropdown.removeClass('dropdown-item');

						if (Notification.permission !== "granted")
							Notification.requestPermission();
						else {
							if (data.value == 1) {
								var notification = new Notification(siteName, {
									body: newMessage1,
								});
							} else {
								var notification = new Notification(siteName, {
									body: x_messages.replace("{{count}}", data.value),
								});
							}

							notification.onclick = function () {
								window.open(URLBuild('user/messaging', true));
							};

						}
					}
				});

				$.getJSON(URLBuild('queries/alerts'), function (data) {
					if (data.value > 0 && $('.alerts').is(':empty')) {
						$(".alerts").html('<div class="alert-msg-icon"><i class="fa fa-exclamation-circle custom-nav-exclaim"></i></div>');

						if (data.value !== 1) {
							var x_alerts = newAlertsX;
						}

						var alert_dropdown = $(".alerts_dropdown");

						var new_alert_dropdown = '';

						for (i in data.alerts) {
							new_alert_dropdown += '<a class="dropdown-item alert-msg-list" href="' + URLBuild('user/alerts?view=' + data.alerts[i].id) + '">' + data.alerts[i].content_short + '</a>';
						}

						alert_dropdown.html(new_alert_dropdown);

						alert_dropdown.removeClass('dropdown-item');

						if (Notification.permission !== "granted")
							Notification.requestPermission();
						else {
							if (data.value == 1) {
								var notification = new Notification(siteName, {
									body: newAlert1,
								});
							} else {
								var notification = new Notification(siteName, {
									body: x_alerts.replace("{{count}}", data.value),
								});
							}

							notification.onclick = function () {
								window.open(URLBuild('user/alerts', true));
							};

						}
					}
				});
			}, 20000);
		});

		if(navigator.userAgentData.mobile == false) {
			$('.alerts-dropdown, .account-dropdown, .pms-dropdown').hover(
				function () {
					$(this).find('.dropdown-menu').stop(true, true).delay(50).fadeIn('fast');
				},
				function () {
					$(this).find('.dropdown-menu').stop(true, true).delay(275).fadeOut('fast');
				}
			);

			$('.alerts-dropdown-menu, .account-dropdown-menu, .pms-dropdown-menu').hover(
				function () {
					$(this).stop(true, true);
				},
				function () {
					$(this).stop(true, true).delay(275).fadeOut('fast');
				}
			);
		}

	}

	if ($('div.show-punishment').length) {
		$('.show-punishment').modal('show');
	}

}