var dataModel;

function parseFile(fileContent){
    if (dataModel!=undefined){
        var content = JSON.parse(fileContent);
        dataModel.setCurrentAccount(Array.from(content["CurrentAccount"]));
        dataModel.setSavingsAccount(Array.from(content["SavingAccount"]));

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
    var dataSavingsAccount = [];

    this.getCurrentAccount = function(){
        if(CurrentAccount!=undefined){
            return dataCurrentAccount;
        }
    }

    this.getSavingAccount = function(){
        if(dataSavingsAccount!=undefined){
            return dataSavingsAccount;
        }
    }

    this.setCurrentAccount = function(data){        
        if(data!=undefined){
            dataCurrentAccount=data;
        }
    }

    this.setSavingsAccount = function(data){        
        if(data!=undefined){
            dataSavingsAccount=data;
        }
    }

 

    //===============CRUD================

    this.createCurrentAccount = function (obj) {
        dataCurrentAccount.push(newAccount);

    }

    this.createSavingsAccount = function (obj) {

        var newAccount = JSON.parse(obj);
        dataSavingsAccount.push(newAccount);
    }

    this.readCurrentAccount = function () {
        console.log("all current accounts:");
        dataCurrentAccount.forEach(element => {
            console.log(element.number + ' - ' + element.user);
        });
    }

    this.readSavingsAccount = function () {
        console.log("all saving accounts:");
        dataSavingsAccount.forEach(element => {
            console.log(element.number + ' - ' + element.user + ':' + element.typeOfContribution);
        });
    }

    this.updateCurrentAccount = function (obj) {
        var newAccount = JSON.parse(obj);
        var indx;

        dataCurrentAccount.forEach(element => {
            if (element.number === newAccount.number) {
                indx = dataCurrentAccount.indexOf(element);
            }
        });

        if(indx>=0){
            dataCurrentAccount[indx]=newAccount;
        }
        
    }

    this.updateSavingsAccount = function (obj) {
        var newAccount = JSON.parse(obj);
        var indx;

        dataSavingsAccount.forEach(element => {
            if (element.number === newAccount.number) {
                indx = dataSavingsAccount.indexOf(element);
            }
        });

        if(indx>=0){
            dataSavingsAccount[indx]=newAccount;
        }
    }

    this.deleteCurrentAccount = function (num) {


        dataCurrentAccount.forEach(element => {
            if (element.number === JSON.parse(num)) {
                dataCurrentAccount = remove(dataCurrentAccount, element);
            }
        });
    }

    this.deleteSavingsAccount = function (num) {

        dataSavingsAccount.forEach(element => {
            if (element.number === JSON.parse(num)) {
                dataSavingsAccount = remove(dataSavingsAccount, element);
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

function SavingsAccount(number, PIN, balance, dateOfAccountCreation, user, typeOfContribution) {
    Account.call(this, number, PIN, balance, dateOfAccountCreation, user);

    this.typeOfContribution = typeOfContribution;
}

function CreateCurrentAccount(){
    var data = parseDataFromForm("currentAccountForm");
    
    var newCurrentAccount = new CurrentAccount(dataFromForm.number,
                                        dataFromForm.pin,
                                        dataFromForm.balance,
                                        dataFromForm.creationDate,
                                        dataFromForm.user);

    dataModel.createCurrentAccount(newCurrentAccount);
}

var main = (function () {

/*
    console.log("====After create:====");
    


    var newAccounts2 = [
        new SavingsAccount(765912, 'sdfghgfd4f', 45.23, '12.12.2017', 'pasha1', 'long-term'),
        new SavingsAccount(765913, 'sdfghgfd4f', 45.23, '12.12.2017', 'pasha2', 'long-term'),
        new SavingsAccount(765914, 'sdfghgfd4f', 45.23, '12.12.2017', 'pasha3', 'long-term')
    ];


    for (var i = 0; i < newAccounts1.length; i++) {

       
    }

    for (var i = 0; i < newAccounts2.length; i++) {

        var newItem2 = JSON.stringify(newAccounts2[i]);

        if (newItem2 != {}) {
            dataModel.createSavingsAccount(newItem2);
        }
    }

    dataModel.readCurrentAccount();
    dataModel.readSavingsAccount();

    console.log("====After delete:====");

    var num1=755913;
    var num2=765914;

    dataModel.deleteCurrentAccount(JSON.stringify(num1));
    dataModel.deleteSavingsAccount(JSON.stringify(num2));

    dataModel.readCurrentAccount();
    dataModel.readSavingsAccount();

    console.log("====After update:====");
    var updateItem = new CurrentAccount(755914, 'sdfghgfd4f', 45.23, '12.12.2017', 'olga');
    dataModel.updateCurrentAccount(JSON.stringify(updateItem));

    var updateItem2 = new SavingsAccount(765912, 'sdfghgfd4f', 45.23, '12.12.2017', 'oleg', 'long-term');
    dataModel.updateSavingsAccount(JSON.stringify(updateItem2));

    dataModel.readCurrentAccount();
    dataModel.readSavingsAccount();
    */
})();


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
