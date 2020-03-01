<template>
  <div class="map">
    <l-map
      :key="componentKey"
      :zoom="zoom"
      :center="center"
      ref="map"
      style="z-index:1; background-color: white"
      :watch="true"
    >
      <!-- START Custom Layers Selection -->
      <l-control position="bottomright">
        <v-flex xs12 sm6 class="layers-select">
          <v-select
            v-model="activeLayers"
            :items="layers"
            item-text="name"
            item-value="value"
            :menu-props="{ maxHeight: '200', top: '300', offsetY: true }"
            append-icon="layers"
            v-on:click:append="MenuArrow"
            ref="layerSelection"
            return-object
            @change="onchange"
            color="evosys"
            class="hover-violet"
          ></v-select>
        </v-flex>
      </l-control>
      <!-- END Custom Layers Selection -->

      <!-- START Geoposition -->
      <l-control position="bottomright" class="position pr-3">
        <font-awesome-icon icon="crosshairs" size="2x" class="hover-secondary" @click="geoLoc" />
      </l-control>
      <!-- END Geoposition -->

      <!-- START Layers -->
      <l-wms-tile-layer
        v-for="layer in layers"
        :key="layer.name"
        :base-url="layer.baseUrl"
        :layers="layer.layers"
        :visible="layer.visible"
        :format="'image/png'"
        :name="layer.name"
        layer-type="base"
        :transparent="true"
        :options="{ maxZoom: 20 }"
      >
      </l-wms-tile-layer>
      <!-- END Layers -->
    </l-map>
  </div>
</template>

<script>
/* eslint-disable */
import {
  LMap,
  LMarker,
  LWMSTileLayer,
  LControlLayers,
  LTileLayer,
  LControlZoom,
  LFeatureGroup,
  LPopup,
  LControl
} from 'vue2-leaflet';

export default {
  name: 'PlaceMap',
  components: {
    LMap,
    LMarker,
    'l-wms-tile-layer': LWMSTileLayer,
    LControlLayers,
    LTileLayer,
    LControlZoom,
    LFeatureGroup,
    LPopup,
    LControl
  },
  data() {
    return {
      userLocation: null, // Geolocation new View
      activeLayers: [],
      isOpen: false,
      zoom: 13,
      componentKey: 0, // Lazy Loading Maps
      center: L.latLng(46.94305, 7.438576),
      geoMarkerId: 1,

      geoMarker: [],
      layers: [
        {
          name: 'OpenStreetMap',
          visible: true,
          baseUrl: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        },
        {
          name: 'Geodienste.ch Amtliche Vermessung',
          visible: false,
          baseUrl: 'https://geodienste.ch/db/av/deu?SERVICE=WMS',
          layers: 'Aggregierte_Amtliche_Vermessung'
        }
      ]
    };
  },
  methods: {
    //* Layers Selection
    MenuArrow() {
      const productSortSelect = this.$refs.layerSelection;
      if (productSortSelect.isMenuActive) {
        this.$refs.layerSelection.isMenuActive = false;
        productSortSelect.blur();
      } else {
        this.$refs.layerSelection.isMenuActive = true;
        productSortSelect.focus();
      }
    },
    setLayer(layer) {
      this.account.id = value;
    },
    //* Change Layers - Show only one
    onchange() {
      let activeLayer = this.activeLayers;
      let layers = this.layers;

      layers.forEach(function(element) {
        element.visible = false;
      });
      activeLayer.visible = true;
    },

    //* GeoLocation API
    geoLoc(position) {
      // Geo Exist
      if (window.navigator.geolocation) {
        // Give me position
        window.navigator.geolocation.getCurrentPosition(position => {
          // Get Coords from Browser
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;

          // Inicialization Vue geoMarker
          let geoMarker = this.geoMarker;
          // Check if Geomarker have the ID which I need
          if (geoMarker.hasOwnProperty(this.geoMarkerId)) {
            // If have remove it
            this.map.removeLayer(geoMarker[this.geoMarkerId]);
          }
          // Than create new one with the same static ID
          let marker = L.marker(L.latLng(parseFloat(lat), parseFloat(lng)), {
            draggable: 'true'
          });
          // Must be in separat array !!
          this.geoMarker[this.geoMarkerId] = marker.addTo(this.map);
          // Update Leaflet Map with new center coords
          this.center = new L.LatLng(lat, lng);

          // console.log(position.coords);
          // console.log(geoMarker);
        });
      } else {
        // Och noo someone have any Geolocation :(
        text = 'Geolocation is not supported by this browser.';
      }
    },

    //* Render Map Object
    forceRerender() {
      this.componentKey = this.componentKey + 1;
    }
  },
  async mounted() {
    //* Leaflet Map Object
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject;
    });

    //* Geo API for mobile
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.isLoading = true;
        this.position = position.coords;
        this.center.lat = position.coords.latitude;
        this.center.lng = position.coords.longitude;

        // console.log(position.coords);
      });
    }
  },
  watch: {
    //* Map layers Lazy Loading
    sheetMap: function(val) {
      if (val == true) {
        this.$nextTick(() => {
          this.$refs.map.forceRerender();
        });
      }
    }
  }
};
</script>

<style lang="scss" >
@import '../assets/styles/components/map.scss';
</style>
