function remove(array, element) {
    return array.filter(el => el !== element);
}

function DataModel() {

    var creationDate = new Date();

    this.getCreationDate = function(){
        if(creationDate!=undefined){
            return JSON.stringify(creationDate);
        }
    }

    this.setCreationDate = function(data){        
        creationDate=JSON.parse(data);
    }

    var dataCurrentAccount = [];

    var dataSavingsAccount = [];

    this.createCurrentAccount = function (obj) {

        var newAccount = JSON.parse(obj);
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



var main = function () {
    var dataModel = new DataModel();

    console.log(JSON.parse(dataModel.getCreationDate()));
    dataModel.setCreationDate(JSON.stringify(new Date()+6000));
    console.log(JSON.parse(dataModel.getCreationDate()));

    dataModel.readCurrentAccount();
    dataModel.readSavingsAccount();

    console.log("====After create:====");
    var newAccounts1 = [
        new CurrentAccount(755912, 'sdfghgfd4f', 45.23, '12.12.2017', 'alena'),
        new CurrentAccount(755913, 'sdfghgfd4f', 45.23, '12.12.2017', 'alena1'),
        new CurrentAccount(755914, 'sdfghgfd4f', 45.23, '12.12.2017', 'alena2'),
        new CurrentAccount(755915, 'sdfghgfd4f', 45.23, '12.12.2017', 'alena3')
    ];


    var newAccounts2 = [
        new SavingsAccount(765912, 'sdfghgfd4f', 45.23, '12.12.2017', 'pasha1', 'long-term'),
        new SavingsAccount(765913, 'sdfghgfd4f', 45.23, '12.12.2017', 'pasha2', 'long-term'),
        new SavingsAccount(765914, 'sdfghgfd4f', 45.23, '12.12.2017', 'pasha3', 'long-term')
    ];


    for (var i = 0; i < newAccounts1.length; i++) {

        var newItem1 = JSON.stringify(newAccounts1[i]);

        if (newItem1 != {}) {
            dataModel.createCurrentAccount(newItem1);
        }
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
}

main();