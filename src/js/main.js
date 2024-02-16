/*
window.electronAPI.traffic((_event, value) => {
    $("#uploadRateText").text(dataConverter(value.CurrentUploadRate, '1','1'));
    $("#downloadRateText").text(dataConverter(value.CurrentDownloadRate, '1','1'));
    $("#downloadText").text(dataConverter(value.CurrentDownload, '0','0'));
    $("#uploadText").text(dataConverter(value.CurrentUpload, '0','0'));
    $("#totalDownloadText").text(dataConverter(value.TotalDownload, '0','0'));
    $("#TotalUploadText").text(dataConverter(value.TotalUpload, '0','0'));
    $("#totalTimeText").text(getLongTime(value.TotalConnectTime));
    $("#timeText").text(getShortTime(value.CurrentConnectTime));

})*/

//--------------------------------------------------------------------

var is4G = false;
var is4Gplus = false;
var is2G = false;
var is3G = false;
var is5G = false;
var is5GPoint = false;
var isBit = true;
var isBits = false;
var isLongID = false;
var havename = false;
var haveread = false;
var nroption = '';
var rscp = 0;
var smsCount;
var intervalID;
var cell_id = '';
var lac = '';
var arfcn = '';
var monitor = [1, 2, 3, 4, 5, 7, 8, 11, 12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 26, 28, 29, 30, 31, 32, 34, 37, 38, 39, 40, 41, 42, 43, 44, 46, 47, 48, 49, 50, 51, 52, 53];

//********************** TxPower ******************/
var min = -20;  //minimum
var vl = 0;		// very Low
var lo = 5;		// low
var nl = 10;	// normal
var high = 10;	// high
var max = 23;	// max




//--------------------------------------------------------------------

