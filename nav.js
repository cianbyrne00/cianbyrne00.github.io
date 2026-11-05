(function () {
    var desktopMenus = document.querySelectorAll(".desktop_case_studies_menu");

    function updateDesktopOverlayState() {
        var hasOpenDesktopMenu = document.querySelector(".desktop_case_studies_menu.desktop-case-open");

        if (hasOpenDesktopMenu) {
            document.body.classList.add("desktop-case-overlay-open");
            return;
        }

        document.body.classList.remove("desktop-case-overlay-open");
    }

    function closeAllDesktopMenus() {
        desktopMenus.forEach(function (menu) {
            var button = menu.querySelector(".desktop_case_studies_toggle");
            menu.classList.remove("desktop-case-open");
            if (button) {
                button.setAttribute("aria-expanded", "false");
            }
        });

        updateDesktopOverlayState();
    }

    desktopMenus.forEach(function (menu) {
        var button = menu.querySelector(".desktop_case_studies_toggle");

        if (!button) {
            return;
        }

        button.addEventListener("click", function (event) {
            event.preventDefault();
            var isOpen = menu.classList.contains("desktop-case-open");

            closeAllDesktopMenus();

            if (!isOpen) {
                menu.classList.add("desktop-case-open");
                button.setAttribute("aria-expanded", "true");
                updateDesktopOverlayState();
            }
        });
    });

    document.addEventListener("click", function (event) {
        var clickedDesktopMenu = event.target.closest(".desktop_case_studies_menu");
        if (!clickedDesktopMenu) {
            closeAllDesktopMenus();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeAllDesktopMenus();
        }
    });

    var mobileMenus = document.querySelectorAll(".mobile_nav_menu");

    mobileMenus.forEach(function (menu) {
        var caseTrigger = menu.querySelector(".mobile_case_studies_trigger");
        var caseBack = menu.querySelector(".mobile_case_back");
        var casePanel = menu.querySelector(".mobile_case_studies_panel");
        var casePanelCloseTimer = null;

        if (!caseTrigger || !caseBack) {
            return;
        }

        function closeCaseStudiesPanel(animate) {
            menu.classList.remove("mobile-case-open");
            caseTrigger.setAttribute("aria-expanded", "false");

            if (casePanel) {
                casePanel.setAttribute("aria-hidden", "true");
            }

            if (casePanelCloseTimer) {
                window.clearTimeout(casePanelCloseTimer);
                casePanelCloseTimer = null;
            }

            if (animate) {
                menu.classList.add("mobile-case-closing");
                casePanelCloseTimer = window.setTimeout(function () {
                    menu.classList.remove("mobile-case-closing");
                    casePanelCloseTimer = null;
                }, 200);
                return;
            }

            menu.classList.remove("mobile-case-closing");
        }

        function openCaseStudiesPanel() {
            if (casePanelCloseTimer) {
                window.clearTimeout(casePanelCloseTimer);
                casePanelCloseTimer = null;
            }

            menu.classList.remove("mobile-case-closing");
            menu.classList.add("mobile-case-open");
            caseTrigger.setAttribute("aria-expanded", "true");

            if (casePanel) {
                casePanel.setAttribute("aria-hidden", "false");
            }
        }

        caseTrigger.addEventListener("click", function (event) {
            event.preventDefault();
            openCaseStudiesPanel();
        });

        caseBack.addEventListener("click", function (event) {
            event.preventDefault();
            closeCaseStudiesPanel(true);
        });

        menu.addEventListener("toggle", function () {
            if (!menu.open) {
                closeCaseStudiesPanel(false);
            }
        });

        menu.querySelectorAll(".mobile_case_studies_panel a").forEach(function (link) {
            link.addEventListener("click", function () {
                closeCaseStudiesPanel(false);
            });
        });
    });
})();
