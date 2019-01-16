/*
1)open index.html
2) load file data.json
3) poke on buttons (to delete you need input number-field)
*/


var dataModel;

function parseFile(fileContent){
    if (dataModel!=undefined){
        var content = JSON.parse(fileContent);
        dataModel.setCurrentAccount(Array.from(content["CurrentAccount"]));
        dataModel.setSavingAccount(Array.from(content["SavingAccount"]));

        console.log(dataModel.getCurrentAccount().length);
        console.log(dataModel.getSavingAccount().length);
    }
    else{
        alert('data model is undefined!')
    }

    return content;

}

function getDataFromForm(formName){
    var formElements=document.getElementById(formName).elements;    
    var obj={};
    for (var i=0; i<formElements.length; i++){
        obj[formElements[i].name]=formElements[i].value;
    }

    return JSON.stringify(obj);
}

function parseDataFromForm(formName){
    var obj = getDataFromForm(formName);
    return JSON.parse(obj);
}

function remove(array, element) {
    return array.filter(el => el !== element);
}


function DataModel() {

    //=========getter and setter========
    var dataCurrentAccount = [];
    var dataSavingAccount = [];

    this.getCurrentAccount = function(){
        if(CurrentAccount!=undefined){
            return dataCurrentAccount;
        }
    }

    this.getSavingAccount = function(){
        if(dataSavingAccount!=undefined){
            return dataSavingAccount;
        }
    }

    this.setCurrentAccount = function(data){        
        if(data!=undefined){
            dataCurrentAccount=data;
        }
    }

    this.setSavingAccount = function(data){        
        if(data!=undefined){
            dataSavingAccount=data;
        }
    }


    //===============CRUD================

    this.createCurrentAccount = function (obj) {
        if(dataCurrentAccount!=undefined){
            dataCurrentAccount.push(obj);
        } else{
            console.log("dataCurrentAccount is undefined!")
        } 
    }

    this.createSavingAccount = function (obj) {
        if(dataSavingAccount!=undefined){
            dataSavingAccount.push(obj);
        } else{
            console.log("dataSavingAccount is undefined!")
        }
    }

    this.readCurrentAccount = function () {
        console.log("all current accounts:");
        var data=dataModel.getCurrentAccount();

        data.forEach(function(element){
            console.log(element);
        });
    }

    this.readSavingAccount = function () {
        console.log("all saving accounts:");
        var data=dataModel.getSavingAccount();

        data.forEach(function(element){
            console.log(element);
        });
    }

    this.updateCurrentAccount = function (obj) {
        var indx;

        dataCurrentAccount.forEach(element => {
            if (element.number == obj.number) {
                indx = dataCurrentAccount.indexOf(element);
            }
        });

        if(indx>=0){
            dataCurrentAccount[indx]=obj;
        }else{
            console.log("No such account")
        }  
    }

    this.updateSavingAccount = function (obj) {
        var indx;

        dataSavingAccount.forEach(element => {
            if (element.number == obj.number) {
                indx = dataSavingAccount.indexOf(element);
            }
        });

        if(indx>=0){
            dataSavingAccount[indx]=obj;
        }else{
            console.log("No such account")
        }
    }

    this.deleteCurrentAccount = function (num) {
        dataCurrentAccount.forEach(element => {
            if (element.number == JSON.parse(num)) {
                dataCurrentAccount = remove(dataCurrentAccount, element);
            }
        });
    }

    this.deleteSavingAccount = function (num) {
        dataSavingAccount.forEach(element => {
            if (element.number == JSON.parse(num)) {
                dataSavingAccount = remove(dataSavingAccount, element);
            }
        });
    }
}


function Account(number, PIN, balance, dateOfAccountCreation, user) {
    this.number = number;
    this.PIN = PIN;
    this.balance = balance;
    this.dateOfAccountCreation = dateOfAccountCreation;
    this.user = user;
}


function CurrentAccount(number, PIN, balance, dateOfAccountCreation, user) {
    Account.call(this, number, PIN, balance, dateOfAccountCreation, user);
}

function SavingAccount(number, PIN, balance, dateOfAccountCreation, user, typeOfContribution) {
    Account.call(this, number, PIN, balance, dateOfAccountCreation, user);

    this.typeOfContribution = typeOfContribution;
}

function createCurrAccount(){
    var data = parseDataFromForm("currentAccountForm");
    
    var newCurrentAccount = 
    new CurrentAccount(data.number, data.PIN, data.balance, data.dateOfAccountCreation, data.user);

    dataModel.createCurrentAccount(newCurrentAccount);
    console.log("Current account created.")
}

function readCurrAccount(){
    dataModel.readCurrentAccount();
}

function updateCurrAccount(){
    var data = parseDataFromForm("currentAccountForm");
    
    var newCurrentAccount = 
    new CurrentAccount(data.number, data.PIN, data.balance, data.dateOfAccountCreation, data.user);

    dataModel.updateCurrentAccount(newCurrentAccount);
    console.log("Current account updated.")
}

function deleteCurrAccount(){
    var data = parseDataFromForm("currentAccountForm");
    
    dataModel.deleteCurrentAccount(data.number);
    console.log("Current account with number "+data.number+" deleted.");
}

function createSavAccount(){
    var data = parseDataFromForm("savingAccountForm");
    
    var newSavingAccount = 
    new SavingAccount(data.number, data.PIN, data.balance, data.dateOfAccountCreation, data.user, data.typeOfContribution);

    dataModel.createSavingAccount(newSavingAccount);
    console.log("Saving account created.")
}

function readSavAccount(){
    dataModel.readSavingAccount();
}

function updateSavAccount(){
    var data = parseDataFromForm("savingAccountForm");
    
    var newSavingAccount = 
    new SavingAccount(data.number, data.PIN, data.balance, data.dateOfAccountCreation, data.user, data.typeOfContribution);

    dataModel.updateSavingAccount(newSavingAccount);
    console.log("Saving account updated.")
}

function deleteSavAccount(){
    var data = parseDataFromForm("savingAccountForm");
    
    dataModel.deleteSavingAccount(data.number);
    console.log("Saving account with number "+data.number+" deleted.");
}


window.onload = function() {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        dataModel = new DataModel();


        reader.readAsText(file);
        
        reader.onload = function(e) {
            parseFile(reader.result);
        }
    });
}


