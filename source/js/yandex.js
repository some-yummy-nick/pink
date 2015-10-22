var myMap;

function init(ymaps) {

    myMap = new ymaps.Map('mymap', {

        center: [59.93049120227639, 30.348894999999978], // Москва
        zoom: 14,
        controls: ['zoomControl']
    });

    var myPlacemark = new ymaps.Placemark([59.93049120227639, 30.348894999999978], {
        hintContent: 'Невский проспект'
    }, {
        iconImageHref: '../img/map-marker.svg',
        iconImageSize: [36, 36],
        iconImageOffset: [-3, -36]
    });

    myMap.geoObjects.add(myPlacemark);
    myMap.controls.add('zoomControl');
}
