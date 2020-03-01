<template>
  <div>
    <h1>All Records</h1>
    <v-layout>
      <div>
        <v-toolbar flat color="white">
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" to="dashboard">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="code" label="Code"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="name" label="Name"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="type" label="Type"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-data-table :headers="headers" :items="joke" class="elevation-1">
          <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td class="text-xs-right">{{ props.item.code }}</td>
            <td class="text-xs-right">{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.type }}</td>
            <td class="justify-center layout px-0">
              <v-icon small class="mr-2" @click="editItem(props.item)">
                edit
              </v-icon>
              <v-icon small @click="deleteItem(props.item.id)">
                delete
              </v-icon>
            </td>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </div>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    joke: [],
    code: '',
    name: '',
    type: '',
    id: null,
    dialog: false,
    headers: [
      {
        text: 'Id',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Code', value: 'calories' },
      { text: 'Name', value: 'fat' },
      { text: 'Type', value: 'carbs' }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();

    axios
      .get('http://localhost:8080/locationweb/listLocations')
      .then(response => {
        this.joke = response.data;
        console.log('JOKE', this.joke);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  },
  methods: {
    initialize() {
      this.desserts = [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65
        }
      ];
    },

    editItem(item) {
      this.dialog = true;

      this.code = item.code;
      this.name = item.name;
      this.type = item.type;
      this.id = item.id;
    },

    deleteItem(item) {
      // const index = this.desserts.indexOf(item);
      // confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);

      // let formData = new FormData();
      // formData.append('id', item);
      let id = item;
      axios
        .post(`http://localhost:8080/locationweb/deleteLocation/${id}`, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
          console.log(response);
        })
        .catch(() => {
          console.error('error');
        });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      console.log('ID', this.id);

      let formData = new FormData();
      formData.append('id', this.id);
      formData.append('code', this.code);
      formData.append('name', this.name);
      formData.append('type', this.type);

      axios
        .post(`http://localhost:8080/locationweb/saveLoc`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
          console.log(response);
        })
        .catch(() => {
          console.error('error');
        });

      // if (this.editedIndex > -1) {
      //   Object.assign(this.desserts[this.editedIndex], this.editedItem);
      // } else {
      //   this.desserts.push(this.editedItem);
      // }
      // this.close();
    }
  }
};
</script>

<style lang="scss" scoped></style>