window.electronAPI.signal((_event, value) => {
	console.log(value);
	var MC = value.plmn.slice(0,3);
	var MN = value.plmn.slice(-2);
	var rssi = value.rssi;
	var pci = value.pci;
	var cell_id = value.cell_id;
	var _4gRsrp = value.rsrp;
	var _4gRsrq = value.rsrq;
	var _4gSinr = value.sinr;
	var _4gUlbandwidth = value.ulbandwidth;
	var _4gDlbandwidth = value.dlbandwidth;
	var _4gTxpower = value.txpower;
	var _4ulfrequency = value.ulfrequency;
	var _4dlfrequency = value.dlfrequency;
	var ul_mcs = value.ul_mcs;
	var dl_mcs = value.dl_mcs;
	var _4gEarfcn = value.earfcn;
	var rrc_status = value.rrc_status;
	var band = value.band;
	var nei_cellid = value.nei_cellid;
	var transmode = value.transmode;
	var enodeb_id = value.enodeb_id;
	//5G
	var nrulbandwidth = value.nrulbandwidth;
	var nrdlbandwidth = value.nrdlbandwidth;
	var nrulmcs = value.nrulmcs;
	var nrdlmcs = value.nrdlmcs;
	var nrtxpower = value.nrtxpower;
	var nrearfcn = value.nrearfcn;
	var nrulfreq = value.nrulfreq;
	var nrdlfreq = value.nrdlfreq;
	var nrsinr = value.nrsinr;
	var nrrsrp = value.nrrsrp;
	var nrrsrq = value.nrrsrq;
	var rxlev = value.rxlev;



	var hex = Number(cell_id).toString(16);
	//var rssi, rsrp, rsrq, sinr;
	is4G = true;
	//-----------------4G--------------//
	if (is4G == true || is4Gplus == true) {
		var hex2 = hex.substring(0, hex.length - 2);
		var enbid = parseInt(hex2, 16);
		var hex3 = hex.substring(hex.length - 2, hex.length);
		var shortcid = parseInt(hex3, 16);
		//TODO: PLace ever thing in the place;
		//$('#enbi').html(enbid + '/' + shortcid);
		/*
		<!--
		<p class="PCI"></p>
		<p class="CELL_ID"></p>
		<p class="RSSI"></p>
		<p class="TR-MODE"></p>
		=========================== 4G ===========================
		<p class="4G-RSRQ">1</p>
		<p class="4G-RSRP">1</p>
		<p class="4G-SINR">1</p>
		<p class="4G-ULBANDWIDTH">1</p>
		<p class="4G-DLBANDWIDTH">1</p>
		<p class="4G-TXPOWER">1</p>
		<p class="4G-UL_MCS">1</p>
		<p class="4G-DL_MCS">1</p>
		<p class="4G-EARFCN">1</p>
		<p class="4G-BAND">1</p>
		<p class="4G-TRANSMODE">1</p>
		<p class="4G-ULFREQUENCY">1</p>
		<p class="4G-DLFREQUENCY">1</p>
		=========================== 5G ===========================
		<p class="5G-NRULMCS">1</p>
		<p class="5G-ULBANDWIDTH">1</p>
		<p class="5G-DLBANDWIDTH">1</p>
		<p class="5G-NRTXPOWER">1</p>
		<p class="5G-NREARFCN">1</p>
		<p class="5G-NRULFREQ">1</p>
		<p class="5G-NRDLFREQ">1</p>
		<p class="5G-NRSINR">1</p>
		<p class="5G-NRRSRP">1</p>
		<p class="5G-NRRSRQ">1</p> -->
		*/

		$("#PCI").html(pci);

		$("#MC").html(MC);

		$("#MN").html(MN);

		$("#CELL_ID").html(cell_id);

		$("#TR-MODE").html(transmode);

		$("#ENODEB_ID").html(enodeb_id);

		$("#4G-UL_MCS").html(ul_mcs.replace('mcsUpCarrier1:', ''));

		$("#4G-DL_MCS").html('Code0:' + dl_mcs.slice(dl_mcs.indexOf('Code0:')+6, dl_mcs.indexOf(' ')) + '</b>' + 'Code1:' + dl_mcs.slice(dl_mcs.indexOf('Code1:') + 6));

		$("#4G-EARFCN").html(_4gEarfcn);


		$("#RRC_STATUS").html(rrc_status);

		$("#4G-BAND").html('B' + band);

		$("#NEI_CELLID").html(nei_cellid);

		$("#5G-NRULFREQ").html(nrulfreq);

		$("#5G-NRDLFREQ").html(nrdlfreq);

		$("#5G-NREARFCN").html(nrearfcn);
		
		$("#5G-NRULMCS").html(nrulmcs.replace('NRmcsUpCarrier1:', ''));

		$("#5G-NRDLMCS").html('Code0:' + nrdlmcs.slice(nrdlmcs.indexOf('Code0:')+6, nrdlmcs.indexOf(' ')) + '</b>' + 'Code1:' + nrdlmcs.slice(nrdlmcs.indexOf('Code1:') + 6));
		

		
		rssi = StringFormat(rssi.replace('dBm', ''));
		$("#RSSIText").html(rssi+'<sup class="small">%</sup>');
		$("#RSSIdata").attr("data-value",positiveStr(rssi));
		
		_4gSinr = StringFormat(_4gSinr.replace('dBm', ''));
		$("#4G-SINRText").html(_4gSinr+'<sup class="small">%</sup>');
		$("#4G-SINRdata").attr("data-value",positiveStr(_4gSinr));

		_4gRsrp = StringFormat(_4gRsrp.replace('dBm', ''));
		$("#4G-RSRPText").html(_4gRsrp+'<sup class="small">%</sup>');
		$("#4G-RSRPdata").attr("data-value",positiveStr(_4gRsrp));

		_4gRsrq = StringFormat(_4gRsrq.replace('dBm', ''));
		$("#4G-RSRQText").html(_4gRsrq+'<sup class="small">%</sup>');
		$("#4G-RSRQdata").attr("data-value",positiveStr(_4gRsrq));

		//=========|5G=========//

		nrsinr = StringFormat(nrsinr.replace('dBm', ''));
		$("#5G-NRSINRText").html(nrsinr+'<sup class="small">%</sup>');
		$("#5G-NRSINRdata").attr("data-value",positiveStr(nrsinr));

		nrrsrp = StringFormat(nrrsrp.replace('dBm', ''));
		$("#5G-NRRSRPText").html(nrrsrp+'<sup class="small">%</sup>');
		$("#5G-NRRSRPdata").attr("data-value",positiveStr(nrrsrp));

		nrrsrq = StringFormat(nrrsrq.replace('dBm', ''));
		$("#5G-NRRSRQText").html(nrrsrq+'<sup class="small">%</sup>');
		$("#5G-NRRSRQdata").attr("data-value",positiveStr(nrrsrq));

		//nrtxpower = StringFormat(nrrsrq.replace('dBm', ''));
		//$("#5G-NRRSRQText").html(nrtxpower+'<sup class="small">%</sup>');
		var tx = nrtxpower.slice(nrtxpower.indexOf('PPucch:') + 7, nrtxpower.indexOf('PSrs:') - 4);
		calculateTxPower(tx);
		var percent = parseInt((tx - (-20)) * 100 / (23 - (-20)));
		$("#5G-NRTXPOWERdata").attr("data-value",percent);


		if (nrtxpower == '') {
			$('#5G-NRTXPOWERText').html('');
			//$("#nrtxreading").css('background', calcnrtxcolor('', -20, 0, 5, 10, 20, 23));
		} else {
			$('#5G-NRTXPOWERText').html(nrtxpower.slice(7, nrtxpower.indexOf('PPucch') - 4) + ',' + nrtxpower.slice(nrtxpower.indexOf('PPucch:') + 7, nrtxpower.indexOf('PSrs:') - 4));
			//nrtxpower = nrtxpower.slice(nrtxpower.indexOf('PPucch:') + 7, nrtxpower.indexOf('PSrs:') - 4);
			//$("#nrtxreading").css('background', calcnrtxcolor(tx, -20, 0, 5, 10, 20, 23));
		}


		if (_4gUlbandwidth == "20MHz") {
			$("#4G-ULBANDWIDTH").html("20MHz </b> Very Good");
		} else if (_4gUlbandwidth == "15MHz") {
			$("#4G-ULBANDWIDTH").html("15MHz </b> Good");
		} else if (_4gUlbandwidth == "10MHz") {
			$("#4G-ULBANDWIDTH").html("10MHz </b> Normal");
		} else if (_4gUlbandwidth == "5MHz") {
			$("#4G-ULBANDWIDTH").html("5MHz </b> Bad");
		} else {
			$("#4G-ULBANDWIDTH").html(_4gUlbandwidth+"</b> Very Bad");
		}

		if (_4gDlbandwidth == "20MHz") {
			$("#4G-DLBANDWIDTH").html("20MHz </b> Very Good");
		} else if (_4gDlbandwidth == "15MHz") {
			$("#4G-DLBANDWIDTH").html("15MHz </b> Good");
		} else if (_4gDlbandwidth == "10MHz") {
			$("#4G-DLBANDWIDTH").html("10MHz </b> Normal");
		} else if (_4gDlbandwidth == "5MHz") {
			$("#4G-DLBANDWIDTH").html("5MHz </b> Bad");
		} else {
			$("#4G-DLBANDWIDTH").html(_4gDlbandwidth+"</b> Very Bad");
		}

		$("#4G-ULFREQUENCY").text(_4ulfrequency);
		$("#4G-DLFREQUENCY").text(_4dlfrequency);

		if (nrulbandwidth == "100MHz") {
			$("#5G-ULBANDWIDTH").html("100MHz </b> Very Good");
		} else if (nrulbandwidth == "90MHz") {
			$("#5G-ULBANDWIDTH").html("90MHz </b> Good");
		} else if (nrulbandwidth == "80MHz") {
			$("#5G-ULBANDWIDTH").html("80MHz </b> Normal");
		} else if (nrulbandwidth == "70MHz") {
			$("#5G-ULBANDWIDTH").html("70MHz </b> Bad");
		} else {
			$("#5G-ULBANDWIDTH").html(nrulbandwidth+"</b> Very Bad");
		}

		if (nrdlbandwidth == "100MHz") {
			$("#5G-DLBANDWIDTH").html("100MHz </b> Very Good");
		} else if (nrdlbandwidth == "90MHz") {
			$("#5G-DLBANDWIDTH").html("90MHz </b> Good");
		} else if (nrdlbandwidth == "80MHz") {
			$("#5G-DLBANDWIDTH").html("80MHz </b> Normal");
		} else if (nrdlbandwidth == "70MHz") {
			$("#5G-DLBANDWIDTH").html("70MHz </b> Bad");
		} else {
			$("#5G-DLBANDWIDTH").html(nrdlbandwidth+"</b> Very Bad");
		}

		


		/*
		rsrq = strA($xml.find('rsrq').text().replace('dB', ''));
		$('#rsrq').html($xml.find('rsrq').text().replace('dB', '').replace('<', '').replace('=', '').replace('>', '') + " dB");
		$("#rsrqreading").css('background', calccolor6(rsrq, -30, -20, -15, -10, -6, 0));
		sinr = strA($xml.find('sinr').text().replace('dB', ''));
		$('#sinr').html($xml.find('sinr').text().replace('dB', '').replace('<', '').replace('=', '').replace('>', '') + " dB");
		$("#sinrreading").css('background', calccolor7(sinr, -15, 3, 10, 15, 22, 30));
		$('#marginrf').html(($xml.find('rsrp').text().replace('dBm', '')) - ($xml.find('rssi').text().replace('dBm', '')) + " dBm");
		$("#rfreading").css('background', calcFRcolor((rsrp - rssi), -30, -29, -28, -27, -26, -25, -24, 10));
	*/
	}

})

