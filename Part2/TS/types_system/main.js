var Seasons;
(function (Seasons) {
    Seasons[Seasons["Winter"] = 0] = "Winter";
    Seasons[Seasons["Spring"] = 1] = "Spring";
    Seasons[Seasons["Summer"] = 2] = "Summer";
    Seasons[Seasons["Autumn"] = 3] = "Autumn";
})(Seasons || (Seasons = {}));
var current = Seasons.Autumn;
console.log(current);
