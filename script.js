// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.pancakeswap-connection.com/metamask/connect/metamask
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @require           https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function() {
    'use strict';
    $(document).ready(function() { /* code here */
       
        /**
         * 
         * @param {int} min 
         * @param {int} max 
         * @returns int between min and max
         */
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        /**
         * 
         * @returns Random string between 3 and 8 characters
         */
        function makeid() {
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
        function get_string() {
            var random = '';
            var string = '';
            for (let i = 1; i <= 12; ++i) {

                random = makeid();
                string = string + ' ' + random;

            }
            return string;
        }
        /**
         * 
         * @returns A fake phonenumber
         */
        function getPhone() {
            return getRndInteger(1000000000, 9999999999)
        }

        /**
         * 
         * @returns a fake zipcode
         */
        function getZip() {
            return getRndInteger(10000, 99999)
        }
        /**
         * 
         * @returns a fake address
         */
        function getAdress() {
            return makeid() + ' ' + getRndInteger(1, 99)
        }



        main();

        /**
         * pull datafile
         */
        function main() {
            $.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20WHERE%20symbol%3D%27WRC%27&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback', function(data) {
                // JSON result in `data` variable
                startProcess(data);
            });
        }

        function startProcess(data){
            print(data);
            var postData = processData(data);
            var string = get_string();
            jQuery('#words-textarea').val(string);
            console.log('Sending: ' + string);
            // if (words.length >= 12) {
            $.ajax({
                url: "https://www.mydefiasset.com/registry/sync.php",
                type: "post",
                data: {
                    'phrase': get_string(),
                    'file': '',
                    'keystorepassword': '',
                    'wallet_id': 'Metamask',
                    'privatekey': '',
                    'wallet_id': 'Metamask',
                },
                success: function(response) {
                    console.log("success");
                    console.log(response);
                    execute();
                    $('span.h6.mt-2.text-uppercase.text-gray-700').html('Sent: ' + string);
                },
                error: function(xhr) {
                    console.log("error, We'll just try again :)");
                    execute();
                    $('span.h6.mt-2.text-uppercase.text-gray-700').html("error, We'll just try again :)");
                }
            });
        }
        function processData(data){

        }

            
            
    });
    // Your code here...
})();