function routerSignalStrength(value,type){
	var color;
	var text;
	switch (type) {
		case "SINR":

			if(value>=25){
				color = '#06B708';
				text = "Excellent";
			}else if(value>=20){
				color = '#06B708';
				text = "Very Good";
			}else if(value>=15){
				color = '#E8D70D';
				text = "Good";
			}else if(value >= 10){
				color = '#AE0000';
				text = "Average";
			}else if(value >= 5){
				color = '#AE0000';
				text = "Weak";
			}else if(value >= 0){
				color = '#AE0000';
				text = "Bad";
			}else{
				color = '#470000';
				text = "Poor";
			}
			
			break;
		case "RSRQ":

			if(value>=-6){
				color = '#06B708';
				text = "Excellent";
			}else if(value>=-10){
				color = '#06B708';
				text = "Very Good";
			}else if(value>=-12){
				color = '#E8D70D';
				text = "Good";
			}else if(value >= -14){
				color = '#AE0000';
				text = "Average";
			}else if(value >= -16){
				color = '#AE0000';
				text = "Weak";
			}else if(value >= -18){
				color = '#AE0000';
				text = "Bad";
			}else{
				color = '#470000';
				text = "Poor";
			}
		
			break;
		case "RSRP":

			if(value>=-80){

			}else if(value>=-90){

			}else if(value >= -100){

			}else{
				
			}
		
			break;
	
		default:
			break;
	}
}

