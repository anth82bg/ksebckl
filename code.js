
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

let ContentSection = function (metafile) {
    const self = this;

    self.metaFile = ko.observable(metafile);

    self.title = ko.observable('default title');

    self.list = ko.observableArray();

    self.load = function () {
        $.getJSON(self.metaFile(), function (metadata) {
            self.title(metadata.title);
            $.getJSON(metadata.contentfile, function (data) {
                self.list = ko.mapping.fromJS(data);
            });
        });
    };
    self.load();

    // self.metaInfo = ko.pureComputed({
    //     read: function () {
    //         return self.metaFile();
    //     },
    //     write: function (value) {
    //         $.getJSON(self.metaFile(), function (metadata) {
    //             self.title(metadata.title);
    //             $.getJSON(metadata.contentfile, function (data) {
    //                 ko.mapping.fromJS(data, self.list);
    //             });
    //         });
    //     }
    // });
}

/* ---------------------------------------------- */

const Model = new WebsiteModel();

const HomePage = new WebpageModel('KSEB Chirakkal', 'KSEB', Model.SelectedPage);

Model.Pages.push(HomePage);

HomePage.Sections.push(new ContentSection("./home-meta1.json"));

Model.SelectedPage(HomePage);


ko.applyBindings(HomePage);