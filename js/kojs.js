// Here's my data model
var ViewModel = function() {
    this.city = ko.observable("");
    this.state = ko.observable("");
 
    this.address = ko.pureComputed(function() {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        return " in " + this.city() + " " + this.state();
    }, this);
};
 
ko.applyBindings(new ViewModel()); 