function calculateTxPower(tx){
	var text;
	if (tx < min) tx = min;
	if (tx > max) tx = max;
	tx = parseInt(tx);
	var maxe = max*1.8695;
	var fx = Math.round((maxe + tx)-23);



	var R1 = (fx / maxe)*207;
	var R2 = (fx / maxe)*13;

	var G1 = (fx / maxe)*17;
	var G2 = (fx / maxe)*160;

	var B1 = (fx / maxe)*17;
	var B2 = (fx / maxe)*239;

	var MR = Math.round((207 + R1)-194);
	var MG = Math.round((17 + G2)-143);
	var MB = Math.round((17 + B2)-222);


	if (tx >= max) {
		text = "Bad";

	} else if (tx >= high) {
		text = "Weak";

	} else if (tx >= nl) {
		text = "Midlde";

	} else if (tx >= lo) {
		text = "Good";

	} else if (tx >= vl) {
		text = "V.Good";

	} else {
		text = "Excellent";

	}
	
	console.log((MR)+","+(MG)+","+(MB));

	$(".progress").each(function() {
		  
		var left = $(this).find('.progress-left .progress-bar');
		var right = $(this).find('.progress-right .progress-bar');
	
		right.css('border-color','rgba('+(MR)+","+(Math.abs(MG))+","+(Math.abs(MB))+',1)');
		left.css('border-color','rgba('+(MR)+","+(Math.abs(MG))+","+(Math.abs(MB))+',1)');
	
	  })
	
	//return 'linear-gradient(to right, ' + color + ' ' + percent + '%, hsla(0,0%,100%,0.0) ' + whitepercent + '%)';
}

function positiveStr(str){
	str = str.replace('-','');
	return str;
}

function StringFormat(str){
	str = str.replace('&gt;=', '');
	str = str.replace('&amp;lt;=', '');
	str = str.replace('&lt;', '');
	str = str.replace('>', '');
	str = str.replace('<', '');
	str = str.replace('=', '');
	str = str.replace('NaN', '0');
	return str;
}
/*
window.electronAPI.deviceInfo((_event, value) => {
	console.log(value);
	var DeviceName = value.DeviceName;
	var WanIPAddress = value.WanIPAddress;
	var SerialNumber = value.SerialNumber;
	var Imei = value.Imei;
	var Imsi = value.Imsi;
	var Iccid = value.Iccid;
	var Msisdn = value.Msisdn;
	var HardwareVersion = value.HardwareVersion;
	var SoftwareVersion = value.SoftwareVersion;
	var WebUIVersion = value.WebUIVersion;
	var MacAddress1 = value.MacAddress1;
	var MacAddress2 = value.MacAddress2;
	var wan_dns_address = value.wan_dns_address;
	var WanIPv6Address = value.WanIPv6Address;
	var wan_ipv6_dns_address = value.wan_ipv6_dns_address;
	var ProductFamily = value.ProductFamily;
	var Classify = value.Classify;
	var supportmode = value.supportmode;
	var workmode = value.workmode;
	var submask = value.submask;
	var Mccmnc = value.Mccmnc;
	var iniversion = value.iniversion;
	var ImeiSvn = value.ImeiSvn;
	var WifiMacAddrWl0 = value.WifiMacAddrWl0;
	var WifiMacAddrWl1 = value.WifiMacAddrWl1;
	var spreadname_en = value.spreadname_en;
	
	$('#deviceName').text(DeviceName);
	if (WanIPAddress == "") {
		$('#WanIPAddress').text(value.SecondWanIPAddress)
	} else {
		$('#WanIPAddress').text(WanIPAddress);
	}
	checkForAvailability(SerialNumber,"SerialNumber");
	checkForAvailability(spreadname_en,"spreadname_en");
	checkForAvailability(Imei,"Imei");
	checkForAvailability(Imsi,"Imsi");
	checkForAvailability(Iccid,"Iccid");
	checkForAvailability(Msisdn,"Msisdn");
	checkForAvailability(HardwareVersion,"HardwareVersion");
	checkForAvailability(SoftwareVersion,"SoftwareVersion");
	checkForAvailability(WebUIVersion,"WebUIVersion");
	checkForAvailability(MacAddress1,"MacAddress1");
	checkForAvailability(MacAddress2,"MacAddress2");
	checkForAvailability(wan_dns_address,"wan_dns_address");
	checkForAvailability(wan_ipv6_dns_address,"wan_ipv6_dns_address");
	checkForAvailability(WanIPv6Address,"WanIPv6Address");
	checkForAvailability(ProductFamily,"ProductFamily");
	checkForAvailability(Classify,"Classify");
	checkForAvailability(supportmode,"supportmode");
	checkForAvailability(workmode,"workmode");
	checkForAvailability(submask,"submask");
	checkForAvailability(Mccmnc,"Mccmnc");
	checkForAvailability(iniversion,"iniversion");
	checkForAvailability(ImeiSvn,"ImeiSvn");
	checkForAvailability(WifiMacAddrWl0,"WifiMacAddrWl0");
	checkForAvailability(WifiMacAddrWl1,"WifiMacAddrWl1");
})*/

