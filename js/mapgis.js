const map = new mapgl.Map('map', {
    center: [38.981726, 45.046163],
    zoom: 16,
    key: '70a1a057-35c8-4b96-9fe4-f8e18c2570c7'
});

const marker = new mapgl.Marker(map, {
    coordinates: [38.981726, 45.046163]
});