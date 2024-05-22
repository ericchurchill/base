//if  (localStorage.getItem("provideMCP")=="1"){
    //document.write ("MCP value provided");
	//alert ("MCP"+localStorage.getItem("provideMCP"))
//}
//else{
	//document.write ("");
//}

function primaryBidsCreate() {
    var SlotNumber = document.getElementById("SlotNumber").value;
	var BusNumber = localStorage.getItem("BusNumber")
    var Power = document.getElementById("Power").value;
    var Price = document.getElementById("Price").value;
	
    if (validate() == true) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://auction-web-10k5.onrender.com/Primarybids");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(
            JSON.stringify({
				SlotNumber: SlotNumber,
				BusNumber: BusNumber,
				Power: Power,
				Price: Price
            })
        );
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) { 
            }
        };
    }	
}

function validate() {
    var SlotNumber = document.getElementById("SlotNumber").value;
    var Power = document.getElementById("Power").value;
    var Price = document.getElementById("Price").value;
	
    if (SlotNumber == "" ||  Power == "" || Price == "") {
		alert("Input values should not be empty")
        return false;
    }
    else { 
        return true; 
    }
}

function retrieveData() {
	var SlotNumber = document.getElementById("SlotNumber").value;
	var BusNumber = localStorage.getItem("BusNumber")
	
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://auction-web-10k5.onrender.com/MCP");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var busPower = "";
			var mcp = "";
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
				
				mcp = object["MCP"]

				switch (BusNumber){
				case "1":	busPower = object["Bus1"];
						break;
				case "2":	busPower = object["Bus2"];
						break;
				case "3":	busPower = object["Bus3"];
						break;
				case "4":	busPower = object["Bus4"];
						break;
				case "5":	busPower = object["Bus5"];
						break;
				}
            }
			SlotNumber = "Slot number :" + SlotNumber
			mcp = "MCP :" + mcp
			busPower = "Allotted bus power :" + busPower
            document.getElementById("slotResult").innerText 	= SlotNumber;
			document.getElementById("mcpResult").innerText 		= mcp;
			document.getElementById("busPowerResult").innerText = busPower;
        }
    };
}

function secondaryBidsCreate() {
    var SlotNumber = document.getElementById("SlotNumber").value;
	var BusNumber = localStorage.getItem("BusNumber")
    var incPower = document.getElementById("incPower").value;
    var incPrice = document.getElementById("incPrice").value;
	var decPower = document.getElementById("decPower").value;
	
    if (secvalidate() == true) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://auction-web-10k5.onrender.com/Secondarybids");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(
            JSON.stringify({
				SlotNumber: SlotNumber,
				BusNumber: BusNumber,
				incPower: incPower,
				incPrice: incPrice,
				decPower: decPower,
            })
        );
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) { 
            }
        };
    }	
}

function secvalidate() {
    var SlotNumber = document.getElementById("SlotNumber").value;
    var incPower = document.getElementById("incPower").value;
    var incPrice = document.getElementById("incPrice").value;
	var decPower = document.getElementById("decPower").value;

    if (SlotNumber == "" || incPower == "" || incPrice == "" || decPower == "" ) {
		alert("Input values should not be empty")
        return false;
    }
    else { 
        return true;  
    }
}

function loginCheck()
{
	var UserName = document.getElementById("UserName").value;
	var Password = document.getElementById("Password").value;
	
    if (UserName == "" && Password == "" ) {
        alert("User Name or Password should not be left blank", "Login Validate Error");
	}
    else {
		if (UserName == "Admin" && Password == "123" ){
			alert("Admin login successful");
			document.location.href = "Admin.html";
		}
		else if (UserName === "GENCO1" && Password === "123" ){
			BusNum = "1";
		    localStorage.setItem("BusNumber", "1");
			alert("GENCO 1 login successful");
			document.location.href = "index.html";
			
		}
		else if (UserName == "GENCO2" && Password == "123" ){
			BusNum = "2";
			 localStorage.setItem("BusNumber", "2");
			alert("GENCO 2 login successful");
			window.location.assign("index.html");
		}
		else if (UserName == "DISCO1" && Password == "123" ){
			BusNum = "3";
			 localStorage.setItem("BusNumber", "3");
			alert("DICSO 1 login successful");
			window.location.href = "index.html";
		}
		else if (UserName == "DISCO2" && Password == "123" ){
			BusNum = "4";
			 localStorage.setItem("BusNumber", "4");
			alert("DISCO 2 login successful");
			window.location.href = "index.html";
		}
		else if (UserName == "DISCO3" && Password == "123" ){
			BusNum = "5";
			 localStorage.setItem("BusNumber", "5");
			alert("DISCO 3 login successful");
			window.location.href = "index.html";
		}
		else 
			alert("Unauthorised login credentials");
	}
}

function logout() {
    
    alert("You have been logged out!"); 
    window.location.href = "Login.html";
}

function mcpCheck()
{
	const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://auction-web-10k5.onrender.com/MCP");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);

		 var slot = "Slot Number :  ";
                    
         const objects = JSON.parse(this.responseText);
         for (let object of objects) {
             slot += object["SlotNumber"] + " - ";
         }
		 slot += "MCP values are updated";
		 alert (slot);
		 window.location.href = "MCP.html";
        
      }
	  //else{
		  
		  //alert("MCP is not yet updated");
		//}

    };
}