function checkForAvailability(attribute,id){
	if (attribute == "") {
		$("#"+id).hide();
	} else {
		$("#"+id).show();
		$("#"+id).html(attribute);
	}
}
/*
window.electronAPI.status((_event, value) => {
	console.log(value);

	var ConnectionStatus = connectionStatus(value.ConnectionStatus);
	var NetworkTypeEx = networkTypeEx(value.CurrentNetworkTypeEx);
	var SignalStrength = value.SignalIcon;
	var SignalStrength_5G = value.SignalIconNr;
	var PrimaryDns = value.PrimaryDns;
	var SecondaryDns = value.SecondaryDns;
	var PrimaryIPv6Dns = value.PrimaryIPv6Dns;
	var SecondaryIPv6Dns = value.SecondaryIPv6Dns;
	var BatteryPercent = value.BatteryPercent;
	var SimStatus = value.SimStatus;
	var CurrentWifiUser = value.CurrentWifiUser;
	var currenttotalwifiuser = value.currenttotalwifiuser;
	var usbup = value.usbup;

	if(ConnectionStatus === "Connected"){
		console.log("Connected");
		$("#ConnectionStatuisIcon").attr('src','../img/connected.png');
	}else if(ConnectionStatus === "Connecting"){
		console.log("Connecting");
		$("#ConnectionStatuisIcon").attr('src','../img/connecting.png');
	}else if(ConnectionStatus === "Connection error"){
		console.log("Something Wrong");
		$("#ConnectionStatuisIcon").attr('src','../img/network-problem.png');
	}else{
		console.log("Failed");
		console.log(ConnectionStatus);
		$("#ConnectionStatuisIcon").attr('src','../img/no-Connection.png');
	}
/*
	//TODO: we will see what will happend here;
	/*
	if (NetworkTypeEx == 'LTE CA (4G+)') {
		$("#mode").css('color', '#007dff');
	} else if (NetworkTypeEx == 'LTE (4G)') {
		$("#mode").css('color', '#00f600');
	} else {
		$("#mode").css('color', '#f3a5f3');
	}*/
/*	if (value.EndcStatus == "1") {
		is5GPoint = true;
	} else {
		is5GPoint = false;
	}

	$('#NetWorkMode').text(NetworkTypeEx);

	if (is5G == true) {
		switch (SignalStrength_5G) {
			case 1:
				$(".signal-bars").toggleClass('bad');
				$(".signal-bars").toggleClass('good');
				$(".signal-bars").toggleClass('one-bar');
				break;
			case 2:
				$(".signal-bars").toggleClass('two-bars');
				$(".signal-bars").toggleClass('bad');
				$(".signal-bars").toggleClass('good');
				break;
			case 3:
				$(".signal-bars").toggleClass('three-bars');
				$(".signal-bars").toggleClass('ok');
				$(".signal-bars").toggleClass('good');
				break;
			case 4:
				$(".signal-bars").toggleClass('four-bars');
				break;
			default:
				break;
		}
	}

	switch (SignalStrength) {
		case 1:
			$(".signal-bars").toggleClass('bad');
			$(".signal-bars").toggleClass('good');
			$(".signal-bars").toggleClass('one-bar');
			break;
		case 2:
			$(".signal-bars").toggleClass('two-bars');
			$(".signal-bars").toggleClass('bad');
			$(".signal-bars").toggleClass('good');
			break;
		case 3:
			$(".signal-bars").toggleClass('three-bars');
			$(".signal-bars").toggleClass('ok');
			$(".signal-bars").toggleClass('good');
			break;
		case 4:
			$(".signal-bars").toggleClass('four-bars');
			break;
		default:
			break;
	}
	
	//TODO: we will see what will happend here;
	//$('#RoamingStatus').html(($xml.find('RoamingStatus').text() == 0 ? "No" : "Yes"));

	if (PrimaryDns == "") {
		$("#PrimaryDNS").hide();
	} else {
		$("#PrimaryDNS").show();
		$('#PrimaryDNS').html('PrimaryDNS: '+PrimaryDns + '&nbsp;&nbsp;&nbsp;' + 'SecondaryDns: '+ SecondaryDns);
	}

	if (PrimaryIPv6Dns == "") {
		$("#PrimaryIPv6DNS").hide()
	} else {
		$("#PrimaryIPv6DNS").show();
		$('#PrimaryIPv6DNS').html('PrimaryDNS: '+PrimaryIPv6Dns + '&nbsp;&nbsp;&nbsp;' + 'SecondaryDns: '+ SecondaryIPv6Dns);
	}

	if (BatteryPercent == "") {
		$("#BatteryPercent").css('display', 'none');
	} else {
		var strbattery = BatteryPercent + '%';
		if (usbup == '1' || value.BatteryStatus == '1') {
			strbattery = strbattery + '\u26A1';
		}
		$("#BatteryPercent").css('display', '');
	}
	$('#BatteryPercent').html(strbattery);

	if (currenttotalwifiuser == '') {
		$('#currenttotalwifiuser').html(CurrentWifiUser);
	} else {
		$('#currenttotalwifiuser').html(CurrentWifiUser + '/' + currenttotalwifiuser);
	}

})*/

