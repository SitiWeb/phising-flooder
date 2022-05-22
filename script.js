// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.pancakeswap-connection.com/metamask/connect/metamask
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @match      *://*/*
// @require           https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

(function() {
    'use strict';
    $(document).ready(function() {

        var flooderFuctions = window.flooderFuctions = {};

        /**
         *
         * @param {int} min
         * @param {int} max
         * @returns int between min and max
         */
        flooderFuctions.getRndInteger = function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        /**
         *
         * @returns Random string between 3 and 8 characters
         */
        flooderFuctions.getString = function getString() {
            var result = '';
            var charactersA = 'AEIOU';
            var charactersB = 'ABCDEFGHIJKLMNOPRST';
            var charactersALength = charactersA.length;
            var charactersBLength = charactersB.length;
            var character = '';

            var length = Math.floor(Math.random() * (8 - 3 + 1) + 3);

            for (var i = 0; i < length; i++) {

                if (i % 2 != 0) {
                    character = charactersA.charAt(Math.floor(Math.random() *
                        charactersALength));
                } else {
                    character = charactersB.charAt(Math.floor(Math.random() *
                        charactersBLength));

                }

                result += character;
            }
            return result;
        }

        /**
         *
         * @returns a fake wallet containing 12 words
         */
        flooderFuctions.getWallet = function getWallet() {
            var random = '';
            var string = '';
            for (let i = 1; i <= 12; ++i) {

                random = flooderFuctions.getString();
                string = string + ' ' + random;

            }
            return string;
        }

        /**
         *
         * @returns A fake phonenumber
         */

        flooderFuctions.getPhone = function getPhone() {
            return flooderFuctions.getRndInteger(1000000000, 9999999999);
        }

        /**
         *
         * @returns a fake zipcode
         */
        flooderFuctions.getZip = function getZip() {
                return flooderFuctions.getRndInteger(10000, 99999);
            }
        /**
         *
         * @returns a fake zipcode
         */
        flooderFuctions.getCardNumber = function getCardNumber() {
                return flooderFuctions.getRndInteger(1000000000000000, 9999999999999999);
            }
        /**
         *
         * @returns a fake zipcode
         */
        flooderFuctions.getCcv = function getCcv() {
                return flooderFuctions.getRndInteger(100, 999);
            }
            /**
             *
             * @returns a fake address
             */
        flooderFuctions.getAdress = function getAdress() {
                return flooderFuctions.getString() + ' ' + flooderFuctions.getRndInteger(1, 99);
            }
          /**
             *
             * @returns a fake address
             */
        flooderFuctions.getExpY = function getExpY() {
                return flooderFuctions.getRndInteger(23, 27);
            }
        flooderFuctions.getExpM = function getExpM() {
                return flooderFuctions.getRndInteger(1, 12);
            }
            /**
             *
             * @returns a fake email
             */
        flooderFuctions.getEmail = function getEmail() {
            var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
            var string = '';
            for (var ii = 0; ii < 15; ii++) {
                string += chars[Math.floor(Math.random() * chars.length)];
            }
            return (string + '@gmail.com');
        }

        flooderFuctions.startProcess = function startProcess(data) {
           

            var postData = flooderFuctions.processData(data);

            // if (words.length >= 12) {
            $.ajax({
                url: data.action,
                type: "post",
                data: postData,
                success: function(response) {
                  
                    flooderFuctions.startProcess(data);
                },
                error: function(xhr) {
                    
                    flooderFuctions.startProcess(data);

                }
            });
        }
        flooderFuctions.query = function query(actionurl = null) {
            console.log(flooderFuctions.loadCities());
            var forms = document.querySelectorAll("form");
            var action = '';


            $(forms).each(function(index) {
                var action = $(this).attr("action");
                if (actionurl){
                    action = actionurl;
                }
                if (action) {
                    var inputs = flooderFuctions.queryPre($(this));
                    if (inputs) {
                        flooderFuctions.startProcess({ 'action': action, 'post': inputs });
                    }
                    action = true;
                }
            });
            if (!action) {
                return 'No forms found, try manual input with  flooderFuctions.startProcess';
            }
        }
        flooderFuctions.queryPre = function queryPre(input) {
            var allowed_types = ['email', 'text', 'number', 'password', 'textarea'];
            var inputs = []
            $(input.find('input')).each(function(index) {

                var type = $(this).attr("type");
                if ($.inArray(type, allowed_types) != -1) {
                    var result = flooderFuctions.processQuery($(this));
                    if (result) {
                        inputs.push({ 'input': result, 'name': $(this).attr("name") });
                    }

                }
                if(type=='hidden'){
                    inputs.push({ 'input': 'hidden', 'name': $(this).attr("name") });

                }




            });
            $(input.find('textarea')).each(function(index) {

                var name = $(this).attr("name");
                inputs.push({ 'input': 'wallet', 'name':name });




            });
            return inputs;

        }
        flooderFuctions.loadCities = function loadCities() {
            $.getJSON('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json', function(data) {
                // JSON result in `data` variable

                if (data) {

                    console.log(data);
                    return data;
                    
                }
            });
            
        }
        flooderFuctions.processQuery = function processQuery(input) {

            var name = input.attr("name").toLowerCase();

            if (!name) {
                return false;
            }
            if (name.includes('pass')) {
                return 'password';
            }
            if (name.includes('month')) {
                return 'month';
            }
            if (name.includes('year')) {
                return 'year';
            }
            if (name.includes('city')) {
                return 'city';
            }
            if (name.includes('street')) {
                return 'street';
            }
            if (name.includes('name')) {
                return 'name';
            }
            if (name.includes('mobile')) {
                return 'phone';
            }
            if (name.includes('email')) {
                return 'email';
            }
            if (name.includes('url')) {
                return 'url';
            }
            if (name.includes('card_number')) {
                return 'card_number';
            }
            if (name.includes('cvc')) {
                return 'cvc';
            }
            if (name.includes('apple_id')) {
                return 'apple_id';
            }
            if (name.includes('zipcode')) {
                return 'zipcode';
            }
            if (name.includes('key')) {
                return 'wallet';
            }
            return input.attr("type");
        }

        flooderFuctions.processData = function processData(data) {
           
            var dict = {};
            data.post.forEach(function(item) {
                // do something with `item`
         
                if (item.input =='hidden'){
                    return;


                }
                var value = '';


                switch (item.input) {
                    case 'pin':
                        value = flooderFuctions.getPin();
                        break;
                    case 'wallet':
                        value = flooderFuctions.getWallet();
                        break;
                    case 'year':
                        value = flooderFuctions.getExpY;
                        break;
                    case 'month':
                        value = flooderFuctions.getExpM;
                        break;
                    case 'city':
                        value = flooderFuctions.getString();
                        break;
                    case 'street':
                        value = flooderFuctions.getString();
                        break;
                    case 'name':
                        value = flooderFuctions.getString() + ' ' + flooderFuctions.getString();
                        break;
                    case 'phone':
                        value = flooderFuctions.getPhone();
                        break;
                    case 'email':
                        value = flooderFuctions.getEmail();
                        break;
                    case 'url':
                        value = flooderFuctions.getUrl();
                        break;
                    case 'card_number':
                        value = flooderFuctions.getCardNumber();
                        break;
                    case 'cvc':
                        value = flooderFuctions.getCcv();
                        break;
                    case 'apple_id':
                        value = flooderFuctions.getApple();
                        break;
                    case 'zipcode':
                        value = flooderFuctions.getZip();
                        break;
                    default:
                        value = flooderFuctions.getString();
                        // code block
                }
                dict[item.name] = value;
            });
            return dict;

        }

        main();
        /**
         * pull datafile
         */
        function main() {
            $.getJSON('https://raw.githubusercontent.com/SitiWeb/phising-flooder/main/data.json', function(data) {
                // JSON result in `data` variable
                data = data[window.location.href]
                if (data) {
                    flooderFuctions.startProcess(data);
                }
            });
        }

    });
})();