(function () {
    'use strict';

    if (!("FormData" in window) || !("FileReader" in window)) {
        return;
    }
    var form = document.querySelector(".form"),
        area = form.querySelector(".upload-images__list"),
        template = document.querySelector("#image-template").innerHTML,


        usernameList = form.querySelector(".username"),
        templateUser = document.querySelector("#username-template").innerHTML,

        queue = [];

    function request(data, fn) {
        var xhr = new XMLHttpRequest(),
            time = (new Date()).getTime();
        xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState == 4) {
                fn(xhr.responseText);
            }
        });
        xhr.send(data);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var data = new FormData(form);
        request(data, function (response) {
            console.log(response);
        });
    });



    form.querySelector("#file").addEventListener("change", function () {
        var files = this.files;
        for (var i = 0; i < files.length; i++) {
            preview(files[i]);
        }
        this.value = "";
    });

    function preview(file) {
        var reader = new FileReader();
        reader.addEventListener("load", function (event) {
            var html = Mustache.render(template, {
                "image": event.target.result,
                "name": file.name
            });

            var li = document.createElement("li");
            li.classList.add("upload-images__item");
            li.innerHTML = html;
            area.appendChild(li);
            li.querySelector(".upload-images__del-link").addEventListener("click",
                function (event) {
                    event.preventDefault();
                    removePreview(li);
                });


            queue.push({
                "file": file,
                "li": li
            });
        });
        reader.readAsDataURL(file);
    }


    function removePreview(li) {
        queue = queue.filter(function (element) {
            return element.li != li;
        });
        li.parentNode.removeChild(li);
    }
    var elements = document.querySelectorAll(".form-counter");
    for (var i = 0; i < elements.length; i++) {
        initNumberField(elements[i]);
    }

    function initNumberField(parent) {
        var input = parent.querySelector("input");
        var minus = parent.querySelector(".form-counter__btn--minus");
        var plus = parent.querySelector(".form-counter__btn--plus");

        minus.addEventListener("click", function (e) {
            e.preventDefault();
            changeNumber(false);
        });

        plus.addEventListener("click", function (e) {
            e.preventDefault();
            changeNumber(true);
        });

        function changeNumber(operation) {
            var value = Number(input.value);
            if (isNaN(value)) {
                value = 0;
            }
            if (operation) {
                input.value = value + 1;
                addUser();
            } else {
                input.value = value - 1;
            }
        }
    }

    function addUser() {
        var html = Mustache.render(templateUser);

        var li = document.createElement("li");
        li.classList.add("username__item");
        li.innerHTML = html;

        usernameList.appendChild(li);

        li.querySelector(".username__remove").addEventListener("click",
            function (event) {
                var item = document.querySelector(".username__item");
                item.parentNode.removeChild(item);

                var newCounter = document.querySelectorAll(".username__item").length;

                document.querySelector("#counterUsers").value = newCounter;
            });
    }

    var removing = document.querySelectorAll(".username__remove");
    for (var i = 0; i < removing.length; i++) {
        removing[i].addEventListener("click", function () {
            var item = document.querySelector(".username__item");
            item.parentNode.removeChild(item);
        });
    }

    var toggler = document.querySelector(".main-nav__toggle");
    toggler.addEventListener("click", function () {
        document.querySelector(".main-nav").classList.toggle("main-nav--hide-block");
        document.querySelector(".header__top-menu").classList.toggle("header__top-menu--cross");
        document.querySelector(".header__title").classList.toggle("header__title--cross");
        this.classList.toggle("main-nav__toggle--close");
    });


})();