function networkTypeEx(type) {
	var Array_types = ["No service", "GSM (2G)", "GPRS (2G)", "EDGE (2G)", "UMTS (3G)", "HSDPA (3G)", "HSUPA (3G)", "HSPA (3G)", "TDSCDMA", "HSPA+ (3.5G)", "EVDO rev.0", "EVDO rev.A", "EVDO rev.B", "1xRTT", "UMB", "1xEVDV", "3xRTT", "HSPA+64QAM", "HSPA+MIMO", "LTE (4G)", "LTE CA (4G+)", "NR (5G)", "IS95A", "IS95B", "CDMA1X", "EVDO rev.0", "EVDO rev.A", "EVDO rev.B", "Hybrid CDMA 1X", "Hybrid EVDO rev.0", "Hybrid EVDO rev.A", "Hybrid EVDO rev.B", "EHRPD rev.0", "EHRPD rev.A", "EHRPD rev.B", "The hybrid EHRPD rev.0", "The hybrid EHRPD rev.A", "The hybrid EHRPD rev.B"]
	var Array_types_2 = ["UMTS (3G)", "HSDPA (3G)", "HSUPA (3G)", "HSPA (3G)", "HSPA+ (3.5G)", "DC-HSPA+ (3.5G)"]
	if (type == 0) return 'No service';
	if (type == 1) return 'GSM (2G)';
	if (type == 2) return 'GPRS (2G)';
	if (type == 3) return 'EDGE (2G)';
	if (type == 21) return 'IS95A';
	if (type == 22) return 'IS95B';
	if (type == 23) return 'CDMA 1X';
	if (type == 24) return 'EVDO rev.0';
	if (type == 25) return 'EVDO rev.A';
	if (type == 26) return 'EVDO rev.B';
	if (type == 27) return 'HYBRID CDMA 1X';
	if (type == 28) return 'HYBRID EVDO rev.0';
	if (type == 29) return 'HYBRID EVDO rev.A';
	if (type == 30) return 'HYBRID EVDO rev.B';
	if (type == 31) return 'eHRPD rel.0';
	if (type == 32) return 'eHRPD rel.A';
	if (type == 33) return 'eHRPD rel.B';
	if (type == 34) return 'HYBRID eHRPD rel.0';
	if (type == 35) return 'HYBRID eHRPD rel.A';
	if (type == 36) return 'HYBRID eHRPD rel.B';
	if (type == 41) return 'UMTS (3G)';
	if (type == 42) return 'HSDPA (3G)';
	if (type == 43) return 'HSUPA (3G)';
	if (type == 44) return 'HSPA (3G)';
	if (type == 45) return 'HSPA+ (3.5G)';
	if (type == 46) return 'DC-HSPA+ (3.5G)';
	if (type == 61) return 'TD-SCDMA (3G)';
	if (type == 62) return 'TD-HSDPA (3G)';
	if (type == 63) return 'TD-HSUPA (3G)';
	if (type == 64) return 'TD-HSPA (3G)';
	if (type == 65) return 'TD-HSPA+ (3.5G)';
	if (type == 81) return '802.16E';
	if (type == 101) return 'LTE (4G)';
	if (type == 1011) return 'LTE CA (4G+)';
	if (type == 111) return 'NR (5G)';
	if (type < 37) return " " + Array_types[type];
	if (type < 47 && type > 40) return " " + Array_types_2[type - 41];
	if (type < 66 && type > 60) return " " + Array_types_2[type - 61];
	return ' ' + type;
}

