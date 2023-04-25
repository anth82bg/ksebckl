
let WebsiteModel = function () {
    const self = this;

    self.Pages = ko.observableArray();

    self.SelectedPage = ko.observable();
}

/* ---------------------------------------------- */

let WebpageModel = function (Title, LinkText, SelectedItem) {
    const self = this;

    self.isSelectedItem = ko.computed(function () {
        return self === SelectedItem();
    }, self);

    self.Title = ko.observable(Title);

    self.LinkText = ko.observable(LinkText);

    self.Sidebar = ko.observableArray();

    self.Sections = ko.observableArray(); /* body sections including ads */

    self.Footer = ko.observable();
}

/* ---------------------------------------------- */

const Model = new WebsiteModel();

const HomePage = new WebpageModel('KSEB Chirakkal', 'KSEB', Model.SelectedPage);
Model.Pages.push(HomePage);


const AboutPage = new WebpageModel('About', 'About', Model.SelectedPage);
Model.Pages.push(AboutPage);
Model.SelectedPage(AboutPage);


ko.applyBindings(Model);