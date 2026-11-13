
ymaps.ready(init);

function init() {
let myMap = new ymaps.Map("map", {
    center: [45.046163, 38.981726],
    zoom: 16,
    controls: [],
    suppressMapOpenBlock: true
});

    let myPlacemark = new ymaps.Placemark(
        [45.046163, 38.981726],{balloonContent: "Красная ул., 176, Краснодар"}
    );

    myMap.geoObjects.add(myPlacemark);
}