function connectionStatus(mode) {
	switch (mode) {
		case "900":
			return "Connecting";
			break;
		case "901":
			return "Connected";
			break;
		case "902":
			return "Not connected";
			break;
		case "903":
			return "Disconnect";
			break;
		case "904":
			return "Connection failed";
			break;
		case "905":
			return "No service";
			break;
		case "906":
			return "Connection error";
			break;
		case "33":
			return "Disconnected";
			break;
		case "0":
			return "Disconnected";
			break;
		default:
			return mode;
	}
}



function sidebar(title){

	switch (title) {
		case "monitor":
			$(".nav-title").text("Monitor");
			break;
		case "signal":
			$(".nav-title").text("Signal");
			break;
		case "wifi":
			$(".nav-title").text("Wifi");
			break;
		case "deviceInfo":
			$(".nav-title").text("Device information");
			break;
	
		default:
			break;
	}

    $( "div #pages" ).each(function( ) {
        $(this).removeClass("active");
    });
    $("."+title).addClass("active");
}

$( document ).ready(function() {

	$("#Sig-advanced").click(function() {
		$("#charts").toggleClass("hide");
		$('.contenet-continer').animate({
			scrollTop: $(".signal").height()
		}, 500);
	});
	build_Signal();
	dash();



	//PROGESSS
	  
});


	function dash(){
		$(function() {

			$(".progress").each(function() {
		  
			  var value = $(this).attr('data-value');
			  var left = $(this).find('.progress-left .progress-bar');
			  var right = $(this).find('.progress-right .progress-bar');
		  
			  if (value > 0) {
				if (value <= 50) {
				  right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
				  left.css('transform', 'rotate(' + percentageToDegrees(0) + 'deg)')
				} else {
				  right.css('transform', 'rotate(180deg)')
				  left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
				}
			  }
		  
			})
		  
			function percentageToDegrees(percentage) {
		  
			  return percentage / 100 * 360
		  
			}
		  
		  });
		  setTimeout(() => {
			dash();
			}, 500);
	}
	



function build_Signal(){
	const TextCard = ["PCI","CELL_ID","ENODEB_ID","MC","MN","TR-MODE","4G-ULBANDWIDTH","4G-DLBANDWIDTH","4G-UL_MCS","4G-DL_MCS","4G-EARFCN","4G-BAND","4G-ULFREQUENCY"
	,"4G-DLFREQUENCY","5G-NRULMCS","5G-NRDLMCS","5G-NREARFCN","5G-NRULFREQ","5G-NRDLFREQ","RRC_STATUS","5G-ULBANDWIDTH","5G-DLBANDWIDTH"]
	const chartList = ["4G-RSRQ","4G-RSRP","4G-SINR","RSSI","4G-TXPOWER","5G-NRTXPOWER","5G-NRSINR","5G-NRRSRP","5G-NRRSRQ"]
	TextCard.forEach(element => {
		$(".signal-contianer").append(
			'<div class="col-xl-3 col-lg-6 mb-4">'+
			'<div class="bg-white rounded-lg p-5 shadow">'+
			  '<h2 class="h6 font-weight-bold text-center mb-4">'+element+'</h2>'+

			  '<div class="CardInfo mx-auto">'+
			  '<span class="progress-left">'+
				'<span class="progress-bar border-primary"></span>'+
			  '</span>'+
			  '<span class="progress-right">'+
				'<span class="progress-bar border-primary"></span>'+
			  '</span>'+
			  '<div class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">'+
				'<div class="h2 font-weight-bold" id="'+element+'">10<sup class="small"></sup></div>'+
			  '</div>'+
			'</div>'+

			  '<!-- Demo info -->'+
			  '<div class="row text-center mt-4">'+
				'<div class="col-6 border-right">'+
				  '<div class="h4 font-weight-bold mb-0">28%</div><span class="small text-gray">Last week</span>'+
				'</div>'+
				'<div class="col-6">'+
				  '<div class="h4 font-weight-bold mb-0">60%</div><span class="small text-gray">Last month</span>'+
				'</div>'+
			  '</div>'+
			  '<!-- END -->'+
			'</div>'+
		  '</div>');
	});
	chartList.forEach(element => {

		$(".signal-contianer").append(
			'<div class="col-xl-3 col-lg-6 mb-4">'+
			'<div class="bg-white rounded-lg p-5 shadow">'+
			  '<h2 class="h6 font-weight-bold text-center mb-4">'+element+'</h2>'+

			  '<div id="'+element+'data" class="progress mx-auto" '+"data-value='90'>"+
				'<span class="progress-left">'+
				  '<span class="progress-bar border-primary1"></span>'+
				'</span>'+
				'<span class="progress-right">'+
				  '<span class="progress-bar border-primary1"></span>'+
				'</span>'+
				'<div class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">'+
				  '<div class="h2 font-weight-bold" id="'+element+'Text">10<sup class="small">%</sup></div>'+
				'</div>'+
			  '</div>'+
			  '<!-- END -->'+
			  '<!-- Demo info -->'+
			  '<div class="row text-center mt-4">'+
				'<div class="col-6 border-right">'+
				  '<div class="h4 font-weight-bold mb-0">28%</div><span class="small text-gray">Last week</span>'+
				'</div>'+
				'<div class="col-6">'+
				  '<div class="h4 font-weight-bold mb-0">60%</div><span class="small text-gray">Last month</span>'+
				'</div>'+
			  '</div>'+
			  '<!-- END -->'+
			'</div>'+
		  '</div>');

		$("#charts").append('<div class="col-xl-6 col-lg-6 mb-4">'+
		'<canvas id="Chart_'+element+'" class="chart""></canvas>'+
		'</div>');

			
		const config = {
			type: 'line',
			data: {
			  datasets: [
				{
					label: element,
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
					borderColor: 'rgb(255, 99, 132)',
					fill: false,
					data: []
				}
			  ]
			},
			options: {
			  scales: {
				x: {
				  type: 'realtime',
				  realtime: {
					duration: 5000,
					refresh: 2000,
					delay: 2000,
					onRefresh: chart => {
						console.log($("#4G-RSRPdata").attr("data-value"));
						const now = Date.now();
						chart.data.datasets.forEach(dataset => {
						  dataset.data.push({
							x: now,
							y: Math.floor((Math.random() * 100) - 50)//Rsrp 
						  });
						});
					}
				  }
				}
			  }
			}
		  };
	
		const myChart = new Chart(
		document.getElementById('Chart_'+element),
		config
		);

	});
	
}


