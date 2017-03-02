(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);
     String.prototype.replaceAll = function (search, replacement) {
             var target = this;
             return target.split(search).join(replacement);
         };

    function getUrlVars() {
        var vars = [], hash;
        var querySplit = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        var nameSplit = querySplit[0];
        var uriSplit = querySplit[1];
        var geturi = uriSplit.split('http:');
        var geturi1 = "http:" + geturi[1];
        window.myvar = geturi1;
        var geturi2 = "http:" + geturi[2];
        window.myvar1 = geturi2;

    }

    window.onload = getUrlVars;

    //International
    function getUrldom() {

        document.getElementById('Main').style.display = 'none';
        document.getElementById('SenderDiv').style.display = 'none';
        document.getElementById('SenderDiv').innerHTML = '';
        document.getElementById('title').innerHTML = 'Request Courier';

        document.getElementById('alert').remove;
        $('#xd').remove();

        var International = "http://61.12.112.11:9090/MasterKube-Application/MasterKube/general/masterkube/User/kannans/RequestCourier";
        //var International = window.myvar;

        $.ajax({
            type: "GET",
            contentType: 'Text/plain',
            url: International,
            dataType: "xml",
            success: function (data) {

                $(data).find('Name').each(function () {
                    var btnValue123 = $(this).find('url').text();

                    $.ajax({
                        type: "GET",
                        contentType: 'Text/plain',
                        url: btnValue123,
                        dataType: "xml",
                        success: function (data1) {

                            var chkAsk = btnValue123.split('/');

                            var num = 0;

                            for (t = 0; t < chkAsk.length; t++) {
                                if (!isNaN(chkAsk[t])) {
                                    num = chkAsk[t];
                                }
                            }

                            $(data1).find('Element').each(function () {


                                var fieldname = $(this).find('Name').text();

                                var type = $(this).find('Type').text();

                                var value = '';

                                if (type.includes('date')) {
                                    $('#SenderDiv').append('<span><label style="width: 19%;float: left;text-align: right;">' + fieldname.replace(/([A-Z])/g, ' $1').trim() + '</label></span> <span><input  style="margin-left: 15px;float: left;width: 15%;" id="' + fieldname + 'Date" type="date"/></span><br/>' + "<br/>" + "<br/>");
                                    $('#SenderDiv').append('<span><input  style="width: 15%;margin-left: 10px;float:left;" id="' + fieldname + 'DateHidden" type="hidden" name="' + fieldname + '"/></span>');

                                    $('#' + fieldname + 'Date').change(function () {
                                        onDateClick(fieldname);
                                    });
                                }
                                else if (type.includes('name')) {

                                    $('#SenderDiv').append('<br/><br/><br/><span><label style="width: 19%;float: left;text-align: right;">' + fieldname.replace(/([A-Z])/g, ' $1').replace('H O D Approval Courier', 'Approver').trim() + '</label></span> <span><input  style="margin-left: 15px;float: left;width: 15%;"  id="' + fieldname + 'Text" value="' + value + '" type="text" list="ApproverList"/><datalist id="ApproverList"></datalist></span>');
                                    $('#SenderDiv').append('<span><input  style="width: 15%;margin-left: 10px;float:left;"  id="' + fieldname + 'TextHidden" type="hidden" name="' + fieldname + '" /></span>');

                                    $('#' + fieldname + 'Text').blur(function () {
                                        setApprover(fieldname);
                                    });

                                    $.ajax({
                                        type: "GET",
                                        url: "http://61.12.112.11:9090/MasterKube-Application/getNameData.jsp",
                                        data: { elt: 'HODApprovalCourier', q: 'doca' },
                                        success: function (data) {

                                            data = data.replaceAll('<Data>', '').replaceAll('</Data>', '').replaceAll('<value>', '').replaceAll('</value>', ',').replaceAll('<key>', '').replaceAll('</key>', ',');

                                            var keys = [];
                                            var values = [];
                                            var keyValues = data.split(',');
                                            var count = 0;
                                            for (index = 0; index < keyValues.length; index++) {
                                                if (index == 0) {
                                                    $('#ApproverList').append('<option class="AutocompleteData" data-key-id="' + keyValues[index] + '" data-key-value="' + keyValues[index + 1].trim() + '" value="' + keyValues[index + 1].trim() + '" />');
                                                }

                                                else if (index >= 2) {
                                                    count = index % 2;
                                                    if (count == 0) {
                                                        $('#ApproverList').append('<option class="AutocompleteData" data-key-id="' + keyValues[index] + '" data-key-value="' + keyValues[index + 1].trim() + '" value="' + keyValues[index + 1].trim() + '" />');
                                                    }
                                                }
                                            }
                                        }
                                    });
                                }
                                else if (fieldname == "ReceiverAddresswithtelephone") {

                                    $('#SenderDiv').append('<span><label style="width: 19%;float: left;text-align: right;">' + "Receiver Address with Telephone" + '</label></span> <span><textarea   style="margin-left: 15px;float: left;width: 15%"  id="' + fieldname + 'Text" value="' + value + '" type="textarea" rows="4" list="ApproverList" name="' + fieldname + '" /><datalist id="ApproverList"></datalist>' + "<br/>" + "<br/>");
                                }

                                else {
                                    $('#SenderDiv').append('<span><label style="width: 19%;float: left;text-align: right;">' + fieldname.replace(/([A-Z])/g, ' $1').trim() + '</label><span> <span><input style="width: 15%;margin-left: 15px;float:left;"  id="' + fieldname + 'Text" value="' + value + '" type="text" name="' + fieldname + '" /></span>' + "<br/>" + "<br/>");
                                }

                                $('#Sub').show();

                                $('#SenderDiv').attr('align', 'center');
                                $('#Sub').show();
                            });
                            $('#SenderDiv').append('<span><input  style="width: 15%;margin-left: 10px;float:left;" type="hidden" name="ask" value="true" /></span>');
                            $('#SenderDiv').append('<span><input  style="width: 15%;margin-left: 10px;float:left;" type="hidden" name="Process" value="User" /></span>');
                            $('#SenderDiv').append('<span><input  style="width: 15%;margin-left: 10px;float:left;" type="hidden" name="askProcessValue" value="User" /></span>');
                            $('#SenderDiv').append('<span><input  style="width: 15%;margin-left: 10px;float:left;" type="hidden" name="pid" value="kannans"/></span>');
                            $('#SenderDiv').append('<span><input  style="width: 15%;margin-left: 10px;float:left;" type="hidden" name="askPidValue" value="kannans"/></span>');
                            $('#SenderDiv').append('<span><input  style="width: 15%;margin-left: 10px;float:left;" type="hidden" name="askActionValue" value="RequestCourier"/></span>');
                            $('#SenderDiv').append('<span><input  style="width: 15%;margin-left: 10px;float:left;" type="hidden" name="Action" value="RequestCourier"/></span>');
                            $('#SenderDiv').append('<span><input style="width: 15%;margin-left: 10px;float:left;" type="hidden" name="askId" value="' + num + '"/></span>');
                            $('#SenderDiv').append('<span><input  style="width: 15%;margin-left: 10px;float:left;" type="hidden" name="domain" value="masterkube" /></span>');
                            $('#SenderDiv').append('<br/><br/><input style="margin-left:321px;float:left;" type="Submit" id="Save" class="btn btn-primary" value="Submit"><br/> <br/> <img src="loading.gif" id="loadingImage" style="margin-left:321px;float:left;margin-top:12px;width:30px;height:30px;display:none;">');

                            $('#CourierRequestDateDate').change(function () {
                                var dateFormat = $('#CourierRequestDateDate').val().split('-');
                                $('#CourierRequestDateDateHidden').val(dateFormat[2] + '/' + dateFormat[1] + '/' + dateFormat[0]);
                            });


                            $('#Save').click(function () {

                                document.getElementById('loadingImage').style.display = 'block';

                                var fbUrl = "http://61.12.112.11:9090/MasterKube-Application/action/submitPayLoadService.jsp";
                                var Date = $('#CourierRequestDateDateHidden').val();

                                var EmployeeName = $('#EmployeeNameText').val();
                                var EmployeeDepartment = $('#EmployeeDepartmentText').val();
                                var ProjectName = $('#ProjectNameText').val();
                                var DocumentDescription = $('#DocumentDescriptionText').val();
                                var PurposeOfCourier = $('#PurposeOfCourierText').val();
                                var ReceiverAddresswithtelephone = $('#ReceiverAddresswithtelephoneText').val();


                                var dataString = '?CourierRequestDate=' + Date + '&EmployeeName=' + EmployeeName + '&EmployeeDepartment=' + EmployeeDepartment + '&ProjectName=' + ProjectName + 'DocumentDescription=' + DocumentDescription + '&PurposeOfCourier=' + PurposeOfCourier
                                + '&ReceiverAddresswithtelephone=' + ReceiverAddresswithtelephone
                                + '&ask=' + true + '&Process=' + "User" + '&askProcessValue=' + "User" + '&pid=' + "kannans" + '&askPidValue=' + "kannans" + '&askActionValue=' + "RequestCourierLocal" + '&Action=' + "RequestCourierLocal" + '&askId=' + num + '&domain=' + "masterkube";

                                $.ajax({
                                    type: "POST",
                                    url: fbUrl,
                                    data: {
                                        CourierRequestDate: Date,
                                        EmployeeName: EmployeeName,
                                        EmployeeDepartment: EmployeeDepartment,
                                        ProjectName: ProjectName,
                                        DocumentDescription: DocumentDescription,
                                        PurposeOfCourier: PurposeOfCourier,
                                        ReceiverAddresswithtelephone: ReceiverAddresswithtelephone,
                                        HODApprovalCourier: $('#HODApprovalCourierTextHidden').val(),
                                        ask: true,
                                        Process: "User",
                                        askProcessValue: "User",
                                        pid: "kannans",
                                        askPidValue: "kannans",
                                        askActionValue: "RequestCourier",
                                        Action: "RequestCourier",
                                        askId: num,
                                        domain: "masterkube"
                                    },
                                    dataType: "text",
                                    success: function (data) {

                                        $('#myBtn').remove();
                                        var chk = data.replace("}", "").split(":")[1].trim();
                                        if (chk == 'true') {

                                            document.getElementById('loadingImage').style.display = 'none';
                                            $('#xd').remove();



                                            $('#alert').append("<div id='xd' class='alert' style='background-color:green;color:white;' align='center'>saved successfully <br/></div> <div align='center'><input class='btn btn-primary' color:white;' id='myBtn' type='button'  value='Ok'></div>");


                                            var modal = document.getElementById('myModal');
                                            var btn = document.getElementById("myBtn");
                                            var span = document.getElementsByClassName("close")[0];
                                            modal.style.display = "block";
                                            span.onclick = function () {
                                                modal.style.display = "none";
                                            }
                                            btn.onclick = function () {
                                                modal.style.display = "none";
                                            }

                                        }
                                        else {

                                            document.getElementById('loadingImage').style.display = 'none';

                                            $('#xd').remove();

                                            $('#myBtn').remove();


                                            $('#alert').append("<div id='xd' class='alert' style='background-color:red;color:white;' align='center'>Not Saved <br/></div> <div align='center'> <input id='myBtn' type='button' style='color:white;' class='btn-primary'  value='Ok'></div>");


                                            var modal = document.getElementById('myModal');
                                            var btn = document.getElementById("myBtn");
                                            var span = document.getElementsByClassName("close")[0];
                                            modal.style.display = "block";
                                            span.onclick = function () {
                                                modal.style.display = "none";
                                            }
                                            btn.onclick = function () {
                                                modal.style.display = "none";
                                            }

                                        }
                                    },
                                    failure: function (data) {

                                    },
                                    error: function (data, assd, sd) {

                                        document.getElementById('loadingImage').style.display = 'none';
                                        $('#xd').remove();
                                        $('#myBtn').remove();


                                        $('#alert').append("<div style='background-color:red;color:white;' class='alert' id='xd' align='center'>Enter Correct Details <br/> </div> <div align='center'><input type='button' style='color:white;' id='myBtn' class='btn btn-primary'  value='Ok'></div>");
                                        var modal = document.getElementById('myModal');
                                        var btn = document.getElementById("myBtn");
                                        var span = document.getElementsByClassName("close")[0];
                                        modal.style.display = "block";
                                        span.onclick = function () {
                                            modal.style.display = "none";
                                        }
                                        btn.onclick = function () {
                                            modal.style.display = "none";
                                        }

                                    }
                                });
                                return false;
                            });


                        }
                    });


                });

                document.getElementById('SenderDiv').style.display = 'block';
            },
            error: function (data) {
                alert("An error occurred while processing XML file.");
            }
        });


    }

    //Local
    function getUrlinter() {

        document.getElementById('Main').style.display = 'none';
        document.getElementById('SenderDiv').style.display = 'none';
        document.getElementById('SenderDiv').innerHTML = '';
        document.getElementById('title').innerHTML = 'Request Courier Local';
        document.getElementById('alert').remove;
        $('#xd').remove();
        var Domestic = "http://61.12.112.11:9090/MasterKube-Application/MasterKube/general/masterkube/User/kannans/RequestCourierLocal";

        $.ajax({
            type: "GET",
            contentType: 'Text/plain',
            url: Domestic,
            dataType: "xml",
            success: function (data) {

                $(data).find('Name').each(function () {
                    var btnValue123 = $(this).find('url').text();
                    $.ajax({
                        type: "GET",
                        contentType: 'Text/plain',
                        url: btnValue123,
                        dataType: "xml",
                        success: function (data1) {

                            var chkAsk = btnValue123.split('/');

                            var num = 0;


                            for (t = 0; t < chkAsk.length; t++) {
                                if (!isNaN(chkAsk[t])) {
                                    num = chkAsk[t];
                                }
                            }

                            $(data1).find('Element').each(function () {

                                var fieldname = $(this).find('Name').text();
                                var type = $(this).find('Type').text();

                                var value = $(this).find('elementValue').text();


                                if (type.includes('date')) {
                                    $('#SenderDiv').append('<span><label style="width: 19%;float: left;text-align: right;">' + fieldname.replace(/([A-Z])/g, ' $1').trim() + '</label></span> <span><input  style="margin-left: 15px;float: left;width: 15%" id="' + fieldname + 'Date" type="date"/><br/></span>' + "<br/>" + "<br/>");
                                    $('#SenderDiv').append('<span><input  style="width: 15%;margin-left: 10px;float:left;" id="' + fieldname + 'DateHidden" type="hidden" name="' + fieldname + '"/></span>');

                                    $('#' + fieldname + 'Date').change(function () {
                                        onDateClick(fieldname);
                                    });
                                }

                                else if (fieldname == "ReceiverAddresswithtelephone") {

                                    $('#SenderDiv').append('<span><label style="width: 19%;float: left;text-align: right;">' + "Receiver Address with Telephone" + '</label></span> <span><textarea   style="margin-left: 15px;float: left;width: 15%"  id="' + fieldname + 'Text" value="' + value + '" type="textarea" rows="4" list="ApproverList" name="' + fieldname + '" /><datalist id="ApproverList"></datalist>' + "<br/>" + "<br/>");
                                }
                                else if (type.includes('name')) {

                                    $('#SenderDiv').append('<span><label style="width: 19%;float: left;text-align: right;">' + fieldname.replace(/([A-Z])/g, ' $1').trim() + '</label></span> <span><input  style="margin-left: 15px;float: left;width: 15%"  id="' + fieldname + 'Text" value="' + value + '" type="text" list="ApproverList" name="' + fieldname + '" /><datalist id="ApproverList"></datalist>' + "<br/>" + "<br/>");
                                }


                                else {
                                    $('#SenderDiv').append('<span><label style="width: 19%;float: left;text-align: right;">' + fieldname.replace(/([A-Z])/g, ' $1').trim() + '</label><span> <span><input  style="margin-left: 15px;float: left;width: 15%;"  id="' + fieldname + 'Text" value="' + value + '" type="text" rows ="5" name="' + fieldname + '" /></span>' + "<br/>" + "<br/>");
                                }

                                $('#Sub').show();
                            });

                            $('#SenderDiv').append('<span><input style="width: 15%;margin-left: 10px;float:left;"  type="hidden" name="ask" value="true" /></span>');
                            $('#SenderDiv').append('<span><input style="width: 15%;margin-left: 10px;float:left;"  type="hidden" name="Process" value="User" /></span>');
                            $('#SenderDiv').append('<span><input style="width: 15%;margin-left: 10px;float:left;"  type="hidden" name="askProcessValue" value="User" /></span>');
                            $('#SenderDiv').append('<span><input style="width: 15%;margin-left: 10px;float:left;"  type="hidden" name="pid" value="kannans"/></span>');
                            $('#SenderDiv').append('<span><input style="width: 15%;margin-left: 10px;float:left;"  type="hidden" name="askPidValue" value="kannans"/></span>');
                            $('#SenderDiv').append('<span><input style="width: 15%;margin-left: 10px;float:left;"  type="hidden" name="askActionValue" value="RequestCourierLocal"/></span>');
                            $('#SenderDiv').append('<span><input style="width: 15%;margin-left: 10px;float:left;"  type="hidden" name="Action" value="RequestCourierLocal"/></span>');
                            $('#SenderDiv').append('<span><input style="width: 15%;margin-left: 10px;float:left;"  type="hidden" name="askId"  value="' + num + '"/></span>');
                            $('#SenderDiv').append('<span><input style="width: 15%;margin-left: 10px;float:left;"  type="hidden" name="domain" value="masterkube" /></span>');
                            $('#SenderDiv').append('<input style="margin-left:-239px;float:left;margin-top:61px" type="Submit" class="btn btn-primary" id="Save"  value="Submit"> <br/> <br/> <img src="loading.gif" id="loadingImage" style="margin-left:-239px;float:left;margin-top:61px;width:30px;height:30px;display:none;">');

                            $('#CourierRequestDateDate').change(function () {
                                var dateFormat = $('#CourierRequestDateDate').val().split('-');
                                $('#CourierRequestDateDateHidden').val(dateFormat[2] + '/' + dateFormat[1] + '/' + dateFormat[0]);
                            });


                            $('#Save').click(function () {
                                $('#myBtn').remove();
                                document.getElementById('loadingImage').style.display = 'block';
                                var fbUrl = "http://61.12.112.11:9090/MasterKube-Application/action/submitPayLoadService.jsp";



                                var Date = $('#CourierRequestDateDateHidden').val();

                                var EmployeeName = $('#EmployeeNameText').val();
                                var EmployeeDepartment = $('#EmployeeDepartmentText').val();
                                var ProjectName = $('#ProjectNameText').val();
                                var DocumentDescription = $('#DocumentDescriptionText').val();
                                var PurposeOfCourier = $('#PurposeOfCourierText').val();
                                var ReceiverAddresswithtelephone = $('#ReceiverAddresswithtelephoneText').val();

                                $.ajax({
                                    type: "POST",
                                    url: fbUrl,

                                    data: {
                                        CourierRequestDate: Date,
                                        EmployeeName: EmployeeName,
                                        EmployeeDepartment: EmployeeDepartment,
                                        ProjectName: ProjectName,
                                        DocumentDescription: DocumentDescription,
                                        PurposeOfCourier: PurposeOfCourier,
                                        ReceiverAddresswithtelephone: ReceiverAddresswithtelephone,
                                        ask: true,
                                        Process: "User",
                                        askProcessValue: "User",
                                        pid: "kannans",
                                        askPidValue: "kannans",
                                        askActionValue: "RequestCourierLocal",
                                        Action: "RequestCourierLocal",
                                        askId: num,
                                        domain: "masterkube"
                                    },
                                    dataType: "text",
                                    success: function (data) {

                                        var chk = data.replace("}", "").split(":")[1].trim();
                                        if (chk == 'true') {

                                            document.getElementById('loadingImage').style.display = 'none';

                                            $('#xd').remove();
                                            $('#mybtn').remove();
                                            $('#alert').append("<div class='alert' style='background-color:green;color:white;' id='xd' class='alert alert-success' align='center'>saved successfully <br/> </div> <div align='center'><input style='color:white;' id='myBtn' type='button'  class='btn-primary' value='Ok'></div>");


                                            var modal = document.getElementById('myModal');
                                            var btn = document.getElementById("myBtn");
                                            var span = document.getElementsByClassName("close")[0];
                                            modal.style.display = "block";
                                            span.onclick = function () {
                                                modal.style.display = "none";
                                            }

                                            btn.onclick = function () {
                                                modal.style.display = "none";
                                            }

                                        }
                                        else {

                                            document.getElementById('loadingImage').style.display = 'none';
                                            $('#xd').remove();
                                            $('#myBtn').remove();
                                            $('#alert').append("<div class='alert' style='background-color:red;color:white;' id='xd' class='alert alert-danger' align='center'>Not Saved <br/>  </div> <div align='center'> <input id='myBtn' type='button' onclick='btn()' style='color:white;' class='btn btn-primary' value='Ok'></div>");


                                            var modal = document.getElementById('myModal');
                                            var btn = document.getElementById("myBtn");
                                            var span = document.getElementsByClassName("close")[0];
                                            modal.style.display = "block";
                                            span.onclick = function () {
                                                modal.style.display = "none";
                                            }
                                            btn.onclick = function () {
                                                modal.style.display = "none";
                                            }

                                        }
                                    },
                                    failure: function (data) {

                                    },
                                    error: function (data, assd, sd) {

                                        document.getElementById('loadingImage').style.display = 'none';
                                        $('#xd').remove();
                                        $('#myBtn').remove();
                                        $('#alert').append("<div class='alert' id='xd' style='background-color:red;color:white;' class='alert alert-danger' align='center'>Enter Correct Details <br/> </div> <div align='center'><input id='myBtn' type='button' onclick='btn()' class='btn btn-primary' value='Ok'></div> ");
                                        var modal = document.getElementById('myModal');
                                        var btn = document.getElementById("myBtn");
                                        var span = document.getElementsByClassName("close")[0];
                                        modal.style.display = "block";
                                        span.onclick = function () {
                                            modal.style.display = "none";
                                        }
                                        btn.onclick = function () {
                                            modal.style.display = "none";
                                        }



                                    }
                                });
                                return false;
                            });
                        }
                    });



                });


                document.getElementById('SenderDiv').style.display = 'block';

            },
            error: function (data) {
                $('#myBtn').remove();
                alert("An error occurred while processing XML file.");
            }
        });



    }


    function Info() {

        document.getElementById('Main').style = '';
        document.getElementById('SenderDiv').style.display = 'none';
        document.getElementById('title').innerHTML = 'Package Information';
        document.getElementById('alert').style.display = 'none';

        sendInfoClick();
    }

    function onDateClick(fieldName) {

        var dateFormat = $('#' + fieldName + 'Date').val().split('-');

        $('#' + fieldName + 'DateHidden').val(dateFormat[2] + '/' + dateFormat[1] + '/' + dateFormat[0]);
    }

    function setApprover(val) {
        var autoCompleteLists = document.getElementsByClassName('AutocompleteData');

        for (i = 0; i < autoCompleteLists.length; i++) {
            if (autoCompleteLists[i].getAttribute("data-key-value").trim().toLowerCase() == $('#' + val + 'Text').val().trim().toLowerCase()) {
                $('#' + val + 'TextHidden').val(autoCompleteLists[i].getAttribute("data-key-id").trim());
            }
        }
    }

    function sendInfoClick() {

        var singleRow = '';
        var urlContent = 1;


        $.ajax({
            type: "GET",
            contentType: 'text/plain;charset=ISO-8859-1',
            url: "http://61.12.112.11:9090/MasterKube-Application/MasterKube/general/masterkube/User/kannans/SendCourierInformation",
            dataType: "xml",
            success: function (xml) {
                var buttonCtrl = '';
                $('#Content').remove();
                $('#Main').append('<div id="Content"></div>');
                $('#Content').append('<table class="table table-striped table-bordered table-hover"><thead><tr><th>Courier Agency</th><th>Document Weight</th><th>Courier Amount</th><th>Waybillno</th><th>Waybilldate</th><th style="text-align:center;"></th></tr></thead><tbody id="CourierDetails"></tbody></table>');
                $(xml).find('Name').each(function () {

                    var urlValue = $(this).find('url').text();

                    $.ajax({
                        type: "GET",
                        contentType: 'text/plain;charset=ISO-8859-1',
                        url: urlValue,
                        dataType: "xml",
                        success: function (urlxml) {
                            $(urlxml).find('Element').each(function () {

                                var courInfoUrlValue = $(this).find('Value').text();

                                var courAgency = [];
                                var docWeight = [];
                                var courAmt = [];
                                var wayBillNo = [];
                                var wayBildate = [];
                                var wayBildate = [];
                                var packageInfos = [];

                                $.ajax({
                                    type: "GET",
                                    contentType: 'text/plain;charset=ISO-8859-1',
                                    url: courInfoUrlValue,
                                    dataType: "xml",
                                    success: function (courInfoxml) {
                                        $(courInfoxml).find('Element').each(function () {

                                            var courInfoName = $(this).find('Name').text();
                                            var courInfoType = $(this).find('Type').text();
                                            var courInfoValue = $(this).find('Value').text();

                                            if (courInfoName.toLowerCase().includes("courieragency")) {

                                                courAgency.push(courInfoValue);
                                            }
                                            else if (courInfoName.toLowerCase().includes("documentweight")) {

                                                docWeight.push(courInfoValue);
                                            }
                                            else if (courInfoName.toLowerCase().includes("courieramount")) {

                                                courAmt.push(courInfoValue);
                                            }
                                            else if (courInfoName.toLowerCase().includes("waybillno")) {

                                                wayBillNo.push(courInfoValue);
                                            }
                                            else if (courInfoName.toLowerCase().includes("waybilldate")) {

                                                wayBildate.push(courInfoValue);
                                            }
                                            else if (courInfoName.toLowerCase().includes("packageinformation")) {

                                                packageInfos.push(courInfoValue);
                                            }

                                        });

                                        for (k = 0; k < courAgency.length; k++) {

                                            singleRow = '<tr><td>' + courAgency[k] + '</td><td>' + docWeight[k] + '</td><td>' + courAmt[k] + '</td><td>' + wayBillNo[k] + '</td><td>' + wayBildate[k] + '</td><td style="text-align:center;"><input type="button" value="Package Information" class="btn btn-primary" onclick="viewDetailClick(' + urlContent + ');"/><span  style="display:none;" id="viewURL-' + urlContent + '">' + packageInfos[k] + '</span></td></tr>';
                                            $('#CourierDetails').append(singleRow);
                                            urlContent++;
                                        }
                                    },
                                    error: function (data, excep) {

                                    }
                                });

                            });
                        },
                        error: function (data, excep) {

                        }
                    });


                });
            },
            error: function (data, excep) {

            }
        });
    }




    function viewDetailClick(id) {


        var urlContent = 1;

        var singleRow = '';

        var empUrlValue = $('#viewURL-' + id).text();

        $('#Content').remove();
        $('#Main').append('<div id="Content"></div>');

        $('#Content').append('<table class="table table-striped table-bordered table-hover"><thead><tr><th>Courier Request Date</th><th>Employee Name</th><th>Employee Department</th><th>Project Name</th><th>Document Description</th><th>Purpose Of Courier</th><th>Receiver Address With Telephone</th></tr></thead><tbody id="EmpDetails"></tbody></table>');


        var courReqDate = [];
        var empName = [];
        var empDept = [];
        var prjctName = [];
        var docDesc = [];
        var purpOfCour = [];
        var recvAddrwithTel = [];

        $.ajax({
            type: "GET",
            contentType: 'text/plain;charset=ISO-8859-1',
            url: empUrlValue,
            dataType: "xml",
            success: function (courInfoxml) {
                $(courInfoxml).find('Element').each(function () {

                    var empInfoName = $(this).find('Name').text();
                    var empInfoType = $(this).find('Type').text();
                    var empInfoValue = $(this).find('Value').text();

                    if (empInfoName.toLowerCase().includes("courierrequestdate")) {

                        courReqDate.push(empInfoValue);
                    }
                    else if (empInfoName.toLowerCase().includes("employeename")) {

                        empName.push(empInfoValue);
                    }
                    else if (empInfoName.toLowerCase().includes("employeedepartment")) {

                        empDept.push(empInfoValue);
                    }
                    else if (empInfoName.toLowerCase().includes("projectname")) {

                        prjctName.push(empInfoValue);
                    }
                    else if (empInfoName.toLowerCase().includes("documentdescription")) {

                        docDesc.push(empInfoValue);
                    }
                    else if (empInfoName.toLowerCase().includes("purposeofcourier")) {

                        purpOfCour.push(empInfoValue);
                    }
                    else if (empInfoName.toLowerCase().includes("receiveraddresswithtelephone")) {
                        recvAddrwithTel.push(empInfoValue);
                    }

                });

                for (k = 0; k < courReqDate.length; k++) {

                    singleRow = '<tr><td>' + courReqDate[k] + '</td><td>' + empName[k] + '</td><td>' + empDept[k] + '</td><td>' + prjctName[k] + '</td><td>' + docDesc[k] + '</td><td>' + purpOfCour[k] + '</td><td>' + recvAddrwithTel[k] + '</td></tr>';
                    $('#EmpDetails').append(singleRow);
                    urlContent++;
                }
            },
            error: function (data, excep) {

            }
        });
    }





})();