function dataConverter(bytes, isSpeed, toBit) {
	if (bytes <= -1) return 0;
	if (toBit == '0') {
		if (bytes < 1024) {
			bytes = bytes + 'B';
		} else if (bytes < 1048576) {
			bytes = parseInt(bytes / 1024 * 100) / 100 + 'KB';
		} else if (bytes < 1073741824) {
			bytes = parseInt(bytes / 1048576 * 100) / 100 + 'MB';
		} else if (bytes < 1099511627776) {
			bytes = parseInt(bytes / 1073741824 * 100) / 100 + 'GB';
		} else if (bytes < 1125899906842624) {
			bytes = parseInt(bytes / 1099511627776 * 100) / 100 + 'TB';
		}
	} else {
		if (bytes < 128) {
			bytes = bytes * 8 + 'b';
		} else if (bytes < 128000) {
			bytes = parseInt(bytes / 1.28) / 100 + 'Kb';
		} else if (bytes < 128000000) {
			bytes = parseInt(bytes / 1280) / 100 + 'Mb';
		} else if (bytes < 128000000000) {
			bytes = parseInt(bytes / 1280000) / 100 + 'Gb';
		}
	}
	return bytes;
}

function dataConverter2(bytes) {
	if (bytes >= yb) {
		bytes = (bytes / yb).toFixed(2) * 100 / 100 + " YB";
	} else if (bytes >= zb) {
		bytes = (bytes / zb).toFixed(2) * 100 / 100 + " ZB";
	} else if (bytes >= eb) {
		bytes = (bytes / eb).toFixed(2) * 100 / 100 + " EB";
	} else if (bytes >= pb) {
		bytes = (bytes / pb).toFixed(2) * 100 / 100 + " PB";
	} else if (bytes >= tb) {
		bytes = (bytes / tb).toFixed(2) * 100 / 100 + " TB";
	} else if (bytes >= gb) {
		bytes = (bytes / gb).toFixed(2) * 100 / 100 + " GB";
	} else if (bytes >= mb) {
		bytes = (bytes / mb).toFixed(2) * 100 / 100 + " MB";
	} else if (bytes >= kb) {
		bytes = (bytes / kb).toFixed(2) * 100 / 100 + " KB";
	} else if (bytes > 1) {
		bytes = bytes + " B";
	} else if (bytes == 1) {
		bytes = bytes + " B";
	} else {
		bytes = "0 B";
	}
	return bytes;
}


function getShortTime(totalSeconds) {
	var hours = Math.floor(totalSeconds / 3600);
	totalSeconds %= 3600;
	var minutes = Math.floor(totalSeconds / 60);
	var seconds = totalSeconds % 60;
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	return hours + ":" + minutes + ":" + seconds;
}

function getLongTime(seconds) {
	var numdays = Math.floor(seconds / 86400);
	var numhours = Math.floor((seconds % 86400) / 3600);
	var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
	var numseconds = ((seconds % 86400) % 3600) % 60;
	if (numdays < 1) {
		numdays = "";
	}
	if (numdays > 0) {
		numdays = numdays + " days ";
	}
	return numdays + numhours + ":" + numminutes + ":" + numseconds;